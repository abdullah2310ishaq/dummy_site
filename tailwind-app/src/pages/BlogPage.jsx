import { Link } from 'react-router-dom'
import { blogPosts } from '../data/blogPosts'

const coverImagesBySlug = {
  'earn-money-online-beginners-2026':
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
  'proven-ways-make-money-online-2026':
    'https://images.unsplash.com/photo-1454165205744-3b78555e5572?auto=format&fit=crop&w=1200&q=80',
  'freelancing-beginners-step-by-step-2026':
    'https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?auto=format&fit=crop&w=1200&q=80',
  'start-blog-make-money-2026':
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=80',
  'youtube-without-showing-face-2026':
    'https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1200&q=80',
  'earn-money-mobile-apps-admob-2026':
    'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80',
  'affiliate-marketing-beginners-2026':
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  'multiple-income-streams-online-2026':
    'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=1200&q=80',
  'time-management-tips-online-workers-2026':
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
  'stay-safe-while-earning-online-2026':
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
  'common-beginner-mistakes-online-earning-2026':
    'https://images.unsplash.com/photo-1553484771-371a605b060b?auto=format&fit=crop&w=1200&q=80',
  'passive-income-ideas-2026':
    'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=1200&q=80',
}

function getCover(slug) {
  return (
    coverImagesBySlug[slug] ??
    'https://images.unsplash.com/photo-1450101215322-bf5cd27642fc?auto=format&fit=crop&w=1200&q=80'
  )
}

export default function BlogPage() {
  return (
    <div className="page-shell">
      <p className="text-sm font-semibold text-brand-700 dark:text-brand-300">Blog</p>
      <h1 className="mt-2 text-4xl font-semibold italic tracking-tight text-ink-900 dark:text-white sm:text-5xl">
        Practical Online Earning Articles
      </h1>
      <p className="mt-4 max-w-3xl text-ink-600 dark:text-white/70">
        Helpful guides designed for real progress, not hype. Each post focuses on practical steps and realistic outcomes.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="group overflow-hidden rounded-4xl border border-ink-200/70 bg-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift dark:border-white/10 dark:bg-white/5"
          >
            <div className="relative h-44 overflow-hidden">
              <img
                src={getCover(post.slug)}
                alt="Article cover"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/75 via-ink-950/10 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3">
                <span className="rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-ink-900">{post.category}</span>
                <span className="rounded-full bg-brand-500/90 px-2.5 py-1 text-xs font-semibold text-white">{post.readTime}</span>
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-xl font-semibold tracking-tight text-ink-900 dark:text-white">{post.title}</h2>
              <p className="mt-2 text-sm leading-6 text-ink-600 dark:text-white/70">{post.excerpt}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-xs text-ink-500 dark:text-white/50">
                {post.publishedAt} • {post.wordCount} words • By {post.author}
              </p>
              <p className="mt-3 text-sm font-semibold text-brand-700 dark:text-brand-300">Read full article →</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
