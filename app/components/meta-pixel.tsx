'use client'

import Script from 'next/script'
import { useEffect } from 'react'

/**
 * Meta Pixel — EPIC 31 S4, Odoo #7650. Same load pattern as the existing
 * Clarity/GA scripts in app/layout.tsx (next/script, strategy="afterInteractive",
 * non-blocking). Two events per this ticket's own criteria:
 *   - PageView, fired automatically by the base pixel snippet on every load.
 *   - the click-to-signup optimisation event, fired once for a click on ANY
 *     Register CTA — there are dozens across this site (header, footer, every
 *     compare page, pricing, get-started, blog posts…) and they all resolve to
 *     an /register link, so one delegated document-level listener covers every
 *     current and future CTA instead of hand-wiring an onClick onto each file.
 *
 * Renders nothing (not even the script tag) when NEXT_PUBLIC_META_PIXEL_ID is
 * unset — the page must load and function identically without a credential
 * (this ticket's own adversarial criterion), and Hassan does not have a real
 * Pixel ID yet as of this build (see the launch-plan doc + Odoo #7745).
 */

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

function ClickToSignupTracker() {
  useEffect(() => {
    if (!PIXEL_ID) return
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      const link = target?.closest('a[href*="/register"]')
      if (link && window.fbq) {
        window.fbq('track', 'Lead')
      }
    }
    // Capture phase: fires before the browser starts navigating away for a
    // normal <a href> click (this app links to https://app.knowcap.ai/register,
    // a different origin — no SPA route to intercept).
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])
  return null
}

export default function MetaPixel() {
  if (!PIXEL_ID) return null

  return (
    <>
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${PIXEL_ID}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
      <ClickToSignupTracker />
    </>
  )
}
