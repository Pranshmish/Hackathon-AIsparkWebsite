// App.jsx
import { lazy, Suspense, useEffect, useState } from 'react'
import Hero from './components/Hero.jsx'
import { PrimaryButton } from './components/Buttons.jsx'
import content from './content/site.json'

// NEW: About Us (lazy)
const AboutUs = lazy(() => import('./components/AboutUs.jsx'))

// Lazy-loaded sections (kept, but some will be commented in render)
const lazySections = {
  LogoStrip: lazy(() => import('./components/LogoStrip.jsx')),
  Features: lazy(() => import('./components/Features.jsx')),
  Tracks: lazy(() => import('./components/Tracks.jsx')),
  Prizes: lazy(() => import('./components/Prizes.jsx')),
  Timeline: lazy(() => import('./components/Timeline.jsx')),
  FAQ: lazy(() => import('./components/FAQ.jsx')),
  CTABand: lazy(() => import('./components/CTABand.jsx')),
}

// Custom hook for reduced motion preference
function useReducedMotionPreference() {
  const query = '(prefers-reduced-motion: reduce)'
  const [pref, setPref] = useState(
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  )

  useEffect(() => {
    const m = window.matchMedia(query)
    const listener = () => setPref(m.matches)
    m.addEventListener('change', listener)
    return () => m.removeEventListener('change', listener)
  }, [])

  return pref
}

// Enhanced loading component with animations
function LoadingFallback() {
  return (
    <div className="min-h-[40vh] flex items-center justify-center">
      <div className="relative">
        <div className="w-12 h-12 border-2 border-red-500/20 rounded-full animate-spin">
          <div className="absolute inset-2 border-2 border-red-400/40 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
          <div className="absolute inset-4 border-2 border-red-300/60 rounded-full animate-spin" style={{ animationDuration: '0.6s' }} />
        </div>
        <div className="absolute inset-0 w-12 h-12 bg-red-500/10 rounded-full blur-xl animate-pulse" />
      </div>
    </div>
  )
}

// Enhanced nav link with hover effects
function NavLink({ href, children, className = "" }) {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <a
      href={href}
      className={`relative text-sm transition-all duration-300 group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className={`transition-colors duration-300 ${isHovered ? 'text-red-300' : 'text-gray-300 hover:text-gray-100'}`}>
        {children}
      </span>
      <div className={`absolute -bottom-1 left-0 h-0.5 bg-red-400 transition-all duration-300 ${isHovered ? 'w-full opacity-100' : 'w-0 opacity-0'}`} />
      {isHovered && <div className="absolute inset-0 bg-red-500/5 blur-lg rounded-md transform scale-110" />}
    </a>
  )
}

// Enhanced motion toggle button
function MotionToggle({ reduced, onToggle }) {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <button
      aria-pressed={reduced}
      aria-label="Toggle reduced motion"
      onClick={onToggle}
      className={`relative overflow-hidden rounded-md border px-3 py-2 text-sm font-medium transition-all duration-300 transform ${isHovered
        ? 'border-red-500/50 bg-red-950/30 text-red-200 scale-105 shadow-lg shadow-red-500/20'
        : 'border-gray-700/50 bg-gray-900/50 text-gray-200 hover:border-red-500/30'
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && <div className="absolute inset-0 bg-red-500/10 blur-sm" />}
      <span className="relative z-10 flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full transition-all duration-300 ${reduced ? 'bg-red-500 animate-pulse' : 'bg-green-500 animate-pulse'}`} />
        {reduced ? 'Motion: Off' : 'Motion: On'}
      </span>
      <div className="absolute inset-0 bg-red-500/20 opacity-0 transition-opacity duration-150 hover:opacity-100" />
    </button>
  )
}

