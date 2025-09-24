export default function Timeline({ title = 'Key dates', items = [] }) {
  return (
    <section id="schedule" className="border-t border-[color:var(--border-soft,#1E2430)] bg-[color:var(--bg-base,#0A0B0E)]">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-3xl font-bold text-[color:var(--text-primary,#F2F5F9)]">{title}</h2>
        <ol className="mx-auto mt-8 max-w-2xl">
          {items.map((it, i) => (
            <li key={it.label} className="flex items-center gap-4 py-3">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--accent-cyan,#00E5FF)] text-[color:var(--cta-fg,#0B0F14)] text-xs font-bold">{i + 1}</span>
              <div className="flex flex-1 items-center justify-between">
                <p className="text-[color:var(--text-primary,#F2F5F9)]">{it.label}</p>
                <time className="text-sm text-[color:var(--text-secondary,#C9D2E1)]">{it.date}</time>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
