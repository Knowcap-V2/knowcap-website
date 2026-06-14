import type { Metadata } from 'next'
import VersionC from '@/components/version-c'

// A/B test variant — canonical to the homepage so Google consolidates ranking
// signals to / rather than treating these as duplicate homepages.
export const metadata: Metadata = { alternates: { canonical: 'https://knowcap.ai/' } }

// /c — Version C (role-first), themed impeccable design.
// Reachable directly for review; not part of the live / rotation.
export default function PageC() {
  return <VersionC />
}
