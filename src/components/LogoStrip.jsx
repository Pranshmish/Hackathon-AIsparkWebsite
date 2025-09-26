// components/Sponsors.jsx
import { useEffect, useState, useRef } from 'react'
import { PrimaryButton } from './Buttons.jsx'

/* ===================== Persuasive copy ===================== */
const titleDefault = 'SPONSOR US'
const subtitleDefault = 'Fuel the next wave of AI breakthroughs. Unlock premium visibility, recruit exceptional talent, and co‑launch with momentum.'

// Partnership outcomes (replaces developers/countries/prize)
const outcomesDefault = [
  { value: 'Global Spotlight', desc: 'Prime branding across the event, website, and live stream moments that matter.' },
  { value: 'Hiring Pipeline', desc: 'Access to vetted finalists, portfolio reviews, and invite‑only recruiting sessions.' },
  { value: 'Co‑Launch & GTM', desc: 'Showcase demos, ship integrations, and announce with us across channels.' },
  { value: 'Thought Leadership', desc: 'Keynotes, panel seats, and editorial features aligned to brand POV.' },
]

/* ===================== Motion: blood luxury set ===================== */

// Flowing vein ribbons
function VeinRibbons() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute left-[-20%] right-[-20%] top-[28%] h-24 opacity-25 blur-[2px]"
        style={{
          background:
            'linear-gradient(90deg, rgba(180,0,0,0.0) 0%, rgba(180,0,0,0.22) 20%, rgba(255,40,40,0.28) 50%, rgba(180,0,0,0.22) 80%, rgba(180,0,0,0.0) 100%)',
          maskImage:
            'radial-gradient(120% 60% at 50% 50%, black 60%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(120% 60% at 50% 50%, black 60%, transparent 100%)',
          animation: 'ribbon 18s linear infinite'
        }}
      />
      <div
        className="absolute left-[-20%] right-[-20%] bottom-[22%] h-20 opacity-20 blur-[2px]"
        style={{
          background:
            'linear-gradient(90deg, rgba(180,0,0,0.0) 0%, rgba(180,0,0,0.2) 25%, rgba(255,40,40,0.26) 55%, rgba(180,0,0,0.2) 85%, rgba(180,0,0,0.0) 100%)',
          maskImage:
            'radial-gradient(120% 60% at 50% 50%, black 60%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(120% 60% at 50% 50%, black 60%, transparent 100%)',
          animation: 'ribbonRev 22s linear infinite'
        }}
      />
      <style jsx>{`
        @keyframes ribbon { 0% { background-position: -200% 0 } 100% { background-position: 200% 0 } }
        @keyframes ribbonRev { 0% { background-position: 200% 0 } 100% { background-position: -200% 0 } }
      `}</style>
    </div>
  )
}

// Blood drips
function BloodDripsLayer() {
  const [drips, setDrips] = useState([])
  useEffect(() => {
    setDrips(Array.from({ length: 14 }, (_, i) => ({
      id: i, x: 6 + (i * 7) % 90, delay: i * 0.35, speed: 6 + (i % 5), w: 2, h: 10 + (i % 4) * 8
    })))
  }, [])
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {drips.map(d => (
        <span
          key={d.id}
          className="absolute rounded-full"
          style={{
            left: `${d.x}%`, top: '-5%', width: d.w, height: d.h,
            background: 'linear-gradient(to bottom, rgba(220,20,20,0.9), rgba(180,0,0,0.0))',
            filter: 'blur(0.3px)',
            animation: `drip ${d.speed}s linear ${d.delay}s infinite`
          }}
        />
      ))}
      <style jsx>{`
        @keyframes drip {
          0% { transform: translateY(-10%); opacity: 0 }
          10% { opacity: .9 }
          90% { opacity: .9 }
          100% { transform: translateY(120vh); opacity: 0 }
        }
      `}</style>
    </div>
  )
}

// Section sheen + mouse glow
function SectionSheen() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-10"
      style={{
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
        animation: 'sheen 14s ease-in-out infinite'
      }}
    >
      <style jsx>{`@keyframes sheen { 0%,100% { opacity:.08 } 50% { opacity:.16 } }`}</style>
    </div>
  )
}
function MouseGlow() {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current?.parentElement
    if (!el) return
    const move = e => {
      const r = el.getBoundingClientRect()
      setPos({ x: e.clientX - r.left, y: e.clientY - r.top })
      setVis(true)
    }
    const leave = () => setVis(false)
    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', leave)
    return () => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave) }
  }, [])
  return (
    <div ref={ref} className="pointer-events-none absolute inset-0">
      {vis && (
        <div
          className="absolute rounded-full transition-transform duration-200"
          style={{
            left: pos.x - 140, top: pos.y - 140, width: 280, height: 280,
            background: 'radial-gradient(circle, rgba(230,30,30,0.26) 0%, rgba(160,0,0,0.12) 45%, transparent 70%)',
            filter: 'blur(18px)'
          }}
        />
      )}
    </div>
  )
}

