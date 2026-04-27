import { useState, useEffect, useRef, useCallback } from 'react'

const W = 860, H = 300

/* ─── Background ───────────────────────────────────────────────────────── */
function drawBackground(ctx) {
  ctx.fillStyle = '#07070E'
  ctx.fillRect(0, 0, W, H)
  ctx.strokeStyle = 'rgba(0,245,255,0.03)'
  ctx.lineWidth = 0.5
  for (let x = 0; x < W; x += 40) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke()
  }
  for (let y = 0; y < H; y += 40) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
  }
}

/* ─── HUD ──────────────────────────────────────────────────────────────── */
function drawHUD(ctx, scene, t) {
  const labels = [
    'SCENE 1 — Developer writes code',
    'SCENE 2 — git push: code enters the tunnel',
    'SCENE 3 — GitHub fires webhook to Jenkins',
    'SCENE 4 — Jenkins receives pipeline data',
    'SCENE 5 — Pipeline stages executing',
    'SCENE 6 — Deployment successful',
  ]
  ctx.fillStyle = 'rgba(0,0,0,0.5)'
  ctx.fillRect(0, 0, W, 28)
  ctx.fillStyle = '#00F5FF'
  ctx.font = 'bold 10px JetBrains Mono, monospace'
  ctx.textAlign = 'left'
  ctx.fillText(labels[scene], 16, 18)
  ctx.fillStyle = 'rgba(255,255,255,0.06)'
  ctx.fillRect(0, 26, W, 2)
  ctx.fillStyle = '#00F5FF'
  ctx.fillRect(0, 26, W * t, 2)
}

/* ─── Scene 0 — Developer types code ──────────────────────────────────── */
function drawScene0(ctx, t, ms) {
  ctx.fillStyle = '#0D0D1A'
  ctx.strokeStyle = 'rgba(0,245,255,0.2)'
  ctx.lineWidth = 1.5
  ctx.beginPath(); ctx.roundRect(120, 50, 400, 200, 8); ctx.fill()
  ctx.beginPath(); ctx.roundRect(120, 50, 400, 200, 8); ctx.stroke()

  ctx.fillStyle = '#1A1A2E'
  ctx.fillRect(120, 50, 400, 24)
  ;[{ c: '#FF5F57', x: 138 }, { c: '#FEBC2E', x: 156 }, { c: '#28C840', x: 174 }].forEach(b => {
    ctx.fillStyle = b.c
    ctx.beginPath(); ctx.arc(b.x, 62, 5, 0, Math.PI * 2); ctx.fill()
  })
  ctx.fillStyle = '#6B6B8A'
  ctx.font = '9px JetBrains Mono, monospace'
  ctx.textAlign = 'center'
  ctx.fillText('deploy.js — VSCode', 320, 65)

  const codeLines = [
    { text: 'const pipeline = new CI({', color: '#569cd6' },
    { text: "  branch: 'main',",         color: '#9cdcfe' },
    { text: "  docker: true,",            color: '#9cdcfe' },
    { text: "  deploy: 'production'",     color: '#9cdcfe' },
    { text: '})',                         color: '#569cd6' },
    { text: '',                           color: '' },
    { text: 'pipeline.run()',             color: '#dcdcaa' },
  ]

  const totalChars = codeLines.reduce((acc, l) => acc + l.text.length, 0)
  const charsToShow = Math.floor(t * totalChars * 1.2)
  let charCount = 0
  ctx.font = '12px JetBrains Mono, monospace'
  ctx.textAlign = 'left'
  let lastX = 136, lastY = 102

  codeLines.forEach((line, li) => {
    const y = 102 + li * 20
    let lineVisible = ''
    for (let i = 0; i < line.text.length; i++) {
      if (charCount < charsToShow) {
        lineVisible += line.text[i]
        charCount++
        lastX = 136 + ctx.measureText(lineVisible).width
        lastY = y
      }
    }
    if (lineVisible) {
      ctx.fillStyle = line.color || '#EEEEF5'
      ctx.fillText(lineVisible, 136, y)
    }
    if (!line.text) charCount++
  })

  if (Math.floor(ms / 500) % 2 === 0 && charsToShow < totalChars * 1.2) {
    ctx.fillStyle = '#00F5FF'
    ctx.fillRect(lastX + 2, lastY - 12, 7, 14)
  }

  if (t > 0.7) {
    const cmdAlpha = (t - 0.7) / 0.3
    ctx.fillStyle = `rgba(107,107,138,${cmdAlpha})`
    ctx.font = '11px JetBrains Mono, monospace'
    ctx.fillText('$', 136, 256)
    ctx.fillStyle = `rgba(0,245,255,${cmdAlpha})`
    const cmd = 'git push origin main'
    const cmdLen = Math.floor(((t - 0.7) / 0.3) * cmd.length)
    ctx.fillText(cmd.slice(0, cmdLen), 150, 256)
  }
}

