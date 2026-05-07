import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, NavLink } from 'react-router-dom'

const navigationItems = [
  { to: '/', label: 'Home' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

const THEME_KEY = 'oeg_theme_v1'

function NavItem({ to, label, onNavigate }) {
  return (
    <NavLink
      to={to}
      onClick={onNavigate}
      className={({ isActive }) =>
        `rounded-xl px-3 py-2 text-sm font-semibold transition ${
          isActive
            ? 'bg-brand-500/10 text-brand-700 dark:bg-white/10 dark:text-white'
            : 'text-ink-700 hover:bg-ink-100 hover:text-ink-900 dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white'
        }`
      }
    >
      {label}
    </NavLink>
  )
}

NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onNavigate: PropTypes.func,
}

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDark, setIsDark] = useState(() => {
    const stored = window.localStorage.getItem(THEME_KEY)
    if (stored === 'dark') return true
    if (stored === 'light') return false
    return window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ?? false
  })

  const closeMenu = () => setIsOpen(false)

  useEffect(() => {
    const root = document.documentElement
    if (isDark) root.classList.add('dark')
    else root.classList.remove('dark')
    window.localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light')
  }, [isDark])

  return (
    <header className="sticky top-0 z-30 border-b border-ink-200/60 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-ink-950/60">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-brand-700 focus:shadow dark:focus:bg-ink-950 dark:focus:text-white"
      >
        Skip to main content
      </a>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="shrink-0">
          <div className="flex items-center gap-3">
            <div>
              <p className="text-sm font-bold tracking-tight text-ink-900 dark:text-white">Online Earning Guide</p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-500 dark:text-white/50">
                Practical • Beginner-friendly
              </p>
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsDark((v) => !v)}
            className="hidden h-10 items-center justify-center rounded-xl border border-ink-200/70 bg-white px-3 text-sm font-semibold text-ink-800 shadow-sm transition hover:bg-ink-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 md:inline-flex"
            aria-label="Toggle dark mode"
          >
            {isDark ? 'Dark' : 'Light'}
          </button>

          <button
            type="button"
            className="inline-flex h-10 items-center justify-center rounded-xl border border-ink-200/70 bg-white px-3 text-sm font-semibold text-ink-800 shadow-sm transition hover:bg-ink-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 md:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label="Toggle navigation"
          >
            Menu
          </button>

          <nav className="hidden items-center gap-1 rounded-2xl border border-ink-200/60 bg-white/70 p-1 shadow-sm dark:border-white/10 dark:bg-white/5 md:flex" aria-label="Desktop navigation">
            {navigationItems.map((item) => (
              <NavItem key={item.to} to={item.to} label={item.label} />
            ))}
          </nav>
        </div>

      </div>

      {isOpen && (
        <nav
          id="mobile-navigation"
          className="border-t border-ink-200/60 bg-white px-4 py-3 dark:border-white/10 dark:bg-ink-950 md:hidden"
          aria-label="Mobile navigation"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-1">
            <button
              type="button"
              onClick={() => setIsDark((v) => !v)}
              className="mb-2 inline-flex h-10 items-center justify-between rounded-xl border border-ink-200/70 bg-white px-3 text-sm font-semibold text-ink-800 shadow-sm transition hover:bg-ink-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              aria-label="Toggle dark mode"
            >
              <span>Theme</span>
              <span className="text-xs font-semibold opacity-70">{isDark ? 'Dark' : 'Light'}</span>
            </button>
            {navigationItems.map((item) => (
              <NavItem key={item.to} to={item.to} label={item.label} onNavigate={closeMenu} />
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
