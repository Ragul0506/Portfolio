import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { projects } from '../../data/projects'

/* ─── Section heading helper ───────────────────────────────────────────────── */
function SectionHeading({ title }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
      <span style={{
        fontFamily: 'JetBrains Mono, monospace', color: '#00F5FF',
        fontSize: '10px', fontWeight: 700, letterSpacing: '2px',
      }}>
        {title}
      </span>
      <div style={{ flex: 1, height: '1px', background: 'rgba(0,245,255,0.15)' }} />
    </div>
  )
}

/* ─── Image diagram modal (existing projects) ──────────────────────────────── */
function DiagramModal({ open, onClose, src, alt, title }) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    const handler = e => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handler)
    return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = '' }
  }, [open, onClose])

  if (!open) return null
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9000,
        background: 'rgba(0,0,0,0.92)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        style={{ width: '100%', maxWidth: '1200px', marginBottom: '12px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        onClick={e => e.stopPropagation()}
      >
        <span style={{ fontFamily: 'JetBrains Mono, monospace', color: '#00F5FF',
          fontSize: '14px', letterSpacing: '2px', fontWeight: 700 }}>
          {title}
        </span>
        <button
          onClick={onClose}
          style={{ background: 'transparent', border: '1px solid rgba(0,245,255,0.3)',
            color: '#00F5FF', fontFamily: 'JetBrains Mono, monospace', fontSize: '12px',
            padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', letterSpacing: '1px' }}
        >
          [ CLOSE × ]
        </button>
      </div>
      <div
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: '1200px', width: '100%',
          border: '1px solid rgba(0,245,255,0.2)', borderRadius: '12px', overflow: 'hidden',
          boxShadow: '0 0 60px rgba(0,245,255,0.1)' }}
      >
        <img src={src} alt={alt} style={{ width: '100%', height: 'auto', display: 'block' }} />
      </div>
      <p style={{ color: '#6B6B8A', fontSize: '12px', marginTop: '12px',
        fontFamily: 'JetBrains Mono, monospace' }}>
        Press ESC or click outside to close
      </p>
    </div>
  )
}

