#!/usr/bin/env node
/**
 * seo-pull.mjs — daily SEO opportunity pull for the Knowcap blogger routine.
 *
 * Replaces the static keyword-opportunities.md + the dead Google Trends step.
 * Pulls LIVE MENA keyword demand from DataForSEO (Google Ads keywords_for_keywords:
 * expands persona seed terms into related keywords with real search volume +
 * competition), EN + AR across KSA / Egypt / UAE, filters to Knowcap's ICP intent,
 * ranks, dedups against already-shipped posts, and writes a ranked opportunity queue
 * + a human digest.
 *
 * NO browser. Auth = HTTP Basic from ~/.claude/secrets/blogger.md.
 *
 * Usage:
 *   node seo-pull.mjs                         # all personas, all geos, EN+AR
 *   node seo-pull.mjs --persona odoo-partners # one persona
 *   node seo-pull.mjs --locations "Saudi Arabia" --langs en   # scope to conserve balance
 *   node seo-pull.mjs --max 25                # cap queue size per persona
 *
 * Outputs (gitignored — runtime state):
 *   routines/blogger/opportunity-queue.json
 *   routines/blogger/runs/<stamp>/seo-digest.md   (caller passes --stamp; else prints)
 */

import fs from 'fs'
import path from 'path'
import os from 'os'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const BLOGGER_DIR = path.resolve(__dirname, '..')            // routines/blogger
const REPO_ROOT = path.resolve(BLOGGER_DIR, '..', '..')      // knowcap-website
const BLOG_DIR = path.join(REPO_ROOT, 'app', 'content', 'blog')
const SECRETS = path.join(os.homedir(), '.claude', 'secrets', 'blogger.md')

// ---- args ----
const argv = process.argv.slice(2)
const getArg = (name, def) => {
  const i = argv.indexOf('--' + name)
  return i >= 0 && argv[i + 1] ? argv[i + 1] : def
}
const ONLY_PERSONA = getArg('persona', null)
const LOCATIONS = getArg('locations', 'Saudi Arabia,Egypt,United Arab Emirates').split(',').map(s => s.trim())
const LANGS = getArg('langs', 'en,ar').split(',').map(s => s.trim())
const MAX = parseInt(getArg('max', '25'), 10)
const STAMP = getArg('stamp', null)

// ---- creds ----
function readCreds() {
  const txt = fs.readFileSync(SECRETS, 'utf8')
  const login = (txt.match(/^DATAFORSEO_LOGIN=(.+)$/m) || [])[1]?.trim()
  const pass = (txt.match(/^DATAFORSEO_PASSWORD=(.+)$/m) || [])[1]?.trim()
  if (!login || !pass || login.startsWith('<')) {
    console.error('FATAL: DataForSEO creds missing in ' + SECRETS)
    process.exit(2)
  }
  return 'Basic ' + Buffer.from(`${login}:${pass}`).toString('base64')
}
const AUTH = readCreds()

// ---- personas: seed terms + ICP intent filter ----
// Seeds are deliberately broad so keywords_for_keywords discovers the real demand.
const PERSONAS = {
  'odoo-partners': {
    seeds_en: ['odoo implementation', 'odoo partner', 'erp implementation', 'odoo project'],
    seeds_ar: ['تطبيق اودو', 'اودو'],
  },
  'mena-audit-firms': {
    seeds_en: ['audit documentation', 'audit firm software', 'pdpl compliance', 'engagement letter'],
    seeds_ar: ['تدقيق', 'محضر اجتماع'],
  },
  'mena-agencies': {
    seeds_en: ['meeting notes software', 'client meeting notes', 'ai meeting notes'],
    seeds_ar: ['محضر اجتماع', 'تفريغ اجتماع'],
  },
  'regulated-verticals': {
    seeds_en: ['compliance meeting records', 'ai governance', 'audit trail software'],
    seeds_ar: ['حوكمة الذكاء الاصطناعي', 'الامتثال'],
  },
}
// Keep only keywords whose intent Knowcap can credibly own.
const ICP_INTENT = /(meeting|minute|note|transcri|record|audit|complian|pdpl|govern|odoo|erp|scope|verif|attest|sign[- ]?off|محضر|اجتماع|تدقيق|اودو|امتثال|حوكمة|توثيق)/i
const COMP_WEIGHT = { LOW: 1.0, MEDIUM: 0.6, HIGH: 0.35 }

// ---- shipped-slug dedup ----
function shippedSlugs() {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md')).map(f => f.replace(/\.md$/, ''))
}
const slugify = s => String(s).toLowerCase().replace(/[^a-z0-9؀-ۿ]+/g, '-').replace(/^-|-$/g, '')
function isCovered(keyword, slugs) {
  const ks = new Set(slugify(keyword).split('-').filter(w => w.length > 3))
  if (!ks.size) return false
  for (const slug of slugs) {
    const ss = new Set(slug.split('-'))
    let hit = 0
    for (const w of ks) if (ss.has(w)) hit++
    if (hit / ks.size >= 0.6) return true
  }
  return false
}

