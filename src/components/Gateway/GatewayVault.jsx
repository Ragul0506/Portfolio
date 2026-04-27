import { useEffect, useState } from 'react'

const awsTools = [
  { name:'EC2',        abbr:'EC2', logo:'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original.svg',       bg:'#1a1200' },
  { name:'S3',         abbr:'S3',  logo:'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg', bg:'#0d1a0d' },
  { name:'EKS',        abbr:'EKS', logo:'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg',                    bg:'#0d1120' },
  { name:'Lambda',     abbr:'λ',   logo:'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original.svg',       bg:'#1a1200' },
  { name:'VPC',        abbr:'VPC', logo:'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg', bg:'#150d2d' },
  { name:'CloudFront', abbr:'CF',  logo:'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg', bg:'#150d2d' },
  { name:'Route53',    abbr:'R53', logo:null,                                                                                                               bg:'#2d0d0d' },
  { name:'WAF',        abbr:'WAF', logo:null,                                                                                                               bg:'#2d0d10' },
]

const devopsTools = [
  { name:'Docker',     abbr:'D',   logo:'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',         bg:'#0d1f2d' },
  { name:'Kubernetes', abbr:'K8s', logo:'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg', bg:'#0d1120' },
  { name:'Terraform',  abbr:'Tf',  logo:'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original.svg',   bg:'#150d2d' },
  { name:'Jenkins',    abbr:'J',   logo:'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jenkins/jenkins-original.svg',       bg:'#2d0d0d' },
  { name:'Nginx',      abbr:'N',   logo:'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg',           bg:'#0d2015' },
  { name:'Grafana',    abbr:'G',   logo:'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/grafana/grafana-original.svg',       bg:'#2d1800' },
  { name:'Ansible',    abbr:'A',   logo:'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ansible/ansible-original.svg',       bg:'#2d0000' },
  { name:'GitHub',     abbr:'GH',  logo:'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',         bg:'#161b22' },
]

function TrainCar({ tool }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', flexShrink:0, gap:0 }}>
      <div style={{
        width:'72px', height:'56px',
        background: tool.bg,
        border:'1px solid rgba(255,255,255,0.1)',
        borderRadius:'4px',
        display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'center', gap:'4px',
      }}>
        <div style={{
          width:'48px', height:'30px',
          background:'rgba(0,0,0,0.5)',
          border:'1px solid rgba(255,255,255,0.12)',
          borderRadius:'4px',
          display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden',
        }}>
          {tool.logo ? (
            <img src={tool.logo} width="22" height="22" alt={tool.name}
              style={{ display:'block', filter:'brightness(1.2)' }}
              onError={e => { e.target.style.display='none'; e.target.insertAdjacentHTML('afterend',`<span style="font-family:JetBrains Mono;font-size:10px;font-weight:700;color:white">${tool.abbr}</span>`) }}
            />
          ) : (
            <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'10px', fontWeight:700, color:'white' }}>{tool.abbr}</span>
          )}
        </div>
        <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'7px', color:'rgba(255,255,255,0.6)', whiteSpace:'nowrap' }}>{tool.name}</span>
      </div>
      <div style={{ display:'flex', gap:'28px', marginTop:'2px' }}>
        {[0,1].map(i => (
          <div key={i} style={{ width:'14px', height:'14px', borderRadius:'50%', background:'#0d0d14', border:'2px solid rgba(255,255,255,0.25)' }}/>
        ))}
      </div>
    </div>
  )
}

