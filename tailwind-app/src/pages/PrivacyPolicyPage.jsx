const policySections = [
  {
    title: '1. Information We Collect',
    points: ['Name and email address (if provided)', 'IP address, browser type, device information', 'Cookies and usage data'],
  },
  {
    title: '2. How We Use Information',
    points: [
      'Improve website content and user experience',
      'Respond to inquiries and support requests',
      'Analyze website traffic and performance',
      'Display personalized advertisements where applicable',
      'Prevent spam and security issues',
    ],
  },
  {
    title: '3. Cookies',
    description:
      'We use cookies to improve user experience and analyze website traffic. You can disable cookies in your browser settings.',
  },
  {
    title: '4. Google AdSense',
    description:
      'We may use Google AdSense. Google may use cookies to serve ads based on your visits to this and other websites. You can opt out of personalized advertising from Google in your ad settings.',
  },
  {
    title: '5. Third-Party Services',
    description:
      'We may use third-party services such as analytics, advertising networks, affiliate platforms, and social media platforms. These services may collect information according to their own privacy policies.',
  },
  {
    title: '6. Data Protection',
    description: 'We use reasonable security measures but cannot guarantee 100% protection.',
  },
  {
    title: '7. External Links',
    description: 'We are not responsible for other websites linked from our site.',
  },
  {
    title: "8. Children's Privacy",
    description: 'We do not knowingly collect data from children under 13.',
  },
  {
    title: '9. Affiliate Disclosure',
    description:
      'Some pages may include affiliate links. We may earn commissions when users purchase products or services through these links at no additional cost to users.',
  },
  {
    title: '10. Contact',
    description: 'Email: support@onlineearningguide.net',
  },
]

export default function PrivacyPolicyPage() {
  return (
    <div className="page-shell">
      <p className="text-sm font-semibold text-brand-700 dark:text-brand-300">Legal</p>
      <h1 className="mt-2 text-4xl font-semibold italic tracking-tight text-ink-900 dark:text-white sm:text-5xl">
        Privacy Policy
      </h1>
      <p className="mt-4 text-sm text-ink-500 dark:text-white/50">Last Updated: 2026</p>

      <div className="mt-10 rounded-4xl border border-ink-200/70 bg-white p-8 shadow-soft dark:border-white/10 dark:bg-white/5">
        <p className="text-sm leading-relaxed text-ink-700 dark:text-white/80 sm:text-base">
          This Privacy Policy describes how Online Earning Guide collects, uses, and protects your personal information when you
          use{' '}
          <a
            href="https://www.onlineearningguide.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand-700 underline decoration-brand-300 underline-offset-2 dark:text-brand-300"
          >
            https://www.onlineearningguide.net/
          </a>
          .
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {policySections.map((section) => (
            <article
              key={section.title}
              className="rounded-3xl border border-ink-200/70 bg-ink-50 p-6 dark:border-white/10 dark:bg-white/5"
            >
              <h2 className="text-lg font-semibold text-ink-900 dark:text-white">{section.title}</h2>

              {section.description ? (
                <p className="mt-2 text-sm leading-relaxed text-ink-700 dark:text-white/80">{section.description}</p>
              ) : null}

              {section.points ? (
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink-700 dark:text-white/80">
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
  )
}
