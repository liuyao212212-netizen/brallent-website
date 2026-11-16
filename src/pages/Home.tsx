import { Link } from 'react-router-dom'
import { Reveal, SectionTitle, Icon, FaqList, ContactCta, scrollToId } from '../ui'

/* ================= 首屏 ================= */
function Hero() {
  return (
    <section className="mx-auto max-w-[1180px] px-5 pb-16 pt-32 md:px-6 md:pb-24 md:pt-44">
      <Reveal>
        <p className="text-sm font-semibold tracking-widest text-brand">博瑞伦特 · 企业定制服务</p>
      </Reveal>
      <Reveal delay={60}>
        <h1 className="mt-4 max-w-3xl text-[2rem] font-bold leading-[1.3] tracking-tight text-navy md:text-6xl md:leading-[1.22]">
          让企业的想法，
          <br />
          成为可用的成果。
        </h1>
      </Reveal>
      <Reveal delay={120}>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-mist md:text-lg">
          围绕业务效率与品牌形象，提供两项独立的企业定制服务。
        </p>
        <p className="mt-2 text-sm font-medium text-navy/70">FDE 系统与工作流定制 · 企业服装定制</p>
      </Reveal>
      <Reveal delay={180}>
        <div className="mt-9">
          <button
            onClick={() => scrollToId('services')}
            className="inline-flex items-center justify-center rounded-lg bg-brand px-7 py-3.5 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-brand-deep"
          >
            了解我们的服务
          </button>
        </div>
      </Reveal>
    </section>
  )
}

