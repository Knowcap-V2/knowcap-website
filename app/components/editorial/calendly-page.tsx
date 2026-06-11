'use client'

/**
 * CalendlyPage — shared editorial booking page (V6b theme).
 * One Calendly link for every scheduling page (Reclaim retired 2026-06-11).
 */

import { useEffect } from 'react'
import EditorialShell, { PageHero } from '@/components/editorial/shell'

export const CALENDLY_URL = 'https://calendly.com/smetools/meeting-with-hassan'

export default function CalendlyPage({
  tabTitle,
  kicker,
  title,
  sub,
}: {
  tabTitle: string
  kicker: string
  title: React.ReactNode
  sub: React.ReactNode
}) {
  useEffect(() => {
    document.title = tabTitle
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)
    return () => {
      if (script.parentNode === document.body) document.body.removeChild(script)
    }
  }, [tabTitle])

  return (
    <EditorialShell>
      <PageHero kicker={kicker} title={title} sub={sub} />
      <div className="cl-page-body">
        <div className="cl-wrap">
          <div
            className="calendly-inline-widget"
            data-url={CALENDLY_URL}
            style={{ minWidth: '320px', height: '700px' }}
          />
          <noscript>
            <p style={{ textAlign: 'center' }}>
              <a href={CALENDLY_URL} style={{ textDecoration: 'underline' }}>
                Book a time on Calendly
              </a>
            </p>
          </noscript>
        </div>
      </div>
    </EditorialShell>
  )
}
