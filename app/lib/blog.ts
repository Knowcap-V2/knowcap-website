import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

/**
 * Blog content lib — reads markdown posts from content/blog/ at build time.
 * Posts are produced by the blogger routine (routines/blogger/) and validated
 * by its gates before landing here, so the markdown surface is deliberately
 * small: headings, paragraphs, links, inline code, bold/italic, GFM tables,
 * fenced code blocks. No external markdown dependency — the renderer below
 * covers exactly that surface.
 */

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')
const PUBLIC_DIR = path.join(process.cwd(), 'public')

export interface BlogPostMeta {
  slug: string
  title: string
  date: string
  author: string
  description: string
  tags: string[]
  targetPersona: string | null
  relatedPages: string[]
  sourceKnowcapIds: string[]
  readMinutes: number
  lang: string
  dir: 'ltr' | 'rtl'
  /** Absolute-from-root path to the post's social/OG image, or null. */
  ogImage: string | null
  /** Free downloadable asset (e.g. a copy-paste template as .docx), or null. */
  templateDownload: { href: string; label: string } | null
}

/**
 * Resolve a post's OG image. Explicit frontmatter (`og_image`/`ogImage`) wins;
 * otherwise look for the per-post asset convention `public/blog/<slug>/og.{webp,png}`.
 * Returns a root-relative path (e.g. `/blog/<slug>/og.webp`) or null when none exists.
 */
function resolveOgImage(slug: string, data: Record<string, any>): string | null {
  const explicit = data.og_image ?? data.ogImage
  if (explicit) return String(explicit)
  for (const ext of ['webp', 'png']) {
    if (fs.existsSync(path.join(PUBLIC_DIR, 'blog', slug, `og.${ext}`))) {
      return `/blog/${slug}/og.${ext}`
    }
  }
  return null
}

export interface Heading {
  id: string
  text: string
  level: 2 | 3
}

export interface BlogPost extends BlogPostMeta {
  html: string
  faqs: { q: string; a: string }[]
  headings: Heading[]
}

/** Slug for heading ids — preserves Arabic so RTL anchor links + the TOC work. */
function slugifyHeading(s: string): string {
  return s
    .toLowerCase()
    .replace(/[*_`]/g, '')
    .replace(/[^a-z0-9؀-ۿ\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

/** Pull h2/h3 headings (excluding the FAQ block) for the table of contents. */
function extractHeadings(md: string): Heading[] {
  const out: Heading[] = []
  for (const raw of md.split(/\r?\n/)) {
    const m = raw.trim().match(/^(#{2,3})\s+(.*)$/)
    if (!m) continue
    const text = m[2].replace(/[*_`]/g, '').trim()
    out.push({ id: slugifyHeading(m[2]), text, level: m[1].length as 2 | 3 })
  }
  return out
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

/** Inline markdown: code spans, bold, italic, links. Input must already be HTML-escaped. */
function renderInline(s: string): string {
  return s
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[\s(])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>')
    .replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (_m, alt, src) => `<img src="${src}" alt="${alt}" loading="lazy" />`)
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, text, href) => {
      const external = /^https?:\/\//.test(href) && !href.startsWith('https://knowcap.ai')
      const rel = external ? ' target="_blank" rel="noopener noreferrer"' : ''
      return `<a href="${href}"${rel}>${text}</a>`
    })
}

/** True if `line` is a GFM table separator row, e.g. `|---|:--:|---|` or `---|---`. */
function isTableSeparator(line: string): boolean {
  const cells = line.trim().replace(/^\||\|$/g, '').split('|')
  return cells.length > 0 && cells.every((c) => /^\s*:?-{3,}:?\s*$/.test(c))
}

function splitTableRow(line: string): string[] {
  return line.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim())
}

/**
 * Block-level markdown → HTML. Covers the post pipeline's surface:
 * h1–h4 (leading h1 dropped — the page renders the frontmatter title),
 * paragraphs, unordered/ordered lists, blockquotes, hr, GFM tables,
 * fenced code blocks, `:::key/note/warn` callouts.
 */
