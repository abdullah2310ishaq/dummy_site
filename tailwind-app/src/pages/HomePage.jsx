import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import DailyTipCard from '../components/home/DailyTipCard'
import LandingQuiz from '../components/home/LandingQuiz'
import { blogPosts } from '../data/blogPosts'
import { categories, earningPaths, incomeEstimates, trendingSkills2026 } from '../data/categories'

function FeaturedCategoryCard({ item }) {
  return (
    <Link
      to={`/categories/${item.slug}`}
      className="group block rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
      aria-label={`Open ${item.title} guide`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-2xl">{item.icon}</span>
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
            {item.trustRating}
          </span>
          <span className="rounded-full border border-sky-200 bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-700">
            {item.timeToStart}
          </span>
        </div>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-500 transition group-hover:border-emerald-200 group-hover:bg-emerald-50 group-hover:text-emerald-700">
          &rarr;
        </div>
      </div>

      <h3 className="mt-4 text-lg font-bold text-slate-900">{item.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{item.overview}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        <span className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700">
          Skill: {item.skillsRequired}
        </span>
        <span className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700">
          Cost: {item.startupCost}
        </span>
        <span className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700">
          For: {item.bestFor?.[0] ?? 'Beginners'}
        </span>
      </div>
    </Link>
  )
}

function QuickActionCard({ to, eyebrow, title, body, warning = false }) {
  return (
    <Link
      to={to}
      className={`block rounded-3xl border p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
        warning ? 'border-amber-200 bg-amber-50/70' : 'border-slate-200 bg-white'
      }`}
    >
      <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${warning ? 'text-amber-700' : 'text-emerald-700'}`}>
        {eyebrow}
      </p>
      <h3 className="mt-2 text-base font-bold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
      <p className={`mt-4 text-sm font-semibold ${warning ? 'text-amber-700' : 'text-emerald-700'}`}>Open &rarr;</p>
    </Link>
  )
}

function SectionHeading({ eyebrow, title, body }) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-black leading-tight text-slate-900 sm:text-4xl">{title}</h2>
      {body ? <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">{body}</p> : null}
    </div>
  )
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCategories = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return categories.slice(0, 6)
    return categories
      .filter((c) => `${c.title} ${c.overview} ${c.description}`.toLowerCase().includes(q))
      .slice(0, 6)
  }, [searchQuery])

  const faqItems = [
    {
      q: 'Can I start with zero money?',
      a: 'Yes. Start with low-cost methods like freelancing, tutoring, remote jobs, and content. First goal: skill plus proof.',
    },
    {
      q: 'How long until I earn?',
      a: 'Fast methods can pay in weeks, but stable income takes time. Use ranges for direction, not guarantees.',
    },
    {
      q: 'What if I keep getting confused?',
      a: 'Pick one method for 30 days and do one small daily action. Switching too fast creates confusion.',
    },
    {
      q: 'How do I avoid scams?',
      a: 'Never pay registration fees, never trust guaranteed income, and avoid pressure tactics. Use scam filters first.',
    },
  ]

  return (
    <div className="bg-slate-50">
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-white via-slate-50 to-emerald-50/40">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-12 lg:py-16">
          <div className="space-y-7 lg:col-span-7">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                For beginners
              </span>
              <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
                Realistic expectations
              </span>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                Progress tracking
              </span>
            </div>

            <div>
              <h1 className="text-4xl font-black leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Online earning,
                <br />
                explained clearly -
                <br />
                not hyped up.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
                Pick a method that fits your time and budget. Follow a weekly loop, use checklists, and stay safe from scams.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a href="#method-quiz" className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700">
                Find my best method &rarr;
              </a>
              <Link to="/categories" className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
                Browse all methods
              </Link>
              <Link to="/start-here" className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
                Start here
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Top pick</p>
                <p className="mt-2 text-lg font-bold text-slate-900">Freelancing</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Fastest start</p>
                <p className="mt-2 text-lg font-bold text-slate-900">1-3 wks</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Min. budget</p>
                <p className="mt-2 text-lg font-bold text-slate-900">Free</p>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Find a method</p>
                  <p className="mt-1 text-sm text-slate-600">Try "freelancing", "content", "remote jobs"</p>
                </div>
                <Link to="/compare" className="text-sm font-semibold text-emerald-700 hover:text-emerald-800">
                  Compare all &rarr;
                </Link>
              </div>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search methods..."
                  aria-label="Search methods"
                  className="h-12 flex-1 rounded-xl border border-slate-300 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
                <Link to="/categories" className="inline-flex h-12 items-center justify-center rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-800">
                  View all
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-4 lg:col-span-5">
            <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="px-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">Today&apos;s Momentum</p>
              <div className="mt-3">
                <DailyTipCard />
              </div>
            </div>
            <QuickActionCard
              to="/progress"
              eyebrow="Progress"
              title="Saved checklists"
              body="Mark steps complete and track progress locally. Works on slow connections too."
            />
            <QuickActionCard
              to="/scam-warnings"
              warning
              eyebrow="Safety"
              title="Scam warnings - must read"
              body="Red flags that save beginners from costly mistakes. Read before you start anything."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Featured Methods"
            title="Start with what fits your life"
            body="Choose one method for 30 days. Follow the checklist. Track progress. This is how beginners become consistent."
          />
          <Link to="/categories" className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
            View all categories &rarr;
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredCategories.map((item) => (
            <FeaturedCategoryCard key={item.slug} item={item} />
          ))}
        </div>
      </section>

      <section className="bg-slate-950 py-14 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-12">
          <div className="space-y-7 lg:col-span-7">
            <SectionHeading
              eyebrow="Your Weekly Loop"
              title="A system, not a blog"
              body="Most beginners lose months mixing methods and chasing hype. Pick one method, run a weekly loop, and track small daily actions."
            />
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { n: '01', title: 'Pick one method', body: 'Match your time and budget. Commit for 30 days.' },
                { n: '02', title: 'Run weekly loop', body: 'Learn -> publish -> apply -> review. Momentum beats perfect.' },
                { n: '03', title: 'Scale what works', body: 'One skill plus one channel. Remove distractions ruthlessly.' },
              ].map((step) => (
                <article key={step.n} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300">{step.n}</p>
                  <h3 className="mt-2 text-base font-bold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{step.body}</p>
                </article>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/start-here" className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200">
                Open beginner roadmap &rarr;
              </Link>
              <Link to="/compare" className="rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                Compare methods &rarr;
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-300">Pick a Path</p>
            <h3 className="mt-2 text-2xl font-black">Three simple earning paths</h3>
            <div className="mt-5 space-y-4">
              {earningPaths.map((path) => (
                <article key={path.title} className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
                  <h4 className="text-sm font-bold text-white">{path.title}</h4>
                  <ul className="mt-3 space-y-2">
                    {path.steps.map((step) => (
                      <li key={step} className="flex gap-2 text-sm leading-6 text-slate-300">
                        <span className="mt-0.5 text-emerald-300">✓</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionHeading eyebrow="Latest Guides" title="Practical content for this week" />
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {blogPosts.slice(0, 4).map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="block rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Guide</p>
                  <h3 className="mt-2 text-base font-bold leading-7 text-slate-900">{post.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{post.excerpt}</p>
                  <p className="mt-4 text-sm font-semibold text-emerald-700">Read &rarr;</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4 lg:col-span-4">
            <div className="rounded-3xl border border-amber-200 bg-amber-50/70 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">Scam Shield</p>
              <h3 className="mt-2 text-xl font-black text-slate-900">Know the red flags</h3>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
                <li>• Upfront payments or registration fees</li>
                <li>• Guaranteed income and fake screenshots</li>
                <li>• Pressure tactics and vague training systems</li>
              </ul>
              <Link to="/scam-warnings" className="mt-5 inline-flex rounded-xl bg-amber-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-amber-800">
                Read the scam guide &rarr;
              </Link>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">Trust & Transparency</p>
              <h3 className="mt-2 text-xl font-black text-slate-900">Why this feels safe</h3>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
                <li>✓ Clear expectations - no magic promises</li>
                <li>✓ Affiliate disclosures where applicable</li>
                <li>✓ Beginner-friendly language (Urdu / Roman Urdu ready)</li>
              </ul>
              <div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold">
                <Link to="/about" className="text-emerald-700 hover:text-emerald-800">Editorial policy &rarr;</Link>
                <Link to="/contact" className="text-emerald-700 hover:text-emerald-800">Ask a question &rarr;</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Trend Tracking"
              title="Skills winning in 2026"
              body='Use these as "skill anchors" so your effort compounds instead of restarting every month.'
            />
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {trendingSkills2026.map((skill) => (
                <div key={skill} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm">
                  {skill}
                </div>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:col-span-7">
            <div className="border-b border-slate-200 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">Income Estimator</p>
              <h3 className="mt-2 text-2xl font-black text-slate-900">Realistic earning ranges</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-100 text-xs uppercase tracking-[0.12em] text-slate-600">
                  <tr>
                    <th className="px-4 py-3">Method</th>
                    <th className="px-4 py-3">Beginner</th>
                    <th className="px-4 py-3">Intermediate</th>
                    <th className="px-4 py-3">Expert</th>
                  </tr>
                </thead>
                <tbody>
                  {incomeEstimates.map((entry) => (
                    <tr key={entry.method} className="border-t border-slate-100">
                      <td className="px-4 py-3 font-semibold text-slate-900">{entry.method}</td>
                      <td className="px-4 py-3 text-slate-600">{entry.beginner}</td>
                      <td className="px-4 py-3 text-slate-600">{entry.intermediate}</td>
                      <td className="px-4 py-3 text-slate-600">{entry.expert}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="m-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              <p className="font-semibold text-slate-900">A quick reminder</p>
              <p className="mt-1">These are ranges, not promises. Results depend on skill, consistency, and market fit.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <SectionHeading eyebrow="FAQ" title="Common questions, straight answers" />
        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {faqItems.map((item) => (
            <article key={item.q} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-900">{item.q}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.a}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="rounded-3xl bg-slate-900 p-7 text-white sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300">Get Unstuck</p>
          <div className="mt-4 grid gap-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <h2 className="text-3xl font-black leading-tight sm:text-4xl">If you&apos;re starting today, this is your next click.</h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                Open the beginner roadmap, pick one method, and follow a weekly checklist. No overwhelm - just forward progress.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
              <Link to="/start-here" className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200">
                Open Start Here &rarr;
              </Link>
              <Link to="/contact" className="rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                Ask a question &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section id="method-quiz" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <SectionHeading
          eyebrow="Method Finder"
          title="Find your best method in 5 questions"
          body="Answer quickly and get practical recommendations based on your goals, time, budget, and skill level."
        />
        <div className="mt-6">
          <LandingQuiz categories={categories} />
        </div>
      </section>
    </div>
  )
}