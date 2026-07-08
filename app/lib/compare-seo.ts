import type { Metadata } from 'next'

/**
 * SEO metadata for the /compare/* competitor pages.
 *
 * The compare pages are `'use client'` components, so they cannot export
 * `metadata` directly. Each route ships a sibling server `layout.tsx` that
 * calls `compareMetadata(slug)`, giving every comparison page a unique
 * <title>, meta description, and self-referential canonical — instead of all
 * five inheriting the root layout's default brand title (the duplicate-title
 * regression caught by the 2026-06-14 SEO audit).
 */

export type CompareSlug = 'otter' | 'read-ai' | 'fireflies' | 'fellow' | 'granola'

export interface CompareSeo {
  competitor: string
  title: string
  description: string
}

export const COMPARE_SEO: Record<CompareSlug, CompareSeo> = {
  otter: {
    competitor: 'Otter.ai',
    title: 'Otter.ai Alternative for Odoo & MENA Teams | Knowcap',
    description:
      'Otter.ai transcribes meetings. Knowcap goes further: every decision is confirmed by a named human and timestamped to the source. Built for MENA Odoo teams.',
  },
  'read-ai': {
    competitor: 'Read AI',
    title: 'Read AI Alternative - Verified Meeting Records | Knowcap',
    description:
      'Read AI scores and summarizes meetings. Knowcap turns them into verified records - each decision confirmed by a named human, attributed and timestamped.',
  },
  fireflies: {
    competitor: 'Fireflies.ai',
    title: 'Fireflies Alternative for MENA & Odoo Teams | Knowcap',
    description:
      'Fireflies records and summarizes meetings. Knowcap adds the layer they skip: a named human confirms every decision before it counts. MENA-ready, Odoo-native.',
  },
  fellow: {
    competitor: 'Fellow',
    title: 'Fellow Alternative - Meeting Notes You Can Defend | Knowcap',
    description:
      'Fellow organizes notes and agendas. Knowcap has a named human confirm each decision, so the scope is a record both sides agreed to - not a recollection.',
  },
  granola: {
    competitor: 'Granola',
    title: 'Granola Alternative for MENA & Odoo Teams | Knowcap',
    description:
      'Granola gives you clean AI meeting notes. Knowcap adds human verification - every confirmed decision attributed and timestamped. Arabic-English, MENA-built.',
  },
}

export function compareUrl(slug: CompareSlug): string {
  return `https://knowcap.ai/compare/knowcap-vs-${slug}`
}

export function compareMetadata(slug: CompareSlug): Metadata {
  const seo = COMPARE_SEO[slug]
  const url = compareUrl(slug)
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: url },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url,
      type: 'website',
      images: [{ url: '/og/default.jpg', width: 1376, height: 768, alt: seo.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: ['/og/default.jpg'],
    },
  }
}