/* ─── Rich detail modal (Warroom and future hasDetail projects) ─────────────── */
function ProjectDetailModal({ open, onClose, project }) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    const handler = e => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handler)
    return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = '' }
  }, [open, onClose])

  if (!open || !project) return null
  const { detail } = project

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9000,
        background: 'rgba(0,0,0,0.95)',
        overflowY: 'auto',
        padding: '32px 16px',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: '920px', margin: '0 auto',
          background: '#08080F',
          border: '1px solid rgba(0,245,255,0.2)',
          borderRadius: '16px',
          overflow: 'hidden',
        }}
      >
        {/* ── Header ── */}
        <div style={{
          background: '#0D0D14',
          borderBottom: '1px solid rgba(0,245,255,0.1)',
          padding: '20px 28px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ fontSize: '30px', lineHeight: 1 }}>{project.icon}</span>
            <div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', color: '#6B6B8A',
                fontSize: '10px', letterSpacing: '2px', marginBottom: '4px' }}>
                ◈ PROJECT DETAIL
              </div>
              <h2 style={{ fontFamily: 'JetBrains Mono, monospace', color: '#EEEEF5',
                fontSize: '15px', fontWeight: 700, margin: 0 }}>
                {project.name}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'transparent', border: '1px solid rgba(0,245,255,0.3)',
              color: '#00F5FF', fontFamily: 'JetBrains Mono, monospace', fontSize: '12px',
              padding: '8px 16px', borderRadius: '4px', cursor: 'pointer',
              letterSpacing: '1px', flexShrink: 0 }}
          >
            [ CLOSE × ]
          </button>
        </div>

        {/* ── Metrics bar ── */}
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(0,245,255,0.1)' }}>
          {project.metrics.map((m, i) => (
            <div key={m.label} style={{
              flex: 1, padding: '16px 8px', textAlign: 'center',
              borderRight: i < project.metrics.length - 1 ? '1px solid rgba(0,245,255,0.08)' : 'none',
            }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '20px',
                fontWeight: 700, color: '#00F5FF', marginBottom: '3px' }}>
                {m.value}
              </div>
              <div style={{ fontSize: '10px', color: '#6B6B8A',
                fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.5px' }}>
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* ── Body ── */}
        <div style={{ padding: '32px 28px' }}>

          {/* Overview */}
          <div style={{ marginBottom: '32px' }}>
            <SectionHeading title="OVERVIEW" />
            <p style={{ fontSize: '14px', color: '#AAAACC', lineHeight: '1.8', margin: 0 }}>
              {detail.overview}
            </p>
          </div>

          {/* Key Features */}
          <div style={{ marginBottom: '32px' }}>
            <SectionHeading title="KEY FEATURES" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
              {detail.features.map(f => (
                <div key={f.title} style={{
                  background: 'rgba(0,245,255,0.03)',
                  border: '1px solid rgba(0,245,255,0.1)',
                  borderRadius: '8px', padding: '16px',
                }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', color: '#00F5FF',
                    fontSize: '11px', fontWeight: 700, marginBottom: '7px', letterSpacing: '0.5px' }}>
                    {f.title}
                  </div>
                  <p style={{ fontSize: '12px', color: '#8A8AA0', lineHeight: '1.65', margin: 0 }}>
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Architecture */}
          <div style={{ marginBottom: '32px' }}>
            <SectionHeading title="ARCHITECTURE DIAGRAM" />
            <pre style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '11px', lineHeight: '1.55',
              color: '#00F5FF',
              background: '#07070E',
              border: '1px solid rgba(0,245,255,0.1)',
              borderRadius: '8px',
              padding: '20px 24px',
              overflowX: 'auto',
              margin: 0,
              whiteSpace: 'pre',
            }}>
              {detail.architecture}
            </pre>
          </div>

          {/* Technology Stack */}
          <div style={{ marginBottom: '32px' }}>
            <SectionHeading title="TECHNOLOGY STACK" />
            <div style={{ border: '1px solid rgba(0,245,255,0.1)', borderRadius: '8px', overflow: 'hidden' }}>
              {detail.tech_table.map((row, i) => (
                <div key={row.category} style={{
                  display: 'flex', alignItems: 'baseline', gap: '16px',
                  padding: '11px 16px',
                  background: i % 2 === 0 ? 'rgba(0,245,255,0.025)' : 'transparent',
                  borderBottom: i < detail.tech_table.length - 1 ? '1px solid rgba(0,245,255,0.06)' : 'none',
                }}>
                  <span style={{
                    fontFamily: 'JetBrains Mono, monospace', color: '#00F5FF',
                    fontSize: '11px', fontWeight: 700, minWidth: '96px', flexShrink: 0,
                  }}>
                    {row.category}
                  </span>
                  <span style={{ fontSize: '12px', color: '#AAAACC', lineHeight: '1.5' }}>
                    {row.tech}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Security */}
          <div style={{ marginBottom: '32px' }}>
            <SectionHeading title="SECURITY MEASURES" />
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {detail.security.map((s, i) => (
                <li key={i} style={{
                  display: 'flex', gap: '12px', alignItems: 'flex-start',
                  padding: '9px 0',
                  borderBottom: i < detail.security.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                }}>
                  <span style={{ color: '#00FF88', fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '13px', flexShrink: 0, marginTop: '1px' }}>
                    ✓
                  </span>
                  <span style={{ fontSize: '13px', color: '#AAAACC', lineHeight: '1.6' }}>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Challenges & Solutions */}
          <div style={{ marginBottom: '32px' }}>
            <SectionHeading title="CHALLENGES & SOLUTIONS" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {detail.challenges.map((c, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}
                  className="challenge-row">
                  <div style={{
                    background: 'rgba(255,85,85,0.05)',
                    border: '1px solid rgba(255,85,85,0.18)',
                    borderRadius: '8px', padding: '14px 16px',
                  }}>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', color: '#FF6B6B',
                      fontSize: '9px', letterSpacing: '1.5px', fontWeight: 700, marginBottom: '8px' }}>
                      ✕ CHALLENGE
                    </div>
                    <p style={{ fontSize: '12px', color: '#AAAACC', margin: 0, lineHeight: '1.6' }}>
                      {c.challenge}
                    </p>
                  </div>
                  <div style={{
                    background: 'rgba(0,255,136,0.05)',
                    border: '1px solid rgba(0,255,136,0.18)',
                    borderRadius: '8px', padding: '14px 16px',
                  }}>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', color: '#00FF88',
                      fontSize: '9px', letterSpacing: '1.5px', fontWeight: 700, marginBottom: '8px' }}>
                      ✓ SOLUTION
                    </div>
                    <p style={{ fontSize: '12px', color: '#AAAACC', margin: 0, lineHeight: '1.6' }}>
                      {c.solution}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Deployment */}
          <div style={{ marginBottom: '24px' }}>
            <SectionHeading title="DEPLOYMENT" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
              {detail.deployment.map(d => (
                <div key={d.label} style={{
                  background: 'rgba(0,245,255,0.03)',
                  border: '1px solid rgba(0,245,255,0.1)',
                  borderRadius: '8px', padding: '14px 16px',
                }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', color: '#6B6B8A',
                    fontSize: '9px', letterSpacing: '1.5px', marginBottom: '6px', textTransform: 'uppercase' }}>
                    {d.label}
                  </div>
                  <div style={{ fontSize: '12px', color: '#EEEEF5', lineHeight: '1.4' }}>
                    {d.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p style={{ textAlign: 'center', color: '#6B6B8A', fontSize: '11px',
            fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.5px' }}>
            Press ESC or click outside to close
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .challenge-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

/* ─── Project card ──────────────────────────────────────────────────────────── */
function ProjectCard({ project, onViewDiagram, onViewDetail, index }) {
  const shortProblem = project.problem.length > 160
    ? project.problem.slice(0, 157) + '...'
    : project.problem

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,245,255,0.4)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,245,255,0.12)' }}
      style={{
        background: '#0D0D14',
        border: '1px solid rgba(0,245,255,0.12)',
        borderRadius: '12px',
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        transition: 'border-color 0.3s ease',
      }}
    >
      {/* Header */}
      <div style={{ padding: '20px', borderBottom: '1px solid rgba(0,245,255,0.08)',
        display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
        <div style={{ fontSize: '28px', lineHeight: 1, flexShrink: 0, marginTop: '2px' }}>
          {project.icon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
            gap: '8px', flexWrap: 'wrap', marginBottom: '6px' }}>
            <h3 style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px',
              fontWeight: 700, color: '#EEEEF5', margin: 0 }}>
              {project.name}
            </h3>
            <span style={{ background: project.badge_bg, color: project.badge_color,
              fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', fontWeight: 700,
              padding: '3px 9px', borderRadius: '20px', letterSpacing: '0.5px',
              whiteSpace: 'nowrap', flexShrink: 0 }}>
              {project.badge}
            </span>
          </div>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px',
            color: '#6B6B8A', margin: 0, lineHeight: '1.4' }}>
            {project.stack_summary}
          </p>
        </div>
      </div>

      {/* Short description */}
      <div style={{ padding: '16px 20px', flex: 1 }}>
        <p style={{ fontSize: '12px', color: '#AAAACC', lineHeight: '1.65', margin: 0 }}>
          {shortProblem}
        </p>
      </div>

      {/* Metrics */}
      <div style={{ padding: '12px 20px', display: 'flex', gap: '20px',
        borderTop: '1px solid rgba(0,245,255,0.06)', flexWrap: 'wrap' }}>
        {project.metrics.slice(0, 3).map(m => (
          <div key={m.label} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '14px',
              fontWeight: 700, color: '#00F5FF' }}>{m.value}</div>
            <div style={{ fontSize: '10px', color: '#6B6B8A' }}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* Tech pills */}
      <div style={{ padding: '12px 20px', display: 'flex', flexWrap: 'wrap', gap: '6px',
        borderTop: '1px solid rgba(0,245,255,0.06)' }}>
        {project.tech.slice(0, 5).map(t => (
          <span key={t} style={{ background: 'rgba(0,245,255,0.07)', color: '#00F5FF',
            border: '1px solid rgba(0,245,255,0.18)', fontFamily: 'JetBrains Mono, monospace',
            fontSize: '10px', padding: '3px 8px', borderRadius: '3px' }}>
            {t}
          </span>
        ))}
        {project.tech.length > 5 && (
          <span style={{ color: '#6B6B8A', fontSize: '10px',
            fontFamily: 'JetBrains Mono, monospace', padding: '3px 0' }}>
            +{project.tech.length - 5}
          </span>
        )}
      </div>

      {/* Action button */}
      <div style={{ padding: '14px 20px', borderTop: '1px solid rgba(0,245,255,0.08)' }}>
        {project.hasDetail ? (
          <button
            onClick={() => onViewDetail(project.id)}
            onMouseEnter={e => { e.target.style.background = 'rgba(168,85,247,0.12)'; e.target.style.borderColor = '#A855F7'; e.target.style.color = '#A855F7' }}
            onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.borderColor = 'rgba(168,85,247,0.4)'; e.target.style.color = '#A855F7' }}
            style={{ width: '100%', background: 'transparent', color: '#A855F7',
              border: '1px solid rgba(168,85,247,0.4)', fontFamily: 'JetBrains Mono, monospace',
              fontSize: '11px', fontWeight: 700, padding: '9px', borderRadius: '4px',
              cursor: 'pointer', letterSpacing: '1px', transition: 'all 0.2s ease' }}
          >
            VIEW FULL DETAILS →
          </button>
        ) : (
          <button
            onClick={() => onViewDiagram(project.id)}
            onMouseEnter={e => { e.target.style.background = 'rgba(0,245,255,0.1)'; e.target.style.borderColor = '#00F5FF' }}
            onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.borderColor = 'rgba(0,245,255,0.3)' }}
            style={{ width: '100%', background: 'transparent', color: '#00F5FF',
              border: '1px solid rgba(0,245,255,0.3)', fontFamily: 'JetBrains Mono, monospace',
              fontSize: '11px', fontWeight: 700, padding: '9px', borderRadius: '4px',
              cursor: 'pointer', letterSpacing: '1px', transition: 'all 0.2s ease' }}
          >
            VIEW DIAGRAM →
          </button>
        )}
      </div>
    </motion.div>
  )
}

