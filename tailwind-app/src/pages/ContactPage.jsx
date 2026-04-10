export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold text-emerald-700">Contact</p>
      <h1 className="mt-1 text-3xl font-bold text-slate-900 md:text-4xl">Ask a Question</h1>
      <p className="mt-3 text-slate-600">
        Share your current situation and goals. We will use this section to help readers with practical next steps.
      </p>

      <form className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" onSubmit={(event) => event.preventDefault()}>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm font-medium text-slate-700">
            Name
            <input
              type="text"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-emerald-500 focus:ring-2"
              placeholder="Your name"
            />
          </label>
          <label className="text-sm font-medium text-slate-700">
            Email
            <input
              type="email"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-emerald-500 focus:ring-2"
              placeholder="you@example.com"
            />
          </label>
        </div>
        <label className="mt-4 block text-sm font-medium text-slate-700">
          Topic
          <input
            type="text"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-emerald-500 focus:ring-2"
            placeholder="Freelancing, remote jobs, content creation, etc."
          />
        </label>
        <label className="mt-4 block text-sm font-medium text-slate-700">
          Message
          <textarea
            rows={6}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-emerald-500 focus:ring-2"
            placeholder="Tell us your goals, current skills, and what you need help with."
          />
        </label>
        <button
          type="submit"
          className="mt-4 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          Send Message
        </button>
      </form>
    </div>
  )
}
