const policySections = [
  {
    title: '1. Information We Collect',
    points: ['Name, email, phone (if provided)', 'IP address, browser, device info', 'Cookies and usage data'],
  },
  {
    title: '2. How We Use Information',
    points: [
      'Improve website experience',
      'Respond to inquiries',
      'Analytics and performance tracking',
      'Security and fraud prevention',
    ],
  },
  {
    title: '3. Data Sharing',
    description:
      'We do not sell personal data. We may share data with service providers or legal authorities if required.',
  },
  {
    title: '4. Third-Party Services',
    description: 'We may use Google Analytics, ads networks, and affiliate programs.',
  },
  {
    title: '5. Security',
    description: 'We use reasonable security measures but cannot guarantee 100% protection.',
  },
  {
    title: '6. External Links',
    description: 'We are not responsible for other websites linked from our site.',
  },
  {
    title: "7. Children's Privacy",
    description: 'We do not knowingly collect data from children under 13.',
  },
  {
    title: '8. Your Rights',
    description: 'You may request access, correction, or deletion of your data.',
  },
  {
    title: '9. Contact',
    description: 'Email: virtualtech42@gmail.com',
  },
]

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-slate-50">
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-gradient-to-r from-emerald-700 to-teal-600 px-6 py-10 text-white sm:px-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-100">Privacy & Trust</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Privacy Policy - Online Earning Guide</h1>
            <p className="mt-3 text-sm text-emerald-50">Last Updated: April 16, 2026</p>
          </div>

          <div className="px-6 py-8 sm:px-10 sm:py-10">
            <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
              This Privacy Policy describes how Online Earning Guide collects, uses, and protects your personal
              information when you use{' '}
              <a
                href="https://www.onlineearningguide.net/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-emerald-700 underline decoration-emerald-300 underline-offset-2"
              >
                https://www.onlineearningguide.net/
              </a>
              .
            </p>

            <div className="mt-8 space-y-6">
              {policySections.map((section) => (
                <article key={section.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <h2 className="text-lg font-semibold text-slate-900">{section.title}</h2>

                  {section.description ? <p className="mt-2 text-sm leading-relaxed text-slate-700">{section.description}</p> : null}

                  {section.points ? (
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-slate-700">
                      {section.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
