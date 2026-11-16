import { useEffect, useRef, useState } from 'react'
import type { Case } from './data'

/* ================= 工具 ================= */
export const mailto = (subject: string, body = '') =>
  `mailto:rose@brallent.cn?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

export const scrollToId = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/* ================= 一次性轻入场 ================= */
export function Reveal({
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

/* ================= 线性图标 ================= */
export function Icon({ name, className = 'h-5 w-5' }: { name: string; className?: string }) {
  const paths: Record<string, React.ReactNode> = {
    target: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="12" cy="12" r="0.8" />
      </>
    ),
    layers: <path d="m12 2 8.5 4.5L12 11 3.5 6.5 12 2zM3.5 11.5 12 16l8.5-4.5M3.5 16.5 12 21l8.5-4.5" />,
    book: (
      <>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z" />
        <path d="M8 7h8" />
      </>
    ),
    users: (
      <>
        <circle cx="9" cy="8" r="3.5" />
        <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
        <path d="M16 4.5a3.5 3.5 0 0 1 0 7M21 20c0-2.8-1.9-5.1-4.5-5.8" />
      </>
    ),
    shirt: (
      <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
    ),
    flag: <path d="M5 22V3M5 4h13l-2.5 4L18 12H5" />,
    gift: (
      <>
        <path d="M20 12v10H4V12M2 7h20v5H2zM12 22V7" />
        <path d="M12 7s-1.5-5-4.5-5S5 6 7.5 7 12 7 12 7zM12 7s1.5-5 4.5-5S19 6 16.5 7 12 7 12 7z" />
      </>
    ),
    shield: <path d="M12 22s8-3 8-10V6l-8-3-8 3v6c0 7 8 10 8 10zM9 11.5l2 2 4-4" />,
    code: <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" />,
    mail: <path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm0 1.5 8 5.5 8-5.5" />,
    phone: (
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.13.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.45c.9.34 1.84.57 2.8.7A2 2 0 0 1 22 16.9z" />
    ),
    pin: <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />,
    archive: (
      <>
        <path d="M3 3h18v5H3zM5 8v11a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8" />
        <path d="M10 12h4" />
      </>
    ),
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

export function CheckIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path d="M4 10.5l4 4 8-9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ================= 区块标题（靠字重字号建层级） ================= */
export function SectionTitle({ title, desc, align = 'center' }: { title: string; desc?: string; align?: 'center' | 'left' }) {
  return (
    <div className={align === 'center' ? 'mx-auto mb-12 max-w-2xl text-center md:mb-16' : 'mb-12 max-w-2xl md:mb-16'}>
      <Reveal>
        <h2 className="text-[1.65rem] font-bold leading-snug tracking-tight text-navy md:text-4xl">{title}</h2>
      </Reveal>
      {desc && (
        <Reveal delay={100}>
          <p className="mt-4 leading-relaxed text-mist">{desc}</p>
        </Reveal>
      )}
    </div>
  )
}

/* ================= 页级首屏 ================= */
export function PageHero({
  eyebrow,
  title,
  desc,
  primary,
  secondary,
}: {
  eyebrow?: string
  title: string
  desc: string
  primary?: { label: string; onClick?: () => void; href?: string }
  secondary?: { label: string; onClick?: () => void; href?: string }
}) {
  const btnCls =
    'inline-flex items-center justify-center rounded-lg px-6 py-3 text-[15px] font-semibold transition-colors duration-200'
  return (
    <div className="mx-auto max-w-[1180px] px-5 pb-16 pt-32 md:px-6 md:pb-24 md:pt-44">
      {eyebrow && (
        <Reveal>
          <p className="text-sm font-semibold tracking-widest text-brand">{eyebrow}</p>
        </Reveal>
      )}
      <Reveal delay={60}>
        <h1 className="mt-4 max-w-3xl whitespace-pre-line text-[2rem] font-bold leading-[1.3] tracking-tight text-navy md:text-6xl md:leading-[1.22]">
          {title}
        </h1>
      </Reveal>
      <Reveal delay={120}>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-mist md:text-lg">{desc}</p>
      </Reveal>
      {(primary || secondary) && (
        <Reveal delay={180}>
          <div className="mt-9 flex flex-wrap gap-3">
            {primary &&
              (primary.href ? (
                <a href={primary.href} className={`${btnCls} bg-brand text-white hover:bg-brand-deep`}>
                  {primary.label}
                </a>
              ) : (
                <button onClick={primary.onClick} className={`${btnCls} bg-brand text-white hover:bg-brand-deep`}>
                  {primary.label}
                </button>
              ))}
            {secondary &&
              (secondary.href ? (
                <a href={secondary.href} className={`${btnCls} border border-navy/15 text-navy hover:border-brand/50 hover:text-brand`}>
                  {secondary.label}
                </a>
              ) : (
                <button onClick={secondary.onClick} className={`${btnCls} border border-navy/15 text-navy hover:border-brand/50 hover:text-brand`}>
                  {secondary.label}
                </button>
              ))}
          </div>
        </Reveal>
      )}
    </div>
  )
}

/* ================= FAQ 折叠问答 ================= */
export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(-1)
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((f, i) => (
        <div key={f.q}>
          <button
            onClick={() => setOpen(open === i ? -1 : i)}
            className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors duration-200 hover:text-brand"
            aria-expanded={open === i}
          >
            <span className="font-semibold text-navy">{f.q}</span>
            <span className={`shrink-0 text-lg text-mist transition-transform duration-200 ${open === i ? 'rotate-45' : ''}`} aria-hidden="true">
              +
            </span>
          </button>
          <div className={`grid transition-all duration-200 ${open === i ? 'grid-rows-[1fr] pb-5 opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
            <div className="overflow-hidden">
              <p className="text-[15px] leading-relaxed text-mist">{f.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ================= 案例：摘要 + 可展开完整版 ================= */
export function CaseItem({ c, last = false }: { c: Case; last?: boolean }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`border-line ${last ? 'border-b-0' : 'border-b'} py-9 md:py-11`}>
      <Reveal>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold tracking-wider text-brand">{c.typeLabel}</span>
            <h3 className="mt-2 text-xl font-bold text-navy md:text-2xl">{c.shortTitle}</h3>
            <p className="mt-2.5 leading-relaxed text-mist">{c.summary}</p>
          </div>
          <div className="flex shrink-0 gap-8">
            {c.keyImpact.map((m) => (
              <div key={m.label}>
                <div className="text-2xl font-bold text-navy md:text-[1.75rem]">{m.num}</div>
                <div className="mt-1 max-w-[150px] text-xs leading-snug text-mist">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors duration-200 hover:text-brand-deep"
          aria-expanded={open}
        >
          {open ? '收起完整案例' : '查看完整案例'}
          <svg viewBox="0 0 20 20" fill="none" className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} aria-hidden="true">
            <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </Reveal>
      {open && (
        <div className="mt-8 grid gap-8 rounded-none border-t border-line pt-8 md:grid-cols-2">
          <div className="space-y-5">
            <div>
              <div className="text-xs font-semibold tracking-wider text-mist/70">客户背景</div>
              <p className="mt-1.5 text-[15px] leading-relaxed text-ink/85">{c.bg}</p>
            </div>
            <div>
              <div className="text-xs font-semibold tracking-wider text-mist/70">核心挑战</div>
              <p className="mt-1.5 text-[15px] leading-relaxed text-ink/85">{c.challenge}</p>
            </div>
            <div>
              <div className="text-xs font-semibold tracking-wider text-mist/70">博瑞伦特方案</div>
              <ul className="mt-2 space-y-2">
                {c.solution.map((s) => (
                  <li key={s} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-ink/85">
                    <span className="mt-1 shrink-0 text-brand">
                      <CheckIcon />
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="space-y-5">
            <div>
              <div className="text-xs font-semibold tracking-wider text-mist/70">量化成果</div>
              <ul className="mt-2 space-y-2.5">
                {c.impact.map((m) => (
                  <li key={m.label} className="flex items-baseline gap-3 text-[15px]">
                    <span className="shrink-0 font-bold text-brand">{m.num}</span>
                    <span className="text-ink/85">{m.label}</span>
                  </li>
                ))}
              </ul>
            </div>
            {c.quote && (
              <blockquote className="border-l-2 border-brand/50 pl-4 text-[15px] italic leading-relaxed text-ink/80">
                "{c.quote}"
                <footer className="mt-1.5 text-xs not-italic text-mist">—— {c.author}</footer>
              </blockquote>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

/* ================= 页面底部业务咨询 CTA ================= */
export function ContactCta({
  title,
  desc,
  btnLabel,
  mailSubject,
  mailBody,
}: {
  title: string
  desc: string
  btnLabel: string
  mailSubject: string
  mailBody: string
}) {
  return (
    <div className="border-t border-line bg-white">
      <div className="mx-auto max-w-[1180px] px-5 py-20 md:px-6 md:py-24">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Reveal>
              <h2 className="max-w-xl text-2xl font-bold leading-snug text-navy md:text-3xl">{title}</h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-3 max-w-lg leading-relaxed text-mist">{desc}</p>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <a
              href={mailto(mailSubject, mailBody)}
              className="inline-flex shrink-0 items-center justify-center rounded-lg bg-brand px-7 py-3.5 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-brand-deep"
            >
              {btnLabel}
            </a>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
