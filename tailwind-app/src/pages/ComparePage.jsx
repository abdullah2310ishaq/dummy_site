import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { categories } from '../data/categories'

function ScoreBar({ label, score, tone = 'emerald' }) {
  const width = `${(score / 5) * 100}%`
  const barClass =
    tone === 'sky' ? 'bg-sky-500' : tone === 'amber' ? 'bg-amber-500' : tone === 'rose' ? 'bg-rose-500' : 'bg-emerald-500'

  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="text-slate-500">{score}/5</span>
      </div>
      <div className="h-2 rounded-full bg-slate-200">
        <div className={`h-2 rounded-full ${barClass}`} style={{ width }} />
      </div>
    </div>
  )
}

export default function ComparePage() {
  const [leftSlug, setLeftSlug] = useState(categories[0]?.slug ?? '')
  const [rightSlug, setRightSlug] = useState(categories[1]?.slug ?? categories[0]?.slug ?? '')

  const left = useMemo(() => categories.find((c) => c.slug === leftSlug) ?? categories[0], [leftSlug])
  const right = useMemo(() => categories.find((c) => c.slug === rightSlug) ?? categories[1] ?? categories[0], [rightSlug])

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold text-emerald-700">Comparison tool</p>
      <h1 className="mt-1 text-3xl font-bold text-slate-900 md:text-4xl">Compare methods side-by-side</h1>
      <p className="mt-3 max-w-3xl text-slate-600">
        Use this like an app feature: pick two methods, compare reality (difficulty, risk, time to earn), then decide calmly.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="text-sm font-medium text-slate-700">
          Method A
          <select value={leftSlug} onChange={(e) => setLeftSlug(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm">
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.title}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium text-slate-700">
          Method B
          <select value={rightSlug} onChange={(e) => setRightSlug(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm">
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.title}
              </option>
            ))}
          </select>
        </label>
      </div>

      <section className="mt-8 grid gap-4 lg:grid-cols-2">
        {[{ item: left, tone: 'emerald' }, { item: right, tone: 'sky' }].map(({ item, tone }) => (
          <article key={item.slug} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-2xl">{item.icon}</p>
            <h2 className="mt-2 text-xl font-bold text-slate-900">{item.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{item.overview}</p>

            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-slate-100 px-2 py-1 font-medium text-slate-700">Skill: {item.skillsRequired}</span>
              <span className="rounded-full bg-slate-100 px-2 py-1 font-medium text-slate-700">Time: {item.timeToStart}</span>
              <span className="rounded-full bg-slate-100 px-2 py-1 font-medium text-slate-700">Cost: {item.startupCost}</span>
              <span className="rounded-full bg-emerald-100 px-2 py-1 font-medium text-emerald-700">Trust: {item.trustRating}</span>
            </div>

            <div className="mt-5 space-y-3">
              <ScoreBar label="Difficulty" score={item.scoring.difficulty} tone={tone} />
              <ScoreBar label="Investment" score={item.scoring.investment} tone={tone} />
              <ScoreBar label="Time to Earn" score={item.scoring.timeToEarn} tone={tone} />
              <ScoreBar label="Scalability" score={item.scoring.scalability} tone={tone} />
              <ScoreBar label="Risk" score={item.scoring.risk} tone={tone} />
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Best for</p>
                <ul className="mt-2 space-y-2 text-sm text-slate-700">
                  {item.bestFor.slice(0, 3).map((x) => (
                    <li key={x} className="rounded-xl border border-slate-200 bg-white px-3 py-2">
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-800">Avoid if</p>
                <ul className="mt-2 space-y-2 text-sm text-amber-900">
                  {item.avoidIf.slice(0, 3).map((x) => (
                    <li key={x} className="rounded-xl border border-amber-200 bg-white px-3 py-2">
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link to={`/categories/${item.slug}`} className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
                Open guide →
              </Link>
              <Link to="/progress" className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50">
                My progress →
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold text-emerald-700">Tip</p>
        <h2 className="mt-1 text-xl font-bold text-slate-900">How to decide quickly</h2>
        <ol className="mt-4 grid gap-3 md:grid-cols-3">
          <li className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            Pick the option with the <span className="font-semibold">lowest risk</span> you can execute daily.
          </li>
          <li className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            Choose one <span className="font-semibold">skill anchor</span> from the trend list and stick to it.
          </li>
          <li className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            Start a 30-day checklist and track progress in <span className="font-semibold">My Progress</span>.
          </li>
        </ol>
      </section>
    </div>
  )
}

