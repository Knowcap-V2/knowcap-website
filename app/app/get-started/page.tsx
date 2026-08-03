import type { Metadata } from 'next'
import Link from 'next/link'
import EditorialShell, { PageHero } from '@/components/editorial/shell'
import { COMPARE_CSS } from '../compare/compare-styles'
import { PRICING_TIERS } from '@/lib/pricing'
import { withCampaignParams } from '@/lib/campaign'

// /get-started — Odoo EPIC 24 (#6071) / [feature] #7670, "Fallback landing page".
//
// Insurance for the 16 Aug paid-ad launch: an outside agency (StratDev) is building
// the real campaign page. If it slips, ads still need somewhere to point. This page
// is deliberately plain — what Knowcap is, who it's for, what it costs, and a
// working signup link that survives the click. It does not replace the agency page;
// both can exist (switching ads later is a destination change, not a delete).
export const metadata: Metadata = {
  title: 'Get Started — Knowcap',
  description:
    'Knowcap turns meetings into confirmed, agent-ready evidence. A named human confirms every claim before any AI agent acts. Free to start.',
  robots: { index: false }, // not an SEO surface — an ad destination, kept out of search results like /beta
  openGraph: {
    title: 'Knowcap — The Trust Layer for AI Agents',
    description: 'Capture meetings and messages, confirm every decision with a human, and let agents act only on what was confirmed. Free to start.',
    url: 'https://knowcap.ai/get-started',
    type: 'website',
    images: [{ url: '/og/default.jpg', width: 1376, height: 768, alt: 'Knowcap — The Trust Layer for AI Agents' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og/default.jpg'],
  },
}

const GS_CSS = `
.gs-body{padding:24px 0 110px}
.gs-section{padding:clamp(36px,5vw,56px) 0}
.gs-section + .gs-section{border-top:1px solid var(--border)}
.gs-h2{font-family:var(--disp);font-size:clamp(1.35rem,2.6vw,1.75rem);font-weight:460;
  letter-spacing:-.02em;font-variation-settings:'SOFT' 55,'WONK' 0;margin-bottom:14px}
.gs-prose{color:var(--sec);font-size:16px;line-height:1.75;max-width:64ch}
.gs-for{list-style:none;margin:14px 0 0;padding:0;display:grid;gap:12px;max-width:64ch}
.gs-for li{display:flex;gap:10px;font-size:15px;line-height:1.55;color:var(--ink-soft)}
.gs-for .gs-dot{flex-shrink:0;color:var(--green);font-weight:700}
.gs-price-strip{display:flex;flex-wrap:wrap;gap:14px;margin-top:8px}
.gs-price-card{flex:1 1 200px;background:var(--white);border:1px solid var(--border);
  border-radius:10px;padding:16px 18px}
.gs-price-name{font-family:var(--disp);font-weight:560;font-size:15px;color:var(--ink)}
.gs-price-amt{font-family:var(--disp);font-weight:500;font-size:1.4rem;color:var(--ink);margin-top:4px}
.gs-price-note{font-size:12px;color:var(--sec)}
.gs-price-link{margin-top:16px;font-size:13.5px}
.gs-price-link a{color:var(--green);text-decoration:underline;text-underline-offset:3px}
.gs-cta-row{margin-top:10px}
`

export default function GetStartedPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const registerUrl = withCampaignParams('https://app.knowcap.ai/register', searchParams, 'get_started_fallback')

  return (
    <EditorialShell registerHref={registerUrl}>
      <style dangerouslySetInnerHTML={{ __html: COMPARE_CSS + GS_CSS }} />
      <PageHero
        kicker="Start here"
        title={<>The trust layer for AI agents — <span style={{ color: 'var(--green)' }}>free to start</span></>}
        sub="Knowcap captures your meetings, voice notes, and messages, turns every decision, task, and risk into a claim card, and waits for a named human to confirm it before any agent acts."
      />
      <div className="gs-body">
        <div className="cl-wrap">
          <div className="cm-cta-row gs-cta-row">
            <a className="cl-btn cl-btn--solid" href={registerUrl}>Start free →</a>
            <Link className="cl-btn cl-btn--ghost" href="/contact-us">Talk to us</Link>
          </div>

          <div className="gs-section">
            <h2 className="gs-h2">What it does</h2>
            <p className="gs-prose">
              Listen → Extract → Confirm → Act. Knowcap joins your meetings or captures a voice note, chat, or
              recording, pulls out every decision, task, and risk as a claim pinned to its exact timestamp and
              speaker quote, has a named human confirm or reject it with one tap, and only then lets AI agents
              act — opening tickets, drafting PRs, sending follow-ups — on what was actually confirmed.
            </p>
          </div>

          <div className="gs-section">
            <h2 className="gs-h2">Who it&rsquo;s for</h2>
            <ul className="gs-for">
              <li><span className="gs-dot" aria-hidden="true">●</span><span>Teams who need a real record of what was decided, not a paraphrased summary.</span></li>
              <li><span className="gs-dot" aria-hidden="true">●</span><span><Link href="/for/odoo-partners">Odoo implementation partners</Link> turning a client call into a ticket before the meeting ends.</span></li>
              <li><span className="gs-dot" aria-hidden="true">●</span><span>Agencies capturing scope and client approvals with receipts.</span></li>
              <li><span className="gs-dot" aria-hidden="true">●</span><span>Anyone who wants AI to help without letting it act on something nobody confirmed.</span></li>
            </ul>
          </div>

          <div className="gs-section">
            <h2 className="gs-h2">What it costs</h2>
            <div className="gs-price-strip">
              {PRICING_TIERS.map((tier) => (
                <div className="gs-price-card" key={tier.slug}>
                  <div className="gs-price-name">{tier.name}</div>
                  <div className="gs-price-amt">{tier.price}</div>
                  <div className="gs-price-note">{tier.priceNote}</div>
                </div>
              ))}
            </div>
            <p className="gs-price-link">
              Full plan details on the <Link href="/pricing">pricing page</Link>.
            </p>
          </div>
        </div>
      </div>

      <div className="cm-close">
        <div className="cl-wrap">
          <h2>Try it on your next meeting.</h2>
          <p>Free to start. Upgrade only when you need more than 5 lifetime meetings.</p>
          <a className="cl-btn cl-btn--solid" href={registerUrl}>Get Started Free →</a>
        </div>
      </div>
    </EditorialShell>
  )
}