/* ─── Tunnel particles ─────────────────────────────────────────────────── */
function initTunnelParticles(snippets) {
  const particles = []
  for (let i = 0; i < 60; i++) {
    particles.push({
      text: snippets[i % snippets.length],
      angle: Math.random() * Math.PI * 2,
      radius: 100 + Math.random() * 200,
      speed: 0.8 + Math.random() * 1.2,
      z: Math.random(),
      color: `rgba(0,245,255,${0.3 + Math.random() * 0.6})`,
      size: 8 + Math.random() * 4,
    })
  }
  return particles
}

const CODE_SNIPPETS = [
  'git','push','main','commit','const','function','deploy','CI',
  '{}','[]','=>','&&','||','npm','build','test','run','0x4f','0xA2','bin','hex',
]
const JENKINS_KEYWORDS = [
  'pipeline{','agent{','stages{','stage(','steps{','sh(','docker.build',
  'withCredentials','sshagent','checkout(','scm','build#47','main→prod',
  'npm install','docker pull','Jenkinsfile',
]

/* ─── Audio feedback ───────────────────────────────────────────────────── */
function playTone(freq, duration, type = 'sine') {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const osc  = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain); gain.connect(ctx.destination)
    osc.frequency.value = freq
    osc.type = type
    gain.gain.setValueAtTime(0.08, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + duration)
  } catch(e) {}
}

/* ─── Scene 1 — git push tunnel ───────────────────────────────────────── */
function drawScene1(ctx, t, ms, particlesRef) {
  if (particlesRef.current.length === 0) {
    particlesRef.current = initTunnelParticles(CODE_SNIPPETS)
  }

  const cx = W * 0.55, cy = H / 2

  for (let r = 200; r > 10; r -= 20) {
    const alpha = (1 - r / 200) * 0.15
    ctx.strokeStyle = `rgba(0,245,255,${alpha})`
    ctx.lineWidth = 0.5
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke()
  }
  for (let a = 0; a < Math.PI * 2; a += Math.PI / 8) {
    const x0 = cx + Math.cos(a) * 300
    const y0 = cy + Math.sin(a) * 300
    const alpha = 0.08 + 0.05 * Math.sin(a + t * 4)
    ctx.strokeStyle = `rgba(0,245,255,${alpha})`
    ctx.lineWidth = 0.5
    ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(cx, cy); ctx.stroke()
  }

  particlesRef.current.forEach(p => {
    p.radius -= p.speed * (1 + t * 2)
    if (p.radius < 10) {
      p.radius = 200 + Math.random() * 100
      p.angle = Math.random() * Math.PI * 2
    }
    const x = cx + Math.cos(p.angle) * p.radius
    const y = cy + Math.sin(p.angle) * p.radius
    const scale = 1 - p.radius / 300
    ctx.globalAlpha = scale * 0.8
    ctx.fillStyle = '#00F5FF'
    ctx.font = `${p.size * scale}px JetBrains Mono, monospace`
    ctx.textAlign = 'center'
    ctx.fillText(p.text, x, y)
  })
  ctx.globalAlpha = 1

  const githubGlow = 0.4 + 0.2 * Math.sin(ms / 200)
  ctx.shadowBlur = 20
  ctx.shadowColor = '#238636'
  ctx.strokeStyle = `rgba(35,134,54,${0.5 + githubGlow})`
  ctx.lineWidth = 2
  ctx.beginPath(); ctx.arc(cx, cy, 30, 0, Math.PI * 2); ctx.stroke()
  ctx.shadowBlur = 0

  ctx.fillStyle = `rgba(35,134,54,${0.8 + githubGlow * 0.2})`
  ctx.font = 'bold 22px JetBrains Mono, monospace'
  ctx.textAlign = 'center'
  ctx.fillText('GH', cx, cy + 8)
  ctx.fillStyle = 'rgba(35,134,54,0.7)'
  ctx.font = '9px JetBrains Mono, monospace'
  ctx.fillText('github.com/Ragul0506', cx, cy + 50)

  ctx.fillStyle = `rgba(0,245,255,${0.4 + 0.3 * Math.sin(ms / 300)})`
  ctx.font = 'bold 12px JetBrains Mono, monospace'
  ctx.textAlign = 'left'
  ctx.fillText('$ git push origin main', 30, H / 2)
  ctx.fillStyle = 'rgba(0,255,136,0.6)'
  ctx.font = '10px JetBrains Mono, monospace'
  ctx.fillText('↳ ' + Math.floor(t * 100) + '% uploaded', 30, H / 2 + 20)
}