/* ================= 业务入口 ================= */
function BizEntries() {
  const entries = [
    {
      icon: 'code',
      title: 'FDE 定制',
      desc: '从业务诊断到系统落地，打造贴合实际流程的工作流与知识系统。',
      tags: ['业务诊断', '系统与工作流', '知识资产'],
      cta: '了解 FDE 服务',
      to: '/fde',
    },
    {
      icon: 'shirt',
      title: '企业服装定制',
      desc: '从专属设计到成衣交付，为团队、展会与商务礼赠定制服饰。',
      tags: ['文化衫与制服', '活动服饰', '礼赠套装'],
      cta: '了解服装定制',
      to: '/apparel',
    },
  ]
  return (
    <section id="services" className="border-t border-line bg-white">
      <div className="mx-auto max-w-[1180px] px-5 py-20 md:px-6 md:py-24">
        <SectionTitle title="两项业务" desc="两项业务各自独立，可按需单独委托，分别由专属团队负责。" />
        <div className="grid gap-6 md:grid-cols-2">
          {entries.map((e, i) => (
            <Reveal key={e.title} delay={i * 80}>
              <Link
                to={e.to}
                className="group flex h-full flex-col rounded-2xl border border-line bg-page p-7 transition-colors duration-200 hover:border-brand/50 md:p-10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-tint text-brand transition-colors duration-200 group-hover:bg-brand group-hover:text-white">
                  <Icon name={e.icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-2xl font-bold text-navy">{e.title}</h3>
                <p className="mt-3 max-w-md leading-relaxed text-mist">{e.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {e.tags.map((t) => (
                    <span key={t} className="rounded-md bg-sky-tint px-3 py-1 text-xs font-medium text-navy/75">
                      {t}
                    </span>
                  ))}
                </div>
                <span className="mt-auto inline-flex w-fit items-center gap-1.5 pt-8 text-[15px] font-semibold text-brand transition-colors duration-200 group-hover:text-brand-deep">
                  {e.cta}
                  <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
                    <path d="M4 10h12m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================= 公司数据（静态展示，含口径） ================= */
function Stats() {
  const stats = [
    { num: '96%+', label: '定制项目按期与高标准交付率', note: '统计口径：已完成定制项目' },
    { num: '2–4 周', label: '核心定制需求敏捷落地周期', note: '统计口径：核心业务场景首版落地' },
    { num: '1 对 1', label: '资深顾问与交付团队直接对接', note: '统计口径：每个委托项目' },
    { num: '50+', label: '深度服务的成长型与行业标杆企业', note: '统计口径：累计服务客户' },
  ]
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-[1180px] px-5 py-20 md:px-6 md:py-24">
        <SectionTitle title="博瑞伦特在数字里" desc="以下数据均为已完成项目的统计口径，如实呈现，不做夸大。" />
        <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 60}>
              <div className="border-l-2 border-brand/40 pl-5">
                <div className="text-4xl font-bold tracking-tight text-navy md:text-5xl">{s.num}</div>
                <div className="mt-2.5 text-sm font-medium leading-snug text-ink">{s.label}</div>
                <div className="mt-1.5 text-xs text-mist/80">{s.note}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================= 关于我们 + 联系 ================= */
function About() {
  const companyFaq = [
    {
      q: '博瑞伦特的核心定位是什么？',
      a: '博瑞伦特是一家企业定制服务专家，目前核心提供 FDE（前线部署工程）与企业服装定制两项定制业务。我们不做标准化现货售卖，所有交付均围绕客户的实际业务场景与品牌标准量身打造。',
    },
    {
      q: '我们可以只合作其中一项业务吗？',
      a: '完全可以。FDE 与企业服装定制均由各自独立的资深专业团队负责，企业可以根据当前阶段的具体需求，单独委托其中任意一项定制服务。',
    },
  ]
  const infos = [
    { icon: 'mail', label: '企业邮箱', value: 'rose@brallent.cn' },
    { icon: 'phone', label: '专属顾问电话 / 微信', value: '+86 15802439194（微信：bbly212）' },
    { icon: 'pin', label: '公司地址', value: '北京市大兴区盛坊路 5 号院 6 号楼 1001-7' },
  ]
  return (
    <section id="about" className="border-t border-line bg-white">
      <div className="mx-auto max-w-[1180px] px-5 py-20 md:px-6 md:py-24">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionTitle align="left" title="关于博瑞伦特" />
            <Reveal>
              <div className="space-y-4 leading-relaxed text-ink/85">
                <p>
                  博瑞伦特（BRALLENT）是一家企业定制服务提供商，围绕「业务效率」与「品牌形象」两个方向，提供两项独立且深度定制的服务：FDE 前线部署工程与企业服装定制。
                </p>
                <p>
                  我们相信，好的定制不靠模板，靠一线。无论是工程师驻场理解业务，还是设计顾问逐稿打磨服饰细节，博瑞伦特始终坚持深入客户的真实场景，交付真正可用、可持续的成果。
                </p>
              </div>
            </Reveal>
            <div className="mt-10 space-y-5 border-t border-line pt-8">
              {infos.map((it) => (
                <div key={it.label} className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-tint text-brand">
                    <Icon name={it.icon} />
                  </span>
                  <div>
                    <div className="text-xs text-mist">{it.label}</div>
                    <div className="mt-0.5 font-semibold text-navy">{it.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionTitle align="left" title="常见问题" />
            <Reveal>
              <FaqList items={companyFaq} />
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-6 text-sm text-mist">
                各业务的专业问题，可在 <Link to="/fde" className="font-medium text-brand hover:underline">FDE 定制</Link> 与{' '}
                <Link to="/apparel" className="font-medium text-brand hover:underline">企业服装定制</Link> 页面查看对应 FAQ。
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ================= 页面组装 ================= */
export default function Home() {
  return (
    <>
      <Hero />
      <BizEntries />
      <Stats />
      <About />
      <div id="contact">
        <ContactCta
          title="准备好启动你的专属企业定制项目了吗？"
          desc="告诉我们你的需求，专属顾问将在 1 个工作日内与你联系。"
          btnLabel="联系顾问"
          mailSubject="【官网咨询】企业定制服务"
          mailBody={'你好，我想咨询博瑞伦特的企业定制服务：\n\n公司名称：\n需求方向（FDE 定制 / 企业服装定制 / 暂不确定）：\n需求简述：\n'}
        />
      </div>
    </>
  )
}
