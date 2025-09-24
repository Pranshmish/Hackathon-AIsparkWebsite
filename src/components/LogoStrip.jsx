export default function LogoStrip() {
  const logos = ['/logos/a.svg', '/logos/b.svg', '/logos/c.svg', '/logos/d.svg']
  return (
    <section id="social_proof" className="border-t border-[color:var(--border-soft,#1E2430)] bg-[color:var(--bg-panel,#111317)]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <p className="mb-6 text-center text-sm text-[color:var(--text-secondary,#C9D2E1)]">Backed by leaders</p>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {logos.map((src, i) => (
            <div key={i} className="group flex items-center justify-center rounded-md bg-[color:var(--bg-elevated,#151922)] p-4">
              <img src={src} alt={`Sponsor logo ${i + 1}`} className="h-8 opacity-70 transition group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
