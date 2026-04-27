import { useState, useEffect, useRef } from 'react'

const links = [
  { label: 'About',    href: '#hero'     },
  { label: 'Journey',  href: '#journey'  },
  { label: 'Metrics',  href: '#metrics'  },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills',   href: '#skills'   },
  { label: 'Pipeline', href: '#pipeline' },
  { label: 'Contact',  href: '#contact'  },
]

export default function NavBar() {
  const [scrolled, setScrolled]           = useState(false)
  const [menuOpen, setMenuOpen]           = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const menuRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero','journey','metrics','projects','skills','pipeline','contact']
      const scrollY = window.scrollY + 120

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(sections[i])
          return
        }
      }
      setActiveSection('hero')
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const scrollTo = (e, href) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav
      ref={menuRef}
      style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 1000,
        transition: 'all 0.3s ease', padding: '0 24px',
        background: scrolled ? 'rgba(5,5,9,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,245,255,0.12)' : 'none',
      }}
    >
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '64px',
      }}>
        {/* Logo */}
        <span style={{
          fontFamily: 'JetBrains Mono, monospace',
          color: '#00F5FF', fontWeight: 700, fontSize: '20px',
          cursor: 'pointer',
        }}
          onClick={(e) => scrollTo(e, '#hero')}
        >
          &lt;/&gt;RAGULRAJ.DEV
        </span>

        {/* Desktop links */}
        <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}
          className="hidden-mobile">
          {links.map(link => {
            const isActive = link.href === '#' + activeSection
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                style={{
                  color: isActive ? '#00F5FF' : '#6B6B8A',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontFamily: 'JetBrains Mono, monospace',
                  padding: '4px 0',
                  borderBottom: isActive ? '2px solid #00F5FF' : '2px solid transparent',
                  transition: 'color 0.2s ease, border-color 0.2s ease',
                }}
                onMouseEnter={e => { if (!isActive) e.target.style.color = '#00F5FF' }}
                onMouseLeave={e => { if (!isActive) e.target.style.color = '#6B6B8A' }}
              >
                {link.label}
              </a>
            )
          })}
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(m => !m)}
          className="show-mobile"
          style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', gap: '4px', padding: '4px',
          }}
          aria-label="Toggle menu"
        >
          <div style={{
            height: '2px', width: '22px', background: '#00F5FF',
            transform: menuOpen ? 'rotate(45deg) translateY(6px)' : 'none',
            transition: 'transform 0.3s ease',
          }} />
          <div style={{
            height: '2px', width: '22px', background: '#00F5FF',
            opacity: menuOpen ? 0 : 1,
            transition: 'opacity 0.3s ease',
          }} />
          <div style={{
            height: '2px', width: '22px', background: '#00F5FF',
            transform: menuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none',
            transition: 'transform 0.3s ease',
          }} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          display: 'flex', flexDirection: 'column',
          background: '#0D0D14', padding: '20px 24px',
          borderBottom: '1px solid rgba(0,245,255,0.12)',
          gap: '4px',
        }}>
          {links.map(link => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => scrollTo(e, link.href)}
              style={{
                color: activeSection === link.href.replace('#', '') ? '#00F5FF' : '#6B6B8A',
                textDecoration: 'none', fontSize: '14px',
                fontFamily: 'JetBrains Mono, monospace',
                padding: '10px 0',
                borderBottom: '1px solid rgba(0,245,255,0.06)',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
        }
        @media (min-width: 769px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile   { display: none !important; }
        }
      `}</style>
    </nav>
  )
}
