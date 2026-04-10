import { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const questions = [
  {
    id: 'goal',
    label: 'What do you want most right now?',
    labelUr: 'Abhi aapka main goal kya hai?',
    options: [
      { id: 'fast', label: 'Fast income (quick start)', labelUr: 'Jaldi earning start' },
      { id: 'stable', label: 'Stable monthly income', labelUr: 'Stable monthly income' },
      { id: 'passive', label: 'Long-term passive layer', labelUr: 'Long-term passive layer' },
      { id: 'business', label: 'Scale a real business', labelUr: 'Business scale karna' },
    ],
  },
  {
    id: 'skills',
    label: 'How strong are your skills today?',
    labelUr: 'Aaj aapki skills ka level?',
    options: [
      { id: 'beginner', label: 'Beginner (starting from zero)', labelUr: 'Beginner (zero se)' },
      { id: 'some', label: 'Some skills (can learn fast)', labelUr: 'Thori skills (fast learn)' },
      { id: 'strong', label: 'Strong skills (ready to sell)', labelUr: 'Strong skills (sell ready)' },
    ],
  },
  {
    id: 'time',
    label: 'How much time can you give daily?',
    labelUr: 'Roz kitna time de sakte hain?',
    options: [
      { id: '30-60', label: '30–60 minutes', labelUr: '30–60 minutes' },
      { id: '1-2', label: '1–2 hours', labelUr: '1–2 ghantay' },
      { id: '3+', label: '3+ hours', labelUr: '3+ ghantay' },
    ],
  },
  {
    id: 'budget',
    label: 'What is your startup budget?',
    labelUr: 'Startup budget kitna hai?',
    options: [
      { id: 'low', label: 'Low (mostly free tools)', labelUr: 'Low (free tools)' },
      { id: 'medium', label: 'Medium (some paid tools)', labelUr: 'Medium (thore paid tools)' },
      { id: 'high', label: 'High (ads / inventory possible)', labelUr: 'High (ads/inventory)' },
    ],
  },
  {
    id: 'style',
    label: 'Which work style fits you?',
    labelUr: 'Work style jo aapko suit karta hai?',
    options: [
      { id: 'client', label: 'Client work (services)', labelUr: 'Client work (services)' },
      { id: 'content', label: 'Content (audience building)', labelUr: 'Content (audience build)' },
      { id: 'job', label: 'Job (salary & structure)', labelUr: 'Job (salary/structure)' },
      { id: 'product', label: 'Product (selling online)', labelUr: 'Product (sell online)' },
    ],
  },
]

function getSpeedTag(goalId) {
  switch (goalId) {
    case 'fast':
      return 'fast-income'
    case 'stable':
      return 'stable-income'
    case 'passive':
      return 'long-term-passive'
    case 'business':
      return 'scalable-business'
    default:
      return 'all'
  }
}

function scoreCategory(category, answers) {
  let score = 0

  const targetTag = getSpeedTag(answers.goal)
  if (targetTag !== 'all' && category.speedTag === targetTag) score += 5

  if (answers.budget && category.startupCost?.toLowerCase?.() === answers.budget) score += 3

  if (answers.skills === 'beginner') {
    if (category.skillsRequired === 'Low') score += 4
    if (category.skillsRequired === 'Medium') score += 2
  } else if (answers.skills === 'some') {
    if (category.skillsRequired === 'Medium') score += 4
    if (category.skillsRequired === 'Low') score += 2
  } else if (answers.skills === 'strong') {
    if (category.skillsRequired === 'High') score += 4
    if (category.skillsRequired === 'Medium') score += 2
  }

  if (answers.style === 'client' && category.slug === 'freelancing') score += 5
  if (answers.style === 'job' && category.slug === 'remote-jobs') score += 5
  if (answers.style === 'content' && category.slug === 'content-creation') score += 5
  if (answers.style === 'product' && category.slug === 'ecommerce-dropshipping') score += 5

  if (answers.time === '30-60') {
    if (category.speedTag === 'long-term-passive') score += 2
  } else if (answers.time === '3+') {
    if (category.speedTag === 'fast-income') score += 1
    if (category.speedTag === 'scalable-business') score += 2
  }

  return score
}

function AnswerButton({ isSelected, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group w-full rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
        isSelected
          ? 'border-emerald-300 bg-emerald-50 text-slate-900 shadow-sm'
          : 'border-white/10 bg-white/5 text-white hover:border-white/20 hover:bg-white/10'
      }`}
    >
      <span className="flex items-center justify-between gap-3">
        <span className="leading-snug">{children}</span>
        <span
          className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border text-sm transition ${
            isSelected ? 'border-emerald-200 bg-white text-emerald-700' : 'border-white/15 bg-white/5 text-white/80'
          }`}
          aria-hidden="true"
        >
          {isSelected ? '✓' : '→'}
        </span>
      </span>
    </button>
  )
}

