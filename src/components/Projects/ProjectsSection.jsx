import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

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

const projects = [
  {
    id: 'cargo',
    icon: '📦',
    name: 'CARGO PROJECT',
    stack_summary: 'Next.js → GitHub Actions → FTP → cPanel → cargo.aryuprojects.com',
    badge: '● LIVE IN PRODUCTION',
    badge_bg: 'rgba(0,255,136,0.15)',
    badge_color: '#00FF88',
    diagram_src: './assets/cargo-architecture.png',
    // TODO: Place your Cargo architecture image at public/assets/cargo-architecture.png
    diagram_alt: 'Cargo CI/CD and Deployment Architecture Diagram',
    problem: 'GitHub Actions CI/CD succeeded but the browser continued serving stale content. Root cause: subdomain document root was set to /Cargo instead of /Cargo/out where Next.js exports the static files.',
    solution: 'Updated cPanel subdomain document root to /public_html/Cargo/out. Validated the fix using stat index.html for file timestamps, curl for live content verification, and manual file injection test.',
    result: 'Every git push to main branch deploys live in under 2 minutes with zero manual steps. Correct static files served 100% of the time. Full pipeline: code → GitHub → Actions → FTP → live.',
    tech: ['Next.js 16.x', 'GitHub Actions', 'FTP Deploy', 'cPanel', 'Apache', 'PHP', 'HTTPS', 'GitHub Secrets'],
    metrics: [
      { value: '5',      label: 'Pipeline stages' },
      { value: '<2 min', label: 'Deploy time'      },
      { value: '0',      label: 'Manual steps'     },
      { value: 'HTTPS',  label: 'SSL enforced'     },
    ],
  },
  {
    id: 'hrms',
    icon: '🏗',
    name: 'HRMS APPLICATION',
    stack_summary: 'Jenkins → Docker → Nginx → MongoDB → AWS EC2 → hrms.domain.com',
    badge: '◈ ENTERPRISE GRADE',
    badge_bg: 'rgba(0,85,255,0.15)',
    badge_color: '#4499FF',
    diagram_src: './assets/hrms-architecture.png',
    // TODO: Place your HRMS architecture image at public/assets/hrms-architecture.png
    diagram_alt: 'HRMS Application Deployment Architecture Diagram',
    problem: "User-uploaded files — profile images, documents, exports — disappeared after every container redeploy. The container's local /app/uploads directory was wiped on each restart, losing all historical user data permanently.",
    solution: 'Mounted host path /var/www/ayhrms-node-main/uploads into the container at /app/uploads using a Docker named volume. Storage completely decoupled from container lifecycle. All existing historical data restored immediately.',
    result: 'Zero data loss across all subsequent deployments, image upgrades, and container restarts. Persistent storage is now production-grade. Full 3-container stack with Jenkins multibranch CI/CD running on AWS EC2.',
    tech: ['Docker', 'Jenkins', 'Node.js', 'React', 'Nginx', 'MongoDB', 'AWS EC2', 'Amazon S3', 'Route 53', 'CloudWatch', 'WAF', 'SSL/TLS'],
    metrics: [
      { value: '3',       label: 'Containers'     },
      { value: '2',       label: 'Environments'   },
      { value: 'Jenkins', label: 'CI/CD engine'   },
      { value: 'WAF+SSL', label: 'Security layer' },
    ],
  },
  {
    id: 'drupal',
    icon: '🌿',
    name: 'WOOD LAWN DRUPAL DEPLOYMENT',
    stack_summary: 'Apache → PHP 8.1-FPM → Drupal CMS → MySQL → woodlawnandlandscaping.com',
    badge: '◈ CMS PRODUCTION',
    badge_bg: 'rgba(0,245,255,0.12)',
    badge_color: '#00F5FF',
    diagram_src: './assets/drupal-architecture.png',
    // TODO: Add drupal architecture image
    diagram_alt: 'Drupal Deployment Architecture',
    problem: 'Client site needed zero-downtime migration to a new server with complex Drupal CMS dependencies — multiple backup archives, database recreation, Composer-managed PHP packages, and strict file permission requirements.',
    solution: 'Executed a structured 10-step deployment procedure: enabled maintenance mode, extracted code and files from .tar.gz backups, recreated MySQL database, imported SQL dump, ran composer install, fixed file permissions (755/644/775), and cleared Drupal cache.',
    result: 'Zero-downtime deployment achieved. Site live at woodlawnandlandscaping.com with all content intact. Apache VirtualHost and PHP-FPM verified operational via drush status and live curl tests.',
    tech: ['Apache', 'PHP 8.1-FPM', 'Drupal CMS', 'MySQL', 'Composer', 'Drush', 'Linux', 'Bash'],
    metrics: [
      { value: '10',       label: 'Deploy steps'   },
      { value: '0',        label: 'Downtime'       },
      { value: 'PHP 8.1',  label: 'Runtime'        },
      { value: 'HTTPS',    label: 'SSL live'       },
    ],
  },
  {
    id: 'wordpress',
    icon: '📝',
    name: 'WORDPRESS SITE MIGRATION',
    stack_summary: 'Old Server → SCP Transfer → New Hosting → MySQL → GitHub → wellness site',
    badge: '◈ MIGRATION',
    badge_bg: 'rgba(0,255,136,0.12)',
    badge_color: '#00FF88',
    diagram_src: './assets/wordpress-architecture.png',
    // TODO: Add wordpress architecture image
    diagram_alt: 'WordPress Migration Architecture',
    problem: 'Full WordPress site migration between hosting providers with database, media files, and configuration dependencies. DB_USER mismatch caused connection failure post-migration. Git tracking needed for theme and plugin version control.',
    solution: 'Exported database via mysqldump, transferred files and backup.sql via SSH/SCP, reconfigured wp-config.php with correct credentials, fixed DB_USER mismatch, updated wp_options siteurl/home values, initialized Git repo with .gitignore excluding sensitive files.',
    result: 'Site fully migrated with zero data loss. All WordPress tables intact, media accessible, and wp-content (themes/plugins) version-controlled on GitHub for future deployments.',
    tech: ['WordPress', 'MySQL', 'SSH/SCP', 'wp-config.php', 'Git', 'GitHub', 'Bash', 'Linux'],
    metrics: [
      { value: '0',      label: 'Data loss'       },
      { value: 'Git',    label: 'Version control' },
      { value: 'SSH',    label: 'Secure transfer' },
      { value: 'HTTPS',  label: 'Live verified'   },
    ],
  },
  {
    id: 'pss',
    icon: '📊',
    name: 'PSS LIVE SERVER DEVOPS',
    stack_summary: 'Prometheus → Node Exporter → Grafana → Email Alerts → Cron Automation',
    badge: '● MONITORING LIVE',
    badge_bg: 'rgba(244,104,0,0.12)',
    badge_color: '#F46800',
    diagram_src: './assets/pss-architecture.png',
    // TODO: Add PSS architecture image
    diagram_alt: 'PSS Monitoring Stack Architecture',
    problem: 'Production server had no observability — no metrics, no alerts, no automated backups. RAM exhaustion was causing MySQL and Docker container crashes (OOM Kill). Disk was growing unbounded from unused Docker images.',
    solution: 'Deployed full monitoring stack via Docker Compose: Prometheus (metrics), Node Exporter (CPU/RAM/disk), Grafana (dashboards + email alerts via SMTP). Enabled swap memory for OOM protection. Automated daily DB backups and weekly Docker image cleanup via cron.',
    result: 'Complete observability achieved: CPU, memory, disk monitored with email alerts at thresholds. Daily DB backups running at 02:00 AM. Docker cleanup every Monday 12:00. Zero crash incidents post-implementation.',
    tech: ['Docker Compose', 'Prometheus', 'Grafana', 'Node Exporter', 'Cron', 'SMTP', 'Bash', 'Linux', 'MySQL'],
    metrics: [
      { value: '3',      label: 'Containers'      },
      { value: 'Daily',  label: 'Auto backup'     },
      { value: '85%',    label: 'Disk alert'      },
      { value: 'SMTP',   label: 'Email alerts'    },
    ],
  },
]

function ProjectCard({ project, onViewDiagram, index }) {
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

      {/* View button */}
      <div style={{ padding: '14px 20px', borderTop: '1px solid rgba(0,245,255,0.08)' }}>
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
      </div>
    </motion.div>
  )
}

export default function ProjectsSection() {
  const [modalProject, setModalProject] = useState(null)

  const activeProject = projects.find(p => p.id === modalProject)

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
            <ProjectCard key={project.id} project={project} onViewDiagram={setModalProject} index={i} />
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
    </section>
  )
}
