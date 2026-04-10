import { Link } from 'react-router-dom'
import { categories } from '../data/categories'
import { readJson, writeJson } from '../utils/localStorageJson'
import { useMemo, useState } from 'react'

const PROGRESS_KEY = 'oeg.progress.v1'
const SAVED_KEY = 'oeg.savedGuides.v1'

function getPercent(completedCount, total) {
  if (total <= 0) return 0
  return Math.round((completedCount / total) * 100)
}

export default function ProgressPage() {
  const [progressBySlug, setProgressBySlug] = useState(() => readJson(PROGRESS_KEY, {}))
  const [savedBySlug, setSavedBySlug] = useState(() => readJson(SAVED_KEY, {}))

  const rows = useMemo(() => {
    return categories
      .map((category) => {
        const completedSteps = progressBySlug[category.slug] ?? []
        const total = category.steps.length
        const completedCount = completedSteps.length
        const percent = getPercent(completedCount, total)
        const saved = Boolean(savedBySlug[category.slug])
        const nextStep = category.steps.find((step) => !completedSteps.includes(step)) ?? null
        return { category, saved, completedCount, total, percent, nextStep }
      })
      .sort((a, b) => {
        if (a.saved !== b.saved) return a.saved ? -1 : 1
        return b.percent - a.percent
      })
  }, [progressBySlug, savedBySlug])

  const resetAll = () => {
    setProgressBySlug({})
    writeJson(PROGRESS_KEY, {})
  }

  const clearSaved = () => {
    setSavedBySlug({})
    writeJson(SAVED_KEY, {})
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold text-emerald-700">My Progress</p>
      <h1 className="mt-1 text-3xl font-bold text-slate-900 md:text-4xl">Track what you’re actually finishing</h1>
      <p className="mt-3 max-w-3xl text-slate-600">
        This works like an app: check off steps inside any method guide. Your progress is saved on this device (offline-friendly).
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link to="/compare" className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50">
          Compare methods →
        </Link>
        <button
          type="button"
          onClick={resetAll}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
        >
          Reset progress
        </button>
        <button
          type="button"
          onClick={clearSaved}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
        >
          Clear saved guides
        </button>
      </div>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {rows.map((row) => (
          <article key={row.category.slug} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-2xl">{row.category.icon}</p>
                <h2 className="mt-2 text-lg font-semibold text-slate-900">
                  {row.category.title} {row.saved ? <span className="text-xs font-semibold text-emerald-700">(Saved)</span> : null}
                </h2>
                <p className="mt-2 text-sm text-slate-600">{row.category.overview}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Progress</p>
                <p className="mt-1 text-2xl font-bold text-slate-900">{row.percent}%</p>
              </div>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full rounded-full bg-emerald-500" style={{ width: `${row.percent}%` }} />
            </div>
            <p className="mt-3 text-sm text-slate-700">
              <span className="font-semibold">Completed:</span> {row.completedCount}/{row.total}
            </p>
            {row.nextStep && (
              <p className="mt-2 text-sm text-slate-600">
                <span className="font-semibold text-slate-700">Next:</span> {row.nextStep}
              </p>
            )}

            <div className="mt-4 flex flex-wrap gap-3">
              <Link to={`/categories/${row.category.slug}`} className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
                Open checklist →
              </Link>
              <Link to="/categories" className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50">
                Browse more →
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}

