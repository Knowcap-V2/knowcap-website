import type { Metadata } from 'next'
import VersionA from '@/components/version-a'
import SiteJsonLd from '@/components/site/site-json-ld'

// A/B test variant — canonical to the homepage so Google consolidates ranking
// signals to / rather than treating these as duplicate homepages. Unique title
// avoids duplicate-<title> dilution; site entity schema for AI search.
export const metadata: Metadata = {
  title: 'How Knowcap Works — Verified Meeting Intelligence for AI Agents',
  alternates: { canonical: 'https://knowcap.ai/' },
}

// /a — Version A (control / mechanism-first), themed impeccable design.
// Reachable directly for review; not part of the live / rotation.
export default function PageA() {
  return (
    <>
      <SiteJsonLd />
      <VersionA />
    </>
  )
}