/* ─── Scene 2 — GitHub fires webhook ──────────────────────────────────── */
function drawScene2(ctx, t, ms) {
  const gx = 200, gy = H / 2
  const jx = 660, jy = H / 2

  for (let r = 20; r < 80; r += 20) {
    const ringT = (ms / 1000) % 1
    const alpha = Math.max(0, 0.3 - (r - 20) / 80) * (1 - ringT)
    ctx.strokeStyle = `rgba(35,134,54,${alpha})`
    ctx.lineWidth = 1
    ctx.beginPath(); ctx.arc(gx, gy, r + ringT * 40, 0, Math.PI * 2); ctx.stroke()
  }

  ctx.strokeStyle = '#238636'
  ctx.lineWidth = 2
  ctx.beginPath(); ctx.arc(gx, gy, 28, 0, Math.PI * 2); ctx.stroke()
  ctx.fillStyle = '#238636'
  ctx.font = 'bold 14px JetBrains Mono, monospace'
  ctx.textAlign = 'center'
  ctx.fillText('GH', gx, gy + 5)
  ctx.fillStyle = '#6B6B8A'
  ctx.font = '9px JetBrains Mono, monospace'
  ctx.fillText('GitHub', gx, gy + 46)

  if (t > 0.1) {
    ctx.fillStyle = `rgba(255,153,0,${Math.min(1, (t - 0.1) / 0.2)})`
    ctx.font = 'bold 10px JetBrains Mono, monospace'
    ctx.textAlign = 'center'
    ctx.fillText('WEBHOOK', gx, gy - 46)
    ctx.fillText('TRIGGERED', gx, gy - 33)
  }

  if (t > 0.2) {
    const boltProgress = Math.min(1, (t - 0.2) / 0.5)
    const boltEndX = gx + (jx - gx) * boltProgress

    ctx.strokeStyle = '#FF9900'
    ctx.lineWidth = 2
    ctx.shadowBlur = 12
    ctx.shadowColor = '#FF9900'
    ctx.beginPath()
    ctx.moveTo(gx + 30, gy)
    for (let i = 1; i <= 8; i++) {
      const px = gx + 30 + (boltEndX - gx - 30) * (i / 8)
      const py = gy + (i % 2 === 0 ? -15 : 15) * Math.sin(i * 0.8)
      ctx.lineTo(px, py)
    }
    ctx.stroke()
    ctx.shadowBlur = 0

    ctx.fillStyle = '#FF9900'
    ctx.shadowBlur = 16
    ctx.shadowColor = '#FF9900'
    ctx.beginPath(); ctx.arc(boltEndX, gy, 6, 0, Math.PI * 2); ctx.fill()
    ctx.shadowBlur = 0

    ctx.fillStyle = 'rgba(255,153,0,0.8)'
    ctx.font = '9px JetBrains Mono, monospace'
    ctx.textAlign = 'center'
    ctx.fillText('webhook', boltEndX, gy - 20)
  }

  const jAlpha = t > 0.65 ? Math.min(1, (t - 0.65) / 0.2) : 0.3
  const jGlow  = t > 0.65 ? 0.3 + 0.3 * Math.sin(ms / 150) : 0

  ctx.shadowBlur = jGlow * 20
  ctx.shadowColor = '#D24939'
  ctx.strokeStyle = `rgba(210,73,57,${jAlpha})`
  ctx.lineWidth = 2
  ctx.beginPath(); ctx.arc(jx, jy, 30, 0, Math.PI * 2); ctx.stroke()
  ctx.shadowBlur = 0

  ctx.fillStyle = `rgba(210,73,57,${jAlpha})`
  ctx.font = 'bold 18px JetBrains Mono, monospace'
  ctx.textAlign = 'center'
  ctx.fillText('J', jx, jy + 6)
  ctx.fillStyle = `rgba(107,107,138,${jAlpha})`
  ctx.font = '9px JetBrains Mono, monospace'
  ctx.fillText('Jenkins', jx, jy + 50)

  if (t > 0.7) {
    ctx.fillStyle = `rgba(210,73,57,${(t - 0.7) / 0.3})`
    ctx.font = 'bold 10px JetBrains Mono, monospace'
    ctx.fillText('PIPELINE', jx, jy - 46)
    ctx.fillText('TRIGGERED!', jx, jy - 33)
  }
}

