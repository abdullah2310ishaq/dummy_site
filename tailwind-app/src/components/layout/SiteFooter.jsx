import { Link } from 'react-router-dom'

const footerLinks = [
  {
    title: 'Explore',
    links: [
      { label: 'Start Here', to: '/start-here' },
      { label: 'All Methods', to: '/categories' },
      { label: 'Compare', to: '/compare' },
      { label: 'Blog', to: '/blog' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Progress Tracker', to: '/progress' },
      { label: 'Scam Warnings', to: '/scam-warnings' },
      { label: 'About', to: '/about' },
      { label: 'Contact', to: '/contact' },
      { label: 'Privacy Policy', to: '/privacy-policy' },
      { label: 'Terms & Conditions', to: '/terms-and-conditions' },
      { label: 'Disclaimer', to: '/disclaimer' },
      { label: 'HTML Sitemap', to: '/sitemap' },
    ],
  },
]

function SocialIcon({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-600 transition-all duration-300 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
    >
      {children}
    </a>
  )
}

export default function SiteFooter() {
  return (
    <footer className="relative z-[1] border-t border-slate-200 bg-slate-50">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-slate-100/80 to-slate-200/60" />

      <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 border border-accent/20">
                <span className="text-base font-bold text-accent-light">O</span>
              </div>
              <div>
                <p className="text-base font-bold tracking-tight text-slate-900">OnlineEarningGuide</p>
                <p className="text-[10px] font-medium uppercase tracking-widest text-slate-500">.net</p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-600">
              Honest, practical guidance for people who want to build real online income — no hype, no false promises. Just proven methods and clear steps.
            </p>
            <div className="mt-6 flex gap-3">
              <SocialIcon href="https://wa.me/923329492342" label="WhatsApp">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                  <path d="M12 2a10 10 0 0 0-8.72 14.89L2 22l5.25-1.37A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.08-1.12l-.3-.17-3.12.82.84-3.04-.2-.31A8 8 0 1 1 12 20Zm4.39-5.78c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06a6.57 6.57 0 0 1-1.93-1.19 7.27 7.27 0 0 1-1.34-1.66c-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.41-.54-.42l-.46-.01c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.69 2.58 4.1 3.62.57.25 1.01.4 1.36.52.57.18 1.08.16 1.49.1.45-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
                </svg>
              </SocialIcon>
            </div>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{group.title}</h3>
              <ul className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-slate-600 transition-colors duration-200 hover:text-slate-900"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 border-t border-slate-200 pt-8 md:flex-row md:justify-between">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} OnlineEarningGuide.net — All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link to="/privacy-policy" className="text-xs text-slate-500 transition-colors hover:text-slate-700">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="text-xs text-slate-500 transition-colors hover:text-slate-700">
              Terms & Conditions
            </Link>
            <Link to="/disclaimer" className="text-xs text-slate-500 transition-colors hover:text-slate-700">
              Disclaimer
            </Link>
            <Link to="/sitemap" className="text-xs text-slate-500 transition-colors hover:text-slate-700">
              Sitemap
            </Link>
            <span className="text-xs text-slate-500">Affiliate links are clearly disclosed.</span>
            <span className="text-xs text-slate-500">No income guarantees.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
