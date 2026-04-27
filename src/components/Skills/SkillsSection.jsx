import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const categories = [
  {
    title: 'CI/CD & Automation',
    icon: '⚙',
    accent: '#2496ED',
    skills: [
      { name: 'Docker',         pct: 94, brandColor: '#2496ED' },
      { name: 'Jenkins',        pct: 90, brandColor: '#D24939' },
      { name: 'GitHub Actions', pct: 88, brandColor: '#238636' },
      { name: 'DockerHub',      pct: 84, brandColor: '#2496ED' },
    ],
  },
  {
    title: 'Cloud & Infrastructure',
    icon: '☁',
    accent: '#FF9900',
    skills: [
      { name: 'Nginx',     pct: 91, brandColor: '#009639' },
      { name: 'AWS EC2',   pct: 84, brandColor: '#FF9900' },
      { name: 'Amazon S3', pct: 80, brandColor: '#3F8624' },
      { name: 'Route 53',  pct: 76, brandColor: '#9D1F2E' },
    ],
  },
  {
    title: 'Monitoring & Ops',
    icon: '📊',
    accent: '#00FF88',
    skills: [
      { name: 'CloudWatch',     pct: 82, brandColor: '#FF9900' },
      { name: 'Docker Stats',   pct: 86, brandColor: '#2496ED' },
      { name: 'Node Exporter',  pct: 74, brandColor: '#E6522C' },
      { name: 'Uptime Monitor', pct: 78, brandColor: '#00FF88' },
    ],
  },
  {
    title: 'Security & Quality',
    icon: '🔒',
    accent: '#DD344C',
    skills: [
      { name: 'GitHub Secrets', pct: 92, brandColor: '#238636' },
      { name: 'SSL / Certbot',  pct: 88, brandColor: '#003A70' },
      { name: 'SonarQube',      pct: 72, brandColor: '#CB3032' },
      { name: 'Trivy + OWASP',  pct: 70, brandColor: '#1904DA' },
    ],
  },
]

const CDN = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'

const awsTools = [
  {
    name: 'EC2',
    logo: `${CDN}/amazonwebservices/amazonwebservices-plain-wordmark.svg`,
    pct: 84, bg: 'rgba(255,153,0,0.08)', border: 'rgba(255,153,0,0.2)',
  },
  {
    name: 'S3',
    logo: `${CDN}/amazonwebservices/amazonwebservices-plain-wordmark.svg`,
    abbr: 'S3',
    pct: 80, bg: 'rgba(63,134,36,0.15)', border: 'rgba(63,134,36,0.2)',
  },
  {
    name: 'VPC',
    logo: `${CDN}/amazonwebservices/amazonwebservices-plain-wordmark.svg`,
    pct: 76, bg: 'rgba(140,79,255,0.08)', border: 'rgba(140,79,255,0.2)',
  },
  {
    name: 'EKS',
    logo: `${CDN}/kubernetes/kubernetes-original.svg`,
    pct: 70, bg: 'rgba(50,108,229,0.08)', border: 'rgba(50,108,229,0.2)',
  },
  {
    name: 'Route 53',
    logo: null,
    abbr: 'R53',
    pct: 78, bg: 'rgba(157,31,46,0.15)', border: 'rgba(157,31,46,0.2)',
  },
  {
    name: 'CloudFront',
    logo: `${CDN}/amazonwebservices/amazonwebservices-plain-wordmark.svg`,
    pct: 72, bg: 'rgba(140,79,255,0.08)', border: 'rgba(140,79,255,0.2)',
  },
  {
    name: 'WAF',
    logo: null,
    abbr: 'WAF',
    pct: 74, bg: 'rgba(221,52,76,0.15)', border: 'rgba(221,52,76,0.2)',
  },
  {
    name: 'Lambda',
    logo: `${CDN}/amazonwebservices/amazonwebservices-original.svg`,
    abbr: 'λ',
    pct: 65, bg: 'rgba(255,153,0,0.08)', border: 'rgba(255,153,0,0.2)',
  },
]

