export default function LogoStrip({
  title = 'Powered by our Partners & Sponsors',
  logos = [
    '/logos/google.svg',
    '/logos/openai.svg',
    '/logos/microsoft.svg',
    '/logos/aws.svg'
  ]
}) {
  return (
    <section
      id="sponsors"
      className="border-t border-[color:var(--border-soft,#1E2430)] bg-[color:var(--bg-panel,#111317)]"
    >
      <div className="mx-auto max-w-6xl px-4 py-10">
        <p className="mb-6 text-center text-sm text-[color:var(--text-secondary,#C9D2E1)]">
          {title}
        </p>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {logos.map((src, i) => (
            <div
              key={i}
              className="group flex items-center justify-center rounded-md bg-[color:var(--bg-elevated,#151922)] p-4"
            >
              <img
                src={src}
                alt={`AI Genesis sponsor logo ${i + 1}`}
                className="h-8 opacity-70 transition group-hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
