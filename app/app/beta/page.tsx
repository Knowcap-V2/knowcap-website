import type { Metadata } from 'next'
import BetaTypeform from '@/components/beta-typeform'

export const metadata: Metadata = {
  title: 'Early Access - Knowcap',
  description: 'Apply for early access to Knowcap — the trust layer for AI agents. Limited spots available.',
  robots: { index: false },
}

export default function BetaPage() {
  return <BetaTypeform />
}