const devopsTools = [
  { name: 'Docker',     logo: `${CDN}/docker/docker-original.svg`,             pct: 94, bg: 'rgba(36,150,237,0.08)',   border: 'rgba(36,150,237,0.25)'  },
  { name: 'Kubernetes', logo: `${CDN}/kubernetes/kubernetes-original.svg`,     pct: 78, bg: 'rgba(50,108,229,0.08)',   border: 'rgba(50,108,229,0.25)'  },
  { name: 'Terraform',  logo: `${CDN}/terraform/terraform-original.svg`,       pct: 72, bg: 'rgba(123,66,188,0.08)',   border: 'rgba(123,66,188,0.25)'  },
  { name: 'Jenkins',    logo: `${CDN}/jenkins/jenkins-original.svg`,           pct: 90, bg: 'rgba(210,73,57,0.08)',    border: 'rgba(210,73,57,0.25)'   },
  { name: 'Nginx',      logo: `${CDN}/nginx/nginx-original.svg`,               pct: 91, bg: 'rgba(0,150,57,0.08)',     border: 'rgba(0,150,57,0.25)'    },
  { name: 'GitHub',     logo: `${CDN}/github/github-original.svg`,             pct: 88, bg: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.15)', imgFilter: 'invert(1) drop-shadow(0 2px 4px rgba(0,0,0,0.8))' },
  { name: 'Node.js',    logo: `${CDN}/nodejs/nodejs-original.svg`,             pct: 80, bg: 'rgba(51,153,51,0.08)',    border: 'rgba(51,153,51,0.25)'   },
  { name: 'MongoDB',    logo: `${CDN}/mongodb/mongodb-original.svg`,           pct: 82, bg: 'rgba(71,162,72,0.08)',    border: 'rgba(71,162,72,0.25)'   },
  { name: 'Linux',      logo: `${CDN}/linux/linux-original.svg`,               pct: 85, bg: 'rgba(252,198,36,0.08)',   border: 'rgba(252,198,36,0.25)'  },
  { name: 'Python',     logo: `${CDN}/python/python-original.svg`,             pct: 70, bg: 'rgba(55,118,171,0.08)',   border: 'rgba(55,118,171,0.25)'  },
  { name: 'Git',        logo: `${CDN}/git/git-original.svg`,                   pct: 88, bg: 'rgba(240,80,50,0.08)',    border: 'rgba(240,80,50,0.25)'   },
  { name: 'Bash',       logo: `${CDN}/bash/bash-original.svg`,                 pct: 86, bg: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.12)', imgFilter: 'brightness(1.3) saturate(1.2)' },
  { name: 'Ansible',    logo: `${CDN}/ansible/ansible-original.svg`,           pct: 65, bg: 'rgba(238,0,0,0.08)',      border: 'rgba(238,0,0,0.25)'     },
  { name: 'Grafana',    logo: `${CDN}/grafana/grafana-original.svg`,           pct: 74, bg: 'rgba(244,104,0,0.08)',    border: 'rgba(244,104,0,0.25)'   },
  { name: 'Prometheus', logo: `${CDN}/prometheus/prometheus-original.svg`,     pct: 76, bg: 'rgba(230,82,44,0.08)',    border: 'rgba(230,82,44,0.25)'   },
  { name: 'Vagrant',    logo: `${CDN}/vagrant/vagrant-original.svg`,           pct: 60, bg: 'rgba(20,109,246,0.08)',   border: 'rgba(20,109,246,0.25)'  },
  { name: 'SonarQube',  logo: `${CDN}/sonarqube/sonarqube-original.svg`,       pct: 70, bg: 'rgba(203,48,50,0.08)',    border: 'rgba(203,48,50,0.25)'   },
  { name: 'Certbot',    logo: `${CDN}/letsencrypt/letsencrypt-original.svg`,   abbr: 'LE', pct: 88, bg: 'rgba(0,58,112,0.08)', border: 'rgba(0,58,112,0.25)'    },
]

function hexToRgba(hex, alpha) {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

function badgeColor(border) {
  if (border.includes('255,153')) return '#FF9900'
  if (border.includes('36,150')) return '#2496ED'
  if (border.includes('0,150'))  return '#009639'
  return '#00F5FF'
}

function activeBorder(border) {
  return border.replace('0.2', '0.5').replace('0.25', '0.5')
}

function bottomBar(border) {
  return border.replace('0.2', '0.6').replace('0.25', '0.7')
}

function ToolCard({ tool, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      whileHover={{ y: -6, scale: 1.06 }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = `0 8px 28px ${tool.border}`
        e.currentTarget.style.borderColor = activeBorder(tool.border)
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.borderColor = tool.border
      }}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        padding: '20px 16px 14px',
        background: tool.bg,
        backdropFilter: 'blur(10px)',
        border: `1px solid ${tool.border}`,
        borderRadius: '16px',
        cursor: 'pointer',
        minWidth: '96px',
        transition: 'box-shadow 0.25s ease, border-color 0.25s ease',
      }}
    >
      {/* Proficiency badge */}
      <div style={{
        position: 'absolute',
        top: '8px',
        right: '8px',
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '9px',
        fontWeight: 700,
        color: badgeColor(tool.border),
        background: tool.bg,
        border: `1px solid ${tool.border}`,
        borderRadius: '4px',
        padding: '2px 5px',
        letterSpacing: '0.3px',
      }}>
        {tool.pct}%
      </div>

      {/* Logo */}
      <div style={{
        width: '56px',
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {tool.logo ? (
          <img
            src={tool.logo}
            width="44"
            height="44"
            alt={tool.name}
            loading="lazy"
            style={{
              display: 'block',
              filter: tool.imgFilter || 'drop-shadow(0 2px 6px rgba(0,0,0,0.5))',
              transition: 'transform 0.25s ease',
            }}
            onMouseEnter={e => { e.target.style.transform = 'scale(1.15)' }}
            onMouseLeave={e => { e.target.style.transform = 'scale(1)' }}
            onError={e => {
              e.target.style.display = 'none'
              e.target.parentElement.innerHTML = `<span style="font-family:JetBrains Mono,monospace;font-size:${tool.abbr && tool.abbr.length > 3 ? '16px' : '22px'};font-weight:700;color:white">${tool.abbr || tool.name.slice(0,2).toUpperCase()}</span>`
            }}
          />
        ) : (
          <span style={{
            fontFamily: 'JetBrains Mono,monospace',
            fontSize: tool.abbr && tool.abbr.length > 3 ? '16px' : '22px',
            fontWeight: 700,
            color: 'white',
          }}>{tool.abbr}</span>
        )}
      </div>

      {/* Tool name */}
      <span style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '11px',
        fontWeight: 600,
        color: '#EEEEF5',
        textAlign: 'center',
        letterSpacing: '0.3px',
        lineHeight: '1.3',
      }}>
        {tool.name}
      </span>

      {/* Brand-color bottom bar */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '16px',
        right: '16px',
        height: '2px',
        background: bottomBar(tool.border),
        borderRadius: '1px',
      }} />
    </motion.div>
  )
}

