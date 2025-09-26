function LightningBoltIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden={true} width="24" height="24" {...props}>
      <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" fill="currentColor" />
    </svg>
  )
}
function HandIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden={true} width="24" height="24" {...props}>
      <path d="M12 2v10l4 4v2H6v-6l6-10z" fill="currentColor" />
    </svg>
  )
}
function ShieldCheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden={true} width="24" height="24" {...props}>
      <path d="M12 2l7 4v5c0 5-3.9 9.7-7 11-3.1-1.3-7-6-7-11V6l7-4z" fill="currentColor" />
      <path d="M9.5 12.5l1.8 1.8 3.7-3.7" stroke="#0B0F14" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// 🔥 Updated AI Genesis Features
const defaultItems = [
  { icon: 'zap', title: 'AI-Powered Innovation', body: 'Build with cutting-edge AI tools, APIs, and datasets to push the limits of creativity.' },
  { icon: 'sparkles', title: 'Future-Ready Skills', body: 'Learn real-world skills in ML, LLMs, and automation while working with top mentors.' },
  { icon: 'gauge', title: 'Global Challenge', body: 'Compete with bright minds across the globe, win prizes, and showcase your project to industry leaders.' },
]

// Icons
function IconZap(props) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden={true} {...props}>
      <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
    </svg>
  )
}
function IconSparkles(props) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden={true} {...props}>
      <path d="M12 2l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6z" />
    </svg>
  )
}
function IconGauge(props) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden={true} {...props}>
      <path d="M12 4a8 8 0 100 16 8 8 0 000-16zm1 4l-3 6h6l-3-6z" />
    </svg>
  )
}

function pickIcon(name) {
  if (name === 'zap') return IconZap
  if (name === 'sparkles') return IconSparkles
  if (name === 'gauge') return IconGauge
  return IconZap
}

export default function Features({ title = 'Why Join AI Genesis?', items = defaultItems }) {
  return (
    <section id="benefits" className="bg-[color:var(--bg-base,#0A0B0E)] relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-3xl font-bold tracking-tight text-[color:var(--text-primary,#F2F5F9)]">
          {title}
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {items.map(({ icon, title, body }) => {
            const Icon = typeof icon === 'string' ? pickIcon(icon) : icon
            return (
              <div
                key={title}
                className="rounded-lg border border-[color:var(--border-soft,#1E2430)] 
                           bg-[color:var(--bg-panel,#111317)] p-6 
                           shadow-[0_0_30px_rgba(179,0,0,0.35)] 
                           hover:shadow-[0_0_50px_rgba(179,0,0,0.55)] 
                           transition duration-300"
              >
                <Icon className="h-6 w-6 text-[#B30000]" aria-hidden={true} />
                <h3 className="mt-4 font-semibold text-[color:var(--text-primary,#F2F5F9)]">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-[color:var(--text-secondary,#C9D2E1)]">
                  {body}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
