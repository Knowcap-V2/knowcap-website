import HomeCommitment from '@/components/home-commitment'
import { getAllPosts } from '@/lib/blog'
import type { Metadata } from 'next'
import SiteJsonLd from '@/components/site/site-json-ld'
import { HOME_FAQ } from '@/lib/site-schema'

// Homepage — Commitment Ledger edition (full replacement, 2026-06-10).
// The B-vs-D middleware rotation is retired; /a /b /c /d remain reachable
// for reference. Copy: docs/content-pipeline/drafts/homepage-commitment-copy.md
export const metadata: Metadata = {
  alternates: { canonical: 'https://knowcap.ai/' },
  openGraph: {
    title: 'Knowcap — The Trust Layer for AI Agents',
    description:
      'Turn human claims into evidence your AI agents can act on. Capture meetings, messages, and recordings — promote the verified parts to evidence agents can use.',
    url: 'https://knowcap.ai',
    type: 'website',
  },
}

export default function Home() {
  const recentPosts = getAllPosts()
    .slice(0, 3)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      date: p.date,
      description: p.description,
      readMinutes: p.readMinutes,
    }))
  return (
    <>
      {/* Organization + WebSite + SoftwareApplication + FAQ + Speakable —
          the entity, product facts, and citable Q&A that AI search lifts. */}
      <SiteJsonLd faqs={HOME_FAQ} speakable />
      <HomeCommitment recentPosts={recentPosts} />
    </>
  )
}
