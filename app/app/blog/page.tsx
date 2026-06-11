import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'
import { BLOG_CSS } from './blog-styles'

export const metadata: Metadata = {
  title: 'Blog — Knowcap',
  description:
    'Verified-meeting intelligence for MENA teams: Odoo partners, agencies, audit firms. Case studies, comparisons, and field notes from the trust layer for AI agents.',
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

  return (
    <div className="kb-root">
      <style dangerouslySetInnerHTML={{ __html: BLOG_CSS }} />

      <nav className="kb-nav">
        <div className="kb-nav-inner">
          <Link className="kb-logo" href="/">knowcap<span>.</span></Link>
          <div className="kb-nav-links">
            <Link href="/for/odoo-partners">For Odoo Partners</Link>
            <Link href="/compare/knowcap-vs-otter">Compare</Link>
            <Link href="/blog">Blog</Link>
            <a className="kb-nav-cta" href="https://app.knowcap.ai/register?utm_source=blog_index">Start Verifying →</a>
          </div>
        </div>
      </nav>

      <header className="kb-index-head">
        <div className="kb-index-head-inner">
          <div className="kb-eyebrow">Field notes</div>
          <h1 className="kb-h1">The Knowcap Blog</h1>
          <p className="kb-index-sub">
            Verified-meeting intelligence for MENA teams — Odoo partners, agencies, audit firms.
            Real cases, real numbers, no recycled listicles.
          </p>
        </div>
      </header>

      <main className="kb-grid">
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
      </main>

      <section className="kb-cta">
        <h2>AI that only acts on truth.</h2>
        <p>Record the meeting. Confirm the claims. Let agents do the work.</p>
        <a className="kb-btn" href="https://app.knowcap.ai/register?utm_source=blog_index_cta">Start Verifying →</a>
      </section>

      <footer className="kb-foot">
        <div className="kb-foot-inner">
          <span>© 2026 Knowcap</span>
          <span>
            <Link href="/policy">Privacy</Link> · <Link href="/terms">Terms</Link> · <Link href="/contact-us">Contact</Link>
          </span>
        </div>
      </footer>
    </div>
  )
}