// ---- DataForSEO call ----
async function keywordsForKeywords(seeds, locationName, languageCode) {
  const body = [{ keywords: seeds, location_name: locationName, language_code: languageCode }]
  const res = await fetch('https://api.dataforseo.com/v3/keywords_data/google_ads/keywords_for_keywords/live', {
    method: 'POST',
    headers: { Authorization: AUTH, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const json = await res.json()
  if (json.status_code !== 20000) throw new Error(`API ${json.status_code}: ${json.status_message}`)
  const task = (json.tasks || [])[0] || {}
  if (task.status_code !== 20000) throw new Error(`task ${task.status_code}: ${task.status_message}`)
  return { items: task.result || [], cost: json.cost || 0 }
}

// ---- main ----
const personas = ONLY_PERSONA ? [ONLY_PERSONA] : Object.keys(PERSONAS)
const slugs = shippedSlugs()
const out = { generated_at: new Date().toISOString(), source: 'dataforseo:google_ads/keywords_for_keywords', locations: LOCATIONS, langs: LANGS, cost: 0, personas: {}, top: [] }
const seen = new Set()

for (const persona of personas) {
  const cfg = PERSONAS[persona]
  if (!cfg) { console.error('unknown persona: ' + persona); continue }
  const bucket = []
  for (const loc of LOCATIONS) {
    for (const lang of LANGS) {
      const seeds = lang === 'ar' ? cfg.seeds_ar : cfg.seeds_en
      if (!seeds?.length) continue
      try {
        const { items, cost } = await keywordsForKeywords(seeds, loc, lang)
        out.cost += cost
        for (const it of items) {
          const kw = it.keyword
          const vol = it.search_volume || 0
          if (!kw || vol <= 0) continue
          if (!ICP_INTENT.test(kw)) continue
          const comp = (it.competition || '').toUpperCase()
          const score = Math.round(vol * (COMP_WEIGHT[comp] ?? 0.5))
          bucket.push({ keyword: kw, search_volume: vol, competition: comp || null, cpc: it.cpc ?? null, score, location: loc, lang, covered: isCovered(kw, slugs) })
        }
        console.error(`  ${persona} | ${loc} | ${lang}: +${items.length} (cost $${cost})`)
      } catch (e) {
        console.error(`  ERROR ${persona} | ${loc} | ${lang}: ${e.message}`)
      }
    }
  }
  // dedupe by keyword (keep highest score), sort, cap
  const byKw = new Map()
  for (const r of bucket) {
    const k = r.keyword.toLowerCase()
    if (!byKw.has(k) || byKw.get(k).score < r.score) byKw.set(k, r)
  }
  const ranked = [...byKw.values()].sort((a, b) => b.score - a.score).slice(0, MAX)
  out.personas[persona] = ranked
  for (const r of ranked) {
    if (r.covered) continue
    const key = r.keyword.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    out.top.push({ ...r, persona })
  }
}
out.top.sort((a, b) => b.score - a.score)
out.top = out.top.slice(0, 20)

// ---- write queue ----
const QUEUE = path.join(BLOGGER_DIR, 'opportunity-queue.json')
fs.writeFileSync(QUEUE, JSON.stringify(out, null, 2))

// ---- digest ----
const lines = []
lines.push(`# SEO opportunity digest — ${out.generated_at.slice(0, 10)}`)
lines.push('')
lines.push(`Source: DataForSEO (MENA ${LOCATIONS.join(', ')} · ${LANGS.join('/')}) · API cost this run: $${out.cost.toFixed(3)}`)
lines.push(`Fresh opportunities (not yet covered by a shipped post): **${out.top.length}**`)
lines.push('')
lines.push('## Top picks (write next)')
lines.push('')
lines.push('| # | keyword | persona | vol | comp | score |')
lines.push('|---|---|---|---|---|---|')
out.top.slice(0, 10).forEach((r, i) => lines.push(`| ${i + 1} | ${r.keyword} | ${r.persona} | ${r.search_volume} | ${r.competition || '-'} | ${r.score} |`))
const digest = lines.join('\n')

if (STAMP) {
  const runDir = path.join(BLOGGER_DIR, 'runs', STAMP)
  fs.mkdirSync(runDir, { recursive: true })
  fs.writeFileSync(path.join(runDir, 'seo-digest.md'), digest)
}
console.log(digest)
console.error(`\nwrote ${QUEUE} — ${out.top.length} fresh opportunities, total API cost $${out.cost.toFixed(3)}`)
