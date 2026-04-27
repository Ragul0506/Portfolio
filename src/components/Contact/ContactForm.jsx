import { useState, useCallback, useEffect } from 'react'
import DOMPurify from 'dompurify'

function sanitize(raw) {
  return DOMPurify.sanitize(raw, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] })
}

function validate({ name, email, message }) {
  const errors = {}
  if (!name.trim() || name.trim().length < 2) errors.name = 'Full name required (min 2 chars)'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = 'Valid email required'
  if (!message.trim() || message.trim().length < 20) errors.message = 'Message required (min 20 chars)'
  return errors
}

const contactItems = [
  { icon: '✉',  label: 'Email',    value: 'sarwanragul65@gmail.com',    href: 'mailto:sarwanragul65@gmail.com' },
  { icon: 'in', label: 'LinkedIn', value: 'linkedin.com/in/ragulraj-c-64a247157',    href: 'https://linkedin.com/in/ragulraj-c-64a247157' },
  // TODO: Replace ragulraj-c-64a247157 with your actual LinkedIn profile ID
  { icon: '⌥',  label: 'GitHub',   value: 'github.com/Ragul0506',   href: 'https://github.com/Ragul0506' },
  // TODO: Replace Ragul0506 with your actual GitHub username
  { icon: '📍', label: 'Location', value: 'Tamil Nadu, India',           href: null },
]

const inputStyle = {
  background: '#0D0D14',
  border: '1px solid rgba(0,245,255,0.15)',
  borderRadius: '8px',
  padding: '12px 16px',
  color: '#EEEEF5',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  width: '100%',
  outline: 'none',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
}

export default function ContactForm() {
  const [form, setForm]         = useState({ name: '', email: '', message: '' })
  const [errors, setErrors]     = useState({})
  const [sending, setSending]   = useState(false)
  const [toastMsg, setToastMsg] = useState('')

  const handleChange = useCallback((e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setErrors(er => ({ ...er, [e.target.name]: undefined }))
  }, [])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    const clean = { name: sanitize(form.name), email: sanitize(form.email), message: sanitize(form.message) }
    const errs = validate(clean)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSending(true)
    await new Promise(r => setTimeout(r, 900))
    setSending(false)
    setForm({ name: '', email: '', message: '' })
    setToastMsg('Message sent! I\'ll get back to you soon.')
    setTimeout(() => setToastMsg(''), 3000)
  }, [form])

  const focusStyle = (e) => {
    e.target.style.borderColor = '#00F5FF'
    e.target.style.boxShadow = '0 0 0 2px rgba(0,245,255,0.1)'
  }
  const blurStyle = (e) => {
    e.target.style.borderColor = 'rgba(0,245,255,0.15)'
    e.target.style.boxShadow = 'none'
  }

  return (
    <section id="contact" style={{ padding: '100px 0', background: '#0A0A0A' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>

        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', color: '#00F5FF', fontSize: '12px',
            letterSpacing: '3px', display: 'block', marginBottom: '12px' }}>
            ◈ REACH OUT
          </span>
          <h2 style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 'clamp(28px,4vw,42px)',
            fontWeight: 700, color: '#EEEEF5' }}>
            Let&apos;s Connect
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }} className="contact-grid">

          {/* Left — contact info */}
          <div>
            <p style={{ color: '#6B6B8A', lineHeight: '1.8', marginBottom: '32px', fontSize: '15px' }}>
              Open to DevOps roles, cloud infrastructure projects, and automation consulting.
              Let&apos;s build something reliable and automated together.
            </p>

            {contactItems.map(item => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '14px',
                padding: '14px 0', borderBottom: '1px solid rgba(0,245,255,0.06)' }}>
                <span style={{ width: '36px', height: '36px', borderRadius: '8px',
                  background: 'rgba(0,245,255,0.08)', border: '1px solid rgba(0,245,255,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '15px', flexShrink: 0 }}>
                  {item.icon}
                </span>
                <div>
                  <div style={{ fontSize: '11px', color: '#6B6B8A', letterSpacing: '1px', marginBottom: '2px' }}>
                    {item.label}
                  </div>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer"
                      style={{ color: '#EEEEF5', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.target.style.color = '#00F5FF'}
                      onMouseLeave={e => e.target.style.color = '#EEEEF5'}>
                      {item.value}
                    </a>
                  ) : (
                    <span style={{ color: '#EEEEF5', fontSize: '14px' }}>{item.value}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right — form */}
          <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <input
                type="text" name="name" placeholder="Your Name"
                value={form.name} onChange={handleChange}
                style={{ ...inputStyle, borderColor: errors.name ? '#FF6B6B' : 'rgba(0,245,255,0.15)' }}
                onFocus={focusStyle} onBlur={blurStyle}
              />
              {errors.name && <div style={{ color: '#FF6B6B', fontSize: '12px', marginTop: '4px', fontFamily: 'JetBrains Mono, monospace' }}>{errors.name}</div>}
            </div>
            <div>
              <input
                type="email" name="email" placeholder="Your Email"
                value={form.email} onChange={handleChange}
                style={{ ...inputStyle, borderColor: errors.email ? '#FF6B6B' : 'rgba(0,245,255,0.15)' }}
                onFocus={focusStyle} onBlur={blurStyle}
              />
              {errors.email && <div style={{ color: '#FF6B6B', fontSize: '12px', marginTop: '4px', fontFamily: 'JetBrains Mono, monospace' }}>{errors.email}</div>}
            </div>
            <div>
              <textarea
                name="message" placeholder="Your message..." rows={6}
                value={form.message} onChange={handleChange}
                style={{ ...inputStyle, resize: 'vertical', borderColor: errors.message ? '#FF6B6B' : 'rgba(0,245,255,0.15)' }}
                onFocus={focusStyle} onBlur={blurStyle}
              />
              {errors.message && <div style={{ color: '#FF6B6B', fontSize: '12px', marginTop: '4px', fontFamily: 'JetBrains Mono, monospace' }}>{errors.message}</div>}
            </div>
            <button type="submit" disabled={sending}
              style={{ background: '#00F5FF', color: '#050509',
                fontFamily: 'JetBrains Mono, monospace', fontWeight: 700,
                fontSize: '13px', letterSpacing: '1.5px', padding: '14px 32px',
                borderRadius: '6px', border: 'none', cursor: sending ? 'wait' : 'pointer',
                width: '100%', opacity: sending ? 0.7 : 1, transition: 'opacity 0.2s' }}>
              {sending ? 'SENDING...' : 'SEND MESSAGE →'}
            </button>
          </form>
        </div>
      </div>

      {/* Toast */}
      {toastMsg && (
        <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 5000,
          background: '#0D0D14', border: '1px solid #00FF88', color: '#00FF88',
          fontFamily: 'JetBrains Mono, monospace', fontSize: '13px',
          padding: '16px 24px', borderRadius: '8px',
          animation: 'fade-up 0.3s ease forwards' }}>
          ✓ {toastMsg}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
