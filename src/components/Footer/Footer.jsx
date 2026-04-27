const iconBtnStyle = {
  width: '40px', height: '40px', borderRadius: '8px',
  background: 'rgba(0,245,255,0.06)', border: '1px solid rgba(0,245,255,0.15)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  color: '#6B6B8A', textDecoration: 'none', fontSize: '15px',
  transition: 'all 0.2s ease', cursor: 'pointer',
}

function IconLink({ href, title, children }) {
  return (
    <a href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer"
      title={title} style={iconBtnStyle}
      onMouseEnter={e => {
        e.currentTarget.style.color = '#00F5FF'
        e.currentTarget.style.background = 'rgba(0,245,255,0.12)'
        e.currentTarget.style.borderColor = 'rgba(0,245,255,0.35)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = '#6B6B8A'
        e.currentTarget.style.background = 'rgba(0,245,255,0.06)'
        e.currentTarget.style.borderColor = 'rgba(0,245,255,0.15)'
      }}>
      {children}
    </a>
  )
}

export default function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer style={{ background: '#050509', borderTop: '1px solid rgba(0,245,255,0.08)', padding: '48px 40px 24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '40px',
        maxWidth: '1200px', margin: '0 auto', paddingBottom: '32px',
        borderBottom: '1px solid rgba(0,245,255,0.06)' }} className="footer-grid">

        {/* Left */}
        <div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', color: '#00F5FF',
            fontWeight: 700, fontSize: '20px', marginBottom: '10px' }}>
            &lt;/&gt;RAGULRAJ.DEV
          </div>
          <p style={{ color: '#6B6B8A', fontSize: '13px', lineHeight: '1.7', maxWidth: '260px' }}>
            Automating the world, one pipeline at a time.
          </p>
          <div style={{ color: '#6B6B8A', fontSize: '11px', fontFamily: 'JetBrains Mono, monospace',
            marginTop: '12px', letterSpacing: '1px' }}>
            v2026.1
          </div>
        </div>

        {/* Center nav */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
          {['hero', 'journey', 'projects', 'skills', 'pipeline', 'contact'].map(id => (
            <button key={id}
              onClick={() => scrollTo(id)}
              style={{ background: 'none', border: 'none', color: '#6B6B8A',
                fontSize: '13px', textTransform: 'capitalize', cursor: 'pointer',
                transition: 'color 0.2s', fontFamily: 'Inter, sans-serif' }}
              onMouseEnter={e => e.target.style.color = '#00F5FF'}
              onMouseLeave={e => e.target.style.color = '#6B6B8A'}>
              {id === 'pipeline' ? 'Pipeline' : id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
        </div>

        {/* Right social icons */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
          <IconLink href="mailto:sarwanragul65@gmail.com" title="Email">✉</IconLink>
          <IconLink href="https://github.com/Ragul0506" title="GitHub">⌥</IconLink>
          {/* TODO: Replace Ragul0506 with your actual GitHub username */}
          <IconLink href="https://linkedin.com/in/ragulraj-c-64a247157" title="LinkedIn">in</IconLink>
          {/* TODO: Replace ragulraj-c-64a247157 with your actual LinkedIn profile ID */}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ maxWidth: '1200px', margin: '24px auto 0',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '8px' }}>
        <span style={{ color: '#6B6B8A', fontSize: '12px', fontFamily: 'JetBrains Mono, monospace' }}>
          © 2026 RAGULRAJ C — All rights reserved
        </span>
        <span style={{ color: '#6B6B8A', fontSize: '12px' }}>
          Built with caffeine, Docker, and automation ⚡
        </span>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
