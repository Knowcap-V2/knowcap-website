import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Knowcap',
  description:
    'How Knowcap collects, uses, stores, and protects your data — and the controls you have over meeting recordings, transcripts, and verified evidence.',
  alternates: { canonical: 'https://knowcap.ai/policy' },
}

export default function PolicyLayout({ children }: { children: React.ReactNode }) {
  return children
}
