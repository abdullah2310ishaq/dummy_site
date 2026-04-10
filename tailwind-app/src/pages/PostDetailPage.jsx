import { Link, useParams } from 'react-router-dom'
import { blogPosts } from '../data/blogPosts'

export default function PostDetailPage() {
  const { slug } = useParams()
  const post = blogPosts.find((item) => item.slug === slug)

  if (!post) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <h1 className="text-2xl font-bold text-slate-900">Post not found</h1>
        <Link to="/blog" className="mt-4 inline-flex text-emerald-700 hover:text-emerald-800">
          Back to blog
        </Link>
      </div>
    )
  }

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{post.category}</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">{post.title}</h1>
      <p className="mt-3 text-sm text-slate-500">
        {post.readTime} • {post.publishedAt}
      </p>
      <p className="mt-6 text-base leading-7 text-slate-700">{post.excerpt}</p>

      <div className="mt-8 space-y-6">
        {post.sections.map((section) => (
          <section key={section.heading} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">{section.heading}</h2>
            <p className="mt-3 text-slate-700">{section.body}</p>
          </section>
        ))}
      </div>

      <section className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
        <h2 className="text-xl font-semibold text-emerald-900">Key Takeaways</h2>
        <ul className="mt-3 space-y-2 text-sm text-emerald-900">
          {post.keyTakeaways.map((point) => (
            <li key={point} className="rounded-lg bg-white px-3 py-2">
              {point}
            </li>
          ))}
        </ul>
      </section>
    </article>
  )
}
