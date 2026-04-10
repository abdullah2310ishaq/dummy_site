import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
      <p className="text-sm font-semibold text-emerald-700">404</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900">Page Not Found</h1>
      <p className="mt-3 text-slate-600">The page you requested does not exist.</p>
      <Link
        to="/"
        className="mt-5 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        Go Back Home
      </Link>
    </div>
  )
}
