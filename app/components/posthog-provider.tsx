'use client'

import posthog from 'posthog-js'
import { useEffect } from 'react'

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY || ''
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'

export default function PostHogProvider() {
  useEffect(() => {
    if (!POSTHOG_KEY || typeof window === 'undefined') return

    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      capture_pageview: true,
      capture_pageleave: true,
      persistence: 'localStorage+cookie',
      loaded: (ph) => {
        const variant = getCookie('kc-landing-variant')
        const theme = getCookie('kc-landing-theme')
        if (variant) {
          ph.register({
            landing_variant: variant,
            landing_theme: theme || 'baseline',
            landing_combo: `${variant}_${theme || 'baseline'}`,
          })
          ph.setPersonProperties({
            landing_variant: variant,
            landing_theme: theme || 'baseline',
          })
        }
      },
    })

    // trackLandingCTA was never called from any button, so 'landing_cta_click'
    // read 0 for months while ~35 people a quarter clicked Register. One
    // delegated capture-phase listener (same pattern as meta-pixel.tsx) covers
    // every current and future signup link: the app's /register door and the
    // /beta waitlist. Capture phase fires before the browser leaves the page.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>(
        'a[href*="/register"], a[href*="/beta"]',
      )
      if (!link) return
      // Classify by destination path, not the raw href, so /login?next=/register
      // or /beta?next=/register never count as the wrong CTA.
      const cta = link.pathname === '/register' ? 'register' : link.pathname === '/beta' ? 'beta' : null
      if (!cta) return
      trackLandingCTA(cta, {
        href: (link.getAttribute('href') || '').split('?')[0],
        page: window.location.pathname,
      })
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  return null
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? match[2] : null
}

export function trackLandingCTA(cta: string, props?: Record<string, unknown>) {
  if (!POSTHOG_KEY || typeof window === 'undefined') return
  try {
    posthog.capture('landing_cta_click', { cta_type: cta, ...props })
  } catch {
    // analytics must never block the click it instruments
  }
}

/**
 * Identify a lead by email as soon as we have it. Makes the lead recoverable
 * from PostHog even if the backend submit fails (lesson from the Jun 2026
 * schema-drift incident: 2 completed /beta applications were lost with no
 * recoverable contact info).
 */
export function identifyLead(email: string, props?: Record<string, unknown>) {
  if (!POSTHOG_KEY || typeof window === 'undefined') return
  try {
    posthog.identify(email, { email, ...props })
  } catch {
    // analytics must never break the flow it instruments (e.g. Safari ITP /
    // private-mode localStorage throws)
  }
}

export function trackEvent(event: string, props?: Record<string, unknown>) {
  if (!POSTHOG_KEY || typeof window === 'undefined') return
  try {
    posthog.capture(event, props)
  } catch {
    // same: swallow — a failed capture must not fail the caller
  }
}
