'use client'

import { useState } from 'react'
import posthog from 'posthog-js'

/** A next-step offer shown inline right after a template download — the one moment a visitor has already shown intent. */
export interface PostDownloadOffer {
  headline: string
  body: string
  ctaLabel: string
  ctaHref: string
}

/** Tracked download card for a post's free template asset. Fires PostHog + gtag on click; optionally reveals a post-download offer (also tracked) for pages running a conversion test. */
export default function TemplateDownload({
  href,
  label,
  slug,
  offer,
  dir,
}: {
  href: string
  label: string
  slug: string
  /** When set, an inline offer card appears the moment the download fires — never before. */
  offer?: PostDownloadOffer
  dir?: 'ltr' | 'rtl'
}) {
  const format = href.split('.').pop()?.toUpperCase() ?? 'FILE'
  const [showOffer, setShowOffer] = useState(false)

  const fire = (event: string) => {
    try {
      posthog.capture(event, { slug, href, format })
    } catch (_) {}
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', event, { slug, href, format, event_category: 'content' })
    }
  }

  const track = () => {
    fire('template_download')
    if (offer) {
      setShowOffer(true)
      fire('post_download_offer_shown')
    }
  }

  return (
    <div className="kb-template-dl">
      <div className="kb-template-dl-card">
        <div className="kb-template-dl-icon" aria-hidden="true">
          &#8595;
        </div>
        <div className="kb-template-dl-body">
          <div className="kb-template-dl-label">{label}</div>
          <div className="kb-template-dl-sub">Free · no signup · opens in Word / Google Docs</div>
        </div>
        <a className="kb-template-dl-btn" href={href} download onClick={track}>
          Download {format}
        </a>
      </div>

      {offer && showOffer && (
        <div className="kb-post-offer" dir={dir}>
          <div className="kb-post-offer-card">
            <div className="kb-post-offer-body">
              <div className="kb-post-offer-head">{offer.headline}</div>
              <div className="kb-post-offer-sub">{offer.body}</div>
            </div>
            <a className="kb-post-offer-btn" href={offer.ctaHref} onClick={() => fire('post_download_offer_click')}>
              {offer.ctaLabel}
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
