import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — Knowcap',
  description:
    'The terms that govern your use of Knowcap — accounts, acceptable use, billing, and the responsibilities of the trust layer for your AI agents.',
  alternates: { canonical: 'https://knowcap.ai/terms' },
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children
}
