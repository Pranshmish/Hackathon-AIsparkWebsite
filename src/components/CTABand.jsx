import { PrimaryButton, SecondaryButton } from './Buttons.jsx'

export default function CTABand({ headline = 'Join 1,000+ builders', subhead = 'Kickoff Oct 12, 2025 (IST)', cta_primary = { label: 'Register', href: '#register' }, cta_secondary = { label: 'Join Discord', href: '#community' } }) {
  return (
    <section id="final_cta" className="border-t border-[color:var(--border-soft,#1E2430)] bg-[color:var(--bg_panel,#111317)]">
      <div className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h3 className="text-2xl font-bold text-[color:var(--text-primary,#F2F5F9)]">{headline}</h3>
        <p className="mt-2 text-[color:var(--text-secondary,#C9D2E1)]">{subhead}</p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <PrimaryButton href={cta_primary.href} aria-label={cta_primary.label}>{cta_primary.label}</PrimaryButton>
          <SecondaryButton href={cta_secondary.href} aria-label={cta_secondary.label}>{cta_secondary.label}</SecondaryButton>
        </div>
      </div>
    </section>
  )
}