// Enhanced Header component (Updated nav to Coming Soon sections)
function Header() {
  const [reduced, setReduced] = useState(() => localStorage.getItem('reduce-motion') === 'true')
  const [isScrolled, setIsScrolled] = useState(false)
  const systemReduce = useReducedMotionPreference()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const shouldReduce = reduced || systemReduce
    document.documentElement.classList.toggle('reduce-motion', shouldReduce)
  }, [reduced, systemReduce])

  useEffect(() => {
    localStorage.setItem('reduce-motion', String(reduced))
  }, [reduced])

  const links = [
    { label: 'About', href: '#about' },
    { label: 'Sponsor', href: '#sponsors' },
    // Keeping original anchors commented for later use (do not remove)
    // { label: 'Tracks', href: '#tracks' },
    // { label: 'Prizes', href: '#prizes' },
    // { label: 'Schedule', href: '#schedule' },
    // { label: 'FAQ', href: '#faq' },
  ]

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
      ? 'backdrop-blur-xl bg-gray-950/90 border-b border-red-900/20 shadow-xl shadow-red-900/10'
      : 'backdrop-blur-sm bg-black/25'
      }`}>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="#hero" className="relative font-black text-xl tracking-tight text-gray-100 hover:text-red-200 transition-all duration-300 transform hover:scale-105 group" aria-label="AI GENESIS Home">
          <span className="relative z-10">AI GENESIS</span>
          <div className="absolute inset-0 bg-red-500/10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg transform scale-110" />
          <div className="absolute -top-1 -right-2 w-2 h-2 bg-red-500/60 rounded-full animate-pulse group-hover:bg-red-400 group-hover:scale-125 transition-all duration-300" />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <NavLink key={l.label} href={l.href}>{l.label}</NavLink>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <PrimaryButton
            as="a"
            href="#notify"
            className="hidden sm:inline-flex transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/25"
            aria-label="Join the waitlist"
          >
            Notify Me
          </PrimaryButton>
          <MotionToggle reduced={reduced} onToggle={() => setReduced(prev => !prev)} />
        </div>
      </nav>
      <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-px transition-all duration-500 ${isScrolled
        ? 'w-full bg-gradient-to-r from-transparent via-red-500/40 to-transparent'
        : 'w-0 bg-transparent'
        }`} />
    </header>
  )
}

// Enhanced footer with hover effects
function Footer() {
  const footerLinks = [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Contact', href: 'mailto:team@aigenesis.dev' },
    // { label: 'Rules', href: '/rules' }, // kept for later
  ]
  return (
    <footer className="relative border-t border-gray-800/50 bg-gradient-to-r from-gray-950 via-red-950/5 to-gray-950 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-red-900/5 to-transparent" />
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
      <div className="relative mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="group cursor-default">
            <p className="text-sm text-gray-400 group-hover:text-red-300 transition-colors duration-300">© 2025 AI GENESIS</p>
            <div className="mt-1 h-0.5 w-0 bg-red-400 group-hover:w-full transition-all duration-500" />
          </div>
          <nav className="flex flex-wrap items-center gap-6 text-sm">
            {footerLinks.map(link => (
              <NavLink key={link.label} href={link.href} className="text-gray-400">{link.label}</NavLink>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}

// Enhanced section wrapper with intersection observer
function SectionWrapper({ children, className = "" }) {
  const [isVisible, setIsVisible] = useState(false)
  const [ref, setRef] = useState(null)

  useEffect(() => {
    if (!ref) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(ref)
    return () => observer.disconnect()
  }, [ref])

  return (
    <div
      ref={setRef}
      className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </div>
  )
}

// Main App component
export default function App() {
  // Expect Coming Soon JSON (updated): hero, about, sponsor/logos, keep others for later
  const { hero, logos, features, tracks, prizes, timeline, faq, final_cta } = content

  // Coming Soon render plan:
  // 1) Hero (Coming Soon) with motion graphics (inside Hero.jsx)
  // 2) About Us (new component)
  // 3) Sponsor Us (reuse LogoStrip with new title/cta)
  // Keep the rest commented in the render list

  const sections = [
    // Sponsor Us (LogoStrip) – repurposed title and optional CTA via props
    { Component: lazySections.LogoStrip, props: { title: 'Sponsor Us', logos, cta: { label: 'Become a sponsor', href: 'mailto:team@aigenesis.dev' } } },

    // About Us – new component file
    { Component: AboutUs, props: { id: 'about', title: 'About Us' } },

    // Kept but commented: original hackathon pages (do not remove)
    // { Component: lazySections.Features, props: { title: features?.title, items: features?.items } },
    // { Component: lazySections.Tracks, props: { title: tracks?.title, subhead: tracks?.subhead, cards: tracks?.cards } },
    // { Component: lazySections.Prizes, props: { title: prizes?.title, items: prizes?.items, total: prizes?.total, cta: prizes?.cta } },
    // { Component: lazySections.Timeline, props: { title: timeline?.title, items: timeline?.items } },
    // { Component: lazySections.FAQ, props: { title: faq?.title, items: faq?.items } },
    // { Component: lazySections.CTABand, props: { headline: final_cta?.headline, subhead: final_cta?.subhead, cta_primary: final_cta?.cta_primary, cta_secondary: final_cta?.cta_secondary } },
  ]

  return (
    <div className="bg-gradient-to-b from-black via-red-950/5 to-black text-gray-100 min-h-screen">
      <Header />
      <main className="relative">
        {/* Main background effects */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-900/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-red-800/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Coming Soon Hero with motion graphics & 3D */}
        <Hero content={hero} />

        {/* Render only the chosen sections; others are commented above */}
        {sections.map(({ Component, props }, idx) => (
          <SectionWrapper key={idx}>
            <Suspense fallback={<LoadingFallback />}>
              <Component {...props} />
            </Suspense>
          </SectionWrapper>
        ))}
      </main>
      <Footer />
    </div>
  )
}
