import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllPosts, getPost } from '@/lib/blog'
import { BLOG_CSS } from '../blog-styles'

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug)
  if (!post) return {}
  const url = `https://knowcap.ai/blog/${post.slug}`
  return {
    title: `${post.title} — Knowcap Blog`,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  }
}

const RELATED_LABELS: Record<string, string> = {
  '/for/odoo-partners': 'For Odoo Partners',
  '/compare/knowcap-vs-otter': 'Knowcap vs Otter',
  '/compare/knowcap-vs-read-ai': 'Knowcap vs Read AI',
  '/compare/knowcap-vs-fireflies': 'Knowcap vs Fireflies',
  '/compare/knowcap-vs-fellow': 'Knowcap vs Fellow',
  '/compare/knowcap-vs-granola': 'Knowcap vs Granola',
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)
  if (!post) notFound()

  const jsonLd: Record<string, any>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      author: { '@type': 'Person', name: post.author },
      publisher: { '@type': 'Organization', name: 'Knowcap', url: 'https://knowcap.ai' },
      mainEntityOfPage: `https://knowcap.ai/blog/${post.slug}`,
      keywords: post.tags.join(', '),
    },
  ]
  if (post.faqs.length > 0) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: post.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    })
  }

  return (
    <div className="kb-root">
      <style dangerouslySetInnerHTML={{ __html: BLOG_CSS }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="kb-nav">
        <div className="kb-nav-inner">
          <Link className="kb-logo" href="/">knowcap<span>.</span></Link>
          <div className="kb-nav-links">
            <Link href="/for/odoo-partners">For Odoo Partners</Link>
            <Link href="/compare/knowcap-vs-otter">Compare</Link>
            <Link href="/blog">Blog</Link>
            <a className="kb-nav-cta" href={`https://app.knowcap.ai/register?utm_source=blog_${post.slug.slice(0, 40)}`}>Start Verifying →</a>
          </div>
        </div>
      </nav>

      <header className="kb-hero">
        <div className="kb-hero-inner">
          <div className="kb-crumbs">
            <Link href="/">knowcap.ai</Link> / <Link href="/blog">blog</Link> / {post.slug}
          </div>
          {(post.targetPersona || post.tags.length > 0) && (
            <div className="kb-pills">
              {post.targetPersona && (
                <span className="kb-pill"><span className="kb-dot" />{post.targetPersona}</span>
              )}
              {post.tags.slice(0, 3).map((t) => (
                <span key={t} className="kb-pill">{t}</span>
              ))}
            </div>
          )}
          <h1 className="kb-h1">{post.title}</h1>
          <div className="kb-meta">
            <span><b>{post.date}</b></span>
            <span><b>{post.author}</b></span>
            <span><b>{post.readMinutes} min</b> read</span>
          </div>
        </div>
      </header>

      {post.sourceKnowcapIds.length > 0 && (
        <div className="kb-provenance">
          <div className="kb-provenance-inner">
            <span className="kb-dot" />
            <span>Anchored on a real recorded meeting — verified-source workflow, not a stock anecdote.</span>
          </div>
        </div>
      )}

      <article className="kb-article" dangerouslySetInnerHTML={{ __html: post.html }} />

      {post.relatedPages.length > 0 && (
        <div className="kb-related">
          <div className="kb-eyebrow">Related</div>
          <div className="kb-related-row">
            {post.relatedPages.map((p) => (
              <Link key={p} href={p}>{RELATED_LABELS[p] ?? p}</Link>
            ))}
            <Link href="/blog">All posts</Link>
          </div>
        </div>
      )}

      <section className="kb-cta">
        <h2>AI that only acts on truth.</h2>
        <p>Record the meeting. Confirm the claims. Let agents do the work.</p>
        <a className="kb-btn" href={`https://app.knowcap.ai/register?utm_source=blog_${post.slug.slice(0, 40)}_cta`}>Start Verifying →</a>
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
