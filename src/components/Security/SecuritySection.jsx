import { motion } from 'framer-motion'

const practices = [
  {
    icon: '🔐',
    title: 'GitHub Secrets',
    desc: 'All credentials stored as encrypted repo secrets. Zero hardcoded values in codebase.',
    tag: 'CREDENTIAL MGMT',
    tagColor: '#238636',
    severity: 'CRITICAL',
    severityColor: '#00FF88',
  },
  {
    icon: '🔒',
    title: 'SSL / HTTPS Enforced',
    desc: 'Certbot SSL on all domains. Nginx auto-redirects HTTP → HTTPS. A+ SSL Labs rating.',
    tag: 'TRANSPORT',
    tagColor: '#003A70',
    severity: 'HIGH',
    severityColor: '#00F5FF',
  },
  {
    icon: '🛡',
    title: 'AWS WAF',
    desc: 'CloudFront edge firewall blocking SQLi, XSS, and known malicious IP ranges.',
    tag: 'PERIMETER',
    tagColor: '#DD344C',
    severity: 'CRITICAL',
    severityColor: '#00FF88',
  },
  {
    icon: '📁',
    title: 'No .git Exposed',
    desc: '.git directory removed from public web root. No sensitive commit history accessible.',
    tag: 'EXPOSURE',
    tagColor: '#F05032',
    severity: 'MEDIUM',
    severityColor: '#FF9900',
  },
  {
    icon: '👤',
    title: 'Least Privilege',
    desc: 'Non-root Docker containers. Role-based MongoDB access. Prod/staging fully isolated.',
    tag: 'ACCESS CONTROL',
    tagColor: '#7B42BC',
    severity: 'HIGH',
    severityColor: '#00F5FF',
  },
  {
    icon: '🔍',
    title: 'Quality Gates',
    desc: 'SonarQube + Trivy + OWASP scan in every Jenkins pipeline. Zero critical issues threshold.',
    tag: 'SAST / SCA',
    tagColor: '#CB3032',
    severity: 'HIGH',
    severityColor: '#00F5FF',
  },
]

const miniStats = [
  { label: 'Controls', value: '6 / 6' },
  { label: 'Secrets', value: 'ZERO exposed' },
  { label: 'SSL', value: 'A+ rating' },
]

function PracticeCard({ practice, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -4, borderColor: 'rgba(0,245,255,0.25)' }}
      style={{
        background: '#0D0D14',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '12px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{ fontSize: '22px' }}>{practice.icon}</span>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '9px',
          fontWeight: 700,
          color: practice.severityColor,
          background: practice.severityColor + '15',
          border: '1px solid ' + practice.severityColor + '40',
          padding: '3px 8px',
          borderRadius: '4px',
          letterSpacing: '1px',
        }}>
          {practice.severity}
        </span>
      </div>

      <div style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '9px',
        fontWeight: 700,
        color: practice.tagColor,
        letterSpacing: '1.5px',
      }}>
        ◈ {practice.tag}
      </div>

      <div style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '13px',
        fontWeight: 700,
        color: '#EEEEF5',
      }}>
        {practice.title}
      </div>

      <p style={{
        fontSize: '12px',
        color: '#6B6B8A',
        lineHeight: '1.6',
        margin: 0,
      }}>
        {practice.desc}
      </p>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        marginTop: 'auto',
        paddingTop: '8px',
        borderTop: '1px solid rgba(0,245,255,0.06)',
      }}>
        <span style={{ color: '#00FF88', fontSize: '12px' }}>✓</span>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#00FF88' }}>
          IMPLEMENTED
        </span>
      </div>
    </motion.div>
  )
}

export default function SecuritySection() {
  return (
    <section id="security" style={{ padding: '100px 0', background: '#050509' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>

        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            color: '#00F5FF',
            fontSize: '12px',
            letterSpacing: '3px',
            display: 'block',
            marginBottom: '12px',
          }}>
            ◈ SECURITY AUDIT REPORT
          </span>
          <h2 style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 'clamp(28px,4vw,42px)',
            fontWeight: 700,
            color: '#EEEEF5',
          }}>
            Security Best Practices
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'clamp(260px, 30%, 320px) 1fr',
          gap: '24px',
          alignItems: 'start',
        }}
          className="security-grid"
        >
          {/* Left: Score Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              background: '#0D0D14',
              border: '1px solid rgba(0,245,255,0.12)',
              borderRadius: '16px',
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '20px',
            }}
          >
            {/* Score circle */}
            <div style={{ position: 'relative', width: '140px', height: '140px' }}>
              <svg width="140" height="140" viewBox="0 0 140 140">
                <circle
                  cx="70" cy="70" r="60"
                  fill="none"
                  stroke="rgba(0,245,255,0.08)"
                  strokeWidth="8"
                />
                <circle
                  cx="70" cy="70" r="60"
                  fill="none"
                  stroke="#00F5FF"
                  strokeWidth="8"
                  strokeDasharray="327 377"
                  strokeDashoffset="94"
                  strokeLinecap="round"
                  style={{ filter: 'drop-shadow(0 0 6px rgba(0,245,255,0.5))' }}
                  transform="rotate(-90 70 70)"
                />
              </svg>
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '32px',
                  fontWeight: 700,
                  color: '#00F5FF',
                }}>87</span>
                <span style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '10px',
                  color: '#6B6B8A',
                  letterSpacing: '1px',
                }}>/ 100</span>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '14px',
                fontWeight: 700,
                color: '#EEEEF5',
              }}>
                Security Score
              </div>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '11px',
                color: '#00FF88',
                marginTop: '4px',
              }}>
                ● HARDENED
              </div>
            </div>

            {/* Mini stats */}
            {miniStats.map(s => (
              <div key={s.label} style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 0',
                borderBottom: '1px solid rgba(0,245,255,0.06)',
              }}>
                <span style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '11px',
                  color: '#6B6B8A',
                }}>{s.label}</span>
                <span style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#00F5FF',
                }}>{s.value}</span>
              </div>
            ))}
          </motion.div>

          {/* Right: 2x3 grid of practice cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
          }}
            className="practices-grid"
          >
            {practices.map((p, i) => (
              <PracticeCard key={p.title} practice={p} index={i} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .security-grid {
            grid-template-columns: 1fr !important;
          }
          .practices-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 500px) {
          .practices-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
