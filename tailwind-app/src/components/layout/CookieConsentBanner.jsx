import { useEffect, useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const COOKIE_KEY = 'oeg_cookie_consent_v1'

const defaultPreferences = {
  necessary: true,
  analytics: false,
  advertising: false,
}

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [preferences, setPreferences] = useState(defaultPreferences)
  const dialogTitleId = useId()
  const dialogDescriptionId = useId()
  const modalRef = useRef(null)
  const lastFocusedRef = useRef(null)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(COOKIE_KEY)
      if (!stored) {
        setVisible(true)
        return
      }

      const parsed = JSON.parse(stored)
      if (parsed && typeof parsed === 'object') {
        setPreferences((prev) => ({ ...prev, ...parsed }))
      }
    } catch {
      setVisible(true)
    }
  }, [])

  const persistPreferences = (next) => {
    window.localStorage.setItem(COOKIE_KEY, JSON.stringify(next))
    setPreferences(next)
    setVisible(false)
    setShowPreferences(false)
  }

  useEffect(() => {
    if (!showPreferences) return

    lastFocusedRef.current = document.activeElement

    const focusFirst = () => {
      const root = modalRef.current
      if (!root) return
      const focusable = root.querySelector(
        'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])',
      )
      if (focusable) focusable.focus()
    }

    focusFirst()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setShowPreferences(false)
        return
      }

      if (event.key !== 'Tab') return
      const root = modalRef.current
      if (!root) return

      const focusable = Array.from(
        root.querySelectorAll('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])'),
      ).filter((el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true')

      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      const last = lastFocusedRef.current
      if (last && typeof last.focus === 'function') last.focus()
    }
  }, [showPreferences])

  if (!visible) return null

  return (
    <>
      <div className="fixed right-4 bottom-4 left-4 z-50 mx-auto max-w-4xl rounded-4xl border border-ink-200/70 bg-white p-4 shadow-lift dark:border-white/10 dark:bg-ink-950 sm:p-5">
        <p className="text-sm font-semibold text-ink-900 dark:text-white">Cookie preferences</p>
        <p className="mt-1 text-sm leading-relaxed text-ink-600 dark:text-white/70">
          We use cookies for essential site features and, if you allow, for analytics and advertising. You can change your choice
          anytime by clearing browser storage.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => persistPreferences({ necessary: true, analytics: true, advertising: true })}
            className="btn-primary px-4 py-2"
          >
            Accept all
          </button>
          <button
            type="button"
            onClick={() => persistPreferences({ necessary: true, analytics: false, advertising: false })}
            className="btn-secondary px-4 py-2"
          >
            Reject non-essential
          </button>
          <button
            type="button"
            onClick={() => setShowPreferences(true)}
            className="btn-secondary px-4 py-2"
          >
            Manage preferences
          </button>
          <Link to="/privacy-policy" className="text-sm font-semibold text-brand-700 hover:text-brand-800 dark:text-brand-300 dark:hover:text-brand-200">
            Privacy Policy
          </Link>
        </div>
      </div>

      {showPreferences ? (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-ink-950/60 p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby={dialogTitleId}
          aria-describedby={dialogDescriptionId}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setShowPreferences(false)
          }}
        >
          <div ref={modalRef} className="w-full max-w-xl rounded-4xl border border-ink-200/70 bg-white shadow-lift dark:border-white/10 dark:bg-ink-950">
            <div className="border-b border-ink-200/60 px-6 py-5 dark:border-white/10">
              <p id={dialogTitleId} className="text-sm font-semibold text-ink-900 dark:text-white">
                Manage cookie preferences
              </p>
              <p id={dialogDescriptionId} className="mt-1 text-sm text-ink-600 dark:text-white/70">
                Choose which optional cookies you allow.
              </p>
            </div>

            <div className="space-y-4 px-6 py-5">
              <div className="flex items-start justify-between gap-4 rounded-3xl border border-ink-200/70 bg-ink-50 p-5 dark:border-white/10 dark:bg-white/5">
                <div>
                  <p className="text-sm font-semibold text-ink-900 dark:text-white">Necessary</p>
                  <p className="mt-1 text-sm text-ink-600 dark:text-white/70">Required for core site functionality.</p>
                </div>
                <div className="text-sm font-semibold text-ink-500 dark:text-white/50">Always on</div>
              </div>

              <label className="flex items-start justify-between gap-4 rounded-3xl border border-ink-200/70 bg-white p-5 dark:border-white/10 dark:bg-white/0">
                <div>
                  <p className="text-sm font-semibold text-ink-900 dark:text-white">Analytics</p>
                  <p className="mt-1 text-sm text-ink-600 dark:text-white/70">Helps us understand traffic and improve content.</p>
                </div>
                <input
                  type="checkbox"
                  className="mt-1 h-5 w-5 accent-brand-600"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences((prev) => ({ ...prev, analytics: e.target.checked }))}
                />
              </label>

              <label className="flex items-start justify-between gap-4 rounded-3xl border border-ink-200/70 bg-white p-5 dark:border-white/10 dark:bg-white/0">
                <div>
                  <p className="text-sm font-semibold text-ink-900 dark:text-white">Advertising</p>
                  <p className="mt-1 text-sm text-ink-600 dark:text-white/70">Used to show relevant ads (where applicable).</p>
                </div>
                <input
                  type="checkbox"
                  className="mt-1 h-5 w-5 accent-brand-600"
                  checked={preferences.advertising}
                  onChange={(e) => setPreferences((prev) => ({ ...prev, advertising: e.target.checked }))}
                />
              </label>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 border-t border-ink-200/60 px-6 py-5 dark:border-white/10">
              <button
                type="button"
                onClick={() => setShowPreferences(false)}
                className="btn-secondary px-4 py-2"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => persistPreferences({ necessary: true, analytics: preferences.analytics, advertising: preferences.advertising })}
                className="btn-primary px-4 py-2"
              >
                Save preferences
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
