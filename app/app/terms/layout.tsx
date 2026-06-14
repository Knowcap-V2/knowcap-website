import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — Knowcap',
  description:
    'The terms that govern your use of Knowcap — accounts, acceptable use, billing, and the responsibilities of the trust layer for your AI agents.',
  alternates: { canonical: 'https://knowcap.ai/terms' },
}

const JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Terms of Service — Knowcap',
  url: 'https://knowcap.ai/terms',
  about: 'The terms that govern your use of Knowcap.',
  isPartOf: { '@type': 'WebSite', name: 'Knowcap', url: 'https://knowcap.ai' },
  publisher: { '@type': 'Organization', name: 'Knowcap', url: 'https://knowcap.ai' },
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />
      {children}
    </>
  )
}
