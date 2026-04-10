import { Link } from 'react-router-dom'

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-200">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300">OnlineEarningGuide.net</p>
          <p className="mt-2 text-sm text-slate-300">
            Honest, practical guidance for people who want to build real online income without hype.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">Quick Links</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/start-here" className="hover:text-white">
                Start Here
              </Link>
            </li>
            <li>
              <Link to="/categories" className="hover:text-white">
                Earning Categories
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-white">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">Transparency</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li>Affiliate links are clearly disclosed.</li>
            <li>No fake testimonials or income promises.</li>
            <li>Content is educational, not financial advice.</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
