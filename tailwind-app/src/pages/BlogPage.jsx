import { Link } from 'react-router-dom'
import { blogPosts } from '../data/blogPosts'

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold text-emerald-700">Blog</p>
      <h1 className="mt-1 text-3xl font-bold text-slate-900 md:text-4xl">Practical Online Earning Articles</h1>
      <p className="mt-3 max-w-3xl text-slate-600">
        Helpful guides designed for real progress, not hype. Each post focuses on practical steps and realistic outcomes.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {blogPosts.map((post) => (
          <article key={post.slug} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{post.category}</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">{post.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{post.excerpt}</p>
            <p className="mt-3 text-xs text-slate-500">
              {post.readTime} • {post.publishedAt} • {post.wordCount} words
            </p>
            <p className="mt-1 text-xs text-slate-500">
              By{' '}
              <Link to={`/authors/${post.authorSlug}`} className="font-medium text-emerald-700 hover:text-emerald-800">
                {post.author}
              </Link>
            </p>
            <p className="mt-1 text-xs text-slate-500">Last reviewed: {post.updatedAt}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-700">
                  {tag}
                </span>
              ))}
            </div>
            <Link
              to={`/blog/${post.slug}`}
              className="mt-4 inline-flex rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Read Full Article
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
