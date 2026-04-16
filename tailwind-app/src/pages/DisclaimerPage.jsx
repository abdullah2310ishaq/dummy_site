export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold text-emerald-700">Legal</p>
      <h1 className="mt-1 text-3xl font-bold text-slate-900 md:text-4xl">Disclaimer</h1>
      <p className="mt-3 text-sm text-slate-600">Last Updated: April 16, 2026</p>

      <div className="mt-8 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <section>
          <h2 className="text-lg font-semibold text-slate-900">Earnings Disclaimer</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            Online Earning Guide does not guarantee income results. Earnings vary based on skill, effort, market demand,
            and consistency.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">Affiliate Disclaimer</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            Some links may be affiliate links. If you buy through those links, we may earn a commission at no extra
            cost to you.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">External Links</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            We are not responsible for the content, policies, or practices of external websites linked from our site.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">Information Accuracy</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            We aim to keep information accurate and updated, but we do not guarantee that all content is complete,
            current, or error-free at all times.
          </p>
        </section>
      </div>
    </div>
  )
}
