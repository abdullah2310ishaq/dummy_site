import { Outlet } from 'react-router-dom'
import AdSenseAutoAds from '../ads/AdSenseAutoAds'
import CookieConsentBanner from './CookieConsentBanner'
import SiteFooter from './SiteFooter'
import SiteHeader from './SiteHeader'

export default function SiteLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <AdSenseAutoAds />
      <SiteHeader />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
      <CookieConsentBanner />
    </div>
  )
}
