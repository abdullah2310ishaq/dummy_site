export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold text-emerald-700">About</p>
      <h1 className="mt-1 text-3xl font-bold text-slate-900 md:text-4xl">Our Mission and Editorial Standards</h1>

      <section className="mt-6 space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-slate-700">
          OnlineEarningGuide.net exists to help beginners find legitimate online earning methods and avoid misleading shortcuts.
        </p>
        <p className="text-slate-700">
          Our goal is to publish practical guides with realistic expectations, especially for readers in Pakistan and South Asia.
        </p>
      </section>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Editorial Principles</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          <li>We do not publish guaranteed-income claims.</li>
          <li>We prioritize practical steps over generic motivation.</li>
          <li>We clearly disclose affiliate relationships when used.</li>
          <li>We avoid fake testimonials and unverifiable income screenshots.</li>
        </ul>
      </section>
    </div>
  )
}
