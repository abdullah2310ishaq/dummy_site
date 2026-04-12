import { useEffect } from 'react'
import { adsensePublisherId } from '../../config/adsense'

let hasInitializedAutoAds = false

export default function AdSenseAutoAds() {
  useEffect(() => {
    if (hasInitializedAutoAds) return
    if (!window.adsbygoogle) return

    try {
      window.adsbygoogle.push({
        google_ad_client: adsensePublisherId,
        enable_page_level_ads: true,
      })
      hasInitializedAutoAds = true
    } catch {
      // Keep silent; script/adblock/network can block execution.
    }
  }, [])

  return null
}
