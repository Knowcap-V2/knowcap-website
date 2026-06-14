import type { Metadata } from 'next'
import VersionB from '@/components/version-b'

// A/B test variant — canonical to the homepage so Google consolidates ranking
// signals to / rather than treating these as duplicate homepages.
export const metadata: Metadata = { alternates: { canonical: 'https://knowcap.ai/' } }

// /b — Version B (outcome-first), themed impeccable design.
// In the live / rotation (outcome arm of the B-vs-D copy test).
export default function PageB() {
  return <VersionB />
}