/* ─── Scene 3 — Jenkins receives data ─────────────────────────────────── */
function drawScene3(ctx, t, ms, particlesRef) {
  if (particlesRef.current.length === 0 || particlesRef.current[0]?.text === 'git') {
    particlesRef.current = initTunnelParticles(JENKINS_KEYWORDS)
  }

  const jx = W / 2, jy = H / 2

  for (let a = 0; a < Math.PI * 2; a += Math.PI / 10) {
    const x0 = jx + Math.cos(a) * 400
    const y0 = jy + Math.sin(a) * 400
    ctx.strokeStyle = 'rgba(210,73,57,0.06)'
    ctx.lineWidth = 0.5
    ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(jx, jy); ctx.stroke()
  }

  particlesRef.current.forEach(p => {
    p.radius -= p.speed * 1.5
    if (p.radius < 15) p.radius = 180 + Math.random() * 120
    const x = jx + Math.cos(p.angle) * p.radius
    const y = jy + Math.sin(p.angle) * p.radius
    const scale = Math.max(0.2, 1 - p.radius / 200)
    const isJenkins = p.text.includes('{') || p.text.includes('stage') || p.text.includes('pipeline')
    ctx.globalAlpha = scale * 0.85
    ctx.fillStyle = isJenkins ? '#D24939' : '#00F5FF'
    ctx.font = `${(p.size - 2) * scale + 8}px JetBrains Mono, monospace`
    ctx.textAlign = 'center'
    ctx.fillText(p.text, x, y)
  })
  ctx.globalAlpha = 1

  const jRadius = 24 + 8 * Math.sin(ms / 120)
  ctx.shadowBlur = 16 + 8 * Math.sin(ms / 200)
  ctx.shadowColor = '#D24939'
  ctx.strokeStyle = '#D24939'
  ctx.lineWidth = 2.5
  ctx.beginPath(); ctx.arc(jx, jy, jRadius, 0, Math.PI * 2); ctx.stroke()
  ctx.shadowBlur = 0

  const eyeOpen = Math.min(1, t * 3)
  ctx.strokeStyle = 'rgba(210,73,57,0.8)'
  ctx.lineWidth = 2

  if (eyeOpen < 0.5) {
    ctx.beginPath(); ctx.moveTo(jx - 12, jy - 6); ctx.lineTo(jx - 4, jy - 6); ctx.stroke()
  } else {
    const er = 4 * (eyeOpen - 0.5) * 2
    ctx.beginPath(); ctx.arc(jx - 8, jy - 6, er, 0, Math.PI * 2); ctx.stroke()
  }
  if (eyeOpen < 0.5) {
    ctx.beginPath(); ctx.moveTo(jx + 4, jy - 6); ctx.lineTo(jx + 12, jy - 6); ctx.stroke()
  } else {
    const er = 4 * (eyeOpen - 0.5) * 2
    ctx.beginPath(); ctx.arc(jx + 8, jy - 6, er, 0, Math.PI * 2); ctx.stroke()
  }

  if (t > 0.6) {
    const smileAlpha = (t - 0.6) / 0.4
    ctx.strokeStyle = `rgba(210,73,57,${smileAlpha})`
    ctx.beginPath()
    ctx.arc(jx, jy + 2, 8, 0.2, Math.PI - 0.2)
    ctx.stroke()
  }

  ctx.fillStyle = '#D24939'
  ctx.font = 'bold 10px JetBrains Mono, monospace'
  ctx.textAlign = 'center'
  ctx.fillText('JENKINS', jx, jy + 52)
  ctx.fillStyle = 'rgba(210,73,57,0.6)'
  ctx.font = '9px JetBrains Mono, monospace'
  ctx.fillText('receiving pipeline data...', jx, jy + 66)
}

