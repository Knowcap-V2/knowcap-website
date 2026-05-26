'use client'

import { useEffect } from 'react'

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? match[2] : null
}

export default function ABTracker({ variant }: { variant: string }) {
  useEffect(() => {
    if (typeof window === 'undefined') return
    const theme = getCookie('kc-landing-theme') || 'baseline'
    const combo = `${variant}_${theme}`

    if ((window as any).gtag) {
      (window as any).gtag('event', 'landing_variant_view', {
        variant,
        theme,
        combo,
        event_category: 'ab_test',
      })
    }

    try {
      if ((window as any).clarity && typeof (window as any).clarity === 'function') {
        (window as any).clarity('set', 'landing_variant', variant)
        (window as any).clarity('set', 'landing_theme', theme)
        (window as any).clarity('set', 'landing_combo', combo)
      }
    } catch (_) {}
  }, [variant])

  return null
}

export function trackCTA(variant: string, cta: string) {
  if (typeof window === 'undefined') return
  const theme = getCookie('kc-landing-theme') || 'baseline'
  if ((window as any).gtag) {
    (window as any).gtag('event', 'landing_cta_click', {
      variant,
      theme,
      combo: `${variant}_${theme}`,
      cta_type: cta,
      event_category: 'ab_test',
    })
  }
}
