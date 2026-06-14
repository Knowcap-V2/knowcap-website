import type { Metadata } from 'next'
import VersionD from '@/components/version-d'
import SiteJsonLd from '@/components/site/site-json-ld'

// A/B test variant — canonical to the homepage so Google consolidates ranking
// signals to / rather than treating these as duplicate homepages. Unique title
// avoids duplicate-<title> dilution; site entity schema for AI search.
export const metadata: Metadata = {
  title: 'Watch Knowcap Turn a Meeting Into Action — Verified by a Human',
  alternates: { canonical: 'https://knowcap.ai/' },
}

// /d — Version D (show-the-magic), themed impeccable design.
// In the live / rotation (magic arm of the B-vs-D copy test).
export default function PageD() {
  return (
    <>
      <SiteJsonLd />
      <VersionD />
    </>
  )
}