/* ─── Scene 4 — Pipeline stages ───────────────────────────────────────── */
function drawScene4(ctx, t, ms) {
  const stages = [
    { label: 'Checkout SCM', detail: 'git clone github.com/Ragul0506/hrms',    color: '#238636' },
    { label: 'Install Deps', detail: 'npm install — 847 packages',              color: '#FF9900' },
    { label: 'Run Tests',    detail: '3/3 suites passed — no failures',         color: '#00FF88' },
    { label: 'Docker Build', detail: 'building ragul0506/hrms:47 — 6 layers',   color: '#2496ED' },
    { label: 'Push to Hub',  detail: 'pushing to DockerHub registry',           color: '#2496ED' },
    { label: 'SSH Deploy',   detail: 'docker pull + compose up on EC2',         color: '#FF9900' },
    { label: 'Verify Live',  detail: 'HTTP 200 — health check passed',          color: '#00FF88' },
  ]

  const activeStage   = Math.min(Math.floor(t * stages.length * 1.1), stages.length - 1)
  const stageProgress = (t * stages.length * 1.1) - activeStage

  ctx.fillStyle = '#D24939'
  ctx.font = 'bold 11px JetBrains Mono, monospace'
  ctx.textAlign = 'left'
  ctx.fillText('Jenkins Multibranch Pipeline — Build #47 — branch: main → PRODUCTION', 20, 50)

  stages.forEach((stage, i) => {
    const y      = 72 + i * 30
    const status = i < activeStage ? 'done' : i === activeStage ? 'active' : 'pending'

    if (status === 'active') {
      ctx.fillStyle = 'rgba(0,245,255,0.04)'
      ctx.fillRect(12, y - 12, W - 24, 26)
    }

    ctx.fillStyle = status === 'done'   ? stage.color
                  : status === 'active' ? '#00F5FF'
                  : 'rgba(255,255,255,0.08)'
    ctx.fillRect(12, y - 12, 3, 26)

    if (status === 'done') {
      ctx.fillStyle = stage.color
      ctx.font = '12px monospace'
      ctx.textAlign = 'left'
      ctx.fillText('✓', 22, y + 4)
    } else if (status === 'active') {
      ctx.strokeStyle = 'rgba(0,245,255,0.2)'
      ctx.lineWidth = 2
      ctx.beginPath(); ctx.arc(27, y, 7, 0, Math.PI * 2); ctx.stroke()
      ctx.strokeStyle = '#00F5FF'
      const angle = (ms / 400) * Math.PI * 2
      ctx.beginPath(); ctx.arc(27, y, 7, angle, angle + Math.PI * 1.2); ctx.stroke()
    } else {
      ctx.fillStyle = 'rgba(255,255,255,0.12)'
      ctx.beginPath(); ctx.arc(27, y, 5, 0, Math.PI * 2); ctx.fill()
    }

    ctx.fillStyle = status !== 'pending' ? '#EEEEF5' : '#6B6B8A'
    ctx.font = status === 'active' ? 'bold 11px JetBrains Mono, monospace' : '11px JetBrains Mono, monospace'
    ctx.textAlign = 'left'
    ctx.fillText(stage.label, 44, y + 4)

    if (status !== 'pending') {
      ctx.fillStyle = `rgba(107,107,138,${status === 'active' ? 0.7 + 0.3 * Math.sin(ms / 200) : 0.6})`
      ctx.font = '9px JetBrains Mono, monospace'
      ctx.fillText(stage.detail, 200, y + 4)
    }

    if (status === 'active') {
      ctx.fillStyle = 'rgba(255,255,255,0.05)'
      ctx.fillRect(W - 120, y - 4, 100, 8)
      ctx.fillStyle = '#00F5FF'
      ctx.fillRect(W - 120, y - 4, 100 * stageProgress, 8)
    }
  })

  const elapsed = Math.floor(t * 180)
  const mins = String(Math.floor(elapsed / 60)).padStart(2, '0')
  const secs = String(elapsed % 60).padStart(2, '0')
  ctx.fillStyle = 'rgba(0,245,255,0.4)'
  ctx.font = '10px JetBrains Mono, monospace'
  ctx.textAlign = 'right'
  ctx.fillText(`build time: ${mins}:${secs}`, W - 20, H - 12)
}

/* ─── Scene 5 — Deployment successful ─────────────────────────────────── */
function drawScene5(ctx, t) {
  const maxR = 120
  const r1 = Math.min(maxR, t * maxR * 3)
  const r2 = Math.min(maxR * 0.7, Math.max(0, (t - 0.1) * maxR * 3))
  const r3 = Math.min(maxR * 0.4, Math.max(0, (t - 0.2) * maxR * 3))

  ctx.strokeStyle = 'rgba(0,255,136,0.15)'; ctx.lineWidth = 1
  ctx.beginPath(); ctx.arc(W / 2, H / 2, r1, 0, Math.PI * 2); ctx.stroke()
  ctx.strokeStyle = 'rgba(0,255,136,0.25)'
  ctx.beginPath(); ctx.arc(W / 2, H / 2, r2, 0, Math.PI * 2); ctx.stroke()
  ctx.strokeStyle = 'rgba(0,255,136,0.4)'; ctx.lineWidth = 2
  ctx.beginPath(); ctx.arc(W / 2, H / 2, r3, 0, Math.PI * 2); ctx.stroke()

  if (t > 0.3) {
    const ca = Math.min(1, (t - 0.3) / 0.3)
    ctx.strokeStyle = `rgba(0,255,136,${ca})`
    ctx.lineWidth = 4; ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.moveTo(W / 2 - 24, H / 2 + 4)
    ctx.lineTo(W / 2 - 8,  H / 2 + 20)
    ctx.lineTo(W / 2 + 24, H / 2 - 16)
    ctx.stroke()
    ctx.lineCap = 'butt'
  }

  if (t > 0.5) {
    const ta = Math.min(1, (t - 0.5) / 0.3)
    ctx.fillStyle = `rgba(0,255,136,${ta})`
    ctx.font = 'bold 22px JetBrains Mono, monospace'
    ctx.textAlign = 'center'
    ctx.fillText('DEPLOYMENT SUCCESSFUL', W / 2, H / 2 + 66)
    ctx.fillStyle = `rgba(107,107,138,${ta})`
    ctx.font = '11px JetBrains Mono, monospace'
    ctx.fillText('Build #47 · main → production · 0 downtime', W / 2, H / 2 + 86)
  }

  if (t > 0.6) {
    const ra = Math.min(1, (t - 0.6) / 0.3)
    const labels = ['Checkout', 'Install', 'Test', 'Docker', 'Push', 'Deploy', 'Verify']
    labels.forEach((l, i) => {
      const x = 80 + i * 104
      ctx.fillStyle = `rgba(0,255,136,${ra})`
      ctx.font = '9px JetBrains Mono, monospace'
      ctx.textAlign = 'center'
      ctx.fillText('✓ ' + l, x, H - 24)
    })
  }
}

