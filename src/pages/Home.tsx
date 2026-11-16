import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Reveal, SectionTitle, FaqList, mailto, scrollToId } from '../ui'
import { HeroArt, ServiceField } from '../LightField'

/* ================= 首屏（演示页结构） ================= */
function Hero({ paused, onToggle }: { paused: boolean; onToggle: () => void }) {
  return (
    <section className="hero">
      <div className="hero-top">
        <p className="eyebrow">
          <span className="small-mark" aria-hidden="true" />
          博瑞伦特 BRALLENT · 企业定制服务专家
        </p>
        <h1>
          从专属构想到高标落地，
          <br />
          做懂企业的<span className="accent">定制伙伴。</span>
        </h1>
        <p className="hero-description">
          深入企业真实场景，提供一对一专属设计与全流程品控交付。
          <br />
          FDE 系统与工作流定制 · 企业服装定制
        </p>
        <div className="hero-actions">
          <button className="button dark" onClick={() => scrollToId('services')}>
            了解我们的服务
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </button>
          <a
            className="text-link"
            href={mailto('【官网咨询】企业定制服务', '你好，我想咨询博瑞伦特的企业定制服务：\n\n公司名称：\n需求方向（FDE 定制 / 企业服装定制 / 暂不确定）：\n需求简述：\n')}
          >
            直接联系顾问
            <span className="arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>
      </div>

      <HeroArt paused={paused} />

      <div className="art-caption">LIGHT FIELD · 实时生成的流动光场</div>
      <button className="motion-control" onClick={onToggle} aria-pressed={paused}>
        {paused ? '播放动效' : '暂停动效'}
      </button>

      <div className="hero-bottom">
        <div className="wrap">
          <span className="brand-note">BRALLENT — 企业定制服务</span>
          <nav className="business-shortcuts" aria-label="业务快捷入口">
            <Link to="/fde">
              FDE 定制<span>业务效率</span>
            </Link>
            <Link to="/apparel">
              企业服装定制<span>品牌形象</span>
            </Link>
          </nav>
          <button className="scroll-hint" onClick={() => scrollToId('services')}>
            向下滚动
            <i aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  )
}