AnswerButton.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export default function LandingQuiz({ categories }) {
  const [isOpen, setIsOpen] = useState(true)
  const [isUrdu, setIsUrdu] = useState(false)
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState({})

  const totalSteps = questions.length
  const step = questions[stepIndex]
  const progressPercent = Math.round(((stepIndex + 1) / totalSteps) * 100)

  const recommendations = useMemo(() => {
    const hasAllAnswers = questions.every((q) => answers[q.id])
    if (!hasAllAnswers) return []

    return [...categories]
      .map((category) => ({ category, score: scoreCategory(category, answers) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((entry) => entry.category)
  }, [answers, categories])

  const isFinished = recommendations.length > 0

  const reset = () => {
    setStepIndex(0)
    setAnswers({})
  }

  if (!isOpen) {
    return (
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white shadow-sm backdrop-blur transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
        >
          Find my best path (5 questions) →
        </button>
      </div>
    )
  }

  return (
    <section className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-lg backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-200">
            {isUrdu ? 'Aapke liye best method' : 'Find your best method'}
          </p>
          <p className="mt-1 text-sm text-slate-200">
            {isUrdu ? '5 sawalat, instant recommendation.' : '5 questions. Instant recommendation.'}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setIsUrdu((prev) => !prev)}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
            aria-pressed={isUrdu}
          >
            {isUrdu ? 'English' : 'Urdu / Roman'}
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/90 transition hover:bg-white/10"
          >
            Close
          </button>
        </div>
      </div>

      <div className="px-5 py-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-semibold text-white/80">
            {isFinished ? (isUrdu ? 'Done' : 'Done') : `${isUrdu ? 'Step' : 'Step'} ${stepIndex + 1} / ${totalSteps}`}
          </p>
          <div className="h-2 w-40 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-gradient-to-r from-emerald-300 via-sky-300 to-purple-300" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        {!isFinished ? (
          <>
            <h3 className="mt-4 text-lg font-semibold text-white">{isUrdu ? step.labelUr : step.label}</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {step.options.map((option) => (
                <AnswerButton
                  key={option.id}
                  isSelected={answers[step.id] === option.id}
                  onClick={() => {
                    setAnswers((prev) => ({ ...prev, [step.id]: option.id }))
                    setStepIndex((prev) => Math.min(prev + 1, totalSteps - 1))
                  }}
                >
                  {isUrdu ? option.labelUr : option.label}
                </AnswerButton>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setStepIndex((prev) => Math.max(prev - 1, 0))}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 disabled:opacity-50"
                disabled={stepIndex === 0}
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={reset}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/10"
              >
                Reset
              </button>
            </div>
          </>
        ) : (
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-white">{isUrdu ? 'Aapke top 3 options' : 'Your top 3 options'}</h3>
            <p className="mt-2 text-sm text-slate-200">
              {isUrdu
                ? 'Neeche recommended methods hain. Pehle wali se start karain.'
                : 'These are recommended based on your answers. Start with the first one.'}
            </p>

            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {recommendations.map((item, index) => (
                <Link
                  key={item.slug}
                  to={`/categories/${item.slug}`}
                  className="group rounded-2xl border border-white/10 bg-slate-950/40 p-4 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  <p className="text-2xl">{item.icon}</p>
                  <p className="mt-2 text-sm font-semibold text-white">
                    {index === 0 ? (isUrdu ? 'Best match: ' : 'Best match: ') : ''}
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm text-slate-200">{item.overview}</p>
                  <p className="mt-3 text-sm font-semibold text-emerald-200 group-hover:text-emerald-100">Open guide →</p>
                </Link>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/start-here"
                className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
              >
                Open the beginner roadmap →
              </Link>
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
              >
                Try again
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

LandingQuiz.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      overview: PropTypes.string.isRequired,
      skillsRequired: PropTypes.string.isRequired,
      timeToStart: PropTypes.string.isRequired,
      startupCost: PropTypes.string.isRequired,
      speedTag: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

