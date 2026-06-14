import HomeCommitment from '@/components/home-commitment'
import { getAllPosts } from '@/lib/blog'
import type { Metadata } from 'next'

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

// Organization + WebSite + SoftwareApplication schema for the homepage —
// gives crawlers and AI search the brand entity, site identity, and product
// facts that were missing before the 2026-06-14 SEO audit.
const HOME_JSON_LD = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Knowcap',
    url: 'https://knowcap.ai',
    logo: 'https://knowcap.ai/knowcap-logo.png',
    description: 'The trust layer for AI agents — human-verified meeting and message intelligence.',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Knowcap',
    url: 'https://knowcap.ai',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Knowcap',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: 'https://knowcap.ai',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  },
]

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HOME_JSON_LD) }}
      />
      <HomeCommitment recentPosts={recentPosts} />
    </>
  )
}
