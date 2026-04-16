export default function ArticleTemplatePage() {
  const templateBlocks = [
    'Problem Definition (what user is struggling with and why it matters)',
    'Who This Method Is For / Not For',
    'Step-by-Step Action Plan with realistic timeline',
    'Tool Stack and Costs',
    'Common Mistakes and Prevention',
    'Risk and Scam Red Flags',
    'Compliance Notes (disclosures, legal cautions, platform policy reminders)',
    'Frequently Asked Questions',
    'Conclusion with next practical action',
  ]

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold text-emerald-700">Content Framework</p>
      <h1 className="mt-1 text-3xl font-bold text-slate-900 md:text-4xl">Long-Form Article Template</h1>
      <p className="mt-3 text-slate-600">
        This structure is designed to keep posts practical, detailed, and AdSense-friendly by improving depth, trust,
        and user value.
      </p>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Recommended Baseline</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          <li>- Minimum 1200 words</li>
          <li>- One clear H1 and meaningful H2/H3 hierarchy</li>
          <li>- Include author and review metadata</li>
          <li>- Include internal links to legal/trust pages</li>
          <li>- Avoid guarantees and unverifiable claims</li>
        </ul>
      </section>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Core Sections</h2>
        <ol className="mt-3 space-y-2 text-sm text-slate-700">
          {templateBlocks.map((block) => (
            <li key={block}>- {block}</li>
          ))}
        </ol>
      </section>
    </div>
  )
}