/* ─── Static one-frame draw (used when paused) ─────────────────────────── */
function drawStatic(canvas, particlesRef, scene, t = 0, ms = 0) {
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, W, H)
  drawBackground(ctx)
  switch (scene) {
    case 0: drawScene0(ctx, t, ms); break
    case 1: drawScene1(ctx, t, ms, particlesRef); break
    case 2: drawScene2(ctx, t, ms); break
    case 3: drawScene3(ctx, t, ms, particlesRef); break
    case 4: drawScene4(ctx, t, ms); break
    case 5: drawScene5(ctx, t); break
  }
  drawHUD(ctx, scene, t)
}

/* ─── Frame labels ─────────────────────────────────────────────────────── */
const frameLabels = [
  'Developer writing code',
  'git push — code enters tunnel',
  'GitHub fires webhook to Jenkins',
  'Jenkins receives pipeline data',
  'Pipeline stages executing',
  'Deployment successful',
]

/* ─── Terminal lines ───────────────────────────────────────────────────── */
const TERM_LINES = [
  { text: 'git push origin main',                                                           color: '#00F5FF', delay: 200   },
  { text: 'Webhook received — triggering Jenkins build',                                    color: '#FF9900', delay: 1200  },
  { text: 'docker build -t ragulraj/hrms:latest .',                                        color: '#2496ED', delay: 2400  },
  { text: 'Step 1/8 : FROM node:18-alpine AS builder',                                     color: '#00FF88', delay: 3200  },
  { text: 'Step 5/8 : RUN npm run build',                                                  color: '#00FF88', delay: 4000  },
  { text: 'Successfully built ab12cd34ef56',                                                color: '#00FF88', delay: 5200  },
  { text: 'trivy image --severity HIGH,CRITICAL ragulraj/hrms:latest',                     color: '#00F5FF', delay: 5900  },
  { text: '2026-06-17T10:34:11.123+0530 INFO Need to update DB',                          color: '#6B6B8A', delay: 7000,  prefix: '' },
  { text: '2026-06-17T10:34:11.456+0530 INFO Downloaded DB (123456 entries)',             color: '#6B6B8A', delay: 7900,  prefix: '' },
  { text: '2026-06-17T10:34:15.789+0530 INFO Detected OS: alpine',                       color: '#6B6B8A', delay: 8800,  prefix: '' },
  { text: '2026-06-17T10:34:15.789+0530 INFO No HIGH or CRITICAL vulnerabilities found',  color: '#00FF88', delay: 9600,  prefix: '' },
  { text: 'docker push ragulraj/hrms:latest',                                               color: '#2496ED', delay: 10500 },
  { text: 'Deploying to aws-prod-ec2...',                                                   color: '#FF9900', delay: 11700 },
  { text: 'nginx -t && nginx -s reload',                                                    color: '#00F5FF', delay: 12500 },
  { text: 'All health checks passed. Uptime: 99.98%',                                      color: '#00FF88', delay: 13700 },
]

function TermLine({ text, color, delay, prefix = '$' }) {
  const [chars, setChars]     = useState('')
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(true)
      let i = 0
      const iv = setInterval(() => {
        i++; setChars(text.slice(0, i))
        if (i >= text.length) clearInterval(iv)
      }, 18)
      return () => clearInterval(iv)
    }, delay)
    return () => clearTimeout(t)
  }, [text, delay])
  if (!visible) return null
  return (
    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', lineHeight: '18px', color, marginBottom: '2px' }}>
      {prefix && <span style={{ color: 'rgba(255,255,255,0.25)' }}>{prefix} </span>}{chars}
    </div>
  )
}

