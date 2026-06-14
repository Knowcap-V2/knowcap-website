import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book a Knowcap Demo — 20 Minutes',
  description:
    'See Knowcap turn a real meeting into verified evidence and agent actions — Odoo tickets, GitHub PRs, follow-ups. Book a 20-minute walkthrough.',
  alternates: { canonical: 'https://knowcap.ai/book' },
}

const JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Book a Knowcap Demo',
  url: 'https://knowcap.ai/book',
  about: 'Book a 20-minute Knowcap demo.',
  isPartOf: { '@type': 'WebSite', name: 'Knowcap', url: 'https://knowcap.ai' },
  publisher: { '@type': 'Organization', name: 'Knowcap', url: 'https://knowcap.ai' },
}

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />
      {children}
    </>
  )
}
