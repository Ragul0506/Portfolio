import { motion } from 'framer-motion'
import { careerData } from '../../data/career'

const CARD_VARIANTS = {
  hidden: (isLeft) => ({
    opacity: 0,
    x: isLeft ? -50 : 50,
    y: 16,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const DOT_VARIANTS = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
}

export default function JourneyTimeline() {
  return (
    <section id="journey" style={{ padding: '100px 0', background: '#050509' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: '72px' }}
        >
          <span style={{
            fontFamily: 'JetBrains Mono, monospace', color: '#00F5FF',
            fontSize: '12px', letterSpacing: '3px', display: 'block', marginBottom: '12px',
          }}>
            ◈ MY PATH
          </span>
          <h2 style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: 700, color: '#EEEEF5',
          }}>
            Career Journey
          </h2>
        </motion.div>

        <div className="journey-root" style={{ position: 'relative' }}>

          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="journey-line"
            style={{
              position: 'absolute', left: '50%', top: 0, bottom: 0,
              width: '2px',
              background: 'linear-gradient(to bottom, transparent, rgba(0,245,255,0.3) 15%, rgba(0,245,255,0.3) 85%, transparent)',
              transform: 'translateX(-50%)',
              transformOrigin: 'top center',
            }}
          />

          {careerData.map((item, i) => {
            const isLeft = i % 2 === 0
            return (
              <div
                key={item.id}
                className="journey-entry"
                style={{
                  display: 'flex',
                  marginBottom: i < careerData.length - 1 ? '56px' : '0',
                  position: 'relative',
                  alignItems: 'flex-start',
                  flexDirection: isLeft ? 'row' : 'row-reverse',
                }}
              >
                <motion.div
                  custom={isLeft}
                  variants={CARD_VARIANTS}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover={{
                    borderColor: 'rgba(0,245,255,0.3)',
                    boxShadow: '0 0 28px rgba(0,245,255,0.08)',
                    transition: { duration: 0.2 },
                  }}
                  className="journey-card"
                  style={{
                    width: 'calc(50% - 36px)',
                    background: 'rgba(13,13,20,0.75)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: `1px solid ${item.active ? 'rgba(0,245,255,0.22)' : 'rgba(255,255,255,0.07)'}`,
                    borderRadius: '14px',
                    padding: '24px 28px',
                    boxShadow: item.active
                      ? '0 0 32px rgba(0,245,255,0.06), inset 0 1px 0 rgba(255,255,255,0.06)'
                      : 'inset 0 1px 0 rgba(255,255,255,0.04)',
                  }}
                >
                  <div style={{
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between', marginBottom: '4px',
                  }}>
                    <span style={{
                      fontFamily: 'JetBrains Mono, monospace', color: '#00F5FF',
                      fontSize: '11px', letterSpacing: '1.5px',
                    }}>
                      {item.period}
                    </span>
                    {item.active && (
                      <span style={{
                        background: 'rgba(0,245,255,0.1)', color: '#00F5FF',
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '9px', letterSpacing: '1px',
                        padding: '2px 8px', borderRadius: '20px',
                        border: '1px solid rgba(0,245,255,0.18)',
                        display: 'flex', alignItems: 'center', gap: '5px',
                      }}>
                        <span style={{
                          width: '5px', height: '5px', borderRadius: '50%',
                          background: '#00F5FF', display: 'inline-block',
                          animation: 'neon-pulse 1.2s ease-in-out infinite',
                        }} />
                        ACTIVE
                      </span>
                    )}
                  </div>

                  <div style={{
                    fontFamily: 'JetBrains Mono, monospace', color: '#4A4A6A',
                    fontSize: '11px', marginBottom: '8px',
                  }}>
                    {item.company}
                  </div>

                  <h3 style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '16px', fontWeight: 700,
                    color: '#EEEEF5', marginBottom: '12px', lineHeight: 1.3,
                  }}>
                    {item.role}
                  </h3>

                  <p style={{
                    fontSize: '13px', color: '#8A8AA0',
                    lineHeight: '1.75', marginBottom: '16px',
                  }}>
                    {item.description}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {item.tags.map(tag => (
                      <span key={tag} style={{
                        background: 'rgba(0,245,255,0.06)',
                        color: 'rgba(0,245,255,0.72)',
                        border: '1px solid rgba(0,245,255,0.1)',
                        borderRadius: '4px', padding: '2px 9px',
                        fontSize: '10px', fontFamily: 'JetBrains Mono, monospace',
                        letterSpacing: '0.5px',
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>

                <div
                  className="journey-dot-col"
                  style={{
                    width: '72px', display: 'flex', justifyContent: 'center',
                    flexShrink: 0, paddingTop: '22px',
                    position: 'relative', zIndex: 1,
                  }}
                >
                  <motion.div
                    variants={DOT_VARIANTS}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    style={{
                      position: 'relative',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    {item.active && (
                      <>
                        <span style={{
                          width: '32px', height: '32px', borderRadius: '50%',
                          position: 'absolute',
                          border: '1px solid rgba(0,245,255,0.35)',
                          animation: 'journey-ring 2s ease-out infinite',
                        }} />
                        <span style={{
                          width: '24px', height: '24px', borderRadius: '50%',
                          position: 'absolute',
                          border: '1px solid rgba(0,245,255,0.45)',
                          animation: 'journey-ring 2s ease-out 0.6s infinite',
                        }} />
                      </>
                    )}
                    <div style={{
                      width: item.active ? '14px' : '12px',
                      height: item.active ? '14px' : '12px',
                      borderRadius: '50%',
                      background: item.active ? '#00F5FF' : '#0D1A24',
                      border: `2px solid ${item.active ? '#00F5FF' : 'rgba(0,245,255,0.35)'}`,
                      boxShadow: item.active ? '0 0 14px rgba(0,245,255,0.65)' : 'none',
                      position: 'relative', zIndex: 2,
                    }} />
                  </motion.div>
                </div>

                <div className="journey-spacer" style={{ width: 'calc(50% - 36px)' }} />
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        @keyframes journey-ring {
          0%   { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @media (max-width: 768px) {
          .journey-line  { left: 24px !important; transform: none !important; }
          .journey-entry { flex-direction: column !important; padding-left: 60px !important; }
          .journey-card  { width: 100% !important; }
          .journey-dot-col {
            position: absolute !important; left: 16px !important;
            top: 20px !important; padding-top: 0 !important;
          }
          .journey-spacer { display: none !important; }
        }
      `}</style>
    </section>
  )
}
