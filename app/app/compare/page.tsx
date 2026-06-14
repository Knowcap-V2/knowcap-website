import type { Metadata } from 'next'
import Link from 'next/link'
import EditorialShell, { PageHero } from '@/components/editorial/shell'

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
  },
}

const COMPARISONS = [
  { slug: 'knowcap-vs-otter', name: 'Otter.ai', blurb: 'Otter transcribes the meeting. Knowcap confirms each claim and lets agents act on it.' },
  { slug: 'knowcap-vs-fireflies', name: 'Fireflies.ai', blurb: 'Fireflies hands you notes. Knowcap turns them into verified actions, with receipts.' },
  { slug: 'knowcap-vs-granola', name: 'Granola', blurb: 'Granola writes the summary. Knowcap ships the work the summary implies.' },
  { slug: 'knowcap-vs-fellow', name: 'Fellow.app', blurb: 'Fellow ends at a tidy meeting page. Knowcap keeps going — into the trust layer.' },
  { slug: 'knowcap-vs-read-ai', name: 'Read.ai', blurb: 'Read.ai analyzes the meeting. Knowcap acts only on what a human said is true.' },
]

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
