import { useEffect, useMemo, useState } from 'react'
import { dailyTips } from '../../data/dailyTips'
import { readJson, writeJson } from '../../utils/localStorageJson'

const STORAGE_KEY = 'oeg.dailyTip.v1'

function getDayId(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function getTipIndexForDay(dayId) {
  let hash = 0
  for (let i = 0; i < dayId.length; i += 1) {
    hash = (hash * 31 + dayId.charCodeAt(i)) % 100000
  }
  return hash % dailyTips.length
}

export default function DailyTipCard() {
  const dayId = useMemo(() => getDayId(), [])
  const tip = useMemo(() => dailyTips[getTipIndexForDay(dayId)], [dayId])
  const [state, setState] = useState(() =>
    readJson(STORAGE_KEY, { lastSeenDayId: null, streak: 0, lastClaimedDayId: null }),
  )

  useEffect(() => {
    if (state.lastSeenDayId === dayId) return

    const nextState = { ...state, lastSeenDayId: dayId }
    setState(nextState)
    writeJson(STORAGE_KEY, nextState)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dayId])

  const claim = () => {
    if (state.lastClaimedDayId === dayId) return

    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayId = getDayId(yesterday)

    const nextStreak = state.lastClaimedDayId === yesterdayId ? state.streak + 1 : 1
    const nextState = { ...state, streak: nextStreak, lastClaimedDayId: dayId }
    setState(nextState)
    writeJson(STORAGE_KEY, nextState)
  }

  const hasClaimedToday = state.lastClaimedDayId === dayId

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-emerald-700">Daily tip</p>
          <h3 className="mt-1 text-xl font-bold text-slate-900">{tip.title}</h3>
          <p className="mt-2 text-sm text-slate-600">{tip.body}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Streak</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{state.streak}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={claim}
          disabled={hasClaimedToday}
          className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
        >
          {hasClaimedToday ? 'Claimed for today ✓' : 'I read this tip'}
        </button>
        <p className="text-sm text-slate-600">Small daily learning builds momentum. Keep it calm and consistent.</p>
      </div>
    </section>
  )
}

