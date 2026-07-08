'use client'

import posthog from 'posthog-js'

/** Tracked download card for a post's free template asset. Fires PostHog + gtag on click. */
export default function TemplateDownload({
  href,
  label,
  slug,
}: {
  href: string
  label: string
  slug: string
}) {
  const format = href.split('.').pop()?.toUpperCase() ?? 'FILE'

  const track = () => {
    try {
      posthog.capture('template_download', { slug, href, format })
    } catch (_) {}
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'template_download', {
        slug,
        href,
        format,
        event_category: 'content',
      })
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
    </div>
  )
}
