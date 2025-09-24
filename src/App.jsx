import { lazy, Suspense, useEffect, useState } from 'react'
import Hero from './components/Hero.jsx'
import { PrimaryButton } from './components/Buttons.jsx'
import content from './content/site.json'

// Lazy-loaded sections
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

// Header component
function Header() {
  const [reduced, setReduced] = useState(() => localStorage.getItem('reduce-motion') === 'true')
  const systemReduce = useReducedMotionPreference()

  useEffect(() => {
    const shouldReduce = reduced || systemReduce
    document.documentElement.classList.toggle('reduce-motion', shouldReduce)
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
        <a href="#hero" className="font-bold tracking-tight text-[color:var(--text-primary,#F2F5F9)]" aria-label="AI GENESIS Home">
          AI GENESIS
        </a>

        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <a key={l.label} href={l.href} className="text-sm text-[color:var(--text-secondary,#C9D2E1)] hover:text-[color:var(--text-primary,#F2F5F9)]">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <PrimaryButton as="a" href="#register" className="hidden sm:inline-flex" aria-label="Register">
            Register
          </PrimaryButton>
          <button
            aria-pressed={reduced}
            aria-label="Toggle reduced motion"
            onClick={() => setReduced(prev => !prev)}
            className="rounded-md border border-[color:var(--border-soft,#1E2430)] px-3 py-2 text-sm text-[color:var(--text-primary,#F2F5F9)]"
          >
            {reduced ? 'Motion: Off' : 'Motion: On'}
          </button>
        </div>
      </nav>
    </header>
  )
}

// Main App component
export default function App() {
  const { hero, logos, features, tracks, prizes, timeline, faq, final_cta } = content

  // Map lazy-loaded sections with props
  const sections = [
    { Component: lazySections.LogoStrip, props: { title: 'Backed by leaders', logos } },
    { Component: lazySections.Features, props: { title: features.title, items: features.items } },
    { Component: lazySections.Tracks, props: { title: tracks.title, subhead: tracks.subhead, cards: tracks.cards } },
    { Component: lazySections.Prizes, props: { title: prizes.title, items: prizes.items, total: prizes.total, cta: prizes.cta } },
    { Component: lazySections.Timeline, props: { title: timeline.title, items: timeline.items } },
    { Component: lazySections.FAQ, props: { title: faq.title, items: faq.items } },
    { Component: lazySections.CTABand, props: { headline: final_cta.headline, subhead: final_cta.subhead, cta_primary: final_cta.cta_primary, cta_secondary: final_cta.cta_secondary } },
  ]

  return (
    <div className="bg-[color:var(--bg-base,#0A0B0E)] text-[color:var(--text-primary,#F2F5F9)]">
      <Header />

      <main>
        <Hero content={hero} />
        {sections.map(({ Component, props }, idx) => (
          <Suspense key={idx} fallback={null}>
            <Component {...props} />
          </Suspense>
        ))}
      </main>

      <footer className="border-t border-[color:var(--border-soft,#1E2430)] bg-[color:var(--bg-panel,#111317)]">
        <div className="mx-auto max-w-6xl px-4 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[color:var(--text-secondary,#C9D2E1)]">© 2025 AI GENESIS</p>
          <nav className="flex flex-wrap items-center gap-4 text-sm">
            <a href="/rules" className="text-[color:var(--text-secondary,#C9D2E1)] hover:text-[color:var(--text-primary,#F2F5F9)]">Rules</a>
            <a href="/privacy" className="text-[color:var(--text-secondary,#C9D2E1)] hover:text-[color:var(--text-primary,#F2F5F9)]">Privacy</a>
            <a href="/terms" className="text-[color:var(--text-secondary,#C9D2E1)] hover:text-[color:var(--text-primary,#F2F5F9)]">Terms</a>
            <a href="mailto:team@aigenesis.dev" className="text-[color:var(--text-secondary,#C9D2E1)] hover:text-[color:var(--text-primary,#F2F5F9)]">Contact</a>
          </nav>
        </div>
      </footer>
    </div>
  )
}
