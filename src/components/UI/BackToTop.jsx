import { useState, useEffect } from 'react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{
        position: 'fixed', bottom: '28px', right: '28px', zIndex: 999,
        width: '48px', height: '48px', borderRadius: '50%',
        background: '#0D0D14',
        border: '2px solid rgba(0,245,255,0.4)',
        color: '#00F5FF', fontSize: '18px', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'all 0.3s ease',
        boxShadow: '0 0 14px rgba(0,245,255,0.25)',
      }}
      aria-label="Back to top"
    >
      ↑
    </button>
  )
}
