import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'
import { BLOG_CSS } from './blog-styles'
import EditorialShell from '@/components/editorial/shell'

export const metadata: Metadata = {
  title: 'Blog — Knowcap',
  description:
    'Verified work intelligence for MENA teams: Odoo partners, agencies, audit firms. Case studies, comparisons, and field notes from the trust layer for AI agents.',
  alternates: { canonical: 'https://knowcap.ai/blog' },
  openGraph: {
    title: 'Knowcap Blog',
    description: 'Case studies, comparisons, and field notes from the trust layer for AI agents.',
    url: 'https://knowcap.ai/blog',
    type: 'website',
  },
}

export default function BlogIndexPage() {
  const posts = getAllPosts()

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Knowcap Blog',
    url: 'https://knowcap.ai/blog',
    description:
      'Case studies, comparisons, and field notes from the trust layer for AI agents.',
    publisher: { '@type': 'Organization', name: 'Knowcap', url: 'https://knowcap.ai' },
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      url: `https://knowcap.ai/blog/${post.slug}`,
    })),
  }

  return (
    <EditorialShell>
      <div className="kb-root">
        <style dangerouslySetInnerHTML={{ __html: BLOG_CSS }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
        />

        <header className="kb-index-head">
          <div className="kb-index-head-inner">
            <div className="kb-eyebrow">Field notes</div>
            <h1 className="kb-h1">The Knowcap Blog</h1>
            <p className="kb-index-sub">
              Verified work intelligence for MENA teams — Odoo partners, agencies, audit firms.
              Real cases, real numbers, no recycled listicles.
            </p>
          </div>
        </header>

        <div className="kb-grid">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="kb-card">
              <span className="kb-card-date">{post.date}</span>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              <div className="kb-card-tags">
                {post.tags.slice(0, 3).map((t) => (
                  <span key={t} className="kb-card-tag">{t}</span>
                ))}
              </div>
              <span className="kb-card-read">{post.readMinutes} min read →</span>
            </Link>
          ))}
        </div>

        <section className="kb-cta">
          <h2>AI that only acts on truth.</h2>
          <p>Capture the work. Confirm the claims. Let agents act on what&rsquo;s verified.</p>
          <a className="kb-btn" href="https://app.knowcap.ai/register?utm_source=blog_index_cta">Start Verifying →</a>
        </section>
      </div>
    </EditorialShell>
  )
}
