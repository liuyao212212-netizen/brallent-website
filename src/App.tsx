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

/* ================= 阅读进度条 ================= */
function ReadingProgress() {
  const [w, setW] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setW(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
  return <div className="reading-progress" style={{ width: `${w}%` }} aria-hidden="true" />
}

/* ================= 导航 ================= */
function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
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

  return (
    <header className={`header${scrolled ? ' scrolled' : ''}`}>
      <nav className="nav wrap">
        <Link to="/" className="brand" onClick={() => setOpen(false)} aria-label="博瑞伦特首页">
          <img src={logoUrl} alt="博瑞伦特 BRALLENT" />
          <span className="brand-label">
            博瑞伦特
            <br />
            企业定制服务专家
          </span>
        </Link>
        <div className={`nav-links${open ? ' open' : ''}`}>
          <Link to="/" className={pathname === '/' ? 'active' : ''} onClick={() => setOpen(false)}>
            首页
          </Link>
          <Link to="/fde" className={pathname === '/fde' ? 'active' : ''} onClick={() => setOpen(false)}>
            FDE 定制
          </Link>
          <Link to="/apparel" className={pathname === '/apparel' ? 'active' : ''} onClick={() => setOpen(false)}>
            企业服装定制
          </Link>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault()
              goAnchor('about')
            }}
          >
            关于我们
          </a>
          <a
            href="#contact"
            className="nav-contact"
            onClick={(e) => {
              e.preventDefault()
              goAnchor('contact')
            }}
          >
            联系顾问
          </a>
        </div>
        <button className="menu" onClick={() => setOpen(!open)} aria-expanded={open}>
          {open ? '收起' : '菜单'}
        </button>
      </nav>
    </header>
  )
}

/* ================= 页脚 ================= */
function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <span>© {new Date().getFullYear()} 博瑞伦特 BRALLENT · 企业定制服务专家</span>
        <span>
          <a href="mailto:rose@brallent.cn">rose@brallent.cn</a>　·　+86 15802439194（微信 bbly212）　·　北京市大兴区盛坊路 5 号院 6 号楼 1001-7
        </span>
      </div>
    </footer>
  )
}

/* ================= 路由组装 ================= */
export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <ReadingProgress />
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
