import { useEffect, useMemo, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

const items = [
  { name: 'Grand Prize', value: 1000000 },
  { name: 'Runner‑up', value: 500000 },
  { name: 'Third Place', value: 300000 },
  { name: 'Special Awards', value: 200000 },
]

function formatINR(n) {
  const s = n.toLocaleString('en-IN')
  return `₹${s}`
}

export default function Prizes() {
  const reduce = useReducedMotion()
  const [total, setTotal] = useState(2000000)
  useEffect(() => {
    if (reduce) return
    let raf
    const duration = 1200
    const start = performance.now()
    const from = 0
    const to = 2000000
    const step = (now) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      setTotal(Math.floor(from + (to - from) * eased))
      if (t < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [reduce])

  return (
    <section id="prizes" className="bg-[color:var(--bg-base,#0A0B0E)]">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-3xl font-bold text-[color:var(--text-primary,#F2F5F9)]">Prizes</h2>
        <p className="mt-3 text-center text-3xl font-extrabold text-[color:var(--accent-orange,#FF6A3D)]">{formatINR(total)}</p>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-4">
          {items.map((it) => (
            <div key={it.name} className="rounded-lg border border-[color:var(--border-soft,#1E2430)] bg-[color:var(--bg-panel,#111317)] p-6 text-center">
              <p className="text-sm text-[color:var(--text-secondary,#C9D2E1)]">{it.name}</p>
              <p className="mt-2 text-lg font-semibold text-[color:var(--text-primary,#F2F5F9)]">{formatINR(it.value)}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <a href="#register" aria-label="Register now" className="inline-flex items-center justify-center rounded-md bg-[color:var(--cta-bg,#FF6A3D)] px-5 py-3 font-medium text-[color:var(--cta-fg,#0B0F14)] hover:bg-[color:var(--cta-hover,#FF835C)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgba(182,255,77,0.35)] ring-offset-[color:var(--bg-base,#0A0B0E)]">Register now</a>
        </div>
      </div>
    </section>
  )
}
