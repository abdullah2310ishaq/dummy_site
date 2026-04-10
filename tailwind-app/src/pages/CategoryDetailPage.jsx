import { Link, useParams } from 'react-router-dom'
import { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { categories } from '../data/categories'
import { readJson, writeJson } from '../utils/localStorageJson'

const PROGRESS_KEY = 'oeg.progress.v1'
const SAVED_KEY = 'oeg.savedGuides.v1'

function ScoreBar({ label, score }) {
  const width = `${(score / 5) * 100}%`
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="text-slate-500">{score}/5</span>
      </div>
      <div className="h-2 rounded-full bg-slate-200">
        <div className="h-2 rounded-full bg-emerald-500" style={{ width }} />
      </div>
    </div>
  )
}

ScoreBar.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
}

export default function CategoryDetailPage() {
  const { slug } = useParams()
  const category = categories.find((item) => item.slug === slug)
  const [progressBySlug, setProgressBySlug] = useState(() => readJson(PROGRESS_KEY, {}))
  const [savedBySlug, setSavedBySlug] = useState(() => readJson(SAVED_KEY, {}))

  if (!category) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <h1 className="text-2xl font-bold text-slate-900">Category not found</h1>
        <p className="mt-2 text-slate-600">The requested category does not exist.</p>
        <Link to="/categories" className="mt-4 inline-flex text-emerald-700 hover:text-emerald-800">
          Back to categories
        </Link>
      </div>
    )
  }

  const saved = Boolean(savedBySlug[category.slug])
  const completedSteps = progressBySlug[category.slug] ?? []
  const totalSteps = category.steps.length
  const completedCount = completedSteps.length
  const percent = totalSteps === 0 ? 0 : Math.round((completedCount / totalSteps) * 100)
  const nextStep = category.steps.find((step) => !completedSteps.includes(step)) ?? null

  const checklistItems = useMemo(
    () =>
      category.steps.map((step) => ({
        id: step,
        label: step,
        checked: completedSteps.includes(step),
      })),
    [category.steps, completedSteps],
  )

  const toggleSaved = () => {
    const next = { ...savedBySlug, [category.slug]: !saved }
    setSavedBySlug(next)
    writeJson(SAVED_KEY, next)
  }

  const toggleStep = (step) => {
    const current = progressBySlug[category.slug] ?? []
    const isDone = current.includes(step)
    const nextSteps = isDone ? current.filter((item) => item !== step) : [...current, step]
    const next = { ...progressBySlug, [category.slug]: nextSteps }
    setProgressBySlug(next)
    writeJson(PROGRESS_KEY, next)
  }

  const resetChecklist = () => {
    const next = { ...progressBySlug, [category.slug]: [] }
    setProgressBySlug(next)
    writeJson(PROGRESS_KEY, next)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold text-emerald-700">Category Guide</p>
      <h1 className="mt-1 text-3xl font-bold text-slate-900 md:text-4xl">
        {category.icon} {category.title}
      </h1>
      <p className="mt-3 max-w-3xl text-slate-600">{category.description}</p>

      <div className="mt-5 grid gap-4 lg:grid-cols-12">
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-8">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-emerald-700">Execution mode</p>
              <h2 className="mt-1 text-xl font-bold text-slate-900">Checklist you can actually finish</h2>
              <p className="mt-2 text-sm text-slate-600">Mark steps complete. Your progress is saved on this device.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={toggleSaved}
                className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                  saved ? 'border-emerald-200 bg-emerald-50 text-emerald-900' : 'border-slate-200 bg-white text-slate-900 hover:bg-slate-50'
                }`}
              >
                {saved ? 'Saved ✓' : 'Save guide'}
              </button>
              <button
                type="button"
                onClick={resetChecklist}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between gap-3 text-sm">
              <p className="font-semibold text-slate-900">
                Progress: {completedCount}/{totalSteps} ({percent}%)
              </p>
              <p className="text-slate-600">{nextStep ? 'Next action below ↓' : 'Completed. Great—now repeat weekly.'}</p>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full rounded-full bg-emerald-500" style={{ width: `${percent}%` }} />
            </div>
            {nextStep && (
              <p className="mt-3 text-sm text-slate-700">
                <span className="font-semibold">Next:</span> {nextStep}
              </p>
            )}
          </div>

          <ul className="mt-5 space-y-2">
            {checklistItems.map((item) => (
              <li key={item.id} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 accent-emerald-600"
                    checked={item.checked}
                    onChange={() => toggleStep(item.id)}
                  />
                  <span className={`text-sm ${item.checked ? 'text-slate-500 line-through' : 'text-slate-800'}`}>{item.label}</span>
                </label>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link to="/progress" className="text-sm font-semibold text-emerald-700 hover:text-emerald-800">
              View my progress →
            </Link>
            <Link to="/compare" className="text-sm font-semibold text-slate-900 hover:text-emerald-700">
              Compare methods →
            </Link>
          </div>
        </section>

        <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-4">
          <p className="text-sm font-semibold text-emerald-700">Quick summary</p>
          <h2 className="mt-1 text-xl font-bold text-slate-900">What this method needs</h2>
          <div className="mt-4 space-y-2 text-sm text-slate-700">
            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
              <span className="font-semibold">Skill</span>
              <span>{category.skillsRequired}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
              <span className="font-semibold">Time</span>
              <span>{category.timeToStart}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
              <span className="font-semibold">Cost</span>
              <span>{category.startupCost}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-emerald-900">
              <span className="font-semibold">Trust</span>
              <span>{category.trustRating}</span>
            </div>
          </div>
          <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm font-semibold text-amber-900">Safety note</p>
            <p className="mt-1 text-sm text-amber-900">
              Avoid “guaranteed earning” claims and upfront fees. If something feels rushed or vague, treat it as risky.
            </p>
          </div>
        </aside>
      </div>

      <div className="mt-6 flex flex-wrap gap-2 text-xs">
        <span className="rounded-full bg-slate-100 px-2 py-1 font-medium text-slate-700">Skill: {category.skillsRequired}</span>
        <span className="rounded-full bg-slate-100 px-2 py-1 font-medium text-slate-700">Time: {category.timeToStart}</span>
        <span className="rounded-full bg-slate-100 px-2 py-1 font-medium text-slate-700">Cost: {category.startupCost}</span>
        <span className="rounded-full bg-emerald-100 px-2 py-1 font-medium text-emerald-700">Trust: {category.trustRating}</span>
      </div>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Platforms to Start With</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {category.platforms.map((platform) => (
              <li key={platform} className="rounded-lg bg-slate-100 px-3 py-2">
                {platform}
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Method Scoring System</h2>
          <p className="mt-2 text-sm text-slate-600">Compare this path with others using difficulty, investment, speed, scalability, and risk.</p>
          <div className="mt-4 space-y-3">
            <ScoreBar label="Difficulty" score={category.scoring.difficulty} />
            <ScoreBar label="Investment" score={category.scoring.investment} />
            <ScoreBar label="Time to Earn" score={category.scoring.timeToEarn} />
            <ScoreBar label="Scalability" score={category.scoring.scalability} />
            <ScoreBar label="Risk" score={category.scoring.risk} />
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Realistic Earnings</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="rounded-lg border border-slate-200 p-3">
              <dt className="font-semibold text-slate-900">Beginner</dt>
              <dd className="text-slate-600">{category.earnings.beginner}</dd>
            </div>
            <div className="rounded-lg border border-slate-200 p-3">
              <dt className="font-semibold text-slate-900">Intermediate</dt>
              <dd className="text-slate-600">{category.earnings.intermediate}</dd>
            </div>
            <div className="rounded-lg border border-slate-200 p-3">
              <dt className="font-semibold text-slate-900">Expert</dt>
              <dd className="text-slate-600">{category.earnings.expert}</dd>
            </div>
          </dl>
        </article>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">30-Day Step-by-Step Plan</h2>
          <ol className="mt-3 space-y-2 text-sm text-slate-700">
            {category.steps.map((step) => (
              <li key={step} className="rounded-lg border border-slate-200 px-3 py-2">
                {step}
              </li>
            ))}
          </ol>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Reality-First Guidance</h2>
          <h3 className="mt-3 text-sm font-semibold uppercase tracking-wide text-slate-500">This method is best for</h3>
          <ul className="mt-2 space-y-2 text-sm text-slate-700">
            {category.bestFor.map((item) => (
              <li key={item} className="rounded-lg border border-slate-200 px-3 py-2">
                {item}
              </li>
            ))}
          </ul>
          <h3 className="mt-4 text-sm font-semibold uppercase tracking-wide text-slate-500">Who should avoid this</h3>
          <ul className="mt-2 space-y-2 text-sm text-slate-700">
            {category.avoidIf.map((item) => (
              <li key={item} className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-amber-900">
                {item}
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Common Mistakes to Avoid</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {category.commonMistakes.map((mistake) => (
              <li key={mistake} className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-amber-900">
                {mistake}
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Failure Breakdown (Why People Get Stuck)</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {category.failureBreakdown.map((point) => (
              <li key={point} className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-rose-900">
                {point}
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Localized Payment Methods</h2>
          <p className="mt-2 text-sm text-slate-600">Useful options for users in Pakistan and South Asia.</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {category.localPayments.map((payment) => (
              <li key={payment} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                {payment}
              </li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  )
}
