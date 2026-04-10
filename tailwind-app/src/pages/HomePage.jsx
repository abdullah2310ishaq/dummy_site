import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import DailyTipCard from '../components/home/DailyTipCard'
import LandingQuiz from '../components/home/LandingQuiz'
import { blogPosts } from '../data/blogPosts'
import { categories, earningPaths, incomeEstimates, trendingSkills2026 } from '../data/categories'

function Badge({ children, tone = 'slate' }) {
  const className =
    tone === 'emerald'
      ? 'border-emerald-200/60 bg-emerald-50 text-emerald-800'
      : tone === 'sky'
        ? 'border-sky-200/60 bg-sky-50 text-sky-800'
        : tone === 'amber'
          ? 'border-amber-200/60 bg-amber-50 text-amber-900'
          : 'border-slate-200/70 bg-white text-slate-700'
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold shadow-sm ${className}`}>
      {children}
    </span>
  )
}

function GradientCard({ children, className = '' }) {
  return (
    <div className={`group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/70 p-1 shadow-sm backdrop-blur ${className}`}>
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-gradient-to-br from-emerald-200/70 via-sky-200/45 to-purple-200/55 blur-2xl transition group-hover:scale-110" />
        <div className="absolute -bottom-28 -left-28 h-64 w-64 rounded-full bg-gradient-to-tr from-amber-200/45 via-rose-200/35 to-emerald-200/45 blur-2xl transition group-hover:scale-110" />
      </div>
      <div className="relative rounded-[22px] bg-white p-5">{children}</div>
    </div>
  )
}

function FeaturedCategoryCard({ item }) {
  return (
    <Link
      to={`/categories/${item.slug}`}
      className="group relative block rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
      aria-label={`Open ${item.title} guide`}
    >
      <GradientCard className="transition hover:-translate-y-0.5 hover:shadow-md">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-2xl">{item.icon}</span>
              <Badge tone="emerald">Trust {item.trustRating}</Badge>
              <Badge tone="sky">{item.timeToStart}</Badge>
            </div>
            <h3 className="mt-3 truncate text-lg font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-2 line-clamp-2 text-sm text-slate-600">{item.overview}</p>
          </div>
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-900 transition group-hover:border-slate-300 group-hover:bg-slate-50">
            <span className="text-lg leading-none">→</span>
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-slate-100 px-2 py-1 font-medium text-slate-700">Skill: {item.skillsRequired}</span>
          <span className="rounded-full bg-slate-100 px-2 py-1 font-medium text-slate-700">Cost: {item.startupCost}</span>
          <span className="rounded-full bg-slate-100 px-2 py-1 font-medium text-slate-700">Best for: {item.bestFor?.[0] ?? 'Beginners'}</span>
        </div>
      </GradientCard>
    </Link>
  )
}

function ActionTile({ to, eyebrow, title, body, tone = 'slate' }) {
  const ringClass =
    tone === 'emerald'
      ? 'focus-visible:ring-emerald-500'
      : tone === 'sky'
        ? 'focus-visible:ring-sky-500'
        : tone === 'amber'
          ? 'focus-visible:ring-amber-500'
          : 'focus-visible:ring-slate-500'

  const eyebrowClass =
    tone === 'emerald'
      ? 'text-emerald-800'
      : tone === 'sky'
        ? 'text-sky-800'
        : tone === 'amber'
          ? 'text-amber-900'
          : 'text-slate-700'

  return (
    <Link
      to={to}
      className={`group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 ${ringClass}`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gradient-to-br from-emerald-200/50 via-sky-200/30 to-purple-200/45 blur-2xl" />
      </div>
      <div className="relative">
      <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${eyebrowClass}`}>{eyebrow}</p>
      <h3 className="mt-2 text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{body}</p>
      <p className="mt-4 text-sm font-semibold text-slate-900 group-hover:text-emerald-700">Open →</p>
      </div>
    </Link>
  )
}

function Stat({ label, value }) {
  return (
    <div className="rounded-3xl border border-slate-200/70 bg-white/70 px-5 py-4 shadow-sm backdrop-blur">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">{label}</p>
      <p className="mt-2 text-xl font-semibold text-slate-950">{value}</p>
    </div>
  )
}

function QuizModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm" onMouseDown={onClose} aria-hidden="true" />
      <div className="relative mx-auto flex h-full max-w-3xl items-center px-4 py-6 sm:px-6">
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Quick recommendations quiz"
          className="w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">Quick quiz</p>
              <p className="mt-1 truncate text-sm font-semibold text-slate-950">Answer 5 questions → get your best method</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              Close
            </button>
          </div>
          <div className="max-h-[80vh] overflow-y-auto px-5 py-5">
            <LandingQuiz categories={categories} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  const [isQuizOpen, setIsQuizOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const key = 'home.quizModalSeen.v1'
    try {
      const hasSeen = window.localStorage.getItem(key) === '1'
      if (!hasSeen) {
        setIsQuizOpen(true)
        window.localStorage.setItem(key, '1')
      }
    } catch {
      setIsQuizOpen(true)
    }
  }, [])

  const filteredCategories = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return categories.slice(0, 6)
    return categories
      .filter((c) => `${c.title} ${c.overview} ${c.description}`.toLowerCase().includes(q))
      .slice(0, 6)
  }, [searchQuery])

  return (
    <>
      <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />

      <section className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 -top-40 h-[38rem] w-[38rem] rounded-full bg-gradient-to-br from-emerald-200/55 via-sky-200/40 to-purple-200/50 blur-3xl" />
          <div className="absolute -bottom-48 -right-44 h-[42rem] w-[42rem] rounded-full bg-gradient-to-tr from-amber-200/45 via-rose-200/30 to-emerald-200/50 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-10 sm:px-6 sm:pb-12 sm:pt-12">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="emerald">For beginners</Badge>
            <Badge tone="sky">Realistic</Badge>
            <Badge>Track progress</Badge>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl">
                Online earning, explained like a product—not a lecture.
              </h1>
              <p className="mt-4 max-w-2xl text-base text-slate-700 sm:text-lg">
                Choose a method that fits your time and budget. Get a clear weekly loop, checklist steps, and scam-safe guidance.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setIsQuizOpen(true)}
                  className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  Get recommendation (quiz)
                </button>
                <Link
                  to="/categories"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  Browse methods
                </Link>
                <Link
                  to="/start-here"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm backdrop-blur transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  Start here
                </Link>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                <Stat label="Most popular" value="Freelancing" />
                <Stat label="Fastest start" value="1–3 weeks" />
                <Stat label="Low budget" value="Free tools" />
              </div>

              <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">Find a method</p>
                    <p className="mt-1 text-sm text-slate-700">Search like “freelancing”, “remote jobs”, “content”.</p>
                  </div>
                  <Link to="/compare" className="text-sm font-semibold text-emerald-700 hover:text-emerald-800">
                    Compare methods →
                  </Link>
                </div>
                <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search methods…"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200"
                    aria-label="Search earning methods"
                  />
                  <Link
                    to="/categories"
                    className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-900"
                  >
                    View all →
                  </Link>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">Today’s momentum</p>
                <div className="mt-3">
                  <DailyTipCard />
                </div>
              </div>

              <div className="mt-4 grid gap-3">
                <ActionTile
                  to="/progress"
                  tone="emerald"
                  eyebrow="Track"
                  title="Saved checklists"
                  body="Mark steps complete and keep progress stored locally (works with weak internet)."
                />
                <ActionTile
                  to="/scam-warnings"
                  tone="amber"
                  eyebrow="Safety"
                  title="Scam warnings (must read)"
                  body="Red flags that save you time, money, and stress—especially as a beginner."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-emerald-800">Featured methods</p>
            <h2 className="mt-1 text-2xl font-bold text-slate-950 md:text-3xl">Start with what fits your life</h2>
            <p className="mt-3 max-w-2xl text-sm text-slate-700">
              Choose one method for 30 days. Follow the checklist. Track progress. This is how beginners become consistent.
            </p>
          </div>
          <Link
            to="/categories"
            className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
          >
            View all categories →
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredCategories.map((item) => (
            <FeaturedCategoryCard key={item.slug} item={item} />
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200/70 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-14 text-white sm:px-6">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <p className="text-sm font-semibold text-emerald-200">Your weekly loop</p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">A system that feels like an app, not a blog</h2>
              <p className="mt-3 max-w-2xl text-sm text-slate-200">
                Most beginners lose months by mixing methods and chasing hype. Here you choose one method, follow a weekly loop, and track progress with small daily actions.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-200">01</p>
                  <p className="mt-2 text-sm font-semibold">Pick one method</p>
                  <p className="mt-2 text-sm text-slate-200">Match your time, budget, and comfort. Commit for 30 days.</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-200">02</p>
                  <p className="mt-2 text-sm font-semibold">Run a weekly loop</p>
                  <p className="mt-2 text-sm text-slate-200">Learn → publish → apply → review. Momentum beats perfect.</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-200">03</p>
                  <p className="mt-2 text-sm font-semibold">Scale what works</p>
                  <p className="mt-2 text-sm text-slate-200">Double down on one skill + one channel. Remove distractions.</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/start-here"
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                >
                  Open the beginner roadmap →
                </Link>
                <Link
                  to="/compare"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
                >
                  Compare methods →
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <p className="text-sm font-semibold text-amber-200">Pick a path</p>
                <h3 className="mt-1 text-xl font-semibold">Three simple earning paths</h3>
                <div className="mt-5 space-y-4">
                  {earningPaths.map((path) => (
                    <div key={path.title} className="rounded-3xl border border-white/10 bg-slate-950/40 p-5">
                      <p className="text-sm font-semibold text-white">{path.title}</p>
                      <ol className="mt-3 space-y-2 text-sm text-slate-200">
                        {path.steps.map((step) => (
                          <li key={step} className="flex gap-3">
                            <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-white">
                              ✓
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <p className="text-sm font-semibold text-emerald-700">Latest guides</p>
            <h2 className="mt-1 text-2xl font-bold text-slate-900 md:text-3xl">Practical content you can apply this week</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {blogPosts.slice(0, 6).map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group block rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Guide</p>
                  <h3 className="mt-2 text-base font-semibold text-slate-900 group-hover:text-emerald-700">{post.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{post.excerpt}</p>
                  <p className="mt-4 text-sm font-semibold text-slate-900 group-hover:text-emerald-700">Read →</p>
                </Link>
              ))}
            </div>
          </div>

          <aside className="space-y-4 lg:col-span-5">
            <section className="overflow-hidden rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-amber-50 p-5">
              <p className="text-sm font-semibold text-amber-900">Scam shield</p>
              <h3 className="mt-1 text-lg font-semibold text-slate-900">Know the red flags in 60 seconds</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li className="flex gap-2">
                  <span className="mt-0.5 text-amber-700">•</span>
                  <span>Upfront payments or “registration fees”</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-0.5 text-amber-700">•</span>
                  <span>Guaranteed income, screenshots, fake withdrawals</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-0.5 text-amber-700">•</span>
                  <span>Pressure tactics and vague “training systems”</span>
                </li>
              </ul>
              <Link
                to="/scam-warnings"
                className="mt-4 inline-flex items-center justify-center rounded-xl bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-700"
              >
                Read the scam guide →
              </Link>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-emerald-700">Trust & transparency</p>
              <h3 className="mt-1 text-lg font-semibold text-slate-900">Why this feels safe</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li className="flex gap-2">
                  <span className="mt-0.5 text-emerald-700">•</span>
                  <span>Clear expectations and effort required (no magic promises)</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-0.5 text-emerald-700">•</span>
                  <span>Affiliate disclosures where applicable</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-0.5 text-emerald-700">•</span>
                  <span>Beginner-friendly language (Urdu / Roman Urdu ready)</span>
                </li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link to="/about" className="text-sm font-semibold text-slate-900 hover:text-emerald-700">
                  Editorial policy →
                </Link>
                <Link to="/contact" className="text-sm font-semibold text-slate-900 hover:text-emerald-700">
                  Ask a question →
                </Link>
              </div>
            </section>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <p className="text-sm font-semibold text-emerald-700">Trend tracking</p>
            <h2 className="mt-1 text-2xl font-bold text-slate-900 md:text-3xl">Skills that are winning in 2026</h2>
            <p className="mt-3 text-sm text-slate-600">
              Use these as “skill anchors” when choosing a category—so your effort compounds instead of restarting every month.
            </p>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {trendingSkills2026.map((skill) => (
                <div key={skill} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">
                  {skill}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-emerald-700">Income estimator</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-900">Realistic earning ranges</h2>

              <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Method</th>
                      <th className="px-4 py-3 font-semibold">Beginner</th>
                      <th className="px-4 py-3 font-semibold">Intermediate</th>
                      <th className="px-4 py-3 font-semibold">Expert</th>
                    </tr>
                  </thead>
                  <tbody>
                    {incomeEstimates.map((entry) => (
                      <tr key={entry.method} className="border-t border-slate-200">
                        <td className="px-4 py-3 font-medium text-slate-900">{entry.method}</td>
                        <td className="px-4 py-3 text-slate-600">{entry.beginner}</td>
                        <td className="px-4 py-3 text-slate-600">{entry.intermediate}</td>
                        <td className="px-4 py-3 text-slate-600">{entry.expert}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">A quick reminder</p>
                <p className="mt-1 text-sm text-slate-600">
                  These are ranges, not promises. Results depend on skill, consistency, market fit, and how well you avoid scams and distractions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-6 sm:px-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-emerald-700">FAQ</p>
          <h2 className="mt-1 text-2xl font-bold text-slate-900 md:text-3xl">Common questions (straight answers)</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-sm font-semibold text-slate-900">Can I start with zero money?</h3>
              <p className="mt-2 text-sm text-slate-600">
                Yes. Start with low-cost methods (freelancing, tutoring, remote jobs, content). Your first objective is skill + proof, not perfection.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-sm font-semibold text-slate-900">How long until I earn?</h3>
              <p className="mt-2 text-sm text-slate-600">
                Fast methods can pay in weeks, but stability takes time. Use the estimator ranges as direction, not guarantee.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-sm font-semibold text-slate-900">What if I keep getting confused?</h3>
              <p className="mt-2 text-sm text-slate-600">
                Pick one method for 30 days. Do one small daily action. Confusion usually comes from switching too fast.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-sm font-semibold text-slate-900">How do I avoid scams?</h3>
              <p className="mt-2 text-sm text-slate-600">
                Never pay for “registration,” never trust guaranteed income, and avoid pressure tactics. Use the Scam Warnings page as your filter.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-6 py-10 text-white shadow-lg sm:px-10">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-200">Get unstuck</p>
              <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">If you’re starting today, this is your best next click.</h2>
              <p className="mt-3 max-w-2xl text-sm text-slate-200">
                Open the beginner roadmap, pick one method, and follow a weekly checklist. No overwhelm—just forward progress.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
              <Link
                to="/start-here"
                className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
              >
                Open Start Here →
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
              >
                Ask a question →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
