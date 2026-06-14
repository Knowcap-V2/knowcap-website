import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Knowcap',
  description:
    'How Knowcap collects, uses, stores, and protects your data — and the controls you have over meeting recordings, transcripts, and verified evidence.',
  alternates: { canonical: 'https://knowcap.ai/policy' },
}

const JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Privacy Policy — Knowcap',
  url: 'https://knowcap.ai/policy',
  about: 'How Knowcap collects, uses, and protects your data.',
  isPartOf: { '@type': 'WebSite', name: 'Knowcap', url: 'https://knowcap.ai' },
  publisher: { '@type': 'Organization', name: 'Knowcap', url: 'https://knowcap.ai' },
}

export default function PolicyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />
      {children}
    </>
  )
}
