import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Careers at Knowcap — Join the Team',
  description:
    'Build the trust layer for AI agents. Open roles at Knowcap across engineering, product, and go-to-market — remote-friendly, MENA-rooted.',
  alternates: { canonical: 'https://knowcap.ai/careers' },
}

const JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Careers at Knowcap',
  url: 'https://knowcap.ai/careers',
  about: 'Open roles at Knowcap.',
  isPartOf: { '@type': 'WebSite', name: 'Knowcap', url: 'https://knowcap.ai' },
  publisher: { '@type': 'Organization', name: 'Knowcap', url: 'https://knowcap.ai' },
}

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />
      {children}
    </>
  )
}
