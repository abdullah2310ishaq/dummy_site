import { Outlet } from 'react-router-dom'
import AdSenseAutoAds from '../ads/AdSenseAutoAds'
import CookieConsentBanner from './CookieConsentBanner'
import SeoManager from '../seo/SeoManager'
import SiteFooter from './SiteFooter'
import SiteHeader from './SiteHeader'

export default function SiteLayout() {
  return (
    <div className="min-h-screen bg-ink-50 text-ink-900 dark:bg-ink-950 dark:text-white">
      <AdSenseAutoAds />
      <SeoManager />
      <SiteHeader />
      <main id="main-content">
        <Outlet />
      </main>
      <SiteFooter />
      <CookieConsentBanner />
    </div>
  )
}
