import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Knowcap — Talk to the Team',
  description:
    'Questions about Knowcap, partnerships, or a demo for your Odoo practice, agency, or audit firm? Reach the team and we will get back to you.',
  alternates: { canonical: 'https://knowcap.ai/contact-us' },
}

const JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Knowcap',
  url: 'https://knowcap.ai/contact-us',
  isPartOf: { '@type': 'WebSite', name: 'Knowcap', url: 'https://knowcap.ai' },
  about: {
    '@type': 'Organization',
    name: 'Knowcap',
    url: 'https://knowcap.ai',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'hsa@knowcap.ai',
      availableLanguage: ['English', 'Arabic'],
    },
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />
      {children}
    </>
  )
}
