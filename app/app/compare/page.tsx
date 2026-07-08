import type { Metadata } from 'next'
import Link from 'next/link'
import EditorialShell, { PageHero } from '@/components/editorial/shell'
import { faqJsonLd } from '@/lib/site-schema'

const COMPARE_FAQ = [
  {
    q: 'How does Knowcap compare to Otter, Fireflies, Read AI, Fellow, and Granola?',
    a: 'Tools like Otter.ai, Fireflies.ai, Read AI, Fellow, and Granola transcribe meetings and write AI summaries, and several auto-push action items into your stack with no human gate. Knowcap is the layer after the transcript: it extracts every decision, task, and risk as a claim card pinned to the exact timestamp and speaker quote, a named human confirms or rejects each one with a single tap, and only then do AI agents act — opening Odoo SH tickets, drafting GitHub PRs, and sending follow-ups — with a full audit trail back to who confirmed what and when. It also detects language per utterance, so a meeting that switches between Arabic and English mid-sentence is captured intact, where single-language-per-recording tools drop lines. The practical difference: the other tools hand you notes to trust; Knowcap hands your agents facts a human already verified, which is what makes it safe to automate real actions.',
  },
  {
    q: 'Which AI meeting tool is best for MENA teams and Odoo partners?',
    a: 'For MENA SMEs, Odoo implementation partners, agencies, and audit firms, Knowcap is purpose-built rather than retrofitted. It detects language per utterance, so Arabic/English code-switching meetings — the everyday reality of Gulf and Egyptian teams — are captured intact instead of forced into one language per recording. It can run in EU/MENA regions for data residency. And it goes past notes: a confirmed client call can open an Odoo SH ticket and draft a GitHub PR before the meeting ends, with every action traced to a human-confirmed claim. Otter, Fireflies, Read AI, Fellow, and Granola are strong general meeting-notes tools, but they force a single language per recording, have no human verification gate, and stop at the summary. If your work is bilingual, Odoo-shaped, or audited, that gap is the whole decision.',
  },
  {
    q: 'Do these meeting tools verify what was said before acting on it?',
    a: 'Mostly they do not. Otter, Fireflies, Read AI, Fellow, and Granola generate an AI summary and, in several cases, push action items straight into your CRM, Jira, or task board the moment the AI hears them — with no human in the loop. If the AI mishears a number, a name, or a scope decision, the wrong task lands in your stack and nobody notices until it breaks. Knowcap requires a one-tap human confirmation on each extracted claim before any agent acts, so a misheard line never becomes a wrong ticket or a wrong PR. The confirmation, the exact timestamp, and the speaker quote are kept as the permanent record. That human verification step is the trust layer — it is what lets you safely automate Odoo tickets, GitHub PRs, and client follow-ups instead of just reading a summary and hoping the AI got it right.',
  },
]

export const metadata: Metadata = {
  title: 'Compare Knowcap — vs Otter, Fireflies, Granola, Fellow & Read.ai',
  description:
    'How Knowcap compares to the meeting-AI tools. They stop at a transcript or summary; Knowcap is verified work intelligence — every claim confirmed by a named human, then agents act.',
  alternates: { canonical: 'https://knowcap.ai/compare' },
  openGraph: {
    title: 'Compare Knowcap to the meeting-AI tools',
    description: 'Verified work intelligence with agents that act under human-confirmed control — not just transcripts.',
    url: 'https://knowcap.ai/compare',
    type: 'website',
    images: [{ url: '/og/default.jpg', width: 1376, height: 768, alt: 'Compare Knowcap to the meeting-AI tools' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og/default.jpg'],
  },
}

const COMPARISONS = [
  { slug: 'knowcap-vs-otter', name: 'Otter.ai', blurb: 'Otter transcribes the meeting. Knowcap confirms each claim and lets agents act on it.' },
  { slug: 'knowcap-vs-fireflies', name: 'Fireflies.ai', blurb: 'Fireflies hands you notes. Knowcap turns them into verified actions, with receipts.' },
  { slug: 'knowcap-vs-granola', name: 'Granola', blurb: 'Granola writes the summary. Knowcap ships the work the summary implies.' },
  { slug: 'knowcap-vs-fellow', name: 'Fellow.app', blurb: 'Fellow ends at a tidy meeting page. Knowcap keeps going — into the trust layer.' },
  { slug: 'knowcap-vs-read-ai', name: 'Read.ai', blurb: 'Read.ai analyzes the meeting. Knowcap acts only on what a human said is true.' },
]

const COMPARE_ITEMLIST = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Knowcap comparisons',
  itemListElement: COMPARISONS.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: `Knowcap vs ${c.name}`,
    url: `https://knowcap.ai/compare/${c.slug}`,
  })),
}

const REGISTER_URL = 'https://app.knowcap.ai/register?utm_source=compare_hub'

const CSS = `
.ch-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px;max-width:880px;margin:0 auto}
@media(max-width:720px){.ch-grid{grid-template-columns:1fr}}
.ch-card{display:block;background:var(--white);border:1px solid var(--border);border-radius:12px;
  padding:24px 26px;text-decoration:none;transition:border-color .15s,box-shadow .15s,transform .15s}
.ch-card:hover{border-color:var(--border-2);box-shadow:0 2px 14px rgba(24,24,27,.07);transform:translateY(-2px)}
.ch-vs{font-family:var(--mono);font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--green)}
.ch-name{font-family:var(--disp);font-weight:520;font-size:1.35rem;letter-spacing:-.01em;color:var(--ink);margin:8px 0 8px}
.ch-blurb{font-size:14px;line-height:1.6;color:var(--sec)}
.ch-arrow{margin-top:14px;font-family:var(--mono);font-size:12px;color:var(--green)}
.ch-cta{text-align:center;margin-top:48px}
`

export default function CompareHubPage() {
  return (
    <EditorialShell>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([faqJsonLd(COMPARE_FAQ), COMPARE_ITEMLIST]) }} />
      <PageHero
        kicker="Compare"
        title={<>Knowcap vs the meeting-AI tools</>}
        sub="They stop at a transcript or a summary. Knowcap is the layer after — every claim confirmed by a named human, then agents act on it. Pick a comparison."
      />
      <div className="cl-page-body">
        <div className="cl-wrap">
          <div className="ch-grid">
            {COMPARISONS.map((c) => (
              <Link key={c.slug} href={`/compare/${c.slug}`} className="ch-card">
                <div className="ch-vs">Knowcap vs</div>
                <div className="ch-name">{c.name}</div>
                <div className="ch-blurb">{c.blurb}</div>
                <div className="ch-arrow">See the comparison →</div>
              </Link>
            ))}
          </div>
          <div className="ch-cta">
            <a className="cl-btn cl-btn--solid" href={REGISTER_URL}>Get Started Free →</a>
          </div>
        </div>
      </div>
    </EditorialShell>
  )
}
