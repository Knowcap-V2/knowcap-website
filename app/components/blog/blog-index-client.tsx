'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { BlogPostMeta } from '@/lib/blog'

const PERSONA_LABELS: Record<string, string> = {
  'odoo-partners': 'Odoo Partners',
  'mena-audit-firms': 'Audit Firms',
  'mena-agencies': 'Agencies',
  'regulated-verticals': 'Regulated',
}

function Card({ post, featured = false }: { post: BlogPostMeta; featured?: boolean }) {
  return (
    <Link href={`/blog/${post.slug}`} className={featured ? 'kb-card kb-card-featured' : 'kb-card'}>
      <span className="kb-card-date">{post.date}</span>
      <h2 dir="auto">{post.title}</h2>
      <p dir="auto">{post.description}</p>
      <div className="kb-card-tags">
        {post.targetPersona && PERSONA_LABELS[post.targetPersona] && (
          <span className="kb-card-tag kb-card-tag-persona">{PERSONA_LABELS[post.targetPersona]}</span>
        )}
        {post.tags.slice(0, featured ? 4 : 3).map((t) => (
          <span key={t} className="kb-card-tag">{t}</span>
        ))}
      </div>
      <span className="kb-card-read">{post.readMinutes} min read →</span>
    </Link>
  )
}

export default function BlogIndexClient({ posts }: { posts: BlogPostMeta[] }) {
  const [cat, setCat] = useState<string>('all')

  const categories = useMemo(() => {
    const present = new Set(posts.map((p) => p.targetPersona).filter(Boolean) as string[])
    return ['all', ...Object.keys(PERSONA_LABELS).filter((k) => present.has(k))]
  }, [posts])

  const filtered = useMemo(
    () => (cat === 'all' ? posts : posts.filter((p) => p.targetPersona === cat)),
    [posts, cat]
  )

  const [featured, ...rest] = filtered

  return (
    <>
      {categories.length > 1 && (
        <div className="kb-filter">
          {categories.map((c) => (
            <button
              key={c}
              className={`kb-filter-pill${cat === c ? ' is-active' : ''}`}
              onClick={() => setCat(c)}
            >
              {c === 'all' ? 'All' : PERSONA_LABELS[c]}
            </button>
          ))}
        </div>
      )}

      {featured && (
        <div className="kb-featured-wrap">
          <Card post={featured} featured />
        </div>
      )}

      <div className="kb-grid">
        {rest.map((post) => (
          <Card key={post.slug} post={post} />
        ))}
      </div>

      {filtered.length === 0 && <p className="kb-empty">No posts in this category yet.</p>}
    </>
  )
}
