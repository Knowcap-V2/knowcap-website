import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book a Knowcap Demo — 20 Minutes',
  description:
    'See Knowcap turn a real meeting into verified evidence and agent actions — Odoo tickets, GitHub PRs, follow-ups. Book a 20-minute walkthrough.',
  alternates: { canonical: 'https://knowcap.ai/book' },
}

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children
}
