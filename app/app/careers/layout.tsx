import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Careers at Knowcap — Join the Team',
  description:
    'Build the trust layer for AI agents. Open roles at Knowcap across engineering, product, and go-to-market — remote-friendly, MENA-rooted.',
  alternates: { canonical: 'https://knowcap.ai/careers' },
}

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return children
}
