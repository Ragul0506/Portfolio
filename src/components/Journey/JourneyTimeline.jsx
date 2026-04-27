import { motion } from 'framer-motion'

const journey = [
  {
    year: '2024',
    title: 'Freelance Developer — Guvi',
    desc: 'Started building full-stack web applications as a freelancer through Guvi. Learned Linux server management, deployed first real production projects, discovered a deep interest in automation and infrastructure.',
    tags: ['Full-Stack', 'Linux', 'Freelancing'],
    side: 'left',
    active: false,
  },
  {
    year: '2025',
    title: 'DevOps Deep Dive',
    desc: 'Self-trained in DevOps: Docker containerization, Jenkins multibranch pipelines, CI/CD automation, Nginx reverse proxy configuration, MongoDB administration, and AWS cloud services.',
    tags: ['Docker', 'Jenkins', 'CI/CD', 'AWS', 'Nginx'],
    side: 'right',
    active: false,
  },
  {
    year: 'Jan 2026',
    title: 'DevOps Engineer — Aryu Technologies',
    desc: 'Joined Aryu Technologies. Building production HRMS application on AWS EC2 with Jenkins CI/CD, 3-container Docker architecture, Nginx reverse proxy, persistent volume storage, and full monitoring stack.',
    tags: ['AWS EC2', 'Production', 'HRMS', 'CloudWatch'],
    side: 'left',
    active: false,
  },
  {
    year: 'NOW',
    title: 'Active — Infrastructure & Automation',
    desc: 'Deploying enterprise-grade infrastructure with security hardening, WAF protection, SSL enforcement, automated backups, monitoring and observability. Building towards cloud architect role.',
    tags: ['Cloud Architect', 'Security', 'Monitoring', 'Active'],
    side: 'right',
    active: true,
  },
]

export default function JourneyTimeline() {
  return (
    <section id="journey" style={{ padding: '100px 0', background: '#050509' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>

        {/* Section title */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{
            fontFamily: 'JetBrains Mono, monospace', color: '#00F5FF', fontSize: '12px',
            letterSpacing: '3px', display: 'block', marginBottom: '12px',
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
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Center line */}
          <div style={{
            position: 'absolute', left: '50%', top: 0, bottom: 0,
            width: '2px', background: 'rgba(0,245,255,0.2)',
            transform: 'translateX(-50%)',
          }} className="timeline-line" />

          {journey.map((item, i) => (
            <div key={i} style={{
              display: 'flex', marginBottom: '48px', position: 'relative',
              flexDirection: item.side === 'left' ? 'row' : 'row-reverse',
              alignItems: 'center', gap: '0',
            }} className="timeline-entry">

              {/* Card */}
              <motion.div
                initial={{ opacity: 0, x: item.side === 'left' ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{ width: 'calc(50% - 32px)', background: '#0D0D14',
                  border: '1px solid rgba(0,245,255,0.1)', borderRadius: '12px',
                  padding: '24px',
                }}
              >
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace', color: '#00F5FF',
                  fontSize: '12px', letterSpacing: '2px', marginBottom: '8px',
                }}>
                  {item.year}
                </div>
                <h3 style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: '17px',
                  fontWeight: 700, color: '#EEEEF5', marginBottom: '10px',
                }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#6B6B8A', lineHeight: '1.7', marginBottom: '14px' }}>
                  {item.desc}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {item.tags.map(tag => (
                    <span key={tag} style={{
                      background: 'rgba(0,245,255,0.08)', color: '#00F5FF',
                      borderRadius: '4px', padding: '3px 10px', fontSize: '11px',
                      fontFamily: 'JetBrains Mono, monospace',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Center dot */}
              <div style={{
                width: '64px', display: 'flex', justifyContent: 'center',
                flexShrink: 0, position: 'relative', zIndex: 1,
              }}>
                <div style={{
                  width: '16px', height: '16px', borderRadius: '50%',
                  background: '#00F5FF',
                  boxShadow: item.active
                    ? '0 0 0 4px rgba(0,245,255,0.2), 0 0 16px rgba(0,245,255,0.5)'
                    : 'none',
                }} />
              </div>

              {/* Spacer */}
              <div style={{ width: 'calc(50% - 32px)' }} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .timeline-line { left: 20px !important; transform: none !important; }
          .timeline-entry { flex-direction: column !important; padding-left: 52px; }
          .timeline-entry > div:first-child { width: 100% !important; }
          .timeline-entry > div:nth-child(2) { position: absolute; left: 12px; top: 24px; }
          .timeline-entry > div:last-child { display: none; }
        }
      `}</style>
    </section>
  )
}
