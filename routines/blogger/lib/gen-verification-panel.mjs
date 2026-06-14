#!/usr/bin/env node
// gen-verification-panel.mjs — generate a Knowcap "verification inbox" SVG panel
// from a post's HUMAN-CONFIRMED claims. No browser, no deps, deterministic.
//
// This is the cheap, repeatable alternative to screenshotting the live app:
// the verification UI is deterministic, and the blogger routine already has the
// real confirmed claims (Knowcap MCP). So we render them to SVG from data +
// the DESIGN.md tokens instead of capturing pixels through a browser.
//
// Usage:
//   node gen-verification-panel.mjs <claims.json> <out.svg>
//
// Input JSON shape:
//   {
//     "project": "Odoo Partners",
//     "source": "Outbound Inventory Audit & Reconciliation",
//     "totalConfirmed": 9,
//     "claims": [
//       { "category": "decision|task|risk|fact|note",
//         "summary": "...", "detail": "...",
//         "confirmer": "Hassan Arslan", "timestamp": "34:13" }
//     ]
//   }
// Renders up to 6 claims. Output is a self-contained SVG (served as a normal <img>).

import fs from 'fs'

const [, , inPath, outPath] = process.argv
if (!inPath || !outPath) {
  console.error('usage: gen-verification-panel.mjs <claims.json> <out.svg>')
  process.exit(1)
}
const data = JSON.parse(fs.readFileSync(inPath, 'utf8'))

const esc = (s) =>
  String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const clip = (s, n) => {
  s = String(s ?? '')
  return s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s
}

const CAT = {
  decision: { label: 'DECISION', bar: '#4C8DF6', pill: '#EAF1FE', text: '#2C5FB0' },
  task: { label: 'TASK', bar: '#1F6B3A', pill: '#EAF3EC', text: '#1F6B3A' },
  risk: { label: 'RISK', bar: '#E0A33A', pill: '#FBF1DC', text: '#A9781E' },
  fact: { label: 'FACT', bar: '#8A8A8A', pill: '#EFEDE9', text: '#5A5A5A' },
  note: { label: 'NOTE', bar: '#8A8A8A', pill: '#EFEDE9', text: '#5A5A5A' },
}

const W = 1160, PAD = 40, CARD_W = 1080, CARD_H = 116, GAP = 12, HEAD = 124, FOOT = 52
const claims = (data.claims || []).slice(0, 6)
const H = HEAD + claims.length * (CARD_H + GAP) - GAP + FOOT

const badge = (confirmer, ts) => `
    <g transform="translate(24,80)">
      <circle cx="8" cy="8" r="8" fill="#1F6B3A"/>
      <path d="M4.5 8 L7 10.5 L11.5 5.5" stroke="#fff" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="24" y="12" class="mono" font-size="12" fill="#1F6B3A" font-weight="700">Confirmed</text>
      <text x="104" y="12" class="mono faint" font-size="12">${esc(confirmer)}${ts ? ' · ' + esc(ts) : ''}</text>
    </g>`

const card = (c, i) => {
  const cat = CAT[c.category] || CAT.note
  const y = HEAD + i * (CARD_H + GAP)
  const pillW = 30 + cat.label.length * 8
  return `
  <g transform="translate(${PAD},${y})" filter="url(#sh)">
    <rect width="${CARD_W}" height="${CARD_H}" rx="12" fill="#FFFFFF" stroke="#E7E3DC"/>
    <rect x="0" y="0" width="4" height="${CARD_H}" rx="2" fill="${cat.bar}"/>
    <rect x="24" y="22" width="${pillW}" height="22" rx="11" fill="${cat.pill}"/>
    <text x="${24 + pillW / 2}" y="37" text-anchor="middle" class="mono" font-size="11" fill="${cat.text}" font-weight="700">${cat.label}</text>
    <text x="${24 + pillW + 16}" y="39" class="ink" font-size="16" font-weight="600">${esc(clip(c.summary, 86))}</text>
    ${c.detail ? `<text x="${24 + pillW + 16}" y="64" class="mut" font-size="13">${esc(clip(c.detail, 104))}</text>` : ''}
    ${badge(c.confirmer || 'a named human', c.timestamp)}
  </g>`
}

const badgeLabel = `${data.totalConfirmed ?? claims.length} claims · all human-confirmed`
const bw = Math.round(36 + badgeLabel.length * 7.2)

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="'Space Grotesk', system-ui, -apple-system, sans-serif">
  <defs>
    <style>
      .mono{font-family:'JetBrains Mono',ui-monospace,Menlo,Consolas,monospace}
      .ink{fill:#18181B}.mut{fill:#6B6B6B}.faint{fill:#9A958C}
    </style>
    <filter id="sh" x="-4%" y="-4%" width="108%" height="116%">
      <feDropShadow dx="0" dy="2" stdDeviation="6" flood-color="#18181B" flood-opacity="0.06"/>
    </filter>
  </defs>
  <rect width="${W}" height="${H}" fill="#FBFAF8"/>
  <rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="16" fill="none" stroke="#ECE8E1"/>
  <text x="${PAD}" y="58" class="ink" font-size="26" font-weight="700">Verification Inbox</text>
  <text x="${PAD}" y="86" class="mono mut" font-size="13">${esc(clip([data.project, data.source].filter(Boolean).join(' · '), 92))}</text>
  <g transform="translate(${W - PAD - bw},40)">
    <rect width="${bw}" height="34" rx="17" fill="#EAF3EC" stroke="#CDE5D4"/>
    <circle cx="20" cy="17" r="4" fill="#1F6B3A"/>
    <text x="34" y="22" class="mono" font-size="12" fill="#1F6B3A" font-weight="700">${esc(badgeLabel)}</text>
  </g>
  <line x1="${PAD}" y1="106" x2="${W - PAD}" y2="106" stroke="#ECE8E1"/>
${claims.map(card).join('\n')}
  <text x="${PAD}" y="${H - 24}" class="mono faint" font-size="12">Agents read only these — search_memories(verification_strictness: "human_only"). No "Confirm All" button exists.</text>
</svg>
`

fs.writeFileSync(outPath, svg)
console.log(`wrote ${outPath} (${claims.length} claims, ${W}x${H})`)
