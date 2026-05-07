import { Link } from 'react-router-dom'

const footerLinks = [
  {
    title: 'Explore',
    links: [
      { label: 'Home', to: '/' },
      { label: 'Blog', to: '/blog' },
    ],
  },
  {
    title: 'Resources',
    links: [
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
      className="flex h-10 w-10 items-center justify-center rounded-2xl border border-ink-200/70 bg-white text-ink-600 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white"
    >
      {children}
    </a>
  )
}

export default function SiteFooter() {
  return (
    <footer className="relative z-[1] border-t border-ink-200/60 bg-ink-50 dark:border-white/10 dark:bg-ink-950">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-ink-100/60 to-ink-200/40 dark:via-white/5 dark:to-white/0" />

      <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <div>
                <p className="text-base font-bold tracking-tight text-ink-900 dark:text-white">Online Earning Guide</p>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-500 dark:text-white/50">
                  Learn • Build • Grow
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-600 dark:text-white/70">
              Premium, beginner-friendly guides for online earning in 2026 and beyond. Clear steps, safety notes, and no fake promises.
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
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-500 dark:text-white/50">{group.title}</h3>
              <ul className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-ink-600 transition-colors duration-200 hover:text-ink-900 dark:text-white/70 dark:hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 border-t border-ink-200/60 pt-8 dark:border-white/10 md:flex-row md:justify-between">
          <p className="text-xs text-ink-500 dark:text-white/50">
            &copy; {new Date().getFullYear()} OnlineEarningGuide.net — All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link to="/privacy-policy" className="text-xs text-ink-500 transition-colors hover:text-ink-700 dark:text-white/50 dark:hover:text-white/80">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="text-xs text-ink-500 transition-colors hover:text-ink-700 dark:text-white/50 dark:hover:text-white/80">
              Terms & Conditions
            </Link>
            <Link to="/disclaimer" className="text-xs text-ink-500 transition-colors hover:text-ink-700 dark:text-white/50 dark:hover:text-white/80">
              Disclaimer
            </Link>
            <Link to="/sitemap" className="text-xs text-ink-500 transition-colors hover:text-ink-700 dark:text-white/50 dark:hover:text-white/80">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
