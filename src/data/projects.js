export const projects = [
  {
    id: 'cargo',
    icon: '📦',
    name: 'CARGO PROJECT',
    stack_summary: 'Next.js → GitHub Actions → FTP → cPanel → cargo.aryuprojects.com',
    badge: '● LIVE IN PRODUCTION',
    badge_bg: 'rgba(0,255,136,0.15)',
    badge_color: '#00FF88',
    diagram_src: './assets/cargo-architecture.png',
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
  {
    id: 'warroom',
    icon: '🤖',
    name: "RAGUL'S ASSISTANT WARROOM",
    stack_summary: 'Telegram Bot API → Groq AI (Whisper + Llama 3.1) → ReportLab PDF → Supabase → Render Docker',
    badge: '● PRODUCTION LIVE',
    badge_bg: 'rgba(168,85,247,0.15)',
    badge_color: '#A855F7',
    diagram_src: null,
    diagram_alt: null,
    problem: 'Building a production-grade personal AI assistant entirely on free-tier services — multi-modal voice invoicing for 4 shop types, YouTube downloading with bot-detection bypass, OCR receipt parsing, and Tanglish voice recognition, all inside a single Docker container with zero leaked credentials.',
    solution: 'Event-driven async Python inside one Docker container: Groq Whisper for Tamil/English transcription, Llama 3.1 for LLM invoice parsing, ReportLab for PDF generation, EasyOCR for receipt photos, yt-dlp with cookie rotation for YouTube, and Supabase RLS for isolated per-user watchlists.',
    result: 'Fully automated multi-modal assistant in production on Render.com at zero recurring cost. Voice-to-PDF invoice generated in under 8 seconds. 6 feature modules, 4 shop types, CI/CD via GitHub.',
    tech: ['Python 3.11', 'Groq Whisper', 'Llama 3.1', 'Telegram Bot API', 'Supabase', 'ReportLab', 'yt-dlp', 'EasyOCR', 'Docker', 'Render.com', 'GitHub Actions', 'Google Sheets'],
    metrics: [
      { value: '6',    label: 'Feature modules' },
      { value: '<8s',  label: 'Voice-to-PDF'    },
      { value: '4',    label: 'Shop templates'  },
      { value: '$0',   label: 'Cloud cost'      },
    ],
    hasDetail: true,
    detail: {
      overview: `Ragul's Assistant Warroom is a feature-rich, multi-modal Telegram bot acting as a personal AI assistant for managing daily expenses, generating professional invoices for multiple businesses, downloading media, tracking movies, and summarizing content. Built entirely with free-tier cloud services and open-source AI APIs, the system handles Tamil, English, and Tanglish inputs inside a single Docker container deployed on Render.com.`,
      features: [
        {
          title: 'Voice-to-Bill Generation',
          desc: 'Tamil/English voice notes transcribed via Groq Whisper, parsed by Llama 3.1 LLM, and converted into formatted PDF invoices with custom templates, GST handling, and discount logic.',
        },
        {
          title: 'Multi-Shop Invoice System',
          desc: 'Four independent shop profiles — salon, grocery, tailoring, electronics — each with custom PDF branding, line-item structures, and persistent SQLite-backed preferences.',
        },
        {
          title: 'Expense Tracker',
          desc: 'Intelligent logging with AI-inferred expense categories, Google Sheets as a live ledger, and auto-generated monthly summary chart PDFs via matplotlib.',
        },
        {
          title: 'Media Utilities',
          desc: 'Movie info from TMDB with trailers and personal watchlist via Supabase. MP3 song downloads and YouTube-to-MP3 with bot-detection bypass using cookies upload and user-agent rotation.',
        },
        {
          title: 'Photo OCR → Invoice',
          desc: 'Receipt and bill photos preprocessed with Pillow, OCR\'d via EasyOCR/pytesseract, then parsed by LLM into structured invoices — from photo to PDF in one command.',
        },
        {
          title: 'Content Summarizer',
          desc: 'Long texts, articles, or forwarded messages condensed to 3–5 bullet points using Llama 3.1 via the Groq API with sub-second latency.',
        },
      ],
      architecture: `RAGUL'S ASSISTANT WARROOM — SYSTEM ARCHITECTURE
══════════════════════════════════════════════════════════════

        Telegram Users  (Tamil / English / Tanglish)
                   │  HTTPS + Webhook Secret Token
                   ▼
  ┌──────────────────────────────────────────────────────┐
  │          python-telegram-bot v20+  (Async)            │
  │               Message Router / Dispatcher             │
  └──┬──────────┬──────────┬──────────┬──────────┬───────┘
     │          │          │          │          │
  ┌──▼───┐  ┌──▼───┐  ┌───▼──┐  ┌───▼──┐  ┌────▼──┐
  │Voice │  │Multi │  │Expens│  │Media │  │Photo  │
  │ Bill │  │ Shop │  │Track │  │Utils │  │ OCR   │
  └──┬───┘  └──┬───┘  └───┬──┘  └───┬──┘  └────┬──┘
     │          │          │         │           │
  ┌──▼───┐  ┌──▼───┐  ┌───▼──┐  ┌───▼──┐  ┌────▼──┐
  │Groq  │  │Reprt │  │Google│  │yt-   │  │EasyOCR│
  │Wisp+ │  │Lab   │  │Sheet │  │dlp + │  │Tessrt │
  │Llama │  │PDF   │  │Supra │  │ffmpeg│  │Pillow │
  └──────┘  └──────┘  └──────┘  └──────┘  └───────┘

  External APIs:  TMDB · YouTube Data v3 · Google CSE
  Charting:       matplotlib → PDF summary reports

  ┌──────────────────────────────────────────────────────┐
  │              RENDER.COM DOCKER CONTAINER             │
  │   Python 3.11-slim · SQLite · TZ=Asia/Kolkata        │
  │         GitHub CI/CD → Auto Deploy on Push           │
  └──────────────────────────────────────────────────────┘

  Security:  Webhook secret · Supabase RLS · Rate limiting
             Input sanitization · Prompt delimiters · No leaked keys`,
      tech_table: [
        { category: 'Backend',     tech: 'Python 3.11, python-telegram-bot v20+, asyncio' },
        { category: 'AI / ML',     tech: 'Groq Whisper (STT), Groq Llama 3.1 (LLM), EasyOCR, pytesseract' },
        { category: 'APIs',        tech: 'Telegram Bot API, TMDB, YouTube Data v3, Google CSE, Supabase' },
        { category: 'Storage',     tech: 'Google Sheets, Supabase PostgreSQL + RLS, SQLite' },
        { category: 'Media',       tech: 'yt-dlp, ffmpeg, Pillow, matplotlib' },
        { category: 'PDF Engine',  tech: 'ReportLab with custom palette derivation per shop' },
        { category: 'Deployment',  tech: 'Render.com Docker (free tier), GitHub CI/CD' },
        { category: 'Security',    tech: 'Webhook secret, Input escaping, RLS, Rate limiting, Env vars' },
      ],
      security: [
        'Webhook secret token validated on every incoming Telegram request before any processing.',
        'All user inputs sanitized before XML processing; LLM prompts wrapped in role-delimiter fencing to prevent prompt injection.',
        'Supabase Row-Level Security (RLS) enforces per-user data isolation on the watchlist table.',
        'Zero API keys in source code — all credentials loaded exclusively from environment variables.',
        'Rate limiting applied to media download and search endpoints to prevent abuse.',
        'All exceptions caught at the handler level; no stack traces or internal state ever sent to users.',
      ],
      challenges: [
        {
          challenge: 'PDF invoice line items rendered as blank lines when product names contained special characters (&, <, >).',
          solution: 'Abandoned XML-string assembly entirely. Switched to ReportLab\'s canvas.drawString() API for direct canvas rendering, eliminating the XML escaping requirement.',
        },
        {
          challenge: 'YouTube downloads blocked on Render\'s servers due to bot-detection heuristics from Google.',
          solution: 'Implemented a cookies.txt upload flow so users can provide their own session cookies, combined with randomised user-agent rotation in the yt-dlp configuration.',
        },
        {
          challenge: 'Google Sheets integration silently failed with malformed service-account JSON credentials.',
          solution: 'Added a startup-time JSON schema validator that checks for all required credential fields and returns a human-readable error message before any API call is attempted.',
        },
        {
          challenge: 'All timestamps displayed in UTC on Render, making expense logs and invoice dates incorrect for Indian users.',
          solution: 'Set TZ=Asia/Kolkata as an explicit environment variable in both the Dockerfile and the Render dashboard, ensuring all datetime.now() calls reflect IST.',
        },
      ],
      deployment: [
        { label: 'Platform',   value: 'Render.com — Docker (free tier)' },
        { label: 'CI / CD',    value: 'GitHub Actions → auto-deploy on push to main' },
        { label: 'Container',  value: 'Python 3.11-slim base image, single-container' },
        { label: 'Timezone',   value: 'TZ=Asia/Kolkata via environment variable' },
        { label: 'Secrets',    value: 'All API keys via Render environment panel' },
        { label: 'Uptime',     value: 'Free-tier spin-down; wakes on first message' },
      ],
    },
  },
]
