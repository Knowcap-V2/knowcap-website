import type { Metadata } from 'next'
import VersionB from '@/components/version-b'
import SiteJsonLd from '@/components/site/site-json-ld'

// A/B test variant — canonical to the homepage so Google consolidates ranking
// signals to / rather than treating these as duplicate homepages. Unique title
// avoids duplicate-<title> dilution; site entity schema for AI search.
export const metadata: Metadata = {
  title: 'Stop Re-Explaining Meetings — Knowcap Acts on Verified Decisions',
  alternates: { canonical: 'https://knowcap.ai/' },
}

// /b — Version B (outcome-first), themed impeccable design.
// In the live / rotation (outcome arm of the B-vs-D copy test).
export default function PageB() {
  return (
    <>
      <SiteJsonLd />
      <VersionB />
    </>
  )
}
