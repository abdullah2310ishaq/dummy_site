import { commonScams, redFlags, safetyChecklist } from '../data/scamRules'

export default function ScamWarningsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold text-amber-700">Safety First</p>
      <h1 className="mt-1 text-3xl font-bold text-slate-900 md:text-4xl">Online Earning Scam Warning Guide</h1>
      <p className="mt-3 max-w-3xl text-slate-600">
        Use this page to identify risky offers quickly and protect your time, money, and personal information.
      </p>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="text-xl font-semibold text-amber-900">Major Red Flags</h2>
          <ul className="mt-3 space-y-2 text-sm text-amber-900">
            {redFlags.map((flag) => (
              <li key={flag} className="rounded-lg border border-amber-200 bg-white px-3 py-2">
                {flag}
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Safe-Check Checklist</h2>
          <ol className="mt-3 space-y-2 text-sm text-slate-700">
            {safetyChecklist.map((item) => (
              <li key={item} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                {item}
              </li>
            ))}
          </ol>
        </article>
      </section>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Common Scam Patterns</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {commonScams.map((scam) => (
            <article key={scam.title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-base font-semibold text-slate-900">{scam.title}</h3>
              <p className="mt-2 text-sm text-slate-700">{scam.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
