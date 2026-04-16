import { Link, useParams } from 'react-router-dom'
import { blogPosts } from '../data/blogPosts'

export default function PostDetailPage() {
  const { slug } = useParams()
  const post = blogPosts.find((item) => item.slug === slug)
  const relatedPosts = blogPosts.filter((item) => item.slug !== post?.slug).slice(0, 3)

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

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: post.author,
      url: `https://www.onlineearningguide.net/authors/${post.authorSlug}`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Online Earning Guide',
      url: 'https://www.onlineearningguide.net/',
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    mainEntityOfPage: `https://www.onlineearningguide.net/blog/${post.slug}`,
  }

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{post.category}</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">{post.title}</h1>
      <p className="mt-3 text-sm text-slate-500">
        {post.readTime} • {post.publishedAt} • {post.wordCount} words
      </p>
      <p className="mt-1 text-sm text-slate-600">
        By{' '}
        <Link to={`/authors/${post.authorSlug}`} className="font-medium text-emerald-700 hover:text-emerald-800">
          {post.author}
        </Link>
      </p>
      <p className="mt-1 text-sm text-slate-600">
        Fact-checked by{' '}
        <Link to={`/authors/${post.reviewedBySlug}`} className="font-medium text-emerald-700 hover:text-emerald-800">
          {post.reviewedBy}
        </Link>
      </p>
      <p className="mt-1 text-sm text-slate-600">Last reviewed: {post.updatedAt ?? post.publishedAt}</p>
      {post.intro?.map((paragraph) => (
        <p key={paragraph} className="mt-6 text-base leading-7 text-slate-700">
          {paragraph}
        </p>
      ))}

      <div className="mt-8 space-y-6">
        {post.sections.map((section) => (
          <section key={section.heading} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">{section.heading}</h2>
            {Array.isArray(section.body) ? (
              section.body.map((paragraph) => (
                <p key={paragraph} className="mt-3 text-slate-700">
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="mt-3 text-slate-700">{section.body}</p>
            )}
          </section>
        ))}
      </div>

      {post.checklist ? (
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Action Checklist</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {post.checklist.map((point) => (
              <li key={point} className="rounded-lg bg-slate-50 px-3 py-2">
                {point}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

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

      {post.faq ? (
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Frequently Asked Questions</h2>
          <div className="mt-3 space-y-3">
            {post.faq.map((item) => (
              <article key={item.q} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-sm font-semibold text-slate-900">{item.q}</h3>
                <p className="mt-2 text-sm text-slate-700">{item.a}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Related Resources</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          <li>
            <Link to="/privacy-policy" className="text-emerald-700 hover:text-emerald-800">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to="/disclaimer" className="text-emerald-700 hover:text-emerald-800">
              Disclaimer
            </Link>
          </li>
          <li>
            <Link to="/scam-warnings" className="text-emerald-700 hover:text-emerald-800">
              Scam Warning Guide
            </Link>
          </li>
        </ul>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">More Practical Guides</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          {relatedPosts.map((item) => (
            <li key={item.slug}>
              <Link to={`/blog/${item.slug}`} className="text-emerald-700 hover:text-emerald-800">
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  )
}
