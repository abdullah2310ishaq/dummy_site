import { Link, useParams } from 'react-router-dom'
import { authors } from '../data/authors'

export default function AuthorProfilePage() {
  const { slug } = useParams()
  const author = authors.find((item) => item.slug === slug)

  if (!author) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <h1 className="text-2xl font-bold text-slate-900">Author not found</h1>
        <Link to="/about" className="mt-4 inline-flex text-emerald-700 hover:text-emerald-800">
          Back to About page
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold text-emerald-700">Author Profile</p>
      <h1 className="mt-1 text-3xl font-bold text-slate-900 md:text-4xl">{author.name}</h1>
      <p className="mt-3 text-sm font-medium text-slate-600">{author.role}</p>

      <section className="mt-8 space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm leading-relaxed text-slate-700">{author.bio}</p>
        <p className="text-sm leading-relaxed text-slate-700">{author.experience}</p>
      </section>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Editorial Methodology</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          {author.methodology.map((point) => (
            <li key={point}>- {point}</li>
          ))}
        </ul>
      </section>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Contact</h2>
        <p className="mt-3 text-sm text-slate-700">
          Email: <a href={`mailto:${author.contactEmail}`} className="font-semibold text-emerald-700">{author.contactEmail}</a>
        </p>
      </section>
    </div>
  )
}
