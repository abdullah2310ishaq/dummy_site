import PropTypes from 'prop-types'

export default function EstimatorSection({ estimates }) {
  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <p className="text-sm font-semibold text-emerald-700">Earning Potential Estimator</p>
        <h2 className="mt-1 text-2xl font-bold text-slate-900 md:text-3xl">Realistic Income Ranges</h2>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-100 text-slate-700">
              <tr>
                <th className="px-4 py-3 font-semibold">Method</th>
                <th className="px-4 py-3 font-semibold">Beginner</th>
                <th className="px-4 py-3 font-semibold">Intermediate</th>
                <th className="px-4 py-3 font-semibold">Expert</th>
              </tr>
            </thead>
            <tbody>
              {estimates.map((entry) => (
                <tr key={entry.method} className="border-t border-slate-200">
                  <td className="px-4 py-3 font-medium text-slate-900">{entry.method}</td>
                  <td className="px-4 py-3 text-slate-600">{entry.beginner}</td>
                  <td className="px-4 py-3 text-slate-600">{entry.intermediate}</td>
                  <td className="px-4 py-3 text-slate-600">{entry.expert}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

EstimatorSection.propTypes = {
  estimates: PropTypes.arrayOf(
    PropTypes.shape({
      method: PropTypes.string.isRequired,
      beginner: PropTypes.string.isRequired,
      intermediate: PropTypes.string.isRequired,
      expert: PropTypes.string.isRequired,
    }),
  ).isRequired,
}
