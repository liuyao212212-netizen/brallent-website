import { useState } from 'react'
import { CASES } from '../data'
import { Reveal, SectionTitle, PageHero, Icon, FaqList, CaseItem, ContactCta, scrollToId, mailto } from '../ui'

const FDE_MAIL = {
  subject: '【FDE 定制咨询】预约 1 对 1 沟通',
  body: '你好，我想预约 FDE 定制咨询：\n\n公司名称：\n业务场景简述：\n',
}

/* ================= 服务内容（简版 + 可展开详情） ================= */
function Services() {
  const items = [
    {
      icon: 'target',
      title: '业务诊断',
      brief: '梳理流程，确定优先场景。',
      detail: '深入一线梳理最消耗人力的核心环节，评估投入产出比（ROI），制定小步快跑、清晰可落地的定制路线图。覆盖管理、运营、业务流程、知识资产与系统工具，不限于营销场景。',
    },
    {
      icon: 'layers',
      title: '系统与工作流',
      brief: '对接现有工具，落地业务应用。',
      detail: '工程师驻场式对接业务负责人与技术骨干，在真实环境中敏捷开发、快速验证，并无缝对接现有系统（ERP / CRM / 飞书等），不搞动辄半年的重型研发，周级推进、快速见效。',
    },
    {
      icon: 'book',
      title: '企业知识系统',
      brief: '沉淀资料与经验，按权限调用。',
      detail: '打通内部数据与业务流程，建立严格的角色权限隔离（RBAC）与安全审计护栏，让经验沉淀为可复用的数字资产，支持私有化与专有云环境部署。',
    },
    {
      icon: 'users',
      title: '培训与交接',
      brief: '让内部团队接得住、用得好。',
      detail: '项目交付同步包含完整的系统架构文档、操作手册与实战培训，手把手赋能内部团队掌握独立运维能力，确保系统长期可用、可控，不被外部供应商绑定。',
    },
  ]
  const [open, setOpen] = useState(-1)
  return (
    <section className="border-t border-line bg-white">
      <div className="mx-auto max-w-[1180px] px-5 py-20 md:px-6 md:py-24">
        <SectionTitle title="服务内容" desc="四项服务覆盖从诊断到交接的完整链路，点击查看完整能力说明。" />
        <div className="grid gap-6 sm:grid-cols-2">
          {items.map((it, i) => {
            const isOpen = open === i
            return (
              <Reveal key={it.title} delay={i * 60}>
                <div
                  className={`h-full rounded-2xl border bg-page p-7 transition-colors duration-200 md:p-8 ${
                    isOpen ? 'border-brand/50' : 'border-line hover:border-brand/40'
                  }`}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-sky-tint text-brand">
                    <Icon name={it.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-navy">{it.title}</h3>
                  <p className="mt-2 text-[15px] text-mist">{it.brief}</p>
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors duration-200 hover:text-brand-deep"
                    aria-expanded={isOpen}
                  >
                    {isOpen ? '收起详情' : '展开详情'}
                    <svg viewBox="0 0 20 20" fill="none" className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true">
                      <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {isOpen && (
                    <p className="mt-4 border-t border-line pt-4 text-[15px] leading-relaxed text-ink/85">{it.detail}</p>
                  )}
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ================= FDE 合作流程 ================= */
function Process() {
  const steps = [
    { no: '01', name: '业务诊断', desc: '梳理业务问题与优先场景。' },
    { no: '02', name: '方案确认', desc: '确认范围、排期与验收指标。' },
    { no: '03', name: '原型验证', desc: '部署首版模块，结合反馈迭代。' },
    { no: '04', name: '部署验收', desc: '测试功能、安全与角色权限。' },
    { no: '05', name: '培训移交', desc: '交付文档、手册与实战培训。' },
  ]
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-[1180px] px-5 py-20 md:px-6 md:py-24">
        <SectionTitle title="合作流程" desc="每一步都有明确交付物与确认节点，让定制项目可预期、可管理。" />
        <ol className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <Reveal key={s.no} delay={i * 60}>
              <li className="border-l-2 border-brand/40 pl-5">
                <div className="text-sm font-bold tracking-wider text-brand">{s.no}</div>
                <h3 className="mt-2 font-bold text-navy">{s.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-mist">{s.desc}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ================= 交付与数据安全 ================= */
function Delivery() {
  const deliverables = ['可运行的系统', '技术文档', '操作手册', '实战培训']
  return (
    <section className="border-t border-line bg-white">
      <div className="mx-auto max-w-[1180px] px-5 py-20 md:px-6 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionTitle align="left" title="交付内容" />
            <div className="grid grid-cols-2 gap-4">
              {deliverables.map((d, i) => (
                <Reveal key={d} delay={i * 60}>
                  <div className="rounded-xl border border-line bg-page px-5 py-4 text-center text-[15px] font-semibold text-navy">
                    {d}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div>
            <SectionTitle align="left" title="数据安全与部署" />
            <Reveal>
              <p className="leading-relaxed text-ink/85">
                支持企业私有化及专有云环境部署，严格遵循企业级角色权限隔离（RBAC）与数据脱敏规范；所有定制代码与架构文档产权归属清晰，交付即移交完整控制权。
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ================= 页面组装 ================= */
export default function Fde() {
  const cases = CASES.filter((c) => c.type === 'fde')
  const faq = [
    {
      q: 'FDE 定制服务和传统软件外包公司有什么区别？',
      a: '传统外包是「你给需求文档，他们闭门开发，几个月后交给你一个未必贴合实际的系统」。博瑞伦特的 FDE 工程师直接嵌入你的业务一线，先做场景诊断，周级敏捷推进并随真实业务反馈快速迭代；同时在交付过程中手把手赋能你的内部团队，确保系统长期可用、可控。',
    },
    {
      q: 'FDE 只适合做营销类系统吗？',
      a: '不是。FDE 覆盖管理、运营、业务流程、知识资产及系统工具等各类企业内部场景——凡是「标准软件不好用、自建团队又太重」的环节，都是 FDE 的适用范围。营销只是常见切入点之一。',
    },
    {
      q: '系统能私有化部署吗？数据安全怎么保障？',
      a: '支持企业私有化及专有云环境部署。我们严格遵循企业级角色权限隔离（RBAC）与数据脱敏规范，所有定制代码与架构文档产权归属清晰，交付即移交完整控制权。',
    },
  ]
  return (
    <>
      <PageHero
        eyebrow="FDE · 前线部署工程"
        title={'让系统贴合业务，\n让团队更高效。'}
        desc="深入业务一线，定制 AI 工作流、知识系统与业务工具，并完成培训与交接。"
        primary={{ label: '预约 FDE 咨询', href: mailto(FDE_MAIL.subject, FDE_MAIL.body) }}
        secondary={{ label: '查看 FDE 案例', onClick: () => scrollToId('fde-cases') }}
      />
      <Services />
      <Process />
      <section id="fde-cases" className="border-t border-line">
        <div className="mx-auto max-w-[1180px] px-5 py-20 md:px-6 md:py-24">
          <SectionTitle title="FDE 客户案例" desc="两项代表性交付记录，点击查看包含背景、挑战、方案与全部数据的完整案例。" />
          <div className="border-t border-line">
            {cases.map((c, i) => (
              <CaseItem key={c.title} c={c} last={i === cases.length - 1} />
            ))}
          </div>
        </div>
      </section>
      <Delivery />
      <section className="border-t border-line">
        <div className="mx-auto max-w-[1180px] px-5 py-20 md:px-6 md:py-24">
          <div className="mx-auto max-w-3xl">
            <SectionTitle title="常见问题" />
            <Reveal>
              <FaqList items={faq} />
            </Reveal>
          </div>
        </div>
      </section>
      <ContactCta
        title="预约 FDE 定制咨询"
        desc="1 对 1 梳理业务场景与定制可行性，获取专属工程部署建议。"
        btnLabel="预约 FDE 咨询"
        mailSubject={FDE_MAIL.subject}
        mailBody={FDE_MAIL.body}
      />
    </>
  )
}
