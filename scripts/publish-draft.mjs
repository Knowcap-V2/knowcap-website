#!/usr/bin/env node
/**
 * publish-draft.mjs
 * Transforms a blogger-routine draft into a shippable blog post.
 *
 * Usage: node publish-draft.mjs <draft-path>
 *   e.g. node scripts/publish-draft.mjs docs/content-pipeline/drafts/my-post.md
 *
 * Reads the draft, transforms frontmatter, writes to app/content/blog/<slug>.md,
 * then deletes the draft file.
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = path.resolve(__dirname, '..')
const BLOG_DIR = path.join(REPO_ROOT, 'app', 'content', 'blog')

// Persona → geo audiences mapping
const PERSONA_GEO = {
  'odoo-partners':       ['UAE', 'KSA', 'Egypt'],
  'mena-audit-firms':    ['UAE', 'KSA', 'Egypt'],
  'mena-agencies':       ['UAE', 'KSA', 'Egypt'],
  'regulated-verticals': ['UAE', 'KSA', 'Egypt'],
}

// Internal-only frontmatter keys — drop before publishing
const DROP_KEYS = [
  'mode', 'target_keyword', 'target_keyword_5y_mena_interest',
  'geo_score', 'est_word_count', 'embedded_screenshots', 'status',
]

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/m)
  if (!match) throw new Error('No frontmatter found')
  const yamlBlock = match[1]
  const body = match[2]

  // Minimal YAML parser for the shape we produce (no nested objects)
  const meta = {}
  for (const line of yamlBlock.split('\n')) {
    const m = line.match(/^(\w[\w_-]*):\s*(.*)$/)
    if (!m) continue
    const [, k, v] = m
    if (v.startsWith('[') && v.endsWith(']')) {
      // inline array
      const items = v.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean)
      meta[k] = items
    } else if (v.startsWith('"') || v.startsWith("'")) {
      meta[k] = v.replace(/^["']|["']$/g, '')
    } else if (v === 'null' || v === '') {
      meta[k] = null
    } else if (!isNaN(Number(v))) {
      meta[k] = Number(v)
    } else {
      meta[k] = v
    }
  }
  return { meta, body }
}

function extractDescription(body) {
  // First non-heading, non-empty paragraph (after stripping H2 headings)
  const lines = body.split('\n')
  let paragraph = ''
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    paragraph = trimmed
    break
  }
  // Truncate to ~160 chars for meta description
  if (paragraph.length > 165) {
    const cut = paragraph.lastIndexOf(' ', 160)
    return paragraph.slice(0, cut > 80 ? cut : 160) + '…'
  }
  return paragraph
}

function slugToTags(slug, persona, keyword) {
  const STOP = new Set(['the','and','for','with','how','are','from','your','that','this','our','their','about','into','when','what','does'])
  const words = [...new Set([
    ...slug.split('-'),
    ...(keyword || '').split(' '),
    persona || '',
  ])].filter(w => w.length > 3 && !STOP.has(w.toLowerCase()))
  return [...new Set(words.map(w => w.toLowerCase()))].slice(0, 8)
}

function readMinutes(wordCount) {
  return Math.max(1, Math.ceil((wordCount || 1500) / 200))
}

function buildPublishedFrontmatter(meta, body) {
  const pub = {}

  // Required fields
  pub.title  = meta.title  || 'Untitled'
  pub.slug   = meta.slug
  pub.date   = meta.draft_date || new Date().toISOString().slice(0, 10)
  pub.author = meta.author || 'Hassan Arslan'

  // Description — use meta.description if set, else auto-extract
  pub.description = meta.description || extractDescription(body)

  // Tags
  pub.tags = meta.tags?.length
    ? meta.tags
    : slugToTags(meta.slug || '', meta.persona, meta.target_keyword)

  // Geo + persona
  pub.geo_audiences   = PERSONA_GEO[meta.persona] || ['UAE', 'KSA', 'Egypt']
  pub.target_persona  = meta.persona || null

  // Derived
  pub.related_pages      = meta.related_pages || []
  pub.source_knowcap_ids = meta.source_knowcap_ids || []
  pub.read_minutes       = readMinutes(meta.est_word_count)
  pub.lang               = meta.lang || 'en'
  pub.dir                = meta.dir  || 'ltr'

  return pub
}

function serializeFrontmatter(obj) {
  const lines = ['---']
  for (const [k, v] of Object.entries(obj)) {
    if (v === null || v === undefined) continue
    if (Array.isArray(v)) {
      if (v.length === 0) {
        lines.push(`${k}: []`)
      } else {
        lines.push(`${k}:`)
        for (const item of v) lines.push(`  - "${item}"`)
      }
    } else if (typeof v === 'string' && (v.includes(':') || v.includes('"') || v.includes("'"))) {
      lines.push(`${k}: "${v.replace(/"/g, '\\"')}"`)
    } else {
      lines.push(`${k}: ${v}`)
    }
  }
  lines.push('---')
  return lines.join('\n')
}

// ── Main ──────────────────────────────────────────────────────────────────────

const draftPath = process.argv[2]
if (!draftPath) {
  console.error('Usage: node scripts/publish-draft.mjs <draft-path>')
  process.exit(1)
}

const absPath = path.isAbsolute(draftPath) ? draftPath : path.join(REPO_ROOT, draftPath)
if (!fs.existsSync(absPath)) {
  console.error(`Draft not found: ${absPath}`)
  process.exit(1)
}

const raw = fs.readFileSync(absPath, 'utf8')
const { meta, body } = parseFrontmatter(raw)

if (!meta.slug) {
  console.error('Draft missing slug in frontmatter')
  process.exit(1)
}

const pubMeta = buildPublishedFrontmatter(meta, body)
const published = serializeFrontmatter(pubMeta) + '\n' + body

const outPath = path.join(BLOG_DIR, `${meta.slug}.md`)
if (fs.existsSync(outPath)) {
  console.error(`Blog post already exists: ${outPath}`)
  process.exit(1)
}

fs.writeFileSync(outPath, published, 'utf8')
fs.unlinkSync(absPath)

console.log(`Published: ${outPath}`)
console.log(`Deleted draft: ${absPath}`)
