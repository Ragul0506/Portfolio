import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

function useTypewriter(text, delay = 80, startDelay = 300) {
  const [display, setDisplay] = useState('')
  useEffect(() => {
    let i = 0
    const start = setTimeout(() => {
      const iv = setInterval(() => {
        i++
        setDisplay(text.slice(0, i))
        if (i >= text.length) clearInterval(iv)
      }, delay)
    }, startDelay)
    return () => clearTimeout(start)
  }, [text, delay, startDelay])
  return display
}

const stats = [
  { value: '100%', label: 'Automated Pipelines',  sub: 'Zero manual deploys'   },
  { value: '0',    label: 'Manual Interventions',  sub: 'Fully automated flow'  },
  { value: '10+',  label: 'Production Projects',   sub: 'Enterprise grade'      },
]

export default function HeroSection() {
  const name = useTypewriter('RAGULRAJ C', 80, 300)

  return (
    <section id="hero" style={{ padding: '120px 0 80px', background: '#050509', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}
          className="hero-grid">

          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          >
            {/* Label badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              borderLeft: '3px solid #00F5FF',
              padding: '6px 14px',
              background: 'rgba(0,245,255,0.06)',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '11px',
              letterSpacing: '2.5px',
              color: '#00F5FF',
            }}>
              ◈ DEVOPS ENGINEER
            </div>

            {/* Name */}
            <div>
              <h1 style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 'clamp(36px, 5vw, 64px)',
                fontWeight: 700,
                color: '#EEEEF5',
                lineHeight: 1.1,
                letterSpacing: '2px',
              }}>
                {name}
                <span className="cursor-blink" style={{ color: '#00F5FF' }}>_</span>
              </h1>
            </div>

            {/* Subtitle */}
            <p style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 'clamp(13px, 1.6vw, 16px)',
              color: '#00F5FF',
              letterSpacing: '0.5px',
            }}>
              Automating Everything — From Code Push to Production
            </p>

            {/* Bio */}
            <p style={{ fontSize: '15px', color: '#6B6B8A', lineHeight: '1.8', maxWidth: '520px' }}>
              DevOps Engineer at Aryu Technologies. I build production-grade CI/CD pipelines,
              containerized deployments, and cloud-native infrastructure. Every manual process
              becomes a zero-intervention automated system.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
              <button
                onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                style={{
                  background: '#00F5FF', color: '#050509',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontWeight: 700, padding: '12px 28px',
                  borderRadius: '6px', border: 'none',
                  cursor: 'pointer', letterSpacing: '1px', fontSize: '13px',
                }}
              >
                VIEW PROJECTS →
              </button>

              <a
                href="resume.pdf"
                download
                style={{
                  background: 'transparent', color: '#00F5FF',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontWeight: 700, padding: '12px 28px',
                  borderRadius: '6px', border: '2px solid #00F5FF',
                  cursor: 'pointer', letterSpacing: '1px', fontSize: '13px',
                  textDecoration: 'none', display: 'inline-block',
                }}
              >
                DOWNLOAD RESUME ↓
              </a>

              <a
                href="mailto:sarwanragul65@gmail.com"
                style={{ color: '#6B6B8A', fontSize: '13px', textDecoration: 'none' }}
              >
                sarwanragul65@gmail.com
              </a>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '8px' }}>
              {stats.map(s => (
                <div key={s.label} style={{
                  background: '#0D0D14',
                  borderTop: '2px solid #00F5FF',
                  border: '1px solid rgba(0,245,255,0.1)',
                  borderTopColor: '#00F5FF',
                  padding: '16px 20px',
                  borderRadius: '10px',
                  minWidth: '120px',
                }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '28px', fontWeight: 700, color: '#00F5FF' }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: '13px', color: '#EEEEF5', marginTop: '4px' }}>{s.label}</div>
                  <div style={{ fontSize: '11px', color: '#6B6B8A', marginTop: '2px' }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right column — photo card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <div style={{
              position: 'relative',
              flexShrink: 0,
              width: '320px',
              height: '380px',
            }}>

              {/* Main photo card */}
              <div style={{
                width: '260px',
                height: '320px',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid rgba(0,245,255,0.2)',
                boxShadow: '0 0 40px rgba(0,245,255,0.1), 0 24px 64px rgba(0,0,0,0.6)',
                position: 'relative',
                margin: '0 auto',
              }}>
                <img
                  src="./assets/ragulraj.jpg"
                  alt="RAGULRAJ C — DevOps Engineer"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    display: 'block',
                  }}
                />
                {/* Subtle gradient overlay at bottom */}
                <div style={{
                  position: 'absolute',
                  bottom: 0, left: 0, right: 0,
                  height: '80px',
                  background: 'linear-gradient(to top, rgba(5,5,9,0.8), transparent)',
                }}/>
              </div>

              {/* Cyan accent line left of photo */}
              <div style={{
                position: 'absolute',
                left: '18px',
                top: '20px',
                width: '3px',
                height: '200px',
                background: 'linear-gradient(to bottom, transparent, #00F5FF, transparent)',
                borderRadius: '2px',
              }}/>

              {/* Dot grid decoration top-right */}
              <div style={{
                position: 'absolute',
                top: '0px',
                right: '0px',
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: '6px',
                opacity: 0.3,
              }}>
                {Array.from({length: 25}).map((_,i) => (
                  <div key={i} style={{
                    width: '4px', height: '4px',
                    borderRadius: '50%',
                    background: '#00F5FF',
                  }}/>
                ))}
              </div>

              {/* Available badge */}
              <div style={{
                position: 'absolute',
                bottom: '16px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(0,20,10,0.95)',
                border: '1px solid rgba(0,255,136,0.4)',
                borderRadius: '8px',
                padding: '8px 18px',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 20px rgba(0,255,136,0.15)',
                backdropFilter: 'blur(8px)',
              }}>
                <div style={{
                  width: '8px', height: '8px',
                  borderRadius: '50%',
                  background: '#00FF88',
                  boxShadow: '0 0 10px rgba(0,255,136,0.9)',
                  animation: 'neon-pulse 1.5s ease-in-out infinite',
                  flexShrink: 0,
                }}/>
                <span style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#00FF88',
                  letterSpacing: '2px',
                }}>AVAILABLE FOR HIRE</span>
              </div>

              {/* Experience badge top-left of photo */}
              <div style={{
                position: 'absolute',
                top: '12px',
                left: '6px',
                background: 'rgba(0,5,20,0.95)',
                border: '1px solid rgba(0,245,255,0.3)',
                borderRadius: '8px',
                padding: '8px 12px',
                backdropFilter: 'blur(8px)',
              }}>
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#00F5FF',
                  lineHeight: 1,
                }}>1+</div>
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '8px',
                  color: '#6B6B8A',
                  letterSpacing: '1px',
                  marginTop: '2px',
                }}>YRS EXP</div>
              </div>

            </div>
          </motion.div>
        </div>
      </div>


<style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
