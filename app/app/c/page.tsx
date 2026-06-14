import type { Metadata } from 'next'
import VersionC from '@/components/version-c'
import SiteJsonLd from '@/components/site/site-json-ld'

// A/B test variant — canonical to the homepage so Google consolidates ranking
// signals to / rather than treating these as duplicate homepages. Unique title
// avoids duplicate-<title> dilution; site entity schema for AI search.
export const metadata: Metadata = {
  title: 'Knowcap for Teams — Meeting Intelligence Agents Can Act On',
  alternates: { canonical: 'https://knowcap.ai/' },
}

// /c — Version C (role-first), themed impeccable design.
// Reachable directly for review; not part of the live / rotation.
export default function PageC() {
  return (
    <>
      <SiteJsonLd />
      <VersionC />
    </>
  )
}
