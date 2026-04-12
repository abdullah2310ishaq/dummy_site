import { useEffect, useRef } from 'react'
import { adsensePublisherId } from '../../config/adsense'

const pushedInsElements = new WeakSet()

function pushAdForElement(insEl) {
  if (!insEl || pushedInsElements.has(insEl)) return
  pushedInsElements.add(insEl)
  try {
    ;(window.adsbygoogle = window.adsbygoogle || []).push({})
  } catch {
    pushedInsElements.delete(insEl)
  }
}

/**
 * Responsive display unit. Create an ad unit in AdSense and set
 * VITE_ADSENSE_TOP_BANNER_SLOT / VITE_ADSENSE_FOOTER_SLOT in `.env`.
 */
export default function AdSenseDisplayAd({ adSlot, className = '' }) {
  const insRef = useRef(null)

  useEffect(() => {
    if (!adSlot || !insRef.current) return undefined

    const insEl = insRef.current

    const runPush = () => pushAdForElement(insEl)

    if (window.adsbygoogle) {
      runPush()
      return undefined
    }

    const loader = document.querySelector('script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]')
    if (loader) {
      loader.addEventListener('load', runPush, { once: true })
      return () => loader.removeEventListener('load', runPush)
    }

    runPush()
    return undefined
  }, [adSlot])

  if (!adSlot) {
    return null
  }

  return (
    <div className={className}>
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adsensePublisherId}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