function Engine({ label, color, flip }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', flexShrink:0, gap:0 }}>
      <div style={{
        width:'100px', height:'56px', position:'relative',
        transform: flip ? 'scaleX(-1)' : 'none',
      }}>
        <div style={{
          position:'absolute', left:'16px', top:'4px',
          width:'78px', height:'48px',
          background:'linear-gradient(135deg,#1a2535,#0d1420)',
          border:`1.5px solid ${color}50`,
          borderRadius:'4px',
          display:'flex', flexDirection:'column', justifyContent:'space-between', padding:'6px 8px',
        }}>
          <div style={{ width:'34px', height:'16px', background:'rgba(0,0,0,0.7)', border:`1px solid ${color}30`, borderRadius:'2px' }}/>
          <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'8px', fontWeight:700, color, letterSpacing:'2px', transform: flip ? 'scaleX(-1)' : 'none' }}>{label}</span>
        </div>
        <div style={{
          position:'absolute', right:0, top:'4px',
          width:0, height:0,
          borderTop:'28px solid transparent',
          borderBottom:'24px solid transparent',
          borderLeft:`16px solid ${color}40`,
        }}/>
        <div style={{
          position:'absolute', right:'2px', top:'50%', transform:'translateY(-50%)',
          width:'9px', height:'9px', borderRadius:'50%',
          background:color,
          boxShadow:`0 0 14px ${color}, 0 0 30px ${color}60`,
        }}/>
      </div>
      <div style={{ display:'flex', gap:'48px', marginTop:'2px', marginLeft:'18px' }}>
        {[0,1].map(i => (
          <div key={i} style={{ width:'16px', height:'16px', borderRadius:'50%', background:'#0a0a12', border:`2px solid ${color}70`, boxShadow:`0 0 6px ${color}40`, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <div style={{ width:'5px', height:'5px', borderRadius:'50%', background:color, opacity:0.7 }}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function GatewayVault({ onEnter }) {
  const [phase, setPhase] = useState(0)
  const [tunnelHidden, setTunnelHidden] = useState(false)

  useEffect(() => {
    // phase 0 = trains off screen
    // phase 1 = trains move to center (slow)
    // phase 2 = trains enter portal (fast + fade)
    // phase 3 = button appears
    const t1 = setTimeout(() => setPhase(1), 400)
    const t2 = setTimeout(() => setPhase(2), 3600)
    const t3 = setTimeout(() => setTunnelHidden(true), 5000)
    const t4 = setTimeout(() => setPhase(3), 5600)
    const t5 = setTimeout(onEnter, 15000)
    return () => [t1,t2,t3,t4,t5].forEach(clearTimeout)
  }, [onEnter])

  // Train total width ≈ 9 × 76px + 104px engine = ~788px
  // Portal center = 50vw
  // AWS train (left:0, moves right):
  //   phase0: hidden at left = translateX(-820px)  [just off screen left]
  //   phase1: stop = translateX(calc(50vw - 820px)) [engine nose near portal]
  //   phase2: exit = translateX(calc(100vw + 50px))  [off screen right]
  //
  // DevOps train (right:0, flexDir row-reverse, moves left):
  //   phase0: hidden at right = translateX(820px)
  //   phase1: stop = translateX(calc(-50vw + 820px))
  //   phase2: exit = translateX(calc(-100vw - 50px))

  const awsStyle = {
    position:'absolute',
    top:'calc(34vh - 72px)',
    left:0,
    display:'flex', alignItems:'flex-end', gap:'4px',
    transform:
      phase === 0 ? 'translateX(-900px)' :
      phase === 1 ? 'translateX(calc(50vw - 820px))' :
      'translateX(calc(100vw + 100px))',
    opacity: phase >= 2 ? 0 : 1,
    transition:
      phase === 0 ? 'none' :
      phase === 1 ? 'transform 2.8s cubic-bezier(0.25,0.1,0.3,1)' :
      'transform 1.6s cubic-bezier(0.7,0,1,0.5), opacity 1s ease 0.3s',
  }

  const devopsStyle = {
    position:'absolute',
    top:'calc(64vh - 72px)',
    right:0,
    display:'flex', alignItems:'flex-end', flexDirection:'row-reverse', gap:'4px',
    transform:
      phase === 0 ? 'translateX(900px)' :
      phase === 1 ? 'translateX(calc(-50vw + 820px))' :
      'translateX(calc(-100vw - 100px))',
    opacity: phase >= 2 ? 0 : 1,
    transition:
      phase === 0 ? 'none' :
      phase === 1 ? 'transform 2.8s cubic-bezier(0.25,0.1,0.3,1)' :
      'transform 1.6s cubic-bezier(0.7,0,1,0.5), opacity 1s ease 0.3s',
  }

  return (
    <div style={{ position:'fixed', inset:0, zIndex:9999, background:'#050509', overflow:'hidden' }}>

      {/* AWS track */}
      <div style={{ position:'absolute', top:'34vh', left:0, right:0, height:'2px', background:'linear-gradient(90deg,transparent,rgba(255,153,0,0.2) 20%,rgba(255,153,0,0.2) 80%,transparent)' }}/>

      {/* DevOps track */}
      <div style={{ position:'absolute', top:'64vh', left:0, right:0, height:'2px', background:'linear-gradient(90deg,transparent,rgba(0,245,255,0.18) 20%,rgba(0,245,255,0.18) 80%,transparent)' }}/>

      {/* Track labels */}
      {phase === 1 && (
        <>
          <div style={{ position:'absolute', top:'calc(34vh - 24px)', left:'4%', fontFamily:'JetBrains Mono,monospace', fontSize:'10px', fontWeight:700, color:'rgba(255,153,0,0.5)', letterSpacing:'3px', animation:'fadeIn 0.5s ease' }}>→ AWS SERVICES</div>
          <div style={{ position:'absolute', top:'calc(64vh - 24px)', right:'4%', fontFamily:'JetBrains Mono,monospace', fontSize:'10px', fontWeight:700, color:'rgba(0,245,255,0.4)', letterSpacing:'3px', animation:'fadeIn 0.5s ease' }}>DEVOPS TOOLS ←</div>
        </>
      )}

      {/* AWS TRAIN — wagons first so engine is rightmost (front of right-moving train) */}
      <div style={awsStyle}>
        {awsTools.map(t => <TrainCar key={t.name} tool={t} />)}
        <Engine label="AWS" color="#FF9900" flip={false} />
      </div>

      {/* DEVOPS TRAIN — wagons first; row-reverse makes engine leftmost (front of left-moving train) */}
      <div style={devopsStyle}>
        {devopsTools.map(t => <TrainCar key={t.name} tool={t} />)}
        <Engine label="DEVOPS" color="#00F5FF" flip={true} />
      </div>

      {/* CENTER PORTAL */}
      <div style={{
        position:'absolute', top:'50%', left:'50%',
        transform:'translate(-50%,-50%)',
        display:'flex', flexDirection:'column', alignItems:'center',
        zIndex:5,
        opacity: tunnelHidden ? 0 : 1,
        transition: 'opacity 0.7s ease',
        pointerEvents: 'none',
      }}>
        <div style={{
          width:'110px', height:'90px',
          background:'#000',
          borderRadius:'55px 55px 0 0',
          border:'2px solid rgba(0,245,255,0.3)',
          borderBottom:'none',
          display:'flex', alignItems:'center', justifyContent:'center',
          boxShadow: phase >= 2 ? '0 0 60px rgba(0,245,255,0.5), inset 0 0 40px rgba(0,245,255,0.15)' : 'none',
          transition:'box-shadow 1s ease',
        }}>
          <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'9px', fontWeight:700, color:'rgba(0,245,255,0.4)', letterSpacing:'2px' }}>DEVOPS</span>
        </div>
        <div style={{
          width:'130px', height:'48px',
          background:'#0d0d14',
          border:'2px solid rgba(0,245,255,0.2)',
          borderTop:'none', borderRadius:'0 0 8px 8px',
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>
          <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'9px', color:'rgba(0,245,255,0.3)', letterSpacing:'2px' }}>WORLD</span>
        </div>
      </div>

      {/* ENTER BUTTON */}
      {phase >= 3 && (
        <div style={{
          position:'absolute', top:'50%', left:'50%',
          transform:'translate(-50%,-50%)',
          display:'flex', flexDirection:'column', alignItems:'center', gap:'12px',
          animation:'fadeIn 0.8s ease forwards',
          zIndex:10,
        }}>
          <button onClick={onEnter} style={{
            fontFamily:'JetBrains Mono,monospace',
            fontSize:'clamp(11px,1.8vw,15px)',
            fontWeight:700, letterSpacing:'4px',
            color:'#00F5FF',
            background:'linear-gradient(135deg,rgba(0,245,255,0.08),rgba(0,85,255,0.06))',
            border:'2px solid #00F5FF',
            padding:'20px 52px', borderRadius:'4px', cursor:'pointer',
            whiteSpace:'nowrap',
            animation:'neon-pulse 2s ease-in-out infinite',
          }}>
            [ ENTER RAGULRAJ'S DEVOPS WORLD ]
          </button>
          <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'10px', color:'#6B6B8A', letterSpacing:'2px' }}>
            16 tools · 2 trains · 1 engineer
          </span>
        </div>
      )}

      {/* SKIP */}
      <button onClick={onEnter} style={{
        position:'absolute', top:'20px', right:'24px',
        fontFamily:'JetBrains Mono,monospace', fontSize:'11px',
        color:'#6B6B8A', background:'transparent', border:'none', cursor:'pointer', letterSpacing:'1px',
      }}>SKIP →</button>

      <style>{`
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
      `}</style>
    </div>
  )
}