function MetricRow({ name, pct, brandColor, accentColor, index }) {
  const [count, setCount] = useState(0)
  const [barPct, setBarPct] = useState(0)
  const rowRef = useRef(null)
  const startedRef = useRef(false)

  useEffect(() => {
    const el = rowRef.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || startedRef.current) return
      startedRef.current = true
      setTimeout(() => {
        const start = performance.now()
        const duration = 1200
        const tick = (now) => {
          const t = Math.min((now - start) / duration, 1)
          const ease = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2
          setCount(Math.round(ease * pct))
          setBarPct(ease * pct)
          if (t < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }, index * 100)
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [pct, index])

  return (
    <div ref={rowRef} style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: brandColor, flexShrink: 0 }} />
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#EEEEF5', flex: 1 }}>
          {name}
        </span>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, fontWeight: 700, color: accentColor }}>
          {count}%
        </span>
      </div>
      <div style={{ height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${barPct}%`,
          background: `linear-gradient(90deg, ${brandColor}, ${hexToRgba(brandColor, 0.6)})`,
          borderRadius: 2,
        }} />
      </div>
    </div>
  )
}

function CategoryCard({ cat, index }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#111118' : '#0D0D14',
        border: '1px solid rgba(255,255,255,0.06)',
        borderTop: `3px solid ${cat.accent}`,
        borderRadius: '0 0 12px 12px',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? `0 8px 32px ${hexToRgba(cat.accent, 0.12)}` : 'none',
      }}
    >
      <div style={{ padding: '20px 24px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 28, height: 28, borderRadius: '50%',
          background: cat.accent,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, color: '#fff', flexShrink: 0,
        }}>
          {cat.icon}
        </div>
        <h3 style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 14, fontWeight: 700, color: '#EEEEF5', margin: 0,
        }}>
          {cat.title}
        </h3>
      </div>
      <div style={{ padding: '0 24px 24px' }}>
        {cat.skills.map((skill, si) => (
          <MetricRow
            key={skill.name}
            name={skill.name}
            pct={skill.pct}
            brandColor={skill.brandColor}
            accentColor={cat.accent}
            index={si}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default function SkillsSection() {
  return (
    <section id="skills" style={{ padding: '100px 0', background: '#050509' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>

        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{
            fontFamily: 'JetBrains Mono, monospace', color: '#00F5FF', fontSize: '12px',
            letterSpacing: '3px', display: 'block', marginBottom: '12px',
          }}>
            ◈ EXPERTISE
          </span>
          <h2 style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: 'clamp(28px,4vw,42px)',
            fontWeight: 700, color: '#EEEEF5',
          }}>
            Tech Stack &amp; Skills
          </h2>
        </div>

        {/* Category cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
          marginBottom: '48px',
        }}>
          {categories.map((cat, ci) => (
            <CategoryCard key={cat.title} cat={cat} index={ci} />
          ))}
        </div>

        {/* Tools grid header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            color: '#6B6B8A', fontSize: 11, letterSpacing: 3,
          }}>
            ADDITIONAL TOOLS
          </span>
        </div>

        {/* AWS Services group */}
        <div style={{ marginBottom: '36px' }}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '10px',
            fontWeight: 700,
            color: '#FF9900',
            letterSpacing: '2.5px',
            marginBottom: '12px',
          }}>
            AWS SERVICES
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'flex-start' }}>
            {awsTools.map((tool, i) => (
              <ToolCard key={tool.name} tool={tool} index={i} />
            ))}
          </div>
        </div>

        {/* DevOps & Tools group */}
        <div style={{ marginBottom: '36px' }}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '10px',
            fontWeight: 700,
            color: '#00F5FF',
            letterSpacing: '2.5px',
            marginBottom: '12px',
          }}>
            DEVOPS &amp; TOOLS
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'flex-start' }}>
            {devopsTools.map((tool, i) => (
              <ToolCard key={tool.name} tool={tool} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
