export default function ContactPage() {
  return (
    <div className="page-shell">
      <p className="text-sm font-semibold text-brand-700 dark:text-brand-300">Contact</p>
      <h1 className="mt-2 text-4xl font-semibold italic tracking-tight text-ink-900 dark:text-white sm:text-5xl">Contact Us</h1>
      <p className="mt-4 max-w-3xl text-ink-600 dark:text-white/70">
        Thank you for visiting Online Earning Guide. If you have questions, suggestions, feedback, or business inquiries, feel free
        to contact us anytime.
      </p>

      <div className="mt-10 space-y-5 rounded-4xl border border-ink-200/70 bg-white p-8 shadow-soft dark:border-white/10 dark:bg-white/5">
        <section>
          <h2 className="text-2xl font-semibold tracking-tight text-ink-900 dark:text-white">Get in touch</h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-700 dark:text-white/80">
            Email: <span className="font-semibold text-ink-900 dark:text-white">support@onlineearningguide.net</span>
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink-700 dark:text-white/80">
            Website: <span className="font-semibold text-ink-900 dark:text-white">https://www.onlineearningguide.net</span>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold tracking-tight text-ink-900 dark:text-white">Why contact us?</h2>
          <ul className="mt-4 grid gap-2 text-sm text-ink-700 dark:text-white/80 sm:grid-cols-2">
            <li>General questions and support</li>
            <li>Business inquiries</li>
            <li>Collaboration opportunities</li>
            <li>Website feedback and suggestions</li>
            <li>Reporting technical issues</li>
            <li>Content-related queries</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold tracking-tight text-ink-900 dark:text-white">Important note</h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-700 dark:text-white/80">
            Online Earning Guide shares educational and informational content. We do not guarantee financial results, because
            success depends on skills, consistency, effort, and experience.
          </p>
        </section>
      </div>
    </div>
  )
}
