import * as Accordion from '@radix-ui/react-accordion'

const items = [
  { q: 'Who can participate?', a: 'Open to all over 16; teams up to 4.' },
  { q: 'Submission format?', a: 'GitHub repo + 2‑min video + README.' },
  { q: 'Judging?', a: 'Impact, originality, technical depth, polish.' },
]

export default function FAQ() {
  return (
    <section id="faq" className="border-t border-[color:var(--border-soft,#1E2430)] bg-[color:var(--bg-base,#0A0B0E)]">
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="text-center text-3xl font-bold text-[color:var(--text-primary,#F2F5F9)]">FAQs</h2>
        <Accordion.Root type="single" collapsible className="mt-8 space-y-3">
          {items.map((it, i) => (
            <Accordion.Item key={i} value={`item-${i}`} className="overflow-hidden rounded-md border border-[color:var(--border-soft,#1E2430)] bg-[color:var(--bg-panel,#111317)]">
              <Accordion.Header>
                <Accordion.Trigger className="flex w-full items-center justify-between px-4 py-3 text-left text-[color:var(--text-primary,#F2F5F9)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(182,255,77,0.35)]">
                  {it.q}
                  <span aria-hidden>+</span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="px-4 pb-4 pt-2 text-sm text-[color:var(--text-secondary,#C9D2E1)]">
                {it.a}
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  )
}
