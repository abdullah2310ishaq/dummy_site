import { Link } from 'react-router-dom'

const sitemapGroups = [
  {
    title: 'Main Pages',
    links: [
      { label: 'Home', to: '/' },
      { label: 'Start Here', to: '/start-here' },
      { label: 'Categories', to: '/categories' },
      { label: 'Compare', to: '/compare' },
      { label: 'Blog', to: '/blog' },
      { label: 'Scam Warnings', to: '/scam-warnings' },
      { label: 'Progress Tracker', to: '/progress' },
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
      { label: 'Long-Form Article Template', to: '/article-template' },
    ],
  },
  {
    title: 'Editorial Profiles',
    links: [
      { label: 'Editorial Team', to: '/authors/editorial-team' },
      { label: 'Fact Check Desk', to: '/authors/fact-check-desk' },
    ],
  },
]

export default function SitemapPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold text-emerald-700">Navigation</p>
      <h1 className="mt-1 text-3xl font-bold text-slate-900 md:text-4xl">HTML Sitemap</h1>
      <p className="mt-3 text-slate-600">Browse all important pages from one place.</p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {sitemapGroups.map((group) => (
          <section key={group.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">{group.title}</h2>
            <ul className="mt-4 space-y-2">
              {group.links.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-sm text-emerald-700 transition-colors hover:text-emerald-800">
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
