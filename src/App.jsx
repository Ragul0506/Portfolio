import { useState, Suspense, lazy } from 'react'
import NavBar from './components/Navbar/NavBar'
import GatewayVault from './components/Gateway/GatewayVault'

const HeroSection       = lazy(() => import('./components/Hero/HeroSection'))
const JourneyTimeline   = lazy(() => import('./components/Journey/JourneyTimeline'))
const MetricsSection    = lazy(() => import('./components/Metrics/MetricsSection'))
const ProjectsSection   = lazy(() => import('./components/Projects/ProjectsSection'))
const SkillsSection     = lazy(() => import('./components/Skills/SkillsSection'))
const NOCDashboard      = lazy(() => import('./components/NOC/NOCDashboard'))
const SecuritySection   = lazy(() => import('./components/Security/SecuritySection'))
const ContactForm       = lazy(() => import('./components/Contact/ContactForm'))
const Footer            = lazy(() => import('./components/Footer/Footer'))
const BackToTop         = lazy(() => import('./components/UI/BackToTop'))

function SectionSkeleton() {
  return (
    <div style={{
      height: '100vh',
      background: '#050509',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        width: '40px', height: '40px',
        border: '2px solid rgba(0,245,255,0.1)',
        borderTop: '2px solid #00F5FF',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }}/>
    </div>
  )
}

export default function App() {
  const [gatewayDone, setGatewayDone] = useState(false)

  return (
    <div className="bg-cyber-black min-h-screen font-sans">
      {!gatewayDone && <GatewayVault onEnter={() => setGatewayDone(true)} />}
      {gatewayDone && (
        <>
          <NavBar />
          <main>
            <Suspense fallback={<SectionSkeleton />}><HeroSection /></Suspense>
            <Suspense fallback={<SectionSkeleton />}><JourneyTimeline /></Suspense>
            <Suspense fallback={<SectionSkeleton />}><MetricsSection /></Suspense>
            <Suspense fallback={<SectionSkeleton />}><ProjectsSection /></Suspense>
            <Suspense fallback={<SectionSkeleton />}><SkillsSection /></Suspense>
            <Suspense fallback={<SectionSkeleton />}><NOCDashboard /></Suspense>
            <Suspense fallback={<SectionSkeleton />}><SecuritySection /></Suspense>
            <Suspense fallback={<SectionSkeleton />}><ContactForm /></Suspense>
          </main>
          <Suspense fallback={<SectionSkeleton />}><Footer /></Suspense>
          <Suspense fallback={null}><BackToTop /></Suspense>
        </>
      )}
    </div>
  )
}
