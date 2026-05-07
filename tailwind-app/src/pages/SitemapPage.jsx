import { Link } from 'react-router-dom'

const sitemapGroups = [
  {
    title: 'Main Pages',
    links: [
      { label: 'Home', to: '/' },
      { label: 'Blog', to: '/blog' },
    ],
  },
  {
    title: 'Trust and Legal',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Contact', to: '/contact' },
      { label: 'Privacy Policy', to: '/privacy-policy' },
      { label: 'Terms and Conditions', to: '/terms-and-conditions' },
      { label: 'Disclaimer', to: '/disclaimer' },
    ],
  },
]

export default function SitemapPage() {
  return (
    <div className="page-shell">
      <p className="text-sm font-semibold text-brand-700 dark:text-brand-300">Navigation</p>
      <h1 className="mt-2 text-4xl font-semibold italic tracking-tight text-ink-900 dark:text-white sm:text-5xl">
        HTML Sitemap
      </h1>
      <p className="mt-4 text-ink-600 dark:text-white/70">Browse all important pages from one place.</p>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {sitemapGroups.map((group) => (
          <section key={group.title} className="surface p-8">
            <h2 className="text-2xl font-semibold tracking-tight text-ink-900 dark:text-white">{group.title}</h2>
            <ul className="mt-6 space-y-3">
              {group.links.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800 dark:text-brand-300 dark:hover:text-brand-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