/* ===================== UI ===================== */
function GlitchText({ children, className = '' }) {
  const [g, setG] = useState(false)
  useEffect(() => {
    const iv = setInterval(() => { setG(true); setTimeout(() => setG(false), 120) }, 3600 + Math.random() * 3000)
    return () => clearInterval(iv)
  }, [])
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      {g && <>
        <span className="absolute inset-0 text-red-400 opacity-70 translate-x-1">{children}</span>
        <span className="absolute inset-0 text-red-300 opacity-50 -translate-x-1">{children}</span>
      </>}
    </span>
  )
}

// Benefit bullets as attractive cards
function BenefitCard({ title, desc, i }) {
  return (
    <div className="group relative rounded-xl border border-red-900/30 bg-black/60 p-6 overflow-hidden transition-all duration-400 hover:border-red-500/50 hover:shadow-[0_18px_60px_rgba(190,8,20,0.22)]">
      <span
        className="pointer-events-none absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)', animation: 'cardSheen 2.4s linear infinite' }}
      />
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-[#1A0A0A] flex items-center justify-center shadow-inner shadow-[#4B0A0A]">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400 shadow-[0_0_10px_rgba(190,8,20,0.7)]" />
        </div>
        <div>
          <h4 className="text-red-100 font-semibold">{title}</h4>
          <p className="mt-1 text-sm text-red-200/70">{desc}</p>
        </div>
      </div>
      <style jsx>{`@keyframes cardSheen { 0% { transform: translateX(-120%) } 100% { transform: translateX(120%) } }`}</style>
    </div>
  )
}

export default function Sponsors({
  title = titleDefault,
  subtitle = subtitleDefault,
  outcomes = outcomesDefault,
  cta = { href: '#sponsor', label: 'Sponsor Us' }
}) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <section id="sponsor-us" className="relative overflow-hidden bg-black">
      {/* Motion layers */}
      <VeinRibbons />
      <BloodDripsLayer />
      <SectionSheen />
      <MouseGlow />

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(220, 38, 38, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(220, 38, 38, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Content */}
      <div className={`relative z-10 max-w-7xl mx-auto px-6 py-24 ${mounted ? 'opacity-100 translate-y-0 transition-all duration-700' : 'opacity-0 translate-y-4'}`}>
        {/* Header */}
        <div className="text-center mb-12">
          <GlitchText className="text-4xl md:text-5xl font-extrabold text-white tracking-wide">
            {title}
          </GlitchText>
          <div className="mt-3 h-0.5 w-28 mx-auto bg-gradient-to-r from-transparent via-red-500 to-transparent" />
          <p className="mt-5 text-gray-300 max-w-3xl mx-auto text-lg">{subtitle}</p>
        </div>

        {/* Benefits grid (no logos shown) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-10">
          {outcomes.map((o, i) => (
            <BenefitCard key={i} title={o.value} desc={o.desc} i={i} />
          ))}
        </div>

        {/* Partnership tiers preview */}
        <div className="max-w-5xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { tier: 'Community', note: 'Brand presence, socials, newsletter features.' },
            { tier: 'Premiere', note: 'Stage time, judging, recruiting access.' },
            { tier: 'Title', note: 'Category ownership, co‑launch, headline slots.' },
          ].map((t, i) => (
            <div key={i} className="relative rounded-xl border border-red-900/30 bg-black/60 p-6 hover:border-red-500/50 transition-colors">
              <div className="text-red-200 font-bold">{t.tier}</div>
              <p className="mt-2 text-sm text-red-200/70">{t.note}</p>
              <div className="mt-4 h-0.5 w-0 bg-gradient-to-r from-[#8E0A0A] via-[#D11A1A] to-[#8E0A0A] rounded-full group-hover:w-full transition-all duration-600" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <PrimaryButton href={cta?.href || '#sponsor'}>{cta?.label || 'Sponsor Us'}</PrimaryButton>
          <p className="mt-3 text-xs text-gray-400">
            Request the partnership kit — placements, timelines, pricing, and co‑marketing calendar.
          </p>
        </div>

        {/* Bottom dots */}
        <div className="flex justify-center gap-2 mt-12">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="bg-red-500/30 rounded-full animate-pulse hover:bg-red-400/60 hover:scale-125 transition-all"
              style={{ width: 4, height: 18 + Math.sin(i) * 6, animationDelay: `${i * 140}ms` }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
