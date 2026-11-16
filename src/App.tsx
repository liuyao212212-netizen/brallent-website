import { useEffect, useState } from 'react'
import { HashRouter, Routes, Route, useNavigate, useLocation, Link } from 'react-router-dom'
import logoUrl from './assets/Brallent_Logo.svg'
import { scrollToId } from './ui'
import Home from './pages/Home'
import Fde from './pages/Fde'
import Apparel from './pages/Apparel'

/* ================= 路由变化自动回顶 ================= */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

/* ================= 导航 ================= */
function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goAnchor = (anchor: string) => {
    setOpen(false)
    if (pathname !== '/') {
      navigate('/')
      setTimeout(() => scrollToId(anchor), 150)
    } else {
      scrollToId(anchor)
    }
  }

  const links = [
    { to: '/', label: '首页' },
    { to: '/fde', label: 'FDE 定制' },
    { to: '/apparel', label: '企业服装定制' },
  ]

  const linkCls = (to: string) =>
    `text-[15px] font-medium transition-colors duration-200 ${
      pathname === to ? 'text-brand' : 'text-ink/75 hover:text-brand'
    }`

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-page/85 backdrop-blur transition-shadow duration-200 ${
        scrolled ? 'border-b border-line shadow-sm' : ''
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-5 md:h-[72px] md:px-6">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <img src={logoUrl} alt="博瑞伦特 BRALLENT" className="h-9 w-auto" />
        </Link>
        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className={linkCls(l.to)}>
              {l.label}
            </Link>
          ))}
          <button onClick={() => goAnchor('about')} className="text-[15px] font-medium text-ink/75 transition-colors duration-200 hover:text-brand">
            关于我们
          </button>
          <button
            onClick={() => goAnchor('contact')}
            className="rounded-lg bg-brand px-5 py-2.5 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-brand-deep"
          >
            联系顾问
          </button>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-navy lg:hidden"
          aria-label="菜单"
          aria-expanded={open}
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
        <div className="border-t border-line bg-page lg:hidden">
          <div className="flex flex-col px-5 py-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`border-b border-line/70 py-3.5 text-[15px] font-medium ${pathname === l.to ? 'text-brand' : 'text-ink'}`}
              >
                {l.label}
              </Link>
            ))}
            <button onClick={() => goAnchor('about')} className="border-b border-line/70 py-3.5 text-left text-[15px] font-medium text-ink">
              关于我们
            </button>
            <button
              onClick={() => goAnchor('contact')}
              className="my-3 rounded-lg bg-brand py-3 text-center font-semibold text-white transition-colors duration-200 hover:bg-brand-deep"
            >
              联系顾问
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

/* ================= 页脚 ================= */
function Footer() {
  return (
    <footer className="border-t border-line bg-navy pt-14 text-white/70">
      <div className="mx-auto max-w-[1180px] px-5 md:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="inline-flex rounded-lg bg-white/95 p-3">
              <img src={logoUrl} alt="博瑞伦特 BRALLENT" className="h-8 w-auto" />
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              博瑞伦特 BRALLENT · 企业定制服务专家。围绕业务效率与品牌形象，提供 FDE 定制与企业服装定制两项独立服务。
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">站点导航</h4>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <Link to="/" className="transition-colors duration-200 hover:text-white">首页</Link>
              <Link to="/fde" className="transition-colors duration-200 hover:text-white">FDE 定制</Link>
              <Link to="/apparel" className="transition-colors duration-200 hover:text-white">企业服装定制</Link>
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
        <div className="mt-12 border-t border-white/10 py-6 text-center text-xs text-white/50">
          © {new Date().getFullYear()} 博瑞伦特 BRALLENT. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

/* ================= 路由组装 ================= */
export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="min-h-screen">
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fde" element={<Fde />} />
            <Route path="/apparel" element={<Apparel />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  )
}