/* ─── Section ───────────────────────────────────────────────────────────────── */
export default function ProjectsSection() {
  const [modalProject, setModalProject]   = useState(null)
  const [detailProject, setDetailProject] = useState(null)

  const activeProject       = projects.find(p => p.id === modalProject)
  const activeDetailProject = projects.find(p => p.id === detailProject)

  return (
    <section id="projects" style={{ padding: '100px 0', background: '#0A0A0A' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>

        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', color: '#00F5FF', fontSize: '12px',
            letterSpacing: '3px', display: 'block', marginBottom: '12px' }}>
            ◈ CASE STUDIES
          </span>
          <h2 style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 'clamp(28px,4vw,42px)',
            fontWeight: 700, color: '#EEEEF5' }}>
            Production Projects
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              onViewDiagram={setModalProject}
              onViewDetail={setDetailProject}
              index={i}
            />
          ))}
        </div>

      </div>

      <DiagramModal
        open={!!modalProject}
        onClose={() => setModalProject(null)}
        src={activeProject?.diagram_src}
        alt={activeProject?.diagram_alt}
        title={activeProject ? `${activeProject.name} — ARCHITECTURE DIAGRAM` : ''}
      />

      <ProjectDetailModal
        open={!!detailProject}
        onClose={() => setDetailProject(null)}
        project={activeDetailProject}
      />
    </section>
  )
}
