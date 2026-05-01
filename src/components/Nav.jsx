import { NavLink, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  // { to: '/projects', label: 'Projects' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [pathname])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      height: 'var(--nav-h)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 3rem',
      background: scrolled ? 'rgba(5,8,16,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '0.5px solid var(--border)' : '0.5px solid transparent',
      transition: 'all 0.4s ease',
    }}>
      <NavLink to="/" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--cyan)', letterSpacing: '0.1em' }}>
        ./ANEESH_DUA
      </NavLink>

      <ul style={{ display: 'flex', gap: '2.5rem', listStyle: 'none' }}>
        {links.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === '/'}
              style={({ isActive }) => ({
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: isActive ? 'var(--cyan)' : 'var(--text-muted)',
                transition: 'color 0.2s',
                paddingBottom: '2px',
                borderBottom: isActive ? '0.5px solid var(--cyan)' : '0.5px solid transparent',
              })}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
