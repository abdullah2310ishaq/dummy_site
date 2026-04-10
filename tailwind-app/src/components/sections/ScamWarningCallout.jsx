import { Link } from 'react-router-dom'

export default function ScamWarningCallout() {
  return (
    <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
      <h3 className="text-lg font-semibold text-amber-900">Scam Warning Section</h3>
      <p className="mt-2 text-sm text-amber-800">
        Watch for red flags: upfront payments, guaranteed income claims, pyramid structures, and fake training programs.
      </p>
      <Link
        to="/scam-warnings"
        className="mt-4 inline-flex rounded-lg bg-amber-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-amber-700"
      >
        Read Full Scam Guide
      </Link>
    </section>
  )
}
