import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllPosts, getPost } from '@/lib/blog'
import { BLOG_CSS } from '../blog-styles'
import EditorialShell from '@/components/editorial/shell'
import ReadingProgress from '@/components/blog/reading-progress'
import TableOfContents from '@/components/blog/toc'
import TemplateDownload from '@/components/blog/template-download'

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug)
  if (!post) return {}
  const url = `https://knowcap.ai/blog/${post.slug}`
  // Next does not deep-merge openGraph.images from the root layout when a
  // page defines its own openGraph object - fall back to the site default
  // explicitly rather than relying on inheritance (confirmed via build: a
  // page-level openGraph without `images` renders with none at all).
  const ogImageUrl = post.ogImage
    ? post.ogImage.startsWith('http')
      ? post.ogImage
      : `https://knowcap.ai${post.ogImage}`
    : 'https://knowcap.ai/og/default.jpg'
  const ogImages = [{ url: ogImageUrl, width: post.ogImage ? 1200 : 1376, height: post.ogImage ? 675 : 768, alt: post.title }]
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
      locale: post.dir === 'rtl' ? 'ar_AR' : 'en_US',
      images: ogImages,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [ogImageUrl],
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

function getAuthorInitials(author: string) {
  if (author === 'Hassan Arslan') return 'HA'
  return author.trim().charAt(0).toUpperCase()
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)
  if (!post) notFound()
  const authorInitials = getAuthorInitials(post.author)

  const jsonLd: Record<string, any>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.date,
      author: {
        '@type': 'Person',
        name: post.author,
        ...(post.author === 'Hassan Arslan'
          ? {
              url: 'https://www.linkedin.com/in/hassan-arslan-66a023142/',
              jobTitle: 'Founder, Knowcap',
            }
          : {}),
      },
      publisher: { '@type': 'Organization', name: 'Knowcap', url: 'https://knowcap.ai' },
      mainEntityOfPage: `https://knowcap.ai/blog/${post.slug}`,
      keywords: post.tags.join(', '),
      inLanguage: post.lang,
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
    <EditorialShell>
      <div className="kb-root">
        <style dangerouslySetInnerHTML={{ __html: BLOG_CSS }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <ReadingProgress />

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
            <h1 className="kb-h1" dir="auto">{post.title}</h1>
            <div className="kb-meta">
              <span><b>{post.date}</b></span>
              <span className="kb-byline"><span className="kb-avatar">{authorInitials}</span><b>{post.author}</b></span>
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

        <div className="kb-article-wrap">
          <TableOfContents
            headings={post.headings}
            dir={post.dir}
            label={post.dir === 'rtl' ? 'في هذه الصفحة' : 'On this page'}
          />
          <article className="kb-article" dir={post.dir} lang={post.lang} dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>

        {post.templateDownload && (
          <TemplateDownload
            href={post.templateDownload.href}
            label={post.templateDownload.label}
            slug={post.slug}
          />
        )}

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
          <p>Capture the work. Confirm the claims. Let agents act on what&rsquo;s verified.</p>
          <a className="kb-btn" href={`https://app.knowcap.ai/register?utm_source=blog_${post.slug.slice(0, 40)}_cta`}>Start Verifying →</a>
        </section>
      </div>
    </EditorialShell>
  )
}
