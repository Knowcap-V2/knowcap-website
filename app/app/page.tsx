import HomeCommitment from '@/components/home-commitment'
import { getAllPosts } from '@/lib/blog'

// Homepage — Commitment Ledger edition (full replacement, 2026-06-10).
// The B-vs-D middleware rotation is retired; /a /b /c /d remain reachable
// for reference. Copy: docs/content-pipeline/drafts/homepage-commitment-copy.md
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
  return <HomeCommitment recentPosts={recentPosts} />
}
