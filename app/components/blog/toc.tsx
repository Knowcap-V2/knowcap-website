'use client'

import { useEffect, useState } from 'react'
import type { Heading } from '@/lib/blog'

/**
 * Sticky table of contents for the article page. Highlights the section in view
 * via IntersectionObserver. Renders only when there are ≥3 headings; hidden on
 * mobile via CSS. `dir` keeps it on the correct side for RTL posts.
 */
export default function TableOfContents({
  headings,
  dir = 'ltr',
  label = 'On this page',
}: {
  headings: Heading[]
  dir?: 'ltr' | 'rtl'
  label?: string
}) {
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    if (headings.length === 0) return
    const els = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => !!el)
    if (els.length === 0) return

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [headings])

  if (headings.length < 3) return null

  return (
    <nav className="kb-toc" dir={dir} aria-label={label}>
      <div className="kb-toc-label">{label}</div>
      <ul>
        {headings.map((h) => (
          <li key={h.id} className={`kb-toc-l${h.level}${active === h.id ? ' is-active' : ''}`}>
            <a
              href={`#${h.id}`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                history.replaceState(null, '', `#${h.id}`)
              }}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
