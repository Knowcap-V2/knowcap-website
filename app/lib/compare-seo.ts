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
    title: 'Knowcap vs Otter.ai — AI Meeting Notes That Take Action',
    description:
      'Otter.ai transcribes meetings. Knowcap captures them, verifies every decision with a human, then triggers agents that open Odoo tickets and GitHub PRs.',
  },
  'read-ai': {
    competitor: 'Read AI',
    title: 'Knowcap vs Read AI — Verified Meeting Intelligence',
    description:
      'Read AI scores meetings. Knowcap turns them into verified evidence your AI agents can act on — built for MENA Odoo partners, agencies, and audit firms.',
  },
  fireflies: {
    competitor: 'Fireflies.ai',
    title: 'Knowcap vs Fireflies — Meeting AI That Acts on Decisions',
    description:
      'Fireflies records and summarizes meetings. Knowcap adds a human trust layer plus agents that open tickets, draft PRs, and message clients on verified facts.',
  },
  fellow: {
    competitor: 'Fellow',
    title: 'Knowcap vs Fellow — From Meeting Notes to Agent Actions',
    description:
      'Fellow organizes meeting notes and agendas. Knowcap captures the meeting, verifies each claim, and lets agents execute the follow-ups automatically.',
  },
  granola: {
    competitor: 'Granola',
    title: 'Knowcap vs Granola — AI Notes With a Human Trust Layer',
    description:
      'Granola gives you AI meeting notes. Knowcap adds human verification and agents that act on confirmed decisions — multilingual, MENA-ready, Odoo-native.',
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
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
    },
  }
}