export function renderMarkdown(md: string): string {
  const lines = md.split(/\r?\n/)
  const out: string[] = []
  let para: string[] = []
  let list: { tag: 'ul' | 'ol'; items: string[] } | null = null
  let callout: { kind: string; lines: string[] } | null = null
  let codeFence: string[] | null = null
  let firstH1Dropped = false

  const flushPara = () => {
    if (para.length) {
      out.push(`<p>${renderInline(escapeHtml(para.join(' ')))}</p>`)
      para = []
    }
  }
  const flushList = () => {
    if (list) {
      out.push(`<${list.tag}>${list.items.map((i) => `<li>${i}</li>`).join('')}</${list.tag}>`)
      list = null
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i]
    const line = raw.trimEnd()

    // Fenced code blocks: ```[lang]  ...  ```  →  <pre><code>, content preserved verbatim (not reflowed).
    if (codeFence) {
      if (/^```\s*$/.test(line)) {
        out.push(`<pre><code>${escapeHtml(codeFence.join('\n'))}</code></pre>`)
        codeFence = null
      } else {
        codeFence.push(raw)
      }
      continue
    }
    if (/^```/.test(line)) {
      flushPara(); flushList()
      codeFence = []
      continue
    }

    // Callout fences:  :::key  ...  :::   →  styled <aside>. `kind` ∈ key|note|warn (default note).
    const fenceOpen = line.match(/^:::\s*(\w+)?\s*$/)
    if (callout) {
      if (/^:::\s*$/.test(line)) {
        flushPara(); flushList()
        const inner = renderMarkdown(callout.lines.join('\n'))
        out.push(`<aside class="kb-callout kb-callout-${callout.kind}">${inner}</aside>`)
        callout = null
      } else {
        callout.lines.push(raw)
      }
      continue
    }
    if (fenceOpen) {
      flushPara(); flushList()
      const kind = (fenceOpen[1] ?? 'note').toLowerCase()
      callout = { kind: ['key', 'note', 'warn'].includes(kind) ? kind : 'note', lines: [] }
      continue
    }

    // GFM table: a `| a | b |` header row immediately followed by a `|---|---|` separator row.
    if (line.trim().startsWith('|') && lines[i + 1] && isTableSeparator(lines[i + 1])) {
      flushPara(); flushList()
      const headerCells = splitTableRow(line)
      const bodyRows: string[][] = []
      let j = i + 2
      while (j < lines.length && lines[j].trim().startsWith('|')) {
        bodyRows.push(splitTableRow(lines[j]))
        j++
      }
      const th = headerCells.map((c) => `<th>${renderInline(escapeHtml(c))}</th>`).join('')
      const rows = bodyRows
        .map((r) => `<tr>${r.map((c) => `<td>${renderInline(escapeHtml(c))}</td>`).join('')}</tr>`)
        .join('')
      out.push(`<table><thead><tr>${th}</tr></thead><tbody>${rows}</tbody></table>`)
      i = j - 1
      continue
    }

    const heading = line.match(/^(#{1,4})\s+(.*)$/)
    const ulItem = line.match(/^\s*[-*]\s+(.*)$/)
    const olItem = line.match(/^\s*\d+\.\s+(.*)$/)

    if (heading) {
      flushPara(); flushList()
      const level = heading[1].length
      if (level === 1 && !firstH1Dropped) { firstH1Dropped = true; continue }
      const text = renderInline(escapeHtml(heading[2]))
      out.push(`<h${level} id="${slugifyHeading(heading[2])}">${text}</h${level}>`)
    } else if (ulItem || olItem) {
      flushPara()
      const tag = ulItem ? 'ul' : 'ol'
      const item = renderInline(escapeHtml((ulItem ?? olItem)![1]))
      if (!list || list.tag !== tag) { flushList(); list = { tag, items: [] } }
      list.items.push(item)
    } else if (line.startsWith('>')) {
      flushPara(); flushList()
      out.push(`<blockquote><p>${renderInline(escapeHtml(line.replace(/^>\s?/, '')))}</p></blockquote>`)
    } else if (/^(---|\*\*\*)\s*$/.test(line)) {
      flushPara(); flushList()
      out.push('<hr/>')
    } else if (line.trim() === '') {
      flushPara(); flushList()
    } else {
      para.push(line.trim())
    }
  }
  flushPara(); flushList()
  return out.join('\n')
}

/** Extract FAQ q/a pairs (### headings under a "## FAQ" / Arabic section) for FAQPage JSON-LD. */
function extractFaqs(md: string): { q: string; a: string }[] {
  const faqMatch = md.match(/^##\s+(?:FAQ|الأسئلة الشائعة)\s*$/m)
  if (!faqMatch || faqMatch.index === undefined) return []
  const after = md.slice(faqMatch.index)
  const section = after.split(/\r?\n##\s+(?!#)/)[0]
  const faqs: { q: string; a: string }[] = []
  const parts = section.split(/^###\s+/m).slice(1)
  for (const part of parts) {
    const [qLine, ...rest] = part.split(/\r?\n/)
    const a = rest.join(' ').replace(/\s+/g, ' ').trim()
    if (qLine && a) faqs.push({ q: qLine.trim(), a })
  }
  return faqs
}

function toMeta(slug: string, data: Record<string, any>, body: string): BlogPostMeta {
  const words = body.split(/\s+/).length
  const lang = String(data.lang ?? 'en')
  const dir: 'ltr' | 'rtl' = data.dir === 'rtl' || data.dir === 'ltr' ? data.dir : lang === 'ar' ? 'rtl' : 'ltr'
  return {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? data.draft_date ?? ''),
    author: String(data.author ?? 'Knowcap'),
    description: String(data.description ?? body.replace(/^#.*$/m, '').trim().split(/\r?\n/).find(Boolean) ?? '').slice(0, 300),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    targetPersona: data.target_persona ? String(data.target_persona) : data.persona ? String(data.persona) : null,
    relatedPages: Array.isArray(data.related_pages) ? data.related_pages.map(String) : [],
    sourceKnowcapIds: Array.isArray(data.source_knowcap_ids) ? data.source_knowcap_ids.map(String) : [],
    readMinutes: Math.max(1, Math.round(words / 220)),
    lang,
    dir,
    ogImage: resolveOgImage(slug, data),
    templateDownload:
      data.template_download_href
        ? { href: String(data.template_download_href), label: String(data.template_download_label ?? 'Download the template') }
        : null,
  }
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const { data, content } = matter(fs.readFileSync(path.join(BLOG_DIR, f), 'utf8'))
      const slug = String(data.slug ?? f.replace(/\.md$/, ''))
      return toMeta(slug, data, content)
    })
    .filter((p) => p.title && p.date)
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function getPost(slug: string): BlogPost | null {
  if (!fs.existsSync(BLOG_DIR)) return null
  for (const f of fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'))) {
    const { data, content } = matter(fs.readFileSync(path.join(BLOG_DIR, f), 'utf8'))
    const fileSlug = String(data.slug ?? f.replace(/\.md$/, ''))
    if (fileSlug === slug) {
      return {
        ...toMeta(fileSlug, data, content),
        html: renderMarkdown(content),
        faqs: extractFaqs(content),
        headings: extractHeadings(content),
      }
    }
  }
  return null
}