/* ─── Main component ───────────────────────────────────────────────────── */
export default function NOCDashboard() {
  const [currentFrame, setCurrentFrame] = useState(0)
  const [isPlaying, setIsPlaying]       = useState(false)
  const [speed, setSpeed]               = useState(5000)
  const [termStarted, setTermStarted]   = useState(false)

  const canvasRef      = useRef(null)
  const rafRef         = useRef(null)
  const startTimeRef   = useRef(null)
  const seekMsRef      = useRef(0)
  const sceneRef       = useRef(0)
  const particlesRef   = useRef([])
  const isPlayingRef   = useRef(false)
  const speedRef       = useRef(5000)
  const sectionRef     = useRef(null)

  // One-time canvas setup
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1
    canvas.width        = W * dpr
    canvas.height       = H * dpr
    canvas.style.width  = W + 'px'
    canvas.style.height = H + 'px'
    const ctx = canvas.getContext('2d')
    ctx.scale(dpr, dpr)
    drawStatic(canvas, particlesRef, 0, 0, 0)
  }, [])

  // Sync speed ref; reset to current scene start so speed change is seamless
  useEffect(() => {
    speedRef.current  = speed
    seekMsRef.current = sceneRef.current * speed
    startTimeRef.current = null
  }, [speed])

  // Main rAF loop
  useEffect(() => {
    isPlayingRef.current = isPlaying
    if (!isPlaying) {
      cancelAnimationFrame(rafRef.current)
      return
    }

    function tick(timestamp) {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')

      if (!startTimeRef.current) startTimeRef.current = timestamp - seekMsRef.current
      const totalMs  = timestamp - startTimeRef.current
      const dur      = speedRef.current
      const scene    = Math.floor((totalMs / dur) % 6)
      const sceneMs  = totalMs % dur
      const t        = sceneMs / dur

      if (scene !== sceneRef.current) {
        if (scene === 0 || scene === 2) particlesRef.current = []
        sceneRef.current = scene
        setCurrentFrame(scene)
        // Audio cue per scene
        if (scene === 0) playTone(440,  0.1)
        if (scene === 1) playTone(880,  0.15, 'sawtooth')
        if (scene === 2) playTone(660,  0.2,  'square')
        if (scene === 3) playTone(220,  0.3)
        if (scene === 4) playTone(523,  0.1)
        if (scene === 5) playTone(1047, 0.4)
      }

      ctx.clearRect(0, 0, W, H)
      drawBackground(ctx)
      switch (scene) {
        case 0: drawScene0(ctx, t, sceneMs); break
        case 1: drawScene1(ctx, t, sceneMs, particlesRef); break
        case 2: drawScene2(ctx, t, sceneMs); break
        case 3: drawScene3(ctx, t, sceneMs, particlesRef); break
        case 4: drawScene4(ctx, t, sceneMs); break
        case 5: drawScene5(ctx, t); break
      }
      drawHUD(ctx, scene, t)

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [isPlaying])

  // Auto-start on scroll into view
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setIsPlaying(true); setTermStarted(true) }
        else setIsPlaying(false)
      },
      { threshold: 0.3 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  const goToFrame = useCallback((frame) => {
    seekMsRef.current  = frame * speedRef.current
    startTimeRef.current = null
    if (frame === 0 || frame === 2) particlesRef.current = []
    sceneRef.current   = frame
    setCurrentFrame(frame)
    if (!isPlayingRef.current && canvasRef.current) {
      drawStatic(canvasRef.current, particlesRef, frame, 0, 0)
    }
  }, [])

  const togglePlay = useCallback(() => setIsPlaying(p => !p), [])

  // Keyboard controls
  useEffect(() => {
    const handler = (e) => {
      if (e.code === 'Space')      { e.preventDefault(); togglePlay() }
      if (e.code === 'ArrowRight') goToFrame((sceneRef.current + 1) % 6)
      if (e.code === 'ArrowLeft')  goToFrame((sceneRef.current + 5) % 6)
      if (e.code === 'KeyR')       goToFrame(0)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [togglePlay, goToFrame])

  return (
    <section id="pipeline" ref={sectionRef} style={{ padding: '100px 0', background: '#0A0A0A' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>

        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', color: '#00F5FF', fontSize: '12px',
            letterSpacing: '3px', display: 'block', marginBottom: '12px' }}>
            ◈ LIVE DEMO
          </span>
          <h2 style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 'clamp(28px,4vw,42px)',
            fontWeight: 700, color: '#EEEEF5' }}>
            DevOps Pipeline in Motion
          </h2>
        </div>

        {/* Player shell */}
        <div style={{ background: '#08080F', border: '1px solid rgba(0,245,255,0.15)',
          borderRadius: '16px', overflow: 'hidden', maxWidth: '900px', margin: '0 auto 48px',
          position: 'relative' }}>

          {/* Top bar */}
          <div style={{ background: '#0D0D14', borderBottom: '1px solid rgba(0,245,255,0.1)',
            padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', color: '#00F5FF', fontSize: '13px', fontWeight: 700 }}>
              RAGULRAJ.DEV — PIPELINE VISUALIZER v2.0
            </span>
            <span style={{ background: 'rgba(255,50,50,0.15)', color: '#FF5555',
              fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', fontWeight: 700,
              padding: '4px 12px', borderRadius: '20px', letterSpacing: '1px',
              display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#FF5555',
                animation: 'neon-pulse 1s ease-in-out infinite' }} />
              LIVE
            </span>
          </div>

          {/* Canvas */}
          <canvas ref={canvasRef} style={{ display: 'block', maxWidth: '100%' }} />

          {/* Controls */}
          <div style={{ background: '#0D0D14', borderTop: '1px solid rgba(0,245,255,0.1)', padding: '12px 20px' }}>

            {/* Progress bar */}
            <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)',
              borderRadius: '4px', marginBottom: '12px', cursor: 'pointer' }}
              onClick={e => {
                const rect = e.currentTarget.getBoundingClientRect()
                const pct  = (e.clientX - rect.left) / rect.width
                goToFrame(Math.min(5, Math.floor(pct * 6)))
              }}>
              <div className="progress-bar-fill" style={{ width: `${((currentFrame + 1) / 6) * 100}%` }} />
            </div>

            {/* Controls row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button onClick={togglePlay}
                style={{ background: 'transparent', border: 'none', color: '#00F5FF',
                  fontSize: '20px', cursor: 'pointer', fontFamily: 'monospace', lineHeight: 1 }}>
                {isPlaying ? '⏸' : '▶'}
              </button>
              <button onClick={() => { goToFrame(0); setIsPlaying(false) }}
                style={{ background: 'transparent', border: 'none', color: '#6B6B8A',
                  fontSize: '16px', cursor: 'pointer' }}>
                ⟳
              </button>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', color: '#6B6B8A', fontSize: '12px', flex: 1 }}>
                SCENE {currentFrame + 1} / 6 — {frameLabels[currentFrame]}
              </span>
              <select value={speed} onChange={e => setSpeed(Number(e.target.value))}
                style={{ background: '#0D0D14', border: '1px solid rgba(0,245,255,0.2)',
                  color: '#00F5FF', fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
                  padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>
                <option value={10000}>0.5×</option>
                <option value={5000}>1×</option>
                <option value={2500}>2×</option>
              </select>
            </div>

            {/* Scene dots — 6 total */}
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '10px' }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} onClick={() => goToFrame(i)}
                  style={{ width: '10px', height: '10px', borderRadius: '50%', cursor: 'pointer',
                    background: i === currentFrame ? '#00F5FF' : 'transparent',
                    border: `2px solid ${i === currentFrame ? '#00F5FF' : 'rgba(0,245,255,0.3)'}`,
                    transition: 'all 0.2s ease',
                    boxShadow: i === currentFrame ? '0 0 8px rgba(0,245,255,0.6)' : 'none' }} />
              ))}
            </div>

            {/* Keyboard hint */}
            <div style={{ textAlign: 'center', fontFamily: 'JetBrains Mono, monospace',
              fontSize: '9px', color: 'rgba(107,107,138,0.6)', marginTop: '6px', letterSpacing: '1px' }}>
              SPACE — play/pause · ← → — scene · R — restart
            </div>
          </div>

          {/* CRT scanlines */}
          <div style={{ position: 'absolute', inset: 0,
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)',
            pointerEvents: 'none', zIndex: 2, borderRadius: 'inherit' }} />
          {/* CRT vignette */}
          <div style={{ position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.4) 100%)',
            pointerEvents: 'none', zIndex: 2, borderRadius: 'inherit' }} />
        </div>

        {/* Terminal */}
        <div style={{ background: '#0D0D14', border: '1px solid rgba(0,245,255,0.1)',
          borderRadius: '12px', overflow: 'hidden', maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ background: 'rgba(0,255,136,0.04)', borderBottom: '1px solid rgba(0,245,255,0.1)',
            padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', color: '#00FF88', fontSize: '12px' }}>
              ragulraj@aryu-prod:~
            </span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', color: '#6B6B8A', fontSize: '11px' }}>
              DEPLOYMENT LOG
            </span>
          </div>
          <div style={{ padding: '16px', minHeight: '180px' }}>
            {termStarted && TERM_LINES.map((line, i) => (
              <TermLine key={i} {...line} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
