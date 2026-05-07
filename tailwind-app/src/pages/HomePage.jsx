import { Link } from 'react-router-dom'
import { blogPosts } from '../data/blogPosts'

const heroImage =
  'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=2400&q=80'

const coverImagesBySlug = {
  'earn-money-online-beginners-2026':
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80',
  'proven-ways-make-money-online-2026':
    'https://images.unsplash.com/photo-1454165205744-3b78555e5572?auto=format&fit=crop&w=1400&q=80',
  'freelancing-beginners-step-by-step-2026':
    'https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?auto=format&fit=crop&w=1400&q=80',
  'start-blog-make-money-2026':
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1400&q=80',
  'youtube-without-showing-face-2026':
    'https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1400&q=80',
  'earn-money-mobile-apps-admob-2026':
    'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1400&q=80',
  'affiliate-marketing-beginners-2026':
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80',
  'multiple-income-streams-online-2026':
    'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=1400&q=80',
  'time-management-tips-online-workers-2026':
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80',
  'stay-safe-while-earning-online-2026':
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1400&q=80',
  'common-beginner-mistakes-online-earning-2026':
    'https://images.unsplash.com/photo-1553484771-371a605b060b?auto=format&fit=crop&w=1400&q=80',
  'passive-income-ideas-2026':
    'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=1400&q=80',
}

function getPostCoverImage(slug) {
  return (
    coverImagesBySlug[slug] ??
    'https://images.unsplash.com/photo-1450101215322-bf5cd27642fc?auto=format&fit=crop&w=1400&q=80'
  )
}

export default function HomePage() {
  const featured = blogPosts.slice(0, 6)

  return (
    <div className="bg-gradient-to-b from-ink-50 via-ink-50 to-white dark:from-ink-950 dark:via-ink-950 dark:to-ink-950">
      <section className="relative overflow-hidden border-b border-ink-900/10 bg-ink-950">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Modern online work setup"
            className="h-full w-full object-cover opacity-35"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/55" />
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-brand-400/20 blur-3xl" />
          <div className="absolute -right-28 top-1/4 h-80 w-80 rounded-full bg-sky-400/15 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">
              Updated for 2026 • Beginner-friendly • No hype
            </p>
            <h1 className="mt-5 text-4xl font-semibold italic leading-tight text-white sm:text-6xl">
              Learn online earning
              <br />
              <span className="bg-gradient-to-r from-brand-300 to-sky-300 bg-clip-text text-transparent">
                like a system
              </span>
              , not a shortcut.
            </h1>
            <p className="mt-5 text-base leading-8 text-white/80 sm:text-lg">
              Step-by-step guides for freelancing, blogging, affiliate marketing, mobile apps, YouTube, passive income, and safety.
              Start with one method, stay consistent, and build long-term growth.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/blog" className="btn-primary">
                Explore guides →
              </Link>
              <Link to="/about" className="btn-secondary !border-white/20 !bg-white/10 !text-white hover:!bg-white/15 dark:!border-white/15">
                About Online Earning Guide →
              </Link>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {[
                { title: 'Realistic', body: 'No guaranteed income claims.' },
                { title: 'Beginner-first', body: 'Simple steps you can actually follow.' },
                { title: 'Policy-aware', body: 'Disclosures + safety guidance included.' },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="mt-1 text-sm text-white/75">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700 dark:text-brand-300">Featured</p>
            <h2 className="mt-2 text-3xl font-bold text-ink-900 dark:text-white">Start with these guides</h2>
            <p className="mt-3 text-ink-600 dark:text-white/70">
              Pick one topic and finish the checklist. Consistency beats jumping between methods.
            </p>
          </div>
          <Link to="/blog" className="btn-secondary px-4 py-2">
            View all articles →
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {featured.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group overflow-hidden rounded-4xl border border-ink-200/70 bg-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift dark:border-white/10 dark:bg-white/5"
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={getPostCoverImage(post.slug)}
                  alt="Online work and learning"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3">
                  <span className="rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-ink-900">{post.category}</span>
                  <span className="rounded-full bg-brand-500/90 px-2.5 py-1 text-xs font-semibold text-white">{post.readTime}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-ink-900 dark:text-white">{post.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-600 dark:text-white/70">{post.excerpt}</p>
                <p className="mt-4 text-sm font-semibold text-brand-700 dark:text-brand-300">Read →</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-ink-200/60 bg-white dark:border-white/10 dark:bg-ink-950">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:px-6 md:grid-cols-3">
          {[
            {
              label: 'Legal',
              title: 'Privacy + transparency',
              body: 'Read how we handle cookies, ads, and affiliate links.',
              links: [
                { to: '/privacy-policy', label: 'Privacy Policy →' },
                { to: '/disclaimer', label: 'Disclaimer →' },
              ],
            },
            {
              label: 'About',
              title: 'Why this site exists',
              body: 'Built for beginners who want real steps, not fake promises.',
              links: [{ to: '/about', label: 'About us →' }],
            },
            {
              label: 'Contact',
              title: 'Need help?',
              body: 'Send feedback or business inquiries anytime.',
              links: [{ to: '/contact', label: 'Contact us →' }],
            },
          ].map((card) => (
            <div key={card.label} className="surface-muted p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-500 dark:text-white/50">{card.label}</p>
              <p className="mt-2 text-lg font-semibold text-ink-900 dark:text-white">{card.title}</p>
              <p className="mt-2 text-sm leading-6 text-ink-600 dark:text-white/70">{card.body}</p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold">
                {card.links.map((l) => (
                  <Link key={l.to} to={l.to} className="text-brand-700 hover:text-brand-800 dark:text-brand-300 dark:hover:text-brand-200">
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}