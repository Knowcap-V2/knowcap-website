import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Knowcap — Talk to the Team',
  description:
    'Questions about Knowcap, partnerships, or a demo for your Odoo practice, agency, or audit firm? Reach the team and we will get back to you.',
  alternates: { canonical: 'https://knowcap.ai/contact-us' },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
