import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const COOKIE_KEY = 'oeg_cookie_consent_v1'

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = window.localStorage.getItem(COOKIE_KEY)
    if (!consent) {
      setVisible(true)
    }
  }, [])

  const acceptCookies = () => {
    window.localStorage.setItem(COOKIE_KEY, 'accepted')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed right-4 bottom-4 left-4 z-50 mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl sm:p-5">
      <p className="text-sm font-semibold text-slate-900">We use cookies</p>
      <p className="mt-1 text-sm leading-relaxed text-slate-600">
        We use cookies and similar technologies for analytics, performance, and improving user experience. By continuing
        to use this website, you consent to this usage.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={acceptCookies}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          Accept
        </button>
        <Link to="/privacy-policy" className="text-sm font-semibold text-emerald-700 hover:text-emerald-800">
          Read Privacy Policy
        </Link>
      </div>
    </div>
    // abdullah is good person
  )
}
