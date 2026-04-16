import { useState } from 'react'
import PropTypes from 'prop-types'
import { Link, NavLink } from 'react-router-dom'

const navigationItems = [
  { to: '/', label: 'Home' },
  { to: '/start-here', label: 'Start Here' },
  { to: '/categories', label: 'Categories' },
  { to: '/compare', label: 'Compare' },
  { to: '/progress', label: 'My Progress' },
  { to: '/blog', label: 'Blog' },
  { to: '/scam-warnings', label: 'Scam Warnings' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

function NavItem({ to, label, onNavigate }) {
  return (
    <NavLink
      to={to}
      onClick={onNavigate}
      className={({ isActive }) =>
        `rounded-lg px-3 py-2 text-sm font-medium transition ${
          isActive
            ? 'bg-emerald-100 text-emerald-800 shadow-sm'
            : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
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

  const closeMenu = () => setIsOpen(false)

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/85 backdrop-blur-md">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-emerald-700 focus:shadow"
      >
        Skip to main content
      </a>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="shrink-0">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">OnlineEarningGuide.net</p>
          <p className="text-sm font-bold text-slate-900 sm:text-base">Trusted Online Earning Resource</p>
        </Link>

        <button
          type="button"
          className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label="Toggle navigation"
        >
          Menu
        </button>

        <nav className="hidden items-center gap-1 rounded-xl border border-slate-200/80 bg-white/80 px-2 py-1 shadow-sm md:flex" aria-label="Desktop navigation">
          {navigationItems.map((item) => (
            <NavItem key={item.to} to={item.to} label={item.label} />
          ))}
        </nav>
      </div>

      {isOpen && (
        <nav
          id="mobile-navigation"
          className="border-t border-slate-200 bg-white px-4 py-3 md:hidden"
          aria-label="Mobile navigation"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-1">
            {navigationItems.map((item) => (
              <NavItem key={item.to} to={item.to} label={item.label} onNavigate={closeMenu} />
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
