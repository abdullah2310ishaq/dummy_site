import { Link } from 'react-router-dom'

const learnerPaths = ['Complete Beginner', 'Skilled Professional', 'Part-Time Learner']

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-sky-900 via-blue-900 to-emerald-900 text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <p className="inline-flex rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]">
          Trusted, Beginner-Friendly, No Hype
        </p>
        <h1 className="mt-5 max-w-3xl text-3xl font-bold leading-tight md:text-5xl">
          Learn How to Earn Online - The Right Way
        </h1>
        <p className="mt-5 max-w-2xl text-base text-sky-100 md:text-lg">
          No shortcuts. No scams. Just real methods that help people in Pakistan and South Asia build meaningful online income.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/start-here"
            className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
          >
            Start Here
          </Link>
          <Link
            to="/categories"
            className="rounded-lg border border-white/40 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Explore Categories
          </Link>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {learnerPaths.map((path) => (
            <div key={path} className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-medium">
              {path} Path
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