/* ================= 两项业务（Canvas 场线卡片） ================= */
function Services() {
  return (
    <section id="services" className="section services">
      <div className="wrap">
        <div className="section-heading">
          <div>
            <p className="eyebrow">TWO BUSINESSES</p>
            <h2>
              两项业务，
              <br />
              各自深耕。
            </h2>
          </div>
          <p>两项业务各自独立，可按需单独委托，分别由专属团队负责。</p>
        </div>
        <div className="services-grid">
          <Reveal>
            <Link to="/fde" className="service">
              <div className="service-visual">
                <ServiceField type="digital" />
                <span className="service-mark">WORKFLOW / FIELD</span>
              </div>
              <div className="service-title">
                <div className="service-index">01 — FDE 前线部署工程</div>
                <h3>FDE 定制</h3>
                <p>从业务诊断到系统落地，打造贴合实际流程的工作流与知识系统，让工具真正服务于人。</p>
                <div className="service-tags">
                  <span>业务诊断</span>
                  <span>系统与工作流</span>
                  <span>知识资产</span>
                </div>
                <div className="service-link">
                  了解 FDE 服务
                  <span className="arrow" aria-hidden="true">
                    →
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
          <Reveal delay={100}>
            <Link to="/apparel" className="service">
              <div className="service-visual">
                <ServiceField type="fabric" />
                <div className="apparel-wordmark" aria-hidden="true">
                  <strong>BRALLENT</strong>
                  <small>CUSTOM APPAREL</small>
                </div>
                <span className="service-mark apparel">APPAREL / FIELD</span>
              </div>
              <div className="service-title">
                <div className="service-index">02 — 企业服装定制</div>
                <h3>企业服装定制</h3>
                <p>从专属设计到成衣交付，为团队、展会与商务礼赠定制服饰，让品牌形象穿得出来。</p>
                <div className="service-tags">
                  <span>文化衫与制服</span>
                  <span>活动服饰</span>
                  <span>礼赠套装</span>
                </div>
                <div className="service-link">
                  了解服装定制
                  <span className="arrow" aria-hidden="true">
                    →
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
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
      <div className="mx-auto w-[min(1240px,calc(100%-40px))] py-16 md:w-[min(1240px,calc(100%-100px))] md:py-24">
        <SectionTitle eyebrow="NUMBERS" title="博瑞伦特在数字里" desc="以下数据均为已完成项目的统计口径，如实呈现，不做夸大。" />
        <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 60}>
              <div className="border-l-2 border-brand/40 pl-5">
                <div className="text-[2.1rem] font-medium tracking-[-1.5px] text-navy md:text-[2.5rem]">{s.num}</div>
                <div className="mt-2.5 text-[13px] font-medium leading-snug text-ink">{s.label}</div>
                <div className="mt-1.5 text-[11.5px] text-mist/80">{s.note}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================= 关于我们 + 联系信息 ================= */
function About() {
  return (
    <section id="about" className="about">
      <div className="wrap">
        <div className="about-grid">
          <Reveal>
            <div>
              <p className="eyebrow">ABOUT BRALLENT</p>
              <h2>
                深入一线，
                <br />
                交付真正可用的定制成果。
              </h2>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="about-copy">
              <p>
                <strong>博瑞伦特（BRALLENT）是一家企业定制服务提供商</strong>，围绕「业务效率」与「品牌形象」两个方向，提供两项独立且深度定制的服务：FDE
                前线部署工程与企业服装定制。
              </p>
              <p>
                我们相信，好的定制不靠模板，靠一线。无论是工程师驻场理解业务，还是设计顾问逐稿打磨服饰细节，博瑞伦特始终坚持深入客户的真实场景，交付真正可用、可持续的成果。
              </p>
              <p>
                企业邮箱：<strong>rose@brallent.cn</strong>
                <br />
                顾问电话 / 微信：<strong>+86 15802439194（bbly212）</strong>
                <br />
                公司地址：<strong>北京市大兴区盛坊路 5 号院 6 号楼 1001-7</strong>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ================= 公司级 FAQ ================= */
function CompanyFaq() {
  const items = [
    {
      q: '博瑞伦特的核心定位是什么？',
      a: '博瑞伦特是一家企业定制服务专家，目前核心提供 FDE（前线部署工程）与企业服装定制两项定制业务。我们不做标准化现货售卖，所有交付均围绕客户的实际业务场景与品牌标准量身打造。',
    },
    {
      q: '我们可以只合作其中一项业务吗？',
      a: '完全可以。FDE 与企业服装定制均由各自独立的资深专业团队负责，企业可以根据当前阶段的具体需求，单独委托其中任意一项定制服务。',
    },
  ]
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto w-[min(1240px,calc(100%-40px))] md:w-[min(1240px,calc(100%-100px))]">
        <SectionTitle eyebrow="FAQ" title="常见问题" desc="关于合作方式与业务范围的常见疑问。" />
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <FaqList items={items} />
          </Reveal>
          <p className="mt-7 text-center text-[12px] text-mist">
            各业务的专业问题，可在{' '}
            <Link to="/fde" className="font-medium text-brand hover:underline">
              FDE 定制
            </Link>{' '}
            与{' '}
            <Link to="/apparel" className="font-medium text-brand hover:underline">
              企业服装定制
            </Link>{' '}
            页面查看对应 FAQ。
          </p>
        </div>
      </div>
    </section>
  )
}

/* ================= 联系 CTA（演示页风格） ================= */
function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="contact-glow" aria-hidden="true" />
      <div className="wrap">
        <div className="contact-content">
          <Reveal>
            <div>
              <p className="eyebrow">CONTACT</p>
              <h2>准备好启动你的专属定制项目了吗？</h2>
              <p>告诉我们你的需求，专属顾问将在 1 个工作日内与你联系。</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="contact-actions">
              <a
                className="button white"
                href={mailto('【官网咨询】企业定制服务', '你好，我想咨询博瑞伦特的企业定制服务：\n\n公司名称：\n需求方向（FDE 定制 / 企业服装定制 / 暂不确定）：\n需求简述：\n')}
              >
                联系顾问
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </a>
              <a className="contact-mail" href="mailto:rose@brallent.cn">
                rose@brallent.cn
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ================= 页面组装 ================= */
export default function Home() {
  const [paused, setPaused] = useState(false)
  return (
    <div className={paused ? 'motion-paused' : ''}>
      <Hero paused={paused} onToggle={() => setPaused((p) => !p)} />
      <Services />
      <Stats />
      <About />
      <CompanyFaq />
      <Contact />
    </div>
  )
}
