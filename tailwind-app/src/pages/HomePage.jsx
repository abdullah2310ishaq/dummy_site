import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import DailyTipCard from '../components/home/DailyTipCard'
import LandingQuiz from '../components/home/LandingQuiz'
import { blogPosts } from '../data/blogPosts'
import { categories, earningPaths, incomeEstimates, trendingSkills2026 } from '../data/categories'

/* ─── Google Fonts injection ──────────────────────────────── */
const FontInjector = () => {
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href =
      'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,300;1,9..144,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap'
    document.head.appendChild(link)

    const style = document.createElement('style')
    style.textContent = `
      :root {
        --ink: #0d1117;
        --ink-muted: #3d4451;
        --ink-faint: #8b9099;
        --paper: #fafaf8;
        --paper-dim: #f2f2ef;
        --border: #e4e4df;
        --border-soft: #eeeee9;
        --emerald: #059669;
        --emerald-light: #d1fae5;
        --emerald-glow: rgba(5,150,105,0.12);
        --gold: #b45309;
        --gold-bg: #fffbeb;
        --gold-border: #fde68a;
        --night: #090d14;
        --night-mid: #111827;
        --night-soft: rgba(255,255,255,0.06);
        --night-border: rgba(255,255,255,0.08);
        --display-font: 'Fraunces', Georgia, serif;
        --body-font: 'Plus Jakarta Sans', system-ui, sans-serif;
      }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: var(--body-font); background: var(--paper); color: var(--ink); }

      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(18px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
      }
      .anim-fade-up  { animation: fadeUp 0.55s cubic-bezier(.22,1,.36,1) both; }
      .anim-fade-in  { animation: fadeIn 0.4s ease both; }
      .delay-1 { animation-delay: 0.08s; }
      .delay-2 { animation-delay: 0.16s; }
      .delay-3 { animation-delay: 0.24s; }
      .delay-4 { animation-delay: 0.32s; }
      .delay-5 { animation-delay: 0.40s; }

      .pill {
        display: inline-flex; align-items: center;
        border-radius: 999px; padding: 3px 12px;
        font-size: 11px; font-weight: 600; letter-spacing: 0.05em;
        border: 1px solid; line-height: 1.6;
      }
      .pill-emerald { border-color: #6ee7b7; background: #ecfdf5; color: #065f46; }
      .pill-sky     { border-color: #bae6fd; background: #f0f9ff; color: #0c4a6e; }
      .pill-amber   { border-color: var(--gold-border); background: var(--gold-bg); color: var(--gold); }
      .pill-slate   { border-color: var(--border); background: white; color: var(--ink-muted); }

      .card {
        background: white;
        border: 1px solid var(--border);
        border-radius: 20px;
        transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.2s;
      }
      .card:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,0,0,0.07); border-color: #d4d4ce; }

      .night-card {
        background: var(--night-soft);
        border: 1px solid var(--night-border);
        border-radius: 20px;
        backdrop-filter: blur(8px);
      }

      .btn-primary {
        display: inline-flex; align-items: center; justify-content: center;
        background: var(--ink); color: white;
        padding: 11px 22px; border-radius: 12px;
        font-size: 13px; font-weight: 600; letter-spacing: 0.01em;
        border: none; cursor: pointer; text-decoration: none;
        transition: background 0.18s, transform 0.15s;
      }
      .btn-primary:hover { background: #1a2030; transform: translateY(-1px); }

      .btn-emerald {
        display: inline-flex; align-items: center; justify-content: center;
        background: var(--emerald); color: white;
        padding: 11px 22px; border-radius: 12px;
        font-size: 13px; font-weight: 600;
        border: none; cursor: pointer; text-decoration: none;
        transition: background 0.18s, transform 0.15s;
      }
      .btn-emerald:hover { background: #047857; transform: translateY(-1px); }

      .btn-ghost {
        display: inline-flex; align-items: center; justify-content: center;
        background: transparent; color: var(--ink);
        padding: 10px 20px; border-radius: 12px;
        font-size: 13px; font-weight: 600;
        border: 1px solid var(--border); cursor: pointer; text-decoration: none;
        transition: background 0.18s, border-color 0.18s;
      }
      .btn-ghost:hover { background: var(--paper-dim); border-color: #c8c8c3; }

      .btn-night-ghost {
        display: inline-flex; align-items: center; justify-content: center;
        background: rgba(255,255,255,0.05); color: white;
        padding: 10px 20px; border-radius: 12px;
        font-size: 13px; font-weight: 600;
        border: 1px solid rgba(255,255,255,0.12); cursor: pointer; text-decoration: none;
        transition: background 0.18s;
      }
      .btn-night-ghost:hover { background: rgba(255,255,255,0.10); }

      .section-label {
        font-size: 11px; font-weight: 700; letter-spacing: 0.14em;
        text-transform: uppercase;
      }
      .display-heading {
        font-family: var(--display-font);
        font-weight: 500; line-height: 1.1; letter-spacing: -0.02em;
      }
      .body-text { font-size: 14px; line-height: 1.7; color: var(--ink-muted); }

      .divider { height: 1px; background: var(--border); }

      input[type="text"], input[type="search"] {
        font-family: var(--body-font);
      }

      /* Noise texture overlay */
      .noise-overlay::after {
        content: '';
        position: absolute; inset: 0;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
        opacity: 0.3; pointer-events: none; z-index: 0;
      }

      /* Hero mesh gradient */
      .hero-mesh {
        background:
          radial-gradient(ellipse 80% 60% at 15% 20%, rgba(16,185,129,0.07) 0%, transparent 60%),
          radial-gradient(ellipse 60% 50% at 85% 75%, rgba(245,158,11,0.05) 0%, transparent 55%),
          radial-gradient(ellipse 50% 70% at 50% 100%, rgba(99,102,241,0.04) 0%, transparent 50%),
          var(--paper);
      }

      .link-arrow {
        font-size: 13px; font-weight: 600; color: var(--ink);
        text-decoration: none; display: inline-flex; align-items: center; gap: 4px;
        transition: color 0.15s, gap 0.15s;
      }
      .link-arrow:hover { color: var(--emerald); gap: 8px; }

      .stat-chip {
        background: white;
        border: 1px solid var(--border);
        border-radius: 14px;
        padding: 14px 18px;
      }

      table { border-collapse: collapse; width: 100%; }
      thead { background: var(--paper-dim); }
      th, td { padding: 11px 16px; text-align: left; font-size: 13px; }
      th { font-weight: 600; color: var(--ink-muted); font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; }
      td { color: var(--ink); border-top: 1px solid var(--border-soft); }
      tr:hover td { background: var(--paper); }

      /* Modal backdrop */
      .modal-backdrop {
        position: fixed; inset: 0; z-index: 100;
        background: rgba(9,13,20,0.6);
        backdrop-filter: blur(6px);
        display: flex; align-items: center; justify-content: center;
        padding: 16px;
      }
      .modal-panel {
        width: 100%; max-width: 680px;
        background: white;
        border-radius: 24px;
        border: 1px solid var(--border);
        box-shadow: 0 32px 80px rgba(0,0,0,0.18);
        overflow: hidden;
        animation: fadeUp 0.3s cubic-bezier(.22,1,.36,1) both;
      }

      /* Scrollbar */
      ::-webkit-scrollbar { width: 6px; height: 6px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 99px; }

      @media (max-width: 768px) {
        .display-heading { letter-spacing: -0.015em; }
      }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(link)
      document.head.removeChild(style)
    }
  }, [])
  return null
}

/* ─── Quiz Modal ──────────────────────────────────────────── */
function QuizModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', handler) }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div
        className="modal-panel"
        role="dialog" aria-modal="true" aria-label="Quick recommendations quiz"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '18px 24px', borderBottom: '1px solid var(--border)' }}>
          <div>
            <p className="section-label" style={{ color: 'var(--emerald)' }}>Quick Quiz</p>
            <p style={{ marginTop: 4, fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>5 questions → your best earning method</p>
          </div>
          <button
            onClick={onClose}
            style={{ padding: '8px 16px', borderRadius: 10, border: '1px solid var(--border)', background: 'white', fontSize: 13, fontWeight: 600, color: 'var(--ink-muted)', cursor: 'pointer' }}
          >
            Close ✕
          </button>
        </div>
        <div style={{ maxHeight: '78vh', overflowY: 'auto', padding: '24px' }}>
          <LandingQuiz categories={categories} />
        </div>
      </div>
    </div>
  )
}

/* ─── Featured Category Card ──────────────────────────────── */
function FeaturedCategoryCard({ item, index }) {
  return (
    <Link
      to={`/categories/${item.slug}`}
      className={`card anim-fade-up delay-${Math.min(index + 1, 5)}`}
      style={{ display: 'block', padding: 22, textDecoration: 'none', position: 'relative', overflow: 'hidden' }}
      aria-label={`Open ${item.title} guide`}
    >
      <div style={{ position: 'absolute', top: -40, right: -40, width: 120, height: 120, borderRadius: '50%', background: 'var(--emerald-glow)', filter: 'blur(30px)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 22 }}>{item.icon}</span>
            <span className="pill pill-emerald">★ {item.trustRating}</span>
            <span className="pill pill-sky">{item.timeToStart}</span>
          </div>
          <div style={{ flexShrink: 0, width: 34, height: 34, borderRadius: 10, border: '1px solid var(--border)', background: 'var(--paper)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: 'var(--ink-muted)', transition: 'background 0.2s' }}>
            →
          </div>
        </div>

        <h3 style={{ marginTop: 14, fontFamily: 'var(--display-font)', fontSize: 18, fontWeight: 500, color: 'var(--ink)', letterSpacing: '-0.01em', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
          {item.title}
        </h3>
        <p style={{ marginTop: 8, fontSize: 13, lineHeight: 1.6, color: 'var(--ink-muted)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {item.overview}
        </p>

        <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {[
            { label: 'Skill', val: item.skillsRequired },
            { label: 'Cost', val: item.startupCost },
            { label: 'For', val: item.bestFor?.[0] ?? 'Beginners' },
          ].map(({ label, val }) => (
            <span key={label} style={{ fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 8, background: 'var(--paper-dim)', color: 'var(--ink-muted)', border: '1px solid var(--border-soft)' }}>
              {label}: {val}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}

/* ─── Action Tile ─────────────────────────────────────────── */
function ActionTile({ to, eyebrow, title, body, accent = 'emerald' }) {
  const accentColor = accent === 'amber' ? 'var(--gold)' : 'var(--emerald)'
  return (
    <Link
      to={to}
      className="card"
      style={{ display: 'block', padding: '20px 22px', textDecoration: 'none' }}
    >
      <p className="section-label" style={{ color: accentColor }}>{eyebrow}</p>
      <h3 style={{ marginTop: 8, fontSize: 15, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.01em' }}>{title}</h3>
      <p style={{ marginTop: 6, fontSize: 13, lineHeight: 1.6, color: 'var(--ink-muted)' }}>{body}</p>
      <p style={{ marginTop: 14, fontSize: 13, fontWeight: 700, color: accentColor }}>Open →</p>
    </Link>
  )
}

/* ─── Stat Chip ───────────────────────────────────────────── */
function StatChip({ label, value }) {
  return (
    <div className="stat-chip">
      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-faint)' }}>{label}</p>
      <p style={{ marginTop: 6, fontFamily: 'var(--display-font)', fontSize: 20, fontWeight: 500, color: 'var(--ink)' }}>{value}</p>
    </div>
  )
}

/* ─── HomePage ────────────────────────────────────────────── */
export default function HomePage() {
  const [isQuizOpen, setIsQuizOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const key = 'home.quizModalSeen.v1'
    try {
      if (window.localStorage.getItem(key) !== '1') {
        setIsQuizOpen(true)
        window.localStorage.setItem(key, '1')
      }
    } catch { setIsQuizOpen(true) }
  }, [])

  const filteredCategories = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return categories.slice(0, 6)
    return categories
      .filter((c) => `${c.title} ${c.overview} ${c.description}`.toLowerCase().includes(q))
      .slice(0, 6)
  }, [searchQuery])

  return (
    <>
      <FontInjector />
      <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />

      {/* ── HERO ── */}
      <section className="hero-mesh" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 24px 56px' }}>

          {/* Top pills */}
          <div className="anim-fade-in" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <span className="pill pill-emerald">For beginners</span>
            <span className="pill pill-sky">Realistic expectations</span>
            <span className="pill pill-slate">Progress tracking</span>
          </div>

          {/* Main grid */}
          <div style={{ marginTop: 32, display: 'grid', gap: 40, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', alignItems: 'start' }}>

            {/* Left col */}
            <div style={{ maxWidth: 600 }}>
              <h1
                className="display-heading anim-fade-up delay-1"
                style={{ fontSize: 'clamp(36px, 5vw, 58px)', color: 'var(--ink)' }}
              >
                Online earning,<br />
                <em style={{ color: 'var(--emerald)', fontStyle: 'italic', fontWeight: 400 }}>explained clearly</em>—<br />
                not hyped up.
              </h1>

              <p className="anim-fade-up delay-2" style={{ marginTop: 20, fontSize: 16, lineHeight: 1.75, color: 'var(--ink-muted)', maxWidth: 480 }}>
                Pick a method that fits your time and budget. Follow a weekly loop, use checklists, and stay safe from scams.
              </p>

              <div className="anim-fade-up delay-3" style={{ marginTop: 28, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                <button className="btn-emerald" onClick={() => setIsQuizOpen(true)}>
                  Find my best method →
                </button>
                <Link to="/categories" className="btn-ghost">Browse all methods</Link>
                <Link to="/start-here" className="btn-ghost">Start here</Link>
              </div>

              {/* Stats */}
              <div className="anim-fade-up delay-4" style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                <StatChip label="Top pick" value="Freelancing" />
                <StatChip label="Fastest start" value="1–3 wks" />
                <StatChip label="Min. budget" value="Free" />
              </div>

              {/* Search */}
              <div className="anim-fade-up delay-5" style={{ marginTop: 28 }}>
                <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 16, padding: 18 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
                    <div>
                      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-faint)' }}>Find a method</p>
                      <p style={{ marginTop: 3, fontSize: 13, color: 'var(--ink-muted)' }}>Try "freelancing", "content", "remote jobs"</p>
                    </div>
                    <Link to="/compare" className="link-arrow">Compare all →</Link>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search methods…"
                      aria-label="Search earning methods"
                      style={{ flex: 1, padding: '11px 16px', borderRadius: 10, border: '1px solid var(--border)', fontSize: 14, fontWeight: 500, color: 'var(--ink)', outline: 'none', background: 'var(--paper)' }}
                      onFocus={(e) => { e.target.style.borderColor = 'var(--emerald)'; e.target.style.boxShadow = '0 0 0 3px var(--emerald-glow)' }}
                      onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
                    />
                    <Link to="/categories" className="btn-primary" style={{ whiteSpace: 'nowrap' }}>View all</Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right col */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 20, padding: 22, boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}>
                <p className="section-label" style={{ color: 'var(--emerald)' }}>Today's Momentum</p>
                <div style={{ marginTop: 14 }}>
                  <DailyTipCard />
                </div>
              </div>
              <ActionTile
                to="/progress"
                accent="emerald"
                eyebrow="Progress"
                title="Saved checklists"
                body="Mark steps complete and track progress locally—works on slow connections too."
              />
              <ActionTile
                to="/scam-warnings"
                accent="amber"
                eyebrow="⚠ Safety"
                title="Scam warnings — must read"
                body="Red flags that save beginners from costly mistakes. Read before you start anything."
              />
            </div>
          </div>
        </div>

        {/* Decorative line */}
        <div className="divider" />
      </section>

      {/* ── FEATURED METHODS ── */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, marginBottom: 36 }}>
          <div>
            <p className="section-label" style={{ color: 'var(--emerald)' }}>Featured Methods</p>
            <h2 className="display-heading" style={{ marginTop: 8, fontSize: 'clamp(28px, 4vw, 40px)', color: 'var(--ink)' }}>
              Start with what fits your life
            </h2>
            <p style={{ marginTop: 12, fontSize: 14, lineHeight: 1.7, color: 'var(--ink-muted)', maxWidth: 480 }}>
              Choose one method for 30 days. Follow the checklist. Track progress. This is how beginners become consistent.
            </p>
          </div>
          <Link to="/categories" className="btn-ghost">View all categories →</Link>
        </div>

        <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))' }}>
          {filteredCategories.map((item, i) => (
            <FeaturedCategoryCard key={item.slug} item={item} index={i} />
          ))}
        </div>
      </section>

      <div className="divider" style={{ maxWidth: 1100, margin: '0 auto' }} />

      {/* ── SYSTEM SECTION (DARK) ── */}
      <section style={{ background: 'var(--night)', color: 'white', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative glows */}
        <div style={{ position: 'absolute', top: -80, left: -80, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(5,150,105,0.12), transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -80, right: -40, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,0.08), transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', maxWidth: 1100, margin: '0 auto', padding: '72px 24px' }}>
          <div style={{ display: 'grid', gap: 48, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', alignItems: 'start' }}>

            {/* Left */}
            <div>
              <p className="section-label" style={{ color: '#6ee7b7' }}>Your Weekly Loop</p>
              <h2 className="display-heading" style={{ marginTop: 10, fontSize: 'clamp(26px, 3.5vw, 38px)' }}>
                A system, not a blog
              </h2>
              <p style={{ marginTop: 14, fontSize: 14, lineHeight: 1.75, color: 'rgba(255,255,255,0.6)', maxWidth: 440 }}>
                Most beginners lose months mixing methods and chasing hype. Pick one method, run a weekly loop, and track small daily actions.
              </p>

              <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 12 }}>
                {[
                  { n: '01', title: 'Pick one method', body: 'Match your time and budget. Commit for 30 days.' },
                  { n: '02', title: 'Run weekly loop', body: 'Learn → publish → apply → review. Momentum beats perfect.' },
                  { n: '03', title: 'Scale what works', body: 'One skill + one channel. Remove distractions ruthlessly.' },
                ].map(({ n, title, body }) => (
                  <div key={n} className="night-card" style={{ padding: '20px 18px' }}>
                    <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>{n}</p>
                    <p style={{ marginTop: 10, fontSize: 14, fontWeight: 600, color: 'white' }}>{title}</p>
                    <p style={{ marginTop: 8, fontSize: 13, lineHeight: 1.6, color: 'rgba(255,255,255,0.5)' }}>{body}</p>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 28, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                <Link to="/start-here" style={{ display: 'inline-flex', alignItems: 'center', padding: '11px 22px', borderRadius: 12, background: 'white', color: 'var(--ink)', fontSize: 13, fontWeight: 700, textDecoration: 'none', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f0f0ee'}
                  onMouseLeave={e => e.currentTarget.style.background = 'white'}>
                  Open beginner roadmap →
                </Link>
                <Link to="/compare" className="btn-night-ghost">Compare methods →</Link>
              </div>
            </div>

            {/* Right — earning paths */}
            <div>
              <div className="night-card" style={{ padding: 28 }}>
                <p className="section-label" style={{ color: '#fcd34d' }}>Pick a Path</p>
                <h3 style={{ marginTop: 10, fontFamily: 'var(--display-font)', fontSize: 22, fontWeight: 500, color: 'white' }}>
                  Three simple earning paths
                </h3>
                <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {earningPaths.map((path) => (
                    <div key={path.title} className="night-card" style={{ padding: '18px 20px' }}>
                      <p style={{ fontSize: 14, fontWeight: 700, color: 'white' }}>{path.title}</p>
                      <ol style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10, listStyle: 'none' }}>
                        {path.steps.map((step) => (
                          <li key={step} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                            <span style={{ flexShrink: 0, width: 20, height: 20, marginTop: 1, borderRadius: '50%', background: 'rgba(110,231,183,0.15)', border: '1px solid rgba(110,231,183,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#6ee7b7', fontWeight: 700 }}>✓</span>
                            <span style={{ fontSize: 13, lineHeight: 1.6, color: 'rgba(255,255,255,0.65)' }}>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GUIDES + TRUST ── */}
      <section style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 24px', display: 'grid', gap: 48, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', alignItems: 'start' }}>

          {/* Guides */}
          <div>
            <p className="section-label" style={{ color: 'var(--emerald)' }}>Latest Guides</p>
            <h2 className="display-heading" style={{ marginTop: 10, fontSize: 'clamp(26px, 3.5vw, 36px)', color: 'var(--ink)' }}>
              Practical content for this week
            </h2>
            <div style={{ marginTop: 28, display: 'grid', gap: 14, gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
              {blogPosts.slice(0, 6).map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="card"
                  style={{ display: 'block', padding: '18px 20px', textDecoration: 'none' }}
                >
                  <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-faint)' }}>Guide</p>
                  <h3 style={{ marginTop: 8, fontSize: 14, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.5 }}>{post.title}</h3>
                  <p style={{ marginTop: 8, fontSize: 12, lineHeight: 1.6, color: 'var(--ink-muted)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.excerpt}</p>
                  <p style={{ marginTop: 12, fontSize: 12, fontWeight: 700, color: 'var(--emerald)' }}>Read →</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Sidebar trust */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Scam shield */}
            <div style={{ background: 'linear-gradient(135deg, #fffbeb 0%, white 60%, #fffbeb 100%)', border: '1px solid var(--gold-border)', borderRadius: 20, padding: '22px 24px' }}>
              <p className="section-label" style={{ color: 'var(--gold)' }}>⚠ Scam Shield</p>
              <h3 style={{ marginTop: 10, fontFamily: 'var(--display-font)', fontSize: 20, fontWeight: 500, color: 'var(--ink)' }}>Know the red flags</h3>
              <ul style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10, listStyle: 'none' }}>
                {[
                  'Upfront payments or "registration fees"',
                  'Guaranteed income, fake withdrawal screenshots',
                  'Pressure tactics and vague "training systems"',
                ].map((item) => (
                  <li key={item} style={{ display: 'flex', gap: 10, fontSize: 13, lineHeight: 1.6, color: 'var(--ink-muted)', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--gold)', marginTop: 2, flexShrink: 0 }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/scam-warnings" style={{ marginTop: 18, display: 'inline-flex', padding: '10px 18px', borderRadius: 10, background: '#b45309', color: 'white', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
                Read the scam guide →
              </Link>
            </div>

            {/* Trust */}
            <div className="card" style={{ padding: '22px 24px' }}>
              <p className="section-label" style={{ color: 'var(--emerald)' }}>Trust & Transparency</p>
              <h3 style={{ marginTop: 10, fontFamily: 'var(--display-font)', fontSize: 20, fontWeight: 500, color: 'var(--ink)' }}>Why this feels safe</h3>
              <ul style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10, listStyle: 'none' }}>
                {[
                  'Clear expectations — no magic promises',
                  'Affiliate disclosures where applicable',
                  'Beginner-friendly language (Urdu / Roman Urdu ready)',
                ].map((item) => (
                  <li key={item} style={{ display: 'flex', gap: 10, fontSize: 13, lineHeight: 1.6, color: 'var(--ink-muted)', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--emerald)', marginTop: 2, flexShrink: 0 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: 18, display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                <Link to="/about" className="link-arrow">Editorial policy →</Link>
                <Link to="/contact" className="link-arrow">Ask a question →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS + INCOME ── */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 24px' }}>
        <div style={{ display: 'grid', gap: 48, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', alignItems: 'start' }}>

          {/* Skills */}
          <div>
            <p className="section-label" style={{ color: 'var(--emerald)' }}>Trend Tracking</p>
            <h2 className="display-heading" style={{ marginTop: 10, fontSize: 'clamp(26px, 3.5vw, 36px)', color: 'var(--ink)' }}>
              Skills winning in 2026
            </h2>
            <p style={{ marginTop: 12, fontSize: 14, lineHeight: 1.7, color: 'var(--ink-muted)' }}>
              Use these as "skill anchors" so your effort compounds instead of restarting every month.
            </p>
            <div style={{ marginTop: 22, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
              {trendingSkills2026.map((skill) => (
                <div key={skill} style={{ padding: '12px 16px', borderRadius: 12, background: 'white', border: '1px solid var(--border)', fontSize: 13, fontWeight: 600, color: 'var(--ink-muted)', lineHeight: 1.4 }}>
                  {skill}
                </div>
              ))}
            </div>
          </div>

          {/* Income table */}
          <div>
            <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 20, overflow: 'hidden', boxShadow: '0 2px 20px rgba(0,0,0,0.04)' }}>
              <div style={{ padding: '22px 24px 16px' }}>
                <p className="section-label" style={{ color: 'var(--emerald)' }}>Income Estimator</p>
                <h2 className="display-heading" style={{ marginTop: 8, fontSize: 26, color: 'var(--ink)' }}>Realistic earning ranges</h2>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table>
                  <thead>
                    <tr>
                      <th>Method</th>
                      <th>Beginner</th>
                      <th>Intermediate</th>
                      <th>Expert</th>
                    </tr>
                  </thead>
                  <tbody>
                    {incomeEstimates.map((entry) => (
                      <tr key={entry.method}>
                        <td style={{ fontWeight: 600 }}>{entry.method}</td>
                        <td style={{ color: 'var(--ink-muted)' }}>{entry.beginner}</td>
                        <td style={{ color: 'var(--ink-muted)' }}>{entry.intermediate}</td>
                        <td style={{ color: 'var(--ink-muted)' }}>{entry.expert}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ margin: 16, padding: '14px 16px', borderRadius: 12, background: 'var(--paper-dim)', border: '1px solid var(--border-soft)' }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink)' }}>A quick reminder</p>
                <p style={{ marginTop: 4, fontSize: 12, lineHeight: 1.6, color: 'var(--ink-muted)' }}>
                  These are ranges, not promises. Results depend on skill, consistency, and market fit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" style={{ maxWidth: 1100, margin: '0 auto' }} />

      {/* ── FAQ ── */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 24px' }}>
        <p className="section-label" style={{ color: 'var(--emerald)' }}>FAQ</p>
        <h2 className="display-heading" style={{ marginTop: 10, fontSize: 'clamp(26px, 3.5vw, 36px)', color: 'var(--ink)' }}>
          Common questions, straight answers
        </h2>
        <div style={{ marginTop: 32, display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {[
            { q: 'Can I start with zero money?', a: 'Yes. Start with low-cost methods (freelancing, tutoring, remote jobs, content). Your first goal is skill + proof, not perfection.' },
            { q: 'How long until I earn?', a: 'Fast methods can pay in weeks, but stability takes time. Use the estimator ranges as direction, not a guarantee.' },
            { q: 'What if I keep getting confused?', a: 'Pick one method for 30 days. Do one small daily action. Confusion usually comes from switching methods too fast.' },
            { q: 'How do I avoid scams?', a: 'Never pay for "registration," never trust guaranteed income, and avoid pressure tactics. The Scam Warnings page is your filter.' },
          ].map(({ q, a }) => (
            <article key={q} style={{ padding: '20px 22px', borderRadius: 16, background: 'white', border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.5 }}>{q}</h3>
              <p style={{ marginTop: 10, fontSize: 13, lineHeight: 1.7, color: 'var(--ink-muted)' }}>{a}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ background: 'var(--night)', borderRadius: 28, padding: 'clamp(40px, 6vw, 64px)', overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', top: -60, right: -60, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(5,150,105,0.15), transparent 65%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', display: 'grid', gap: 28, gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', alignItems: 'center' }}>
            <div>
              <p className="section-label" style={{ color: '#6ee7b7' }}>Get Unstuck</p>
              <h2 className="display-heading" style={{ marginTop: 10, fontSize: 'clamp(24px, 3.5vw, 36px)', color: 'white' }}>
                If you're starting today,<br />this is your next click.
              </h2>
              <p style={{ marginTop: 14, fontSize: 14, lineHeight: 1.75, color: 'rgba(255,255,255,0.55)', maxWidth: 400 }}>
                Open the beginner roadmap, pick one method, and follow a weekly checklist. No overwhelm—just forward progress.
              </p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'flex-start' }}>
              <Link to="/start-here" style={{ display: 'inline-flex', alignItems: 'center', padding: '13px 24px', borderRadius: 12, background: 'white', color: 'var(--ink)', fontSize: 14, fontWeight: 700, textDecoration: 'none', transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#f2f2ef'}
                onMouseLeave={e => e.currentTarget.style.background = 'white'}>
                Open Start Here →
              </Link>
              <Link to="/contact" className="btn-night-ghost" style={{ padding: '13px 22px', fontSize: 14 }}>
                Ask a question →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}