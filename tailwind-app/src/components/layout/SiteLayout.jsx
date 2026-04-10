import { Outlet } from 'react-router-dom'
import SiteFooter from './SiteFooter'
import SiteHeader from './SiteHeader'

export default function SiteLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}
