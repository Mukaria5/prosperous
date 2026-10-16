import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Container } from './Foundation'
import { ThemeToggle } from './ThemeToggle'
import { SiteFooter } from './ContactFooter'

function ScrollToRouteTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'auto' }) }, [pathname])
  return null
}

const navigation = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/work', label: 'Work' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
]

function Navigation() {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const firstLink = useRef<HTMLAnchorElement>(null)
  useEffect(() => {
    if (menuOpen) firstLink.current?.focus()
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButton.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return <header className={`site-header${pathname === '/' ? ' site-header-home' : ''}`}>
    <Container className="nav-container glass-nav">
      <Link className="wordmark" to="/" aria-label="Prosperous Mukaria, home"><span className="wordmark-monogram">PM<span>.</span></span><span className="wordmark-name">PROSPEROUS<br /><span>MUKARIA</span></span></Link>
      <nav className={`primary-nav${menuOpen ? ' is-open' : ''}`} id="primary-navigation" aria-label="Main navigation">
        {navigation.map(({ to, label }, index) => <NavLink key={to} ref={index === 0 ? firstLink : undefined} className={to === '/contact' ? 'nav-contact' : undefined} to={to} end={to === '/'} onClick={() => setMenuOpen(false)}>{label}</NavLink>)}
        <div className="mobile-theme"><ThemeToggle /></div>
      </nav>
      <div className="nav-actions"><ThemeToggle /><button
        ref={menuButton}
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >{menuOpen ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}</button></div>
    </Container>
  </header>
}

export function SiteLayout() {
  const location = useLocation()
  return <><ScrollToRouteTop /><Navigation key={location.pathname} /><main id="top" tabIndex={-1}><Outlet /></main><SiteFooter /></>
}
