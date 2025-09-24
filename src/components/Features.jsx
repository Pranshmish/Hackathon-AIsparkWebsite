function LightningBoltIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden width="24" height="24" {...props}>
      <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" fill="currentColor" />
    </svg>
  )
}
function HandIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden width="24" height="24" {...props}>
      <path d="M12 2v10l4 4v2H6v-6l6-10z" fill="currentColor" />
    </svg>
  )
}
function ShieldCheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden width="24" height="24" {...props}>
      <path d="M12 2l7 4v5c0 5-3.9 9.7-7 11-3.1-1.3-7-6-7-11V6l7-4z" fill="currentColor" />
      <path d="M9.5 12.5l1.8 1.8 3.7-3.7" stroke="#0B0F14" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const items = [
  { icon: LightningBoltIcon, title: 'Cinematic 3D', body: 'AI‑themed ribbons, circuits, holograms for instant wow.' },
  { icon: HandIcon, title: 'Smooth motion', body: 'Framer Motion syncs UI and 3D gestures.' },
  { icon: ShieldCheckIcon, title: 'Fast & accessible', body: 'Optimized assets, strong contrast, reduced‑motion support.' },
]

export default function Features() {
  return (
    <section id="benefits" className="bg-[color:var(--bg-base,#0A0B0E)]">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-3xl font-bold text-[color:var(--text-primary,#F2F5F9)]">Why join</h2>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {items.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-lg border border-[color:var(--border-soft,#1E2430)] bg-[color:var(--bg-panel,#111317)] p-6 shadow-[var(--panel-shadow,0_20px_60px_rgba(0,0,0,0.45))]">
              <Icon className="h-6 w-6 text-[color:var(--accent-cyan,#00E5FF)]" aria-hidden />
              <h3 className="mt-4 font-semibold text-[color:var(--text-primary,#F2F5F9)]">{title}</h3>
              <p className="mt-2 text-sm text-[color:var(--text-secondary,#C9D2E1)]">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
