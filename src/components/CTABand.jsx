export default function CTABand() {
  return (
    <section id="final_cta" className="border-t border-[color:var(--border-soft,#1E2430)] bg-[color:var(--bg_panel,#111317)]">
      <div className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h3 className="text-2xl font-bold text-[color:var(--text-primary,#F2F5F9)]">Join 1,000+ builders</h3>
        <p className="mt-2 text-[color:var(--text-secondary,#C9D2E1)]">Kickoff Oct 12, 2025 (IST)</p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href="#register" aria-label="Register" className="inline-flex items-center justify-center rounded-md bg-[color:var(--cta-bg,#FF6A3D)] px-5 py-3 font-medium text-[color:var(--cta-fg,#0B0F14)] hover:bg-[color:var(--cta-hover,#FF835C)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgba(182,255,77,0.35)] ring-offset-[color:var(--bg-base,#0A0B0E)]">Register</a>
          <a href="#community" aria-label="Join Discord" className="inline-flex items-center justify-center rounded-md border border-[color:var(--border-soft,#1E2430)] bg-[color:var(--bg-panel,#111317)] px-5 py-3 font-medium text-[color:var(--text-primary,#F2F5F9)] hover:border-[color:var(--border-hard,#2A3242)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgba(182,255,77,0.35)] ring-offset-[color:var(--bg-base,#0A0B0E)]">Join Discord</a>
        </div>
      </div>
    </section>
  )
}
