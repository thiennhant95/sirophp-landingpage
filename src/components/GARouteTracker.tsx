'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

type GtagArgs = ['event', string, Record<string, string>] | ['js', string] | ['config', string, object?]

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: GtagArgs) => void
  }
}

export default function GARouteTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname) return
    // Skip internal anchor-only changes; still fires on real route change.
    window.dataLayer = window.dataLayer || []
    const gtag =
      window.gtag ??
      ((...args: GtagArgs) => {
        window.dataLayer!.push(args)
      })
    window.gtag = gtag
    gtag('event', 'page_view', {
      page_path: pathname + (typeof window !== 'undefined' ? window.location.search : ''),
      page_title: document.title,
      page_location: window.location.href,
    })
  }, [pathname])

  return null
}
