import type { Metadata } from 'next'
import VersionA from '@/components/version-a'

// A/B test variant — canonical to the homepage so Google consolidates ranking
// signals to / rather than treating these as duplicate homepages.
export const metadata: Metadata = { alternates: { canonical: 'https://knowcap.ai/' } }

// /a — Version A (control / mechanism-first), themed impeccable design.
// Reachable directly for review; not part of the live / rotation.
export default function PageA() {
  return <VersionA />
}
