import { Link, useParams } from 'react-router-dom'
import { blogPosts } from '../data/blogPosts'

const coverImagesBySlug = {
  'earn-money-online-beginners-2026':
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2200&q=80',
  'proven-ways-make-money-online-2026':
    'https://images.unsplash.com/photo-1454165205744-3b78555e5572?auto=format&fit=crop&w=2200&q=80',
  'freelancing-beginners-step-by-step-2026':
    'https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?auto=format&fit=crop&w=2200&q=80',
  'start-blog-make-money-2026':
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=2200&q=80',
  'youtube-without-showing-face-2026':
    'https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=2200&q=80',
  'earn-money-mobile-apps-admob-2026':
    'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=2200&q=80',
  'affiliate-marketing-beginners-2026':
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2200&q=80',
  'multiple-income-streams-online-2026':
    'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=2200&q=80',
  'time-management-tips-online-workers-2026':
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2200&q=80',
  'stay-safe-while-earning-online-2026':
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=2200&q=80',
  'common-beginner-mistakes-online-earning-2026':
    'https://images.unsplash.com/photo-1553484771-371a605b060b?auto=format&fit=crop&w=2200&q=80',
  'passive-income-ideas-2026':
    'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=2200&q=80',
}

function getCover(slug) {
  return (
    coverImagesBySlug[slug] ??
    'https://images.unsplash.com/photo-1450101215322-bf5cd27642fc?auto=format&fit=crop&w=2200&q=80'
  )
}

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
    <article className="pb-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <header className="relative overflow-hidden border-b border-ink-200/60 bg-ink-950 dark:border-white/10">
        <div className="absolute inset-0">
          <img src={getCover(post.slug)} alt="Article cover" className="h-full w-full object-cover opacity-35" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/80 to-ink-950/50" />
          <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-brand-400/20 blur-3xl" />
          <div className="absolute -right-20 top-1/4 h-72 w-72 rounded-full bg-sky-400/15 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">
            {post.category}
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold italic leading-tight text-white sm:text-6xl">{post.title}</h1>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-white/75 sm:text-base">{post.excerpt}</p>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-white/75">
            <span className="rounded-full bg-white/10 px-3 py-1">{post.readTime}</span>
            <span className="rounded-full bg-white/10 px-3 py-1">{post.publishedAt}</span>
            <span className="rounded-full bg-white/10 px-3 py-1">{post.wordCount} words</span>
            <span className="rounded-full bg-white/10 px-3 py-1">By {post.author}</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-8">
            <div className="surface p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500 dark:text-white/50">Introduction</p>
              {post.intro?.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-base leading-7 text-ink-700 dark:text-white/80">
                  {paragraph}
                </p>
              ))}
            </div>

            {post.sections.map((section) => (
              <section key={section.heading} className="surface p-6">
                <h2 className="text-2xl font-semibold tracking-tight text-ink-900 dark:text-white">{section.heading}</h2>
                {Array.isArray(section.body) ? (
                  <div className="mt-4 space-y-3">
                    {section.body.map((paragraph) => (
                      <p key={paragraph} className="text-ink-700 dark:text-white/80">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-ink-700 dark:text-white/80">{section.body}</p>
                )}
              </section>
            ))}

            {post.checklist ? (
              <section className="surface p-6">
                <h2 className="text-2xl font-semibold tracking-tight text-ink-900 dark:text-white">Action Checklist</h2>
                <ul className="mt-4 space-y-2 text-sm text-ink-700 dark:text-white/80">
                  {post.checklist.map((point) => (
                    <li key={point} className="rounded-xl border border-ink-200/70 bg-ink-50 px-4 py-3 dark:border-white/10 dark:bg-white/5">
                      {point}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <section className="rounded-4xl border border-brand-200/60 bg-gradient-to-b from-brand-50 to-white p-6 shadow-soft dark:border-white/10 dark:from-white/5 dark:to-white/0">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700 dark:text-brand-300">Key takeaways</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink-900 dark:text-white">What to remember</h2>
              <ul className="mt-4 space-y-2 text-sm text-ink-800 dark:text-white/85">
                {post.keyTakeaways.map((point) => (
                  <li key={point} className="rounded-xl border border-ink-200/70 bg-white px-4 py-3 dark:border-white/10 dark:bg-white/5">
                    {point}
                  </li>
                ))}
              </ul>
            </section>

            {post.faq ? (
              <section className="surface p-6">
                <h2 className="text-2xl font-semibold tracking-tight text-ink-900 dark:text-white">Frequently Asked Questions</h2>
                <div className="mt-4 space-y-3">
                  {post.faq.map((item) => (
                    <article key={item.q} className="rounded-2xl border border-ink-200/70 bg-ink-50 p-5 dark:border-white/10 dark:bg-white/5">
                      <h3 className="text-sm font-semibold text-ink-900 dark:text-white">{item.q}</h3>
                      <p className="mt-2 text-sm text-ink-700 dark:text-white/80">{item.a}</p>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          <aside className="space-y-4 lg:col-span-4">
            <div className="surface p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500 dark:text-white/50">Related</p>
              <h2 className="mt-2 text-lg font-semibold text-ink-900 dark:text-white">Helpful pages</h2>
              <ul className="mt-4 space-y-2 text-sm font-semibold">
                <li>
                  <Link to="/privacy-policy" className="text-brand-700 hover:text-brand-800 dark:text-brand-300 dark:hover:text-brand-200">
                    Privacy Policy →
                  </Link>
                </li>
                <li>
                  <Link to="/terms-and-conditions" className="text-brand-700 hover:text-brand-800 dark:text-brand-300 dark:hover:text-brand-200">
                    Terms & Conditions →
                  </Link>
                </li>
                <li>
                  <Link to="/disclaimer" className="text-brand-700 hover:text-brand-800 dark:text-brand-300 dark:hover:text-brand-200">
                    Disclaimer →
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-brand-700 hover:text-brand-800 dark:text-brand-300 dark:hover:text-brand-200">
                    About us →
                  </Link>
                </li>
              </ul>
            </div>

            <div className="surface p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500 dark:text-white/50">More</p>
              <h2 className="mt-2 text-lg font-semibold text-ink-900 dark:text-white">More practical guides</h2>
              <ul className="mt-4 space-y-3">
                {relatedPosts.map((item) => (
                  <li key={item.slug} className="rounded-2xl border border-ink-200/70 bg-ink-50 p-4 dark:border-white/10 dark:bg-white/5">
                    <Link to={`/blog/${item.slug}`} className="text-sm font-semibold text-ink-900 dark:text-white">
                      {item.title}
                    </Link>
                    <p className="mt-2 text-sm text-ink-600 dark:text-white/70">{item.excerpt}</p>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </article>
  )
}
