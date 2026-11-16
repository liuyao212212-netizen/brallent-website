import { CASES } from '../data'
import { Reveal, SectionTitle, PageHero, Icon, FaqList, CaseItem, ContactCta, scrollToId, mailto } from '../ui'

const APPAREL_MAIL = {
  subject: '【企业服装定制】获取免费设计方案',
  body: '你好，我想咨询企业服装定制：\n\n公司名称：\n定制场景（日常/展会/礼赠）：\n预估数量：\n',
}

/* ================= 承诺条 ================= */
function Promises() {
  const items = ['免费设计 · 无限次修改', '50% 定金 · 打样确认后排产', '灵活起订 · 逐件全检']
  return (
    <div className="border-y border-line bg-white">
      <div className="mx-auto flex w-[min(1240px,calc(100%-40px))] flex-wrap items-center justify-center gap-x-10 gap-y-4 py-6 md:w-[min(1240px,calc(100%-100px))]">
        {items.map((p) => (
          <div key={p} className="flex items-center gap-2 text-[13px] font-medium text-navy">
            <span className="text-brand">
              <Icon name="shield" className="h-4 w-4" />
            </span>
            {p}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ================= 应用场景（图片位待 Rose 提供实物图） ================= */
function Scenes() {
  const scenes = [
    {
      icon: 'shirt',
      title: '团队文化衫与制服',
      desc: '高克重精梳棉、科技速干、商务珠地网眼及重磅卫衣/冲锋衣面料，标准与宽松双版型体系。',
    },
    {
      icon: 'flag',
      title: '展会与品牌活动',
      desc: '围绕活动主视觉系统化延展设计，让参展与主办团队拥有统一、出众的专业辨识度。',
    },
    {
      icon: 'gift',
      title: '入职与商务礼赠',
      desc: '支持专属织唛、品牌吊牌、万针刺绣与礼盒包装，强化归属感与礼赠记忆点。',
    },
  ]
  return (
    <section className="border-t border-line">
      <div className="mx-auto w-[min(1240px,calc(100%-40px))] py-16 md:w-[min(1240px,calc(100%-100px))] md:py-24">
        <SectionTitle eyebrow="SCENARIOS" title="应用场景" desc="三组典型场景，均享受同等严苛的版型与品控标准。" />
        <div className="grid gap-10 md:grid-cols-3">
          {scenes.map((s, i) => (
            <Reveal key={s.title} delay={i * 80}>
              <div>
                {/* 图片位：待 Rose 提供实物图后替换 */}
                <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[22px] bg-[linear-gradient(130deg,#f4f9ff,#e6f2ff_55%,#d5eaff)]">
                  <span className="text-[10px] tracking-[2px] text-[#7d90ad]">IMAGE PENDING</span>
                  <span className="absolute left-6 top-5 text-[9px] tracking-[2px] text-[#8a9bb5]">0{i + 1} / CASE</span>
                </div>
                <div className="mt-5 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f4f9ff] text-brand">
                    <Icon name={s.icon} className="h-4 w-4" />
                  </span>
                  <h3 className="text-[15px] font-medium text-navy">{s.title}</h3>
                </div>
                <p className="mt-2.5 text-[13px] leading-[1.9] text-mist">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================= 服装定制流程 ================= */
function Process() {
  const steps = [
    { no: '01', name: '确认需求', desc: '确认数量、预算、面料与工艺。' },
    { no: '02', name: '免费设计', desc: '1 对 1 出图，无限次修改至定稿。' },
    { no: '03', name: '付定金与打样', desc: '定稿后支付 50% 定金，启动打样。' },
    { no: '04', name: '生产与质检', desc: '样衣确认后排产，成衣逐件全检。' },
    { no: '05', name: '发货与补单', desc: '按约定交付，留档支持后续补单。' },
  ]
  return (
    <section className="border-t border-line bg-white">
      <div className="mx-auto w-[min(1240px,calc(100%-40px))] py-16 md:w-[min(1240px,calc(100%-100px))] md:py-24">
        <SectionTitle eyebrow="PROCESS" title="定制流程" desc="付款、打样与排产顺序按真实业务流程排列，每一步透明可查。" />
        <ol className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <Reveal key={s.no} delay={i * 60}>
              <li className="border-l border-[#cbdff1] pl-5">
                <div className="text-[11px] font-medium tracking-[1.6px] text-brand">{s.no}</div>
                <h3 className="mt-2 text-[15px] font-medium text-navy">{s.name}</h3>
                <p className="mt-1.5 text-[12.5px] leading-[1.85] text-mist">{s.desc}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ================= 品控与档案 ================= */
function Quality() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto w-[min(1240px,calc(100%-40px))] py-16 md:w-[min(1240px,calc(100%-100px))] md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionTitle align="left" eyebrow="QUALITY" title="供应链与品控标准" />
            <Reveal>
              <p className="text-[13.5px] leading-[1.95] text-mist">
                深度合作一线品牌代工级纺织印染与成衣制造基地，覆盖环保活性印染、高密万针刺绣、特种丝网印及环保包装全工艺链，所有贴身衣物均符合国家 A/B 类纺织品安全标准。
              </p>
            </Reveal>
          </div>
          <div>
            <SectionTitle align="left" eyebrow="ARCHIVE" title="专属制衣档案" />
            <Reveal>
              <p className="text-[13.5px] leading-[1.95] text-mist">
                为每位客户锁定品牌标准色号、版型数据与工艺参数，建立专属企业制衣档案——后续新员工入职或季度小批量补单无需从头沟通，实现极速快反。
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ================= 页面组装 ================= */
export default function Apparel() {
  const cases = CASES.filter((c) => c.type === 'apparel')
  const faq = [
    {
      q: '小单也能接吗？起订量、改稿和付款流程是怎样的？',
      a: '小单完全可以接。我们支持从十余件到上千件的灵活起订，兼顾小团队精品定制、新店小批量补单与大型活动集采。确认合作意向后，专属设计顾问为您提供 1 对 1 免费视觉设计与效果图渲染，支持无限次修改直至您满意；方案定稿后仅需支付 50% 定金即可启动实体打样与排产。',
    },
    {
      q: '从沟通需求到收到成衣，一般需要多久？',
      a: '确认需求后 24 小时内可获得免费设计方案与阶梯报价；方案定稿、支付 50% 定金后启动打样，样衣确认无误再排产，成衣逐件全检后按约定时间与收货名单发货。具体周期以订单规模与工艺为准，顾问会在方案阶段给出明确排期。',
    },
    {
      q: '后续想补单或者加新员工尺码怎么办？',
      a: '我们为每位客户建立专属企业制衣档案，锁定品牌标准色号、版型数据与工艺参数。后续补单无需重新沟通设计，支持小批量快反直发指定地点。',
    },
  ]
  return (
    <>
      <PageHero
        eyebrow="企业服装定制"
        title={'让团队的品牌形象，\n穿得出来。'}
        desc="为团队、展会与商务礼赠，提供从专属设计到成衣交付的服装定制服务。"
        primary={{ label: '获取免费设计', href: mailto(APPAREL_MAIL.subject, APPAREL_MAIL.body) }}
        secondary={{ label: '查看服装案例', onClick: () => scrollToId('apparel-cases') }}
      />
      <Promises />
      <Scenes />
      <Process />
      <section id="apparel-cases" className="border-t border-line">
        <div className="mx-auto w-[min(1240px,calc(100%-40px))] py-16 md:w-[min(1240px,calc(100%-100px))] md:py-24">
          <SectionTitle eyebrow="CASES" title="服装定制案例" desc="两项代表性交付记录，点击查看包含背景、挑战、方案与全部数据的完整案例。" />
          <div className="border-t border-line">
            {cases.map((c, i) => (
              <CaseItem key={c.title} c={c} last={i === cases.length - 1} />
            ))}
          </div>
        </div>
      </section>
      <Quality />
      <section className="border-t border-line bg-white">
        <div className="mx-auto w-[min(1240px,calc(100%-40px))] py-16 md:w-[min(1240px,calc(100%-100px))] md:py-24">
          <div className="mx-auto max-w-3xl">
            <SectionTitle eyebrow="FAQ" title="常见问题" />
            <Reveal>
              <FaqList items={faq} />
            </Reveal>
          </div>
        </div>
      </section>
      <ContactCta
        title="获取服装定制方案与免费设计"
        desc="发送品牌 Logo 与定制需求，24 小时内获取免费设计方案与阶梯报价。"
        btnLabel="获取免费设计"
        mailSubject={APPAREL_MAIL.subject}
        mailBody={APPAREL_MAIL.body}
      />
    </>
  )
}
