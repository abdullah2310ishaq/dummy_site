import { useMemo, useState } from 'react'
import CategoryGridSection from '../components/sections/CategoryGridSection'
import { categories, comparisonPairs } from '../data/categories'

export default function CategoriesPage() {
  const [speedFilter, setSpeedFilter] = useState('all')
  const [costFilter, setCostFilter] = useState('all')

  const filteredCategories = useMemo(
    () =>
      categories.filter((category) => {
        const speedMatch = speedFilter === 'all' || category.speedTag === speedFilter
        const costMatch = costFilter === 'all' || category.startupCost.toLowerCase() === costFilter
        return speedMatch && costMatch
      }),
    [speedFilter, costFilter],
  )

  return (
    <div className="py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-sm font-semibold text-emerald-700">Categories</p>
        <h1 className="mt-1 text-3xl font-bold text-slate-900 md:text-4xl">All Online Earning Methods</h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          Explore each method with honest expectations, required skills, startup cost, and clear starting steps.
        </p>
      </div>

      <section className="mx-auto mt-6 max-w-6xl rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:px-6">
        <p className="text-sm font-semibold text-emerald-700">Speed-Based Filtering</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <label className="text-sm font-medium text-slate-700">
            Earning speed focus
            <select value={speedFilter} onChange={(event) => setSpeedFilter(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
              <option value="all">All options</option>
              <option value="fast-income">Fast income</option>
              <option value="stable-income">Stable long-term</option>
              <option value="long-term-passive">Long-term passive</option>
              <option value="scalable-business">Scalable business</option>
            </select>
          </label>
          <label className="text-sm font-medium text-slate-700">
            Startup cost
            <select value={costFilter} onChange={(event) => setCostFilter(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
              <option value="all">All costs</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
        </div>
      </section>

      <CategoryGridSection categories={filteredCategories} title="Detailed Category Guides" />

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <p className="text-sm font-semibold text-emerald-700">Honest Comparison Engine</p>
        <h2 className="mt-1 text-2xl font-bold text-slate-900">Which Option Fits You Better?</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {comparisonPairs.map((pair) => (
            <article key={pair.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">{pair.title}</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>
                  <span className="font-semibold">Faster:</span> {pair.faster}
                </li>
                <li>
                  <span className="font-semibold">More stable:</span> {pair.stable}
                </li>
                <li>
                  <span className="font-semibold">Beginner-friendly:</span> {pair.beginnerFriendly}
                </li>
              </ul>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
