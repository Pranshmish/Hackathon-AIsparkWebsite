const cards = [
  { title: 'Agents', body: 'Autonomous workflows that deliver outcomes.' },
  { title: 'Vision', body: 'Perception for industry and accessibility.' },
  { title: 'Infra', body: 'Tooling for evals, safety, ops.' },
  { title: 'Consumer', body: 'Delightful products people love.' },
]

export default function Tracks() {
  return (
    <section id="tracks" className="border-t border-[color:var(--border-soft,#1E2430)] bg-[color:var(--bg-base,#0A0B0E)]">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-3xl font-bold text-[color:var(--text-primary,#F2F5F9)]">Tracks</h2>
        <p className="mt-2 text-center text-[color:var(--text-secondary,#C9D2E1)]">Pick a lane and ship fast</p>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {cards.map((c) => (
            <a key={c.title} href="#register" className="group block rounded-lg border border-[color:var(--border-soft,#1E2430)] bg-[color:var(--bg-panel,#111317)] p-6 shadow-[var(--panel-shadow,0_20px_60px_rgba(0,0,0,0.45))] transition will-change-transform hover:-translate-y-0.5 hover:shadow-xl">
              <h3 className="font-semibold text-[color:var(--text-primary,#F2F5F9)]">{c.title}</h3>
              <p className="mt-2 text-sm text-[color:var(--text-secondary,#C9D2E1)]">{c.body}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
