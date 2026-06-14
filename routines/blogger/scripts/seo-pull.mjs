#!/usr/bin/env node
/**
 * seo-pull.mjs — daily SEO opportunity pull for the Knowcap blogger routine.
 *
 * Replaces the static keyword-opportunities.md + the dead Google Trends step.
 * Pulls LIVE MENA keyword demand from DataForSEO Labs (keyword_ideas: expands persona
 * seed terms into related keywords with search volume, ad-competition, AND — the reason
 * we use Labs over the Google Ads endpoint — organic keyword_difficulty + search_intent
 * + a 12-month trend). EN + AR across KSA / Egypt / UAE, filtered to Knowcap's ICP intent.
 * Ranks by organic winnability (volume × ease-to-rank × intent-fit), NOT ad-auction
 * competition. Dedups against already-shipped/drafted posts; writes a ranked queue + digest.
 *
 * Why Labs keyword_ideas, not google_ads/keywords_for_keywords:
 *   - $0.01 + $0.0001/result (≈$0.03-0.04/call capped) vs flat $0.075 — cheaper at our size.
 *   - Adds keyword_difficulty (can a NEW site rank?) + search_intent — the data you cannot
 *     get free. Ad "competition" alone is the wrong signal for an organic blog.
 *
 * NO browser. Auth = HTTP Basic from ~/.claude/secrets/blogger.md.
 *
 * Usage:
 *   node seo-pull.mjs                         # all personas, all geos, EN+AR
 *   node seo-pull.mjs --persona odoo-partners # one persona
 *   node seo-pull.mjs --locations "Saudi Arabia" --langs en   # scope to conserve balance
 *   node seo-pull.mjs --max 25                # cap queue size per persona
 *   node seo-pull.mjs --limit 250             # keyword_ideas results per call (cost lever)
 *   node seo-pull.mjs --force                 # ignore the fresh-queue cache, re-pull now
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
const LIMIT = parseInt(getArg('limit', '250'), 10) // keyword_ideas results per call — caps cost ($0.01 + $0.0001/result)
const STAMP = getArg('stamp', null)
// Reuse guard: skip the paid pull while the cached queue is still fresh + deep enough.
const MAX_AGE_DAYS = parseInt(getArg('max-age-days', '7'), 10) // re-pull at least weekly so volumes stay current
const MIN_FRESH = parseInt(getArg('min-fresh', '4'), 10)        // re-pull early if the backlog runs thin
const FORCE = argv.includes('--force')                          // ignore the cache, always re-pull

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

// ---- organic-winnability scoring (replaces ad-competition weighting) ----
// A blog ranks ORGANICALLY, so reward volume, penalize ranking difficulty, and favour
// blog-suitable intent. Ad "competition" is kept for display only — it is NOT the ranker.
const INTENT_WEIGHT = { informational: 1.0, commercial: 0.95, transactional: 0.6, navigational: 0.3 }
const diffWeight = kd => (kd == null ? 0.6 : Math.max(0.05, (100 - kd) / 100)) // low difficulty → ~1, high → ~0
const intentWeight = intent => INTENT_WEIGHT[intent] ?? 0.7
const scoreOf = (vol, kd, intent) => Math.round(vol * diffWeight(kd) * intentWeight(intent))
// Derive a LOW/MEDIUM/HIGH band from the 0-1 ad-competition float when no level string is returned.
const compLevel = (lvl, f) => (lvl ? String(lvl).toUpperCase() : f == null ? null : f >= 0.66 ? 'HIGH' : f >= 0.33 ? 'MEDIUM' : 'LOW')
// 12-month direction from monthly_searches (order-agnostic: sort by date, compare first 3 vs last 3).
function trendOf(monthly) {
  if (!Array.isArray(monthly) || monthly.length < 6) return null
  const v = [...monthly].sort((a, b) => (a.year * 12 + a.month) - (b.year * 12 + b.month)).map(m => m.search_volume || 0)
  const older = (v[0] + v[1] + v[2]) / 3, recent = (v[v.length - 1] + v[v.length - 2] + v[v.length - 3]) / 3
  if (!older) return null
  const ratio = recent / older
  return ratio >= 1.15 ? 'rising' : ratio <= 0.85 ? 'falling' : 'flat'
}

// ---- shipped/drafted-slug dedup ----
// Scan BOTH shipped posts and pending drafts so a keyword already turned into a
// draft is not re-picked on a later run that reuses the cached queue.
const DRAFTS_DIR = path.join(REPO_ROOT, 'docs', 'content-pipeline', 'drafts')
function shippedSlugs() {
  const out = []
  for (const d of [BLOG_DIR, DRAFTS_DIR]) {
    if (!fs.existsSync(d)) continue
    for (const f of fs.readdirSync(d)) if (f.endsWith('.md')) out.push(f.replace(/\.md$/, ''))
  }
  return out
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

// ---- DataForSEO Labs call ----
// Labs keyword_ideas takes language_NAME ("English"/"Arabic"), NOT language_code, and only
// accepts location+language pairs in its database (e.g. Saudi Arabia = Arabic only — English
// there returns 40501). Unsupported pairs throw and are skipped by the caller's try/catch.
const LANG_NAME = { en: 'English', ar: 'Arabic' }
async function keywordIdeas(seeds, locationName, lang) {
  const body = [{
    keywords: seeds,
    location_name: locationName,
    language_name: LANG_NAME[lang] || lang,
    limit: LIMIT,
    order_by: ['keyword_info.search_volume,desc'],
    filters: [['keyword_info.search_volume', '>', 0]],
    include_serp_info: false,
  }]
  const res = await fetch('https://api.dataforseo.com/v3/dataforseo_labs/google/keyword_ideas/live', {
    method: 'POST',
    headers: { Authorization: AUTH, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const json = await res.json()
  if (json.status_code !== 20000) throw new Error(`API ${json.status_code}: ${json.status_message}`)
  const task = (json.tasks || [])[0] || {}
  if (task.status_code !== 20000) throw new Error(`task ${task.status_code}: ${task.status_message}`)
  return { items: task.result?.[0]?.items || [], cost: json.cost || 0 }
}

const QUEUE = path.join(BLOGGER_DIR, 'opportunity-queue.json')
const slugs = shippedSlugs()
const freshen = top => (top || []).filter(r => !isCovered(r.keyword, slugs)).slice(0, 20)

// ---- digest + write (shared by the reuse and pull paths) ----
function buildDigest(o) {
  const lines = []
  lines.push(`# SEO opportunity digest — ${o.generated_at.slice(0, 10)}`)
  lines.push('')
  lines.push(o.reused
    ? `Source: cached opportunity-queue — no API call (reused ${o.last_reused_at.slice(0, 10)}, pulled ${o.generated_at.slice(0, 10)}) · API cost this run: $0.000`
    : `Source: DataForSEO (MENA ${o.locations.join(', ')} · ${o.langs.join('/')}) · API cost this run: $${o.cost.toFixed(3)}`)
  lines.push(`Fresh opportunities (not yet covered by a shipped or drafted post): **${o.top.length}**`)
  lines.push('')
  lines.push('Ranked by organic winnability (volume × ease-to-rank × intent-fit), not ad competition.')
  lines.push('')
  lines.push('## Top picks (write next)')
  lines.push('')
  lines.push('| # | keyword | persona | vol | difficulty | intent | trend | score |')
  lines.push('|---|---|---|---|---|---|---|---|')
  o.top.slice(0, 10).forEach((r, i) => lines.push(`| ${i + 1} | ${r.keyword} | ${r.persona} | ${r.search_volume} | ${r.keyword_difficulty ?? '-'} | ${r.search_intent || '-'} | ${r.trend || '-'} | ${r.score} |`))
  return lines.join('\n')
}
function writeOutputs(o) {
  fs.writeFileSync(QUEUE, JSON.stringify(o, null, 2))
  const digest = buildDigest(o)
  if (STAMP) {
    const runDir = path.join(BLOGGER_DIR, 'runs', STAMP)
    fs.mkdirSync(runDir, { recursive: true })
    fs.writeFileSync(path.join(runDir, 'seo-digest.md'), digest)
  }
  console.log(digest)
}

// ---- reuse guard: skip the paid pull while the cached queue is fresh + deep enough ----
if (!FORCE && !ONLY_PERSONA && fs.existsSync(QUEUE)) {
  try {
    const cached = JSON.parse(fs.readFileSync(QUEUE, 'utf8'))
    const ageDays = (Date.now() - new Date(cached.generated_at).getTime()) / 86400000
    const fresh = freshen(cached.top)
    if (ageDays <= MAX_AGE_DAYS && fresh.length >= MIN_FRESH) {
      // generated_at stays the real pull date so age keeps climbing → forces a re-pull by MAX_AGE_DAYS
      writeOutputs({ ...cached, reused: true, last_reused_at: new Date().toISOString(), cost: 0, top: fresh })
      console.error(`\nREUSED ${QUEUE} — ${fresh.length} fresh opportunities, age ${ageDays.toFixed(1)}d, API cost $0.000 (use --force to re-pull)`)
      process.exit(0)
    }
    console.error(`queue stale/thin (age ${ageDays.toFixed(1)}d, fresh ${fresh.length}/${MIN_FRESH}) → pulling fresh`)
  } catch (e) {
    console.error('could not reuse cached queue (' + e.message + ') → pulling fresh')
  }
}

// ---- main (paid pull) ----
const personas = ONLY_PERSONA ? [ONLY_PERSONA] : Object.keys(PERSONAS)
const out = { generated_at: new Date().toISOString(), source: 'dataforseo:labs/keyword_ideas', locations: LOCATIONS, langs: LANGS, cost: 0, personas: {}, top: [] }
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
        const { items, cost } = await keywordIdeas(seeds, loc, lang)
        out.cost += cost
        for (const it of items) {
          const kw = it.keyword
          const ki = it.keyword_info || {}
          const vol = ki.search_volume || 0
          if (!kw || vol <= 0) continue
          if (!ICP_INTENT.test(kw)) continue
          const kd = it.keyword_properties?.keyword_difficulty ?? null
          const intent = it.search_intent_info?.main_intent ?? null
          const comp = compLevel(ki.competition_level, ki.competition)
          const score = scoreOf(vol, kd, intent)
          bucket.push({
            keyword: kw, search_volume: vol, keyword_difficulty: kd, search_intent: intent,
            competition: comp, competition_value: ki.competition ?? null, cpc: ki.cpc ?? null,
            trend: trendOf(ki.monthly_searches), score, location: loc, lang, covered: isCovered(kw, slugs),
          })
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

writeOutputs(out)
console.error(`\nwrote ${QUEUE} — ${out.top.length} fresh opportunities, total API cost $${out.cost.toFixed(3)}`)
