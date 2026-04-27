import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const metrics = [
  { value: '5+',    label: 'Projects Deployed',    color: '#00F5FF' },
  { value: '100%',  label: 'Pipeline Automation',  color: '#00FF88' },
  { value: '0',     label: 'Data Loss Incidents',  color: '#00F5FF' },
  { value: '<2min', label: 'Avg Deploy Time',      color: '#00FF88' },
  { value: '3',     label: 'Docker Containers',    color: '#2496ED' },
  { value: 'Daily', label: 'Automated DB Backups', color: '#F46800' },
  { value: '16+',   label: 'Tools Mastered',       color: '#7B42BC' },
  { value: 'A+',    label: 'SSL Security Rating',  color: '#00FF88' },
]

// Returns { isNumeric, base, suffix, prefix } for count-up logic
function parseValue(val) {
  const match = val.match(/^(\d+(?:\.\d+)?)(.*)$/)
  if (match) return { isNumeric: true, base: parseFloat(match[1]), suffix: match[2], prefix: '' }
  return { isNumeric: false }
}

function CountUp({ value, color, inView }) {
  const [display, setDisplay] = useState('')
  const rafRef = useRef(null)

  useEffect(() => {
    if (!inView) return
    const parsed = parseValue(value)

    if (!parsed.isNumeric) {
      // Fade-in handled by parent motion; just set value
      setDisplay(value)
      return
    }

    const { base, suffix } = parsed
    const duration = 1400
    const start = performance.now()

    const tick = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = base * eased
      const formatted = Number.isInteger(base)
        ? Math.round(current).toString()
        : current.toFixed(1)
      setDisplay(formatted + suffix)
      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [inView, value])

  return (
    <span
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 'clamp(24px, 3vw, 36px)',
        fontWeight: 700,
        color,
        display: 'block',
        lineHeight: 1.1,
      }}
    >
      {display || value}
    </span>
  )
}

function MetricCard({ metric, index }) {
  const [hovered, setHovered] = useState(false)
  const [inView, setInView] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#0D0D14',
        border: `1px solid ${hovered ? metric.color + '40' : 'rgba(255,255,255,0.06)'}`,
        borderTop: `3px solid ${metric.color}`,
        borderRadius: '0 0 12px 12px',
        padding: '24px 20px',
        position: 'relative',
        overflow: 'hidden',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? `0 8px 24px ${metric.color}15` : 'none',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
        cursor: 'default',
      }}
    >
      {metric.icon && (
        <span
          aria-hidden
          style={{
            position: 'absolute',
            top: 12,
            right: 14,
            fontSize: 32,
            opacity: 0.15,
            lineHeight: 1,
            userSelect: 'none',
          }}
        >
          {metric.icon}
        </span>
      )}

      <CountUp value={metric.value} color={metric.color} inView={inView} />

      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          color: '#EEEEF5',
          fontWeight: 600,
          marginTop: 6,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
        }}
      >
        {metric.label}
      </div>

      {metric.desc && (
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 11,
            color: '#6B6B8A',
            lineHeight: 1.5,
            marginTop: 4,
          }}
        >
          {metric.desc}
        </div>
      )}
    </motion.div>
  )
}

export default function MetricsSection() {
  return (
    <section
      id="metrics"
      style={{ padding: '80px 0', background: '#080810' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 48, textAlign: 'center' }}
        >
          <h2
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 'clamp(22px, 3vw, 32px)',
              fontWeight: 700,
              color: '#EEEEF5',
              letterSpacing: '0.06em',
              margin: 0,
            }}
          >
            <span style={{ color: '#00F5FF' }}>◈</span> IMPACT{' '}
            <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400 }}>/</span>{' '}
            By The Numbers
          </h2>
          <div
            style={{
              width: 60,
              height: 2,
              background: 'linear-gradient(90deg, #00F5FF, #00FF88)',
              margin: '14px auto 0',
              borderRadius: 2,
            }}
          />
        </motion.div>

        {/* 4×2 grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 16,
          }}
          className="metrics-grid"
        >
          {metrics.map((metric, i) => (
            <MetricCard key={metric.label} metric={metric} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .metrics-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .metrics-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
