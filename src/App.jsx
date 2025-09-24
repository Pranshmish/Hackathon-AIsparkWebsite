import { lazy, Suspense, useEffect, useState } from 'react'
import Hero from './components/Hero.jsx'

const LogoStrip = lazy(() => import('./components/LogoStrip.jsx'))
const Features = lazy(() => import('./components/Features.jsx'))
const Tracks = lazy(() => import('./components/Tracks.jsx'))
const Prizes = lazy(() => import('./components/Prizes.jsx'))
const Timeline = lazy(() => import('./components/Timeline.jsx'))
const FAQ = lazy(() => import('./components/FAQ.jsx'))
const CTABand = lazy(() => import('./components/CTABand.jsx'))

function useReducedMotionPreference() {
  const query = '(prefers-reduced-motion: reduce)'
  const get = () => (typeof window !== 'undefined' && window.matchMedia(query).matches)
  const [pref, setPref] = useState(get())
  useEffect(() => {
    const m = window.matchMedia(query)
    const onChange = () => setPref(m.matches)
    m.addEventListener('change', onChange)
    return () => m.removeEventListener('change', onChange)
  }, [])
  return pref
}

function Header() {
  const [reduced, setReduced] = useState(() => {
    const v = localStorage.getItem('reduce-motion')
    return v === 'true'
  })
  const systemReduce = useReducedMotionPreference()
  useEffect(() => {
    if (reduced || systemReduce) document.documentElement.classList.add('reduce-motion')
    else document.documentElement.classList.remove('reduce-motion')
  }, [reduced, systemReduce])
  useEffect(() => {
    localStorage.setItem('reduce-motion', String(reduced))
  }, [reduced])

  const links = [
    { label: 'Why us', href: '#benefits' },
    { label: 'Tracks', href: '#tracks' },
    { label: 'Prizes', href: '#prizes' },
    { label: 'Schedule', href: '#schedule' },
    { label: 'FAQ', href: '#faq' },
  ]
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/25">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="#hero" className="font-bold tracking-tight text-[color:var(--text-primary,#F2F5F9)]" aria-label="AI GENESIS Home">AI GENESIS</a>
        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="text-sm text-[color:var(--text-secondary,#C9D2E1)] hover:text-[color:var(--text-primary,#F2F5F9)]">
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a href="#register" className="hidden rounded-md bg-[color:var(--cta-bg,#FF6A3D)] px-3 py-2 text-sm font-medium text-[color:var(--cta-fg,#0B0F14)] hover:bg-[color:var(--cta-hover,#FF835C)] sm:inline-flex" aria-label="Register">
            Register
          </a>
          <button aria-pressed={reduced} aria-label="Toggle reduced motion" onClick={() => setReduced((v) => !v)} className="rounded-md border border-[color:var(--border-soft,#1E2430)] px-3 py-2 text-sm text-[color:var(--text-primary,#F2F5F9)]">
            {reduced ? 'Motion: Off' : 'Motion: On'}
          </button>
        </div>
      </nav>
    </header>
  )
}

export default function App() {
  return (
    <div className="bg-[color:var(--bg-base,#0A0B0E)] text-[color:var(--text-primary,#F2F5F9)]">
      <Header />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <LogoStrip />
        </Suspense>
        <Suspense fallback={null}>
          <Features />
        </Suspense>
        <Suspense fallback={null}>
          <Tracks />
        </Suspense>
        <Suspense fallback={null}>
          <Prizes />
        </Suspense>
        <Suspense fallback={null}>
          <Timeline />
        </Suspense>
        <Suspense fallback={null}>
          <FAQ />
        </Suspense>
        <Suspense fallback={null}>
          <CTABand />
        </Suspense>
      </main>
      <footer className="border-t border-[color:var(--border-soft,#1E2430)] bg-[color:var(--bg-panel,#111317)]">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-[color:var(--text-secondary,#C9D2E1)]">© 2025 AI GENESIS</p>
            <nav className="flex flex-wrap items-center gap-4 text-sm">
              <a href="/rules" className="text-[color:var(--text-secondary,#C9D2E1)] hover:text-[color:var(--text-primary,#F2F5F9)]">Rules</a>
              <a href="/privacy" className="text-[color:var(--text-secondary,#C9D2E1)] hover:text-[color:var(--text-primary,#F2F5F9)]">Privacy</a>
              <a href="/terms" className="text-[color:var(--text-secondary,#C9D2E1)] hover:text-[color:var(--text-primary,#F2F5F9)]">Terms</a>
              <a href="mailto:team@aigenesis.dev" className="text-[color:var(--text-secondary,#C9D2E1)] hover:text-[color:var(--text-primary,#F2F5F9)]">Contact</a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}
