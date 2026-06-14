import type { Metadata } from 'next'
import VersionD from '@/components/version-d'

// A/B test variant — canonical to the homepage so Google consolidates ranking
// signals to / rather than treating these as duplicate homepages.
export const metadata: Metadata = { alternates: { canonical: 'https://knowcap.ai/' } }

// /d — Version D (show-the-magic), themed impeccable design.
// In the live / rotation (magic arm of the B-vs-D copy test).
export default function PageD() {
  return <VersionD />
}
