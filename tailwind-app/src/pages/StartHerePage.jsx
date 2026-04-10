import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { categories } from '../data/categories'

const pathDecisions = [
  {
    title: 'I have 1-2 hours daily and no prior skills',
    recommendation: 'Start with Freelancing basics or Micro-content creation.',
    firstStep: 'Pick one beginner skill and create one sample project in 3 days.',
  },
  {
    title: 'I have a professional skill already',
    recommendation: 'Start with Freelancing + Remote Job applications in parallel.',
    firstStep: 'Build a portfolio page and submit 5 targeted applications this week.',
  },
  {
    title: 'I can invest moderate time and budget',
    recommendation: 'Explore E-Commerce and Digital Product models.',
    firstStep: 'Validate one product idea with market research before spending.',
  },
]

const sevenDayPlan = [
  'Day 1: Choose one earning model and define your target audience.',
  'Day 2: Create profile, portfolio, or publishing setup.',
  'Day 3: Publish first offer, post, or listing.',
  'Day 4: Send 5 focused proposals or outreach messages.',
  'Day 5: Improve based on feedback and analytics.',
  'Day 6: Build trust assets (samples, proof of work, FAQ).',
  'Day 7: Review results and lock a 30-day consistency plan.',
]

const profileOptions = {
  timeAvailable: [
    { value: '1h', label: 'Around 1 hour/day' },
    { value: '3h', label: 'Around 3 hours/day' },
    { value: 'full-time', label: 'Full-time effort' },
  ],
  skillLevel: [
    { value: 'none', label: 'No skill yet' },
    { value: 'basic', label: 'Basic skill level' },
    { value: 'advanced', label: 'Advanced/professional' },
  ],
  goal: [
    { value: 'quick-cash', label: 'Quick income start' },
    { value: 'stable-income', label: 'Stable long-term income' },
    { value: 'scalable-growth', label: 'Scalable business growth' },
  ],
}

function getPersonalizedSuggestions(timeAvailable, skillLevel, goal) {
  return categories
    .filter((category) => {
      if (goal === 'quick-cash') return category.speedTag === 'fast-income' || category.slug === 'remote-jobs'
      if (goal === 'stable-income') return category.speedTag === 'stable-income' || category.slug === 'freelancing'
      return category.scoring.scalability >= 4
    })
    .filter((category) => {
      if (skillLevel === 'none') return category.skillsRequired !== 'High'
      if (skillLevel === 'advanced') return true
      return category.skillsRequired === 'Medium' || category.skillsRequired === 'Low'
    })
    .filter((category) => {
      if (timeAvailable === '1h') return category.slug !== 'ecommerce-dropshipping'
      return true
    })
    .slice(0, 3)
}

function getEarningRange(hours, skillLevel) {
  const hourMultiplier = hours === '1h' ? 0.6 : hours === '3h' ? 1 : 1.35
  const skillMultiplier = skillLevel === 'none' ? 0.7 : skillLevel === 'basic' ? 1 : 1.35
  const low = Math.round(100 * hourMultiplier * skillMultiplier)
  const high = Math.round(800 * hourMultiplier * skillMultiplier)
  return `$${low} - $${high}/month (early stage estimate)`
}

export default function StartHerePage() {
  const [timeAvailable, setTimeAvailable] = useState('3h')
  const [skillLevel, setSkillLevel] = useState('basic')
  const [goal, setGoal] = useState('stable-income')

  const suggestions = useMemo(
    () => getPersonalizedSuggestions(timeAvailable, skillLevel, goal),
    [timeAvailable, skillLevel, goal],
  )
  const simulatedRange = useMemo(() => getEarningRange(timeAvailable, skillLevel), [timeAvailable, skillLevel])

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold text-emerald-700">Start Here</p>
      <h1 className="mt-1 text-3xl font-bold text-slate-900 md:text-4xl">Beginner Roadmap to Start Earning Online</h1>
      <p className="mt-3 max-w-3xl text-slate-600">
        Choose a path based on your current time, skill level, and budget. The goal is to start small, learn fast, and build consistent momentum.
      </p>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {pathDecisions.map((item) => (
          <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
            <p className="mt-3 text-sm text-slate-600">{item.recommendation}</p>
            <p className="mt-3 rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-700">
              <span className="font-semibold">First step:</span> {item.firstStep}
            </p>
          </article>
        ))}
      </section>

      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold text-emerald-700">Decision Support System</p>
        <h2 className="mt-1 text-2xl font-bold text-slate-900">What Should You Start With?</h2>
        <p className="mt-2 text-sm text-slate-600">
          Answer 3 quick questions for a personalized recommendation instead of random content browsing.
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <label className="text-sm font-medium text-slate-700">
            Time available
            <select
              value={timeAvailable}
              onChange={(event) => setTimeAvailable(event.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              {profileOptions.timeAvailable.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm font-medium text-slate-700">
            Skill level
            <select
              value={skillLevel}
              onChange={(event) => setSkillLevel(event.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              {profileOptions.skillLevel.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm font-medium text-slate-700">
            Main goal
            <select value={goal} onChange={(event) => setGoal(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
              {profileOptions.goal.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <h3 className="text-sm font-semibold text-emerald-900">Recommended Methods for You</h3>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            {suggestions.map((item) => (
              <Link
                key={item.slug}
                to={`/categories/${item.slug}`}
                className="rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm text-slate-700 hover:border-emerald-400"
              >
                <span className="font-semibold text-slate-900">{item.title}</span>
                <span className="mt-1 block text-xs text-slate-600">{item.overview}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold text-emerald-700">Realistic Earning Simulator</p>
        <h2 className="mt-1 text-2xl font-bold text-slate-900">Early-Stage Earning Estimate</h2>
        <p className="mt-2 text-sm text-slate-600">
          Estimated range based on your selected hours and current skill level. This is not guaranteed income.
        </p>
        <p className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800">{simulatedRange}</p>
      </section>

      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">First 7-Day Action Plan</h2>
        <ol className="mt-4 grid gap-3 md:grid-cols-2">
          {sevenDayPlan.map((item) => (
            <li key={item} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              {item}
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">No skill? Start here</h2>
          <p className="mt-2 text-sm text-slate-600">Pick one micro-skill and complete one portfolio sample each week for 4 weeks.</p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Tried before and failed?</h2>
          <p className="mt-2 text-sm text-slate-600">Use one method only for 30 days, track outputs, then optimize with data.</p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">No investment?</h2>
          <p className="mt-2 text-sm text-slate-600">Start with freelancing or tutoring where your skill is the main asset.</p>
        </article>
      </section>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          to="/categories"
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          Browse Detailed Categories
        </Link>
        <Link
          to="/blog"
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          Read Beginner Blog Guides
        </Link>
      </div>
    </div>
  )
}
