import { useEffect, useRef, useState } from 'react'
import logoUrl from './assets/Brallent_Logo.svg'

/* ================= 工具 ================= */
const mailto = (subject: string, body = '') =>
  `mailto:rose@brallent.cn?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

/* ================= 滚动入场动画 ================= */
function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => el.classList.add('in-view'), delay)
            io.unobserve(el)
          }
        })
      },
      { threshold: 0.08 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [delay])
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  )
}

/* ================= 通用小件 ================= */
function SectionTitle({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string
  title: React.ReactNode
  desc?: string
}) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
      <Reveal>
        <span className="inline-block rounded-full border border-brand/20 bg-sky-tint px-4 py-1.5 text-xs font-medium tracking-widest text-brand">
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy md:text-4xl">{title}</h2>
      </Reveal>
      {desc && (
        <Reveal delay={140}>
          <p className="mt-4 leading-relaxed text-mist">{desc}</p>
        </Reveal>
      )}
    </div>
  )
}

function CheckIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className}>
      <path d="M4 10.5l4 4 8-9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ArrowIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className}>
      <path d="M4 10h12m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ================= 导航 ================= */
function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const links = [
    { href: '#services', label: '业务服务' },
    { href: '#why', label: '为什么选我们' },
    { href: '#framework', label: '交付体系' },
    { href: '#cases', label: '客户案例' },
    { href: '#faq', label: '常见问题' },
  ]
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass border-b border-line/70 shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-[72px]">
        <a href="#top" className="flex items-center gap-2.5">
          <img src={logoUrl} alt="博瑞伦特 BRALLENT" className="h-9 w-auto" />
        </a>
        <div className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[15px] font-medium text-ink/80 transition-colors hover:text-brand"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-xl bg-brand px-5 py-2.5 text-[15px] font-semibold text-white shadow-lg shadow-brand/25 transition-all hover:bg-brand-deep hover:shadow-brand/35"
          >
            预约 1 对 1 定制咨询
          </a>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-navy lg:hidden"
          aria-label="菜单"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>
      {open && (
        <div className="glass border-t border-line/70 lg:hidden">
          <div className="flex flex-col px-5 py-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-line/60 py-3.5 text-[15px] font-medium text-ink last:border-0"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="my-3 rounded-xl bg-brand py-3 text-center font-semibold text-white"
            >
              预约 1 对 1 定制咨询
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

/* ================= 一、主视觉 ================= */
function Hero() {
  const metrics = [
    { num: '96%+', label: '定制项目按期与高标准交付率' },
    { num: '2–4 周', label: '核心定制需求敏捷落地周期' },
    { num: '1 对 1', label: '资深顾问与交付团队直接对接' },
    { num: '50+', label: '深度服务的成长型与行业标杆企业' },
  ]
  return (
    <section id="top" className="relative overflow-hidden pt-16 md:pt-[72px]">
      <div className="grid-bg absolute inset-0" />
      <div className="glow-arc absolute inset-x-0 bottom-0 h-[420px]" />
      <div className="absolute left-1/2 top-0 h-[360px] w-[720px] -translate-x-1/2 rounded-full bg-brand/10 blur-[110px]" />
      <div className="relative mx-auto max-w-6xl px-5 pb-24 pt-16 md:pb-32 md:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="glass inline-flex items-center gap-2 rounded-full border border-line px-4 py-1.5 text-xs font-medium text-navy-soft shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
              </span>
              博瑞伦特 BRALLENT · 企业定制服务专家
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-7 text-[1.75rem] font-bold leading-[1.35] tracking-tight text-navy md:text-5xl md:leading-[1.3]">
              从专属构想到高标落地，
              <br />
              做<span className="text-gradient">懂企业的定制伙伴</span>。
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-mist md:text-lg">
              深入企业真实场景，提供一对一专属设计与全流程品控交付。
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#contact"
                className="w-full rounded-xl bg-brand px-8 py-3.5 text-center font-semibold text-white shadow-xl shadow-brand/30 transition-all hover:-translate-y-0.5 hover:bg-brand-deep sm:w-auto"
              >
                预约 1 对 1 定制咨询
              </a>
              <a
                href="#cases"
                className="glass w-full rounded-xl border border-line px-8 py-3.5 text-center font-semibold text-navy shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand/40 sm:w-auto"
              >
                浏览精选客户案例 <span className="text-brand">→</span>
              </a>
            </div>
          </Reveal>
        </div>
        {/* 四栏核心数据背书条 */}
        <Reveal delay={420}>
          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-3 lg:grid-cols-4">
            {metrics.map((s) => (
              <div key={s.label} className="glass rounded-2xl border border-line/80 px-4 py-5 text-center card-shadow">
                <div className="text-2xl font-bold text-brand md:text-3xl">{s.num}</div>
                <div className="mt-1.5 text-xs leading-relaxed text-mist">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ================= 二、核心定制业务 ================= */
function Services() {
  const services = [
    {
      no: '01',
      tag: 'FDE · Forward Deployed Engineering（前线部署工程）',
      title: 'FDE 定制',
      positioning: '无需自建庞大的研发中台，也能拥有直接嵌入业务一线的定制工程团队。',
      desc: '市面上的标准化软件往往难以适配企业真实的业务流程与数据边界。博瑞伦特通过 FDE（前线部署工程）模式，派驻懂业务的资深工程师直接进驻你的日常协作流，围绕实际系统环境与核心业务卡点进行敏捷定制开发——不搞动辄半年的重型研发，周级推进、快速见效，并在交付中手把手赋能你的内部团队掌握独立运维能力。',
      deliveries: [
        {
          t: '高 ROI 业务卡点诊断',
          d: '深入一线梳理最消耗人力的核心环节，评估投入产出比，制定小步快跑、清晰可落地的定制路线图。',
        },
        {
          t: '驻场式系统定制开发',
          d: '工程师直接对接业务负责人与技术骨干，在真实环境中敏捷开发、快速验证并无缝对接现有系统（ERP / CRM / 飞书等）。',
        },
        {
          t: '企业专属工作流与知识系统定制',
          d: '打通内部数据与业务流程，建立严格的角色权限隔离（RBAC）与安全审计护栏，让经验沉淀为可复用的数字资产。',
        },
        {
          t: '团队实战赋能与规范移交',
          d: '项目交付同步包含完整的系统架构文档、操作手册与实战培训，确保你的团队接得住、改得动，不被外部供应商绑定。',
        },
      ],
      cta: '预约 FDE 定制方案沟通',
      ctaMail: mailto('【官网咨询】FDE 定制方案沟通', '你好，我想咨询 FDE 定制方案：\n\n公司名称：\n业务场景简述：\n'),
      promises: [] as string[],
    },
    {
      no: '02',
      tag: 'Enterprise Apparel Customization',
      title: '企业服装定制',
      positioning: '摆脱普通印花的粗糙感与传统大厂的高起订门槛，打造兼具质感与认同感的企业专属服饰。',
      desc: '无论是团队日常着装、大型峰会与国际展会，还是新员工入职与重要客户礼赠，服饰都是企业形象最直观的物理载体。博瑞伦特提供从 1 对 1 免费设计、高定级面料甄选到成衣全检交付的全流程企业服装定制服务——无论是几十件的精干团队小批量定制，还是数百上千件的全员大货，均享受同等严苛的版型与品控标准。',
      deliveries: [
        {
          t: '团队文化衫与日常制服定制',
          d: '严选高克重精梳棉、科技速干、商务珠地网眼及重磅卫衣/冲锋衣面料，提供标准版（Standard Fit）与宽松版（Loose Fit）双版型体系，兼顾不同身材包容度与日常实穿率。',
        },
        {
          t: '行业展会与品牌活动着装',
          d: '围绕活动主视觉进行系统化视觉延展设计，确保参展、路演与主办团队在现场拥有统一、出众的专业辨识度。',
        },
        {
          t: '入职仪式与商务礼赠服饰套装',
          d: '支持定制专属织唛、品牌吊牌、精致万针刺绣与配套礼盒包装，强化雇主品牌归属感与客户礼赠记忆点。',
        },
        {
          t: '专属企业制衣档案留存',
          d: '锁定品牌标准色号、版型数据与工艺参数，后续新员工入职或季度小批量补单无需从头沟通，实现极速快反。',
        },
      ],
      cta: '获取服装定制方案与免费设计',
      ctaMail: mailto('【官网咨询】企业服装定制方案', '你好，我想咨询企业服装定制：\n\n公司名称：\n定制场景（日常/展会/礼赠）：\n预估数量：\n'),
      promises: [
        '免费设计无限次修改（定稿后再下单）',
        '50% 定金透明锁单（打样确认后排产）',
        '灵活起订与逐件全检',
      ],
    },
  ]
  return (
    <section id="services" className="relative bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle
          eyebrow="OUR SERVICES"
          title="核心定制业务"
          desc="围绕企业的真实运营与形象需求，博瑞伦特聚焦提供以下两项深度定制服务。"
        />
        <div className="space-y-10">
          {services.map((s, i) => (
            <Reveal key={s.no} delay={i * 80}>
              <div className="relative overflow-hidden rounded-3xl border border-line bg-page p-7 md:p-12">
                <div className="absolute -right-8 -top-10 select-none text-[120px] font-bold leading-none text-brand/[0.06] md:text-[160px]">
                  {s.no}
                </div>
                <div className="relative">
                  <span className="inline-block rounded-full bg-brand/10 px-3.5 py-1.5 text-xs font-semibold text-brand">
                    业务 {s.no} ｜ {s.tag}
                  </span>
                  <h3 className="mt-4 text-2xl font-bold text-navy md:text-3xl">{s.title}</h3>
                  {/* 核心定位 */}
                  <div className="mt-5 rounded-2xl border-l-4 border-brand bg-sky-tint/70 px-5 py-4">
                    <p className="text-[15px] font-semibold leading-relaxed text-navy">{s.positioning}</p>
                  </div>
                  <p className="mt-5 leading-relaxed text-mist">{s.desc}</p>
                  {/* 四项核心交付 */}
                  <div className="mt-8 grid gap-4 md:grid-cols-2">
                    {s.deliveries.map((d, idx) => (
                      <div
                        key={d.t}
                        className="group rounded-2xl border border-line bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:card-shadow"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand to-brand-deep text-xs font-bold text-white">
                            {idx + 1}
                          </span>
                          <h4 className="font-semibold text-navy">{d.t}</h4>
                        </div>
                        <p className="mt-2.5 text-sm leading-relaxed text-mist">{d.d}</p>
                      </div>
                    ))}
                  </div>
                  {/* 服装业务的确定性承诺 */}
                  {s.promises.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2.5">
                      {s.promises.map((p) => (
                        <span
                          key={p}
                          className="inline-flex items-center gap-1.5 rounded-full border border-brand/25 bg-white px-3.5 py-1.5 text-xs font-medium text-brand"
                        >
                          <CheckIcon className="h-3.5 w-3.5" />
                          {p}
                        </span>
                      ))}
                    </div>
                  )}
                  <a
                    href={s.ctaMail}
                    className="mt-8 inline-flex w-fit items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-all hover:-translate-y-0.5 hover:bg-brand-deep"
                  >
                    {s.cta} <ArrowIcon />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================= 三、为什么选择博瑞伦特 ================= */
function Why() {
  const rows = [
    {
      dim: '需求匹配度',
      a: '只能套用固定模板，削足适履',
      b: '方案庞大冗杂，过度设计',
      c: '100% 围绕企业实际场景量身定制',
    },
    {
      dim: '合作与起订门槛',
      a: '看似低价，但隐性试错成本高',
      b: '动辄设定高额预算或千件起订门槛',
      c: '灵活起订，小批量试点与规模化大货皆可承接',
    },
    {
      dim: '响应与交付周期',
      a: '缺乏专业统筹，反复返工耗时',
      b: '层层审批排期，动辄数月起步',
      c: '资深团队直接驻点对接，周级敏捷推进',
    },
    {
      dim: '长期自主权',
      a: '毫无沉淀，下次还得重新找人',
      b: '形成技术或供应链依赖，被长期绑定',
      c: '完整移交技术文档或专属制衣档案，随时自主复用',
    },
  ]
  return (
    <section id="why" className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-brand/8 blur-[100px]" />
      <div className="relative mx-auto max-w-6xl px-5">
        <SectionTitle
          eyebrow="WHY BRALLENT"
          title="为什么选择博瑞伦特"
          desc="我们深知企业在进行定制采购时的核心考量：既要方案真正贴合业务、交付品质过硬，又希望沟通直接高效、合作门槛灵活可控。"
        />
        {/* 桌面端表格 */}
        <Reveal>
          <div className="hidden overflow-hidden rounded-3xl border border-line bg-white card-shadow md:block">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-page text-mist">
                  <th className="w-36 px-6 py-5 font-medium">对比维度</th>
                  <th className="px-6 py-5 font-medium">通用标准品 / 普通作坊</th>
                  <th className="px-6 py-5 font-medium">传统重型外包 / 大型代工厂</th>
                  <th className="bg-brand/5 px-6 py-5 font-semibold text-brand">博瑞伦特 BRALLENT</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.dim} className="border-t border-line/70">
                    <td className="px-6 py-5 font-semibold text-navy">{r.dim}</td>
                    <td className="px-6 py-5 text-mist">{r.a}</td>
                    <td className="px-6 py-5 text-mist">{r.b}</td>
                    <td className="bg-brand/5 px-6 py-5 font-medium text-navy">
                      <span className="flex items-start gap-2">
                        <span className="mt-0.5 shrink-0 text-brand">
                          <CheckIcon />
                        </span>
                        {r.c}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
        {/* 移动端卡片 */}
        <div className="space-y-4 md:hidden">
          {rows.map((r, i) => (
            <Reveal key={r.dim} delay={i * 80}>
              <div className="rounded-2xl border border-line bg-white p-5 card-shadow">
                <h4 className="font-semibold text-navy">{r.dim}</h4>
                <div className="mt-3 space-y-2.5">
                  <div className="rounded-xl bg-page px-4 py-3 text-sm text-mist">
                    <span className="mr-2 text-xs text-mist/60">标准品/作坊</span>
                    {r.a}
                  </div>
                  <div className="rounded-xl bg-page px-4 py-3 text-sm text-mist">
                    <span className="mr-2 text-xs text-mist/60">重型外包/大厂</span>
                    {r.b}
                  </div>
                  <div className="rounded-xl border border-brand/25 bg-sky-tint/70 px-4 py-3 text-sm font-medium text-navy">
                    <span className="mr-2 text-xs font-semibold text-brand">BRALLENT</span>
                    {r.c}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================= 四、五步定制交付体系 ================= */
function Framework() {
  const steps = [
    {
      no: '01',
      name: '需求诊断',
      en: 'Discover',
      action: '深入一线拆解真实需求',
      fde: '梳理业务流程瓶颈，明确核心功能边界与验收指标',
      apparel: '确认穿着场景、数量规模、预算区间、面料与工艺偏好',
    },
    {
      no: '02',
      name: '专属设计',
      en: 'Design',
      action: '输出一对一定制方案',
      fde: '出具系统架构方案、数据权限规划与开发排期',
      apparel: '专属设计顾问 1 对 1 免费出图，支持无限次修改至定稿',
    },
    {
      no: '03',
      name: '原型与打样',
      en: 'Prototype',
      action: '小步快跑确认交付质感',
      fde: 'FDE 工程师嵌入日常协作，部署首版可用模块并快速迭代',
      apparel: '支付 50% 定金启动实体打样，确认面料手感、色差与印花精度',
    },
    {
      no: '04',
      name: '严苛交付',
      en: 'Deliver',
      action: '全量测试与品控验收',
      fde: '完成真实业务压力测试与安全权限核验后正式上线',
      apparel: '批量生产、逐件全检包装，按指定时间与多地名单准时送达',
    },
    {
      no: '05',
      name: '长效沉淀',
      en: 'Sustain',
      action: '留存档案支持持续迭代',
      fde: '移交完整技术文档与运维手册，支持后续功能扩展',
      apparel: '留存企业专属色号、版型与设计档案，支持小批量快速补单',
    },
  ]
  return (
    <section id="framework" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle
          eyebrow="THE BRALLENT FRAMEWORK™"
          title="博瑞伦特五步定制交付体系"
          desc="无论交付形态是系统工程还是实体成衣，博瑞伦特始终以同一套高确定性的定制标准推进每一个项目。"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <Reveal key={s.no} delay={i * 80}>
              <div className="flex h-full flex-col rounded-2xl border border-line bg-page p-6 transition-all hover:-translate-y-1 hover:border-brand/40 hover:card-shadow">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-deep text-sm font-bold text-white shadow-lg shadow-brand/25">
                    {s.no}
                  </span>
                  <div>
                    <h3 className="font-semibold text-navy">{s.name}</h3>
                    <div className="text-[11px] tracking-wider text-mist">{s.en}</div>
                  </div>
                </div>
                <p className="mt-4 text-sm font-medium text-ink/85">{s.action}</p>
                <div className="mt-4 space-y-3 border-t border-line pt-4">
                  <div>
                    <div className="mb-1 inline-block rounded bg-brand/10 px-2 py-0.5 text-[11px] font-semibold text-brand">
                      FDE 标准
                    </div>
                    <p className="text-xs leading-relaxed text-mist">{s.fde}</p>
                  </div>
                  <div>
                    <div className="mb-1 inline-block rounded bg-navy/8 px-2 py-0.5 text-[11px] font-semibold text-navy-soft">
                      服装标准
                    </div>
                    <p className="text-xs leading-relaxed text-mist">{s.apparel}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================= 五、精选客户案例库 ================= */
type Case = {
  type: 'fde' | 'apparel'
  typeLabel: string
  title: string
  bg: string
  challenge: string
  solution: string[]
  impact: { num: string; label: string }[]
  quote: string
  author: string
}
const CASES: Case[] = [
  {
    type: 'fde',
    typeLabel: 'FDE 定制 · 跨境零售',
    title: '某跨境电商消费品牌：FDE 驻场定制自动化运营与商品管理工作流',
    bg: '一家主营海外独立站的高成长消费品牌，SKU 超过 1,500 个，运营团队精干高效，但大促期间多语言售前咨询与新品规格上架工作量激增，人手明显吃紧。',
    challenge:
      '市面上的通用工具无法读取企业实时库存与专属尺码规则，容易答错；人工整理多语言卖点与尺码转换表耗时极长。',
    solution: [
      '定制带业务规则护栏的售前智能响应流，精准匹配库存与定制参数',
      '开发多语言商品内容与尺码表一键生成工作流',
      '为 6 名运营骨干完成实战运维培训并移交完整技术文档',
    ],
    impact: [
      { num: '78%', label: '常见售前与尺码咨询实现系统自动精准响应' },
      { num: '4.5 倍', label: '新品全套多语言上架准备效率提升' },
      { num: '21 天', label: '从需求诊断到生产环境全量上线' },
    ],
    quote: '我们团队讲究实效，经不起几个月的试错。博瑞伦特的工程师第一周就摸透了我们的库存和定制规则，三周交出来的系统我们运营每天都在用。',
    author: '某跨境品牌运营总监',
  },
  {
    type: 'fde',
    typeLabel: 'FDE 定制 · B2B 专业服务',
    title: '某 B2B 专业服务机构：私有化企业知识检索与方案协同系统定制',
    bg: '一家处于快速扩张期的企业咨询与技术服务机构，历年积累了大量项目方案与行业资料，但分散在各部门网盘中，新人上手慢、顾问写方案重复劳动多。',
    challenge:
      '客户数据保密要求极高，且不同职级访问权限不同，市面上的通用检索软件无法满足精细化权限隔离与私有化部署要求。',
    solution: [
      'FDE 团队进驻客户技术与业务部门，量身定制私有化部署的分级权限知识检索与方案辅助系统',
      '打通历史项目库，建立严格的 RBAC 权限审计机制与结构化提案初稿生成流',
      '指导内部 IT 团队掌握日常维护',
    ],
    impact: [
      { num: '65%', label: '顾问与销售团队撰写定制方案的基础耗时缩短' },
      { num: '100%', label: '内部敏感资料实现私有域隔离与权限审计' },
      { num: '2 周', label: '新入职顾问独立输出标准业务方案周期缩短至 2 周' },
    ],
    quote: '相比单纯卖标准软件的厂商，博瑞伦特驻场理解业务、并且教会我们内部团队自己维护的模式，真正把技术变成了公司的核心资产。',
    author: '某服务机构业务合伙人',
  },
  {
    type: 'apparel',
    typeLabel: '企业服装定制 · 峰会与展会',
    title: '某前沿人工智能企业：280 套年度行业峰会与海外参展团队服饰定制',
    bg: '一家高速发展的 AI 软件公司筹备年度行业峰会及海外参展，需要为参展团队、技术演讲嘉宾及核心客户定制全套高质感服饰。',
    challenge:
      '订单量在 280 套左右，大型代工厂排期慢、门槛高，而普通印花店面料松垮、Logo 绣花粗糙，无法匹配公司的科技品牌调性。',
    solution: [
      '专属设计顾问极速响应：24 小时内输出 3 套视觉延展方案，历经 4 轮免费修改后 48 小时内寄出实物样衣',
      '高定级面料与双版型配置：280g 高支双纱纯棉文化衫（标准/宽松双版型）搭配防风机能冲锋衣，Logo 采用万针高密进口绣花',
      '全检品控准时交付：50% 定金锁单排产，逐件核验尺码与工艺细节，提前 2 天送达指定会场',
    ],
    impact: [
      { num: '280 套', label: '零瑕疵全检通过，提前 2 天准时交付' },
      { num: '98%', label: '会后员工日常主动穿着率（内部调研反馈）' },
      { num: '0 增项', label: '全程免费修改设计稿，预算 100% 透明可控' },
    ],
    quote: '以前两三百件的精品定制最难找供应商，大厂排期久、小店做不好。博瑞伦特从打样到大货的品控非常稳，连挑剔的设计总监都对刺绣质感赞不绝口。',
    author: '某 AI 软件企业品牌市场负责人',
  },
  {
    type: 'apparel',
    typeLabel: '企业服装定制 · 连锁零售制服',
    title: '某新消费连锁品牌：全季员工制服升级与新店小批量快反补单定制',
    bg: '一家处于区域扩张期的连锁消费品牌，原有员工制服版型偏硬、透气性差，且每月新开门店时的小批量补单周期极长。',
    challenge:
      '门店日常工作强度大，服装需兼顾耐磨耐洗与年轻化审美；同时新店开业每次仅需补单 15–30 件，传统供应商不愿配合小单快反。',
    solution: [
      '重塑夏季高透气珠地网眼 Polo 衫与秋冬重磅毛圈卫衣版型',
      '建立专属企业制衣档案（锁定标准色号、定制织唛与工艺参数）',
      '支持新店开业按需 15–30 件小批量快速补单直发门店',
    ],
    impact: [
      { num: '7 天', label: '新店开业 15–30 件小批量补单极速交付周期' },
      { num: '95%+', label: '一线门店员工对新版制服舒适度满意度' },
      { num: '0 色差', label: '跨批次、跨季度复购保持高度一致的成衣品质' },
    ],
    quote: '',
    author: '',
  },
]

function CaseCard({ c }: { c: Case }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white card-shadow">
      <div className="relative bg-gradient-to-br from-sky-tint to-white px-7 pb-6 pt-7">
        <span
          className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
            c.type === 'fde' ? 'bg-brand/10 text-brand' : 'bg-navy/8 text-navy-soft'
          }`}
        >
          {c.typeLabel}
        </span>
        <h3 className="mt-3 text-lg font-bold leading-snug text-navy">{c.title}</h3>
      </div>
      <div className="flex flex-1 flex-col gap-4 px-7 pb-7 pt-1">
        <div>
          <div className="text-xs font-semibold tracking-wider text-mist/70">客户背景</div>
          <p className="mt-1.5 text-sm leading-relaxed text-ink/80">{c.bg}</p>
        </div>
        <div>
          <div className="text-xs font-semibold tracking-wider text-mist/70">核心挑战</div>
          <p className="mt-1.5 rounded-xl bg-page px-4 py-3 text-sm leading-relaxed text-ink/80">{c.challenge}</p>
        </div>
        <div>
          <div className="text-xs font-semibold tracking-wider text-mist/70">博瑞伦特方案</div>
          <ul className="mt-2 space-y-2">
            {c.solution.map((s) => (
              <li key={s} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink/80">
                <span className="mt-0.5 shrink-0 text-brand">
                  <CheckIcon />
                </span>
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xs font-semibold tracking-wider text-mist/70">量化成果</div>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {c.impact.map((m) => (
              <div key={m.label} className="rounded-xl bg-gradient-to-b from-sky-tint to-white px-3 py-3 text-center ring-1 ring-line">
                <div className="text-lg font-bold text-brand">{m.num}</div>
                <div className="mt-1 text-[11px] leading-snug text-mist">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
        {c.quote && (
          <blockquote className="mt-auto border-l-[3px] border-brand/40 bg-page px-4 py-3 text-sm italic leading-relaxed text-navy-soft">
            "{c.quote}"
            <footer className="mt-1.5 text-right text-xs not-italic text-mist">—— {c.author}</footer>
          </blockquote>
        )}
      </div>
    </div>
  )
}

function Cases() {
  const [filter, setFilter] = useState<'all' | 'fde' | 'apparel'>('all')
  const tabs = [
    { key: 'all', label: '全部案例' },
    { key: 'fde', label: 'FDE 定制' },
    { key: 'apparel', label: '企业服装定制' },
  ] as const
  const shown = CASES.filter((c) => filter === 'all' || c.type === filter)
  return (
    <section id="cases" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle
          eyebrow="SELECTED CASE STUDIES"
          title="精选客户案例库"
          desc="每一项定制托付，最终都要接受真实业务与日常穿着的检验。浏览博瑞伦特在 FDE 定制与企业服装定制领域的部分代表性交付记录。"
        />
        {/* 筛选标签 */}
        <Reveal>
          <div className="mb-10 flex justify-center gap-2.5">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setFilter(t.key)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                  filter === t.key
                    ? 'bg-navy text-white shadow-lg shadow-navy/20'
                    : 'border border-line bg-white text-mist hover:border-brand/40 hover:text-brand'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-2">
          {shown.map((c, i) => (
            <Reveal key={c.title} delay={i * 80}>
              <CaseCard c={c} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================= 六、交付标准与品质保障 ================= */
function Standards() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle eyebrow="STANDARDS & ASSURANCE" title="交付标准与品质保障" />
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-line bg-page p-8 transition-all hover:border-brand/40 hover:card-shadow md:p-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-deep text-xl text-white shadow-lg shadow-brand/25">
                🛡️
              </div>
              <h3 className="mt-5 text-xl font-bold text-navy">FDE 工程交付与数据安全标准</h3>
              <p className="mt-3 text-sm leading-relaxed text-mist">
                支持企业私有化及专有云环境部署，严格遵循企业级角色权限隔离（RBAC）与数据脱敏规范；所有定制代码与架构文档产权归属清晰，交付即移交完整控制权。
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="h-full rounded-3xl border border-line bg-page p-8 transition-all hover:border-brand/40 hover:card-shadow md:p-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-navy to-navy-soft text-xl text-white shadow-lg shadow-navy/25">
                🧵
              </div>
              <h3 className="mt-5 text-xl font-bold text-navy">企业服装供应链与成衣品控标准</h3>
              <p className="mt-3 text-sm leading-relaxed text-mist">
                深度合作一线品牌代工级纺织印染与成衣制造基地，覆盖环保活性印染、高密万针刺绣、特种丝网印及环保包装全工艺链，所有贴身衣物均符合国家 A/B 类纺织品安全标准。
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ================= 七、FAQ ================= */
function FAQ() {
  const faqs = [
    {
      q: '博瑞伦特的核心定位是什么？',
      a: '博瑞伦特是一家企业定制服务专家，目前核心提供 FDE（前线部署工程）与企业服装定制两项定制业务。我们不做标准化现货售卖，所有交付均围绕客户的实际业务场景与品牌标准量身打造。',
    },
    {
      q: 'FDE 定制服务和传统软件外包公司有什么区别？',
      a: '传统外包是"你给需求文档，他们闭门开发，几个月后交给你一个未必贴合实际的系统"。博瑞伦特的 FDE 工程师直接嵌入你的业务一线，先做场景诊断，周级敏捷推进并随真实业务反馈快速迭代；同时在交付过程中手把手赋能你的内部团队，确保系统长期可用、可控。',
    },
    {
      q: '小单也能接吗？企业服装定制的起订量、改稿和付款流程是怎样的？',
      a: '小单完全可以接。我们支持从十余件到上千件的灵活起订，兼顾小团队精品定制、新店小批量补单与大型活动集采。确认合作意向后，专属设计顾问为您提供 1 对 1 免费视觉设计与效果图渲染，支持无限次修改直至您满意；方案定稿后仅需支付 50% 定金即可启动实体打样与排产。',
    },
    {
      q: '我们可以只合作其中一项业务吗？',
      a: '完全可以。FDE 与企业服装定制均由各自独立的资深专业团队负责，企业可以根据当前阶段的具体需求，单独委托其中任意一项定制服务。',
    },
  ]
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5">
        <SectionTitle eyebrow="FAQ" title="常见问题解答" />
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 60}>
              <div
                className={`overflow-hidden rounded-2xl border bg-white transition-all ${
                  open === i ? 'border-brand/40 card-shadow' : 'border-line'
                }`}
              >
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-semibold text-navy">{f.q}</span>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm transition-all ${
                      open === i ? 'rotate-45 bg-brand text-white' : 'bg-sky-tint text-brand'
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    open === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm leading-relaxed text-mist">{f.a}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================= 八、底部咨询与转化 ================= */
function Contact() {
  const cards = [
    {
      icon: '⚙️',
      title: '预约 FDE 定制咨询',
      desc: '1 对 1 梳理业务场景与定制可行性，获取专属工程部署建议',
      btn: '立即预约',
      href: mailto('【FDE 定制咨询】预约 1 对 1 沟通', '你好，我想预约 FDE 定制咨询：\n\n公司名称：\n业务场景简述：\n'),
    },
    {
      icon: '👕',
      title: '发起企业服装定制',
      desc: '发送品牌 Logo 与定制需求，24 小时内获取免费设计方案与阶梯报价',
      btn: '获取免费设计',
      href: mailto('【企业服装定制】获取免费设计方案', '你好，我想咨询企业服装定制：\n\n公司名称：\n定制场景：\n预估数量：\n'),
    },
  ]
  const infos = [
    { icon: '✉️', label: '企业邮箱', value: 'rose@brallent.cn' },
    { icon: '📱', label: '专属顾问电话 / 微信', value: '+86 15802439194（微信：bbly212）' },
    { icon: '📍', label: '公司地址', value: '北京市大兴区盛坊路 5 号院 6 号楼 1001-7' },
  ]
  return (
    <section id="contact" className="relative overflow-hidden py-20 md:py-28">
      <div className="glow-arc absolute inset-x-0 bottom-0 h-[380px]" />
      <div className="relative mx-auto max-w-6xl px-5">
        <SectionTitle
          eyebrow="CONTACT US"
          title={<>准备好启动你的专属企业定制项目了吗？</>}
          desc="无论是希望通过 FDE 深度定制贴合业务的系统工作流，还是筹备下一阶段的高质感企业服装定制，博瑞伦特团队已准备就绪。"
        />
        <div className="grid gap-6 md:grid-cols-2">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 100}>
              <div className="flex h-full flex-col rounded-3xl border border-line bg-white p-8 card-shadow md:p-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-tint to-brand/10 text-2xl">
                  {c.icon}
                </div>
                <h3 className="mt-5 text-xl font-bold text-navy">{c.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-mist">{c.desc}</p>
                <a
                  href={c.href}
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-all hover:-translate-y-0.5 hover:bg-brand-deep"
                >
                  {c.btn} <ArrowIcon />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
        {/* 联系信息 */}
        <Reveal delay={200}>
          <div className="mt-10 overflow-hidden rounded-3xl bg-gradient-to-br from-navy to-brand-deep p-8 text-white md:p-10">
            <div className="grid-bg absolute inset-0 opacity-15" />
            <div className="relative grid gap-6 md:grid-cols-3">
              {infos.map((it) => (
                <div key={it.label} className="flex items-start gap-4">
                  <span className="glass flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-lg">
                    {it.icon}
                  </span>
                  <div>
                    <div className="text-xs text-white/60">{it.label}</div>
                    <div className="mt-1 text-[15px] font-semibold">{it.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ================= 数据带 + 页脚 ================= */
function Footer() {
  const stats = [
    { num: '96%+', label: '按期高标准交付率' },
    { num: '2–4 周', label: '敏捷落地周期' },
    { num: '1 对 1', label: '专属顾问直接对接' },
    { num: '50+', label: '深度服务企业客户' },
    { num: '5 步', label: '标准定制交付体系' },
  ]
  return (
    <footer className="relative overflow-hidden">
      <div className="bg-gradient-to-r from-brand-deep via-brand to-brand-deep py-10 text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 text-center sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-bold md:text-3xl">{s.num}</div>
              <div className="mt-1 text-xs text-white/75">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-navy pb-10 pt-14 text-white/70">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <div className="glass inline-flex rounded-xl p-3">
                <img src={logoUrl} alt="博瑞伦特 BRALLENT" className="h-8 w-auto" />
              </div>
              <p className="mt-4 max-w-xs text-sm leading-relaxed">
                博瑞伦特 BRALLENT · 企业定制服务专家。以 FDE 前线部署工程与企业服装定制双业务线，为成长型企业提供从构想到落地的深度定制服务。
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white">快速导航</h4>
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                {[
                  { href: '#services', label: '核心定制业务' },
                  { href: '#why', label: '为什么选我们' },
                  { href: '#framework', label: '五步交付体系' },
                  { href: '#cases', label: '精选客户案例' },
                  { href: '#faq', label: '常见问题' },
                  { href: '#contact', label: '联系我们' },
                ].map((l) => (
                  <a key={l.href} href={l.href} className="transition-colors hover:text-white">
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white">联系博瑞伦特</h4>
              <div className="mt-4 space-y-2 text-sm">
                <p>企业邮箱：rose@brallent.cn</p>
                <p>顾问电话 / 微信：+86 15802439194</p>
                <p>公司地址：北京市大兴区盛坊路 5 号院 6 号楼 1001-7</p>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/50">
            © {new Date().getFullYear()} 博瑞伦特 BRALLENT. All rights reserved. 企业定制服务专家 · 品质交付
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ================= 页面组装 ================= */
export default function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <Services />
        <Why />
        <Framework />
        <Cases />
        <Standards />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
