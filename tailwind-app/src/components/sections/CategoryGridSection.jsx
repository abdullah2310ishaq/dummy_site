import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default function CategoryGridSection({ categories, title = 'Main Earning Methods' }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-emerald-700">Quick Navigation Grid</p>
          <h2 className="mt-1 text-2xl font-bold text-slate-900 md:text-3xl">{title}</h2>
        </div>
        <p className="hidden text-sm text-slate-600 md:block">Detailed guides, practical workflows, and honest expectations.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((item) => (
          <article key={item.slug} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-2xl">{item.icon}</p>
            <h3 className="mt-2 text-lg font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{item.overview}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-slate-100 px-2 py-1 font-medium text-slate-700">Skill: {item.skillsRequired}</span>
              <span className="rounded-full bg-slate-100 px-2 py-1 font-medium text-slate-700">Time: {item.timeToStart}</span>
              <span className="rounded-full bg-slate-100 px-2 py-1 font-medium text-slate-700">Cost: {item.startupCost}</span>
            </div>
            <Link
              to={`/categories/${item.slug}`}
              className="mt-4 inline-flex rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              View Detailed Guide
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}

CategoryGridSection.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      overview: PropTypes.string.isRequired,
      skillsRequired: PropTypes.string.isRequired,
      timeToStart: PropTypes.string.isRequired,
      startupCost: PropTypes.string.isRequired,
    }),
  ).isRequired,
  title: PropTypes.string,
}
