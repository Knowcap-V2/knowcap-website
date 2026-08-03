import type { Metadata } from 'next'
import Link from 'next/link'
import EditorialShell, { PageHero } from '@/components/editorial/shell'
import { PRICING_TIERS } from '@/lib/pricing'
import { withCampaignParams, withCampaignParamsRelative } from '@/lib/campaign'

// /pricing — Odoo EPIC 24 (#6071) / [feature] #5824.
// The marketing site had no pricing surface at all; this is the first one.
export const metadata: Metadata = {
  title: 'Pricing — Knowcap',
  description:
    'Knowcap pricing: Free for 5 lifetime meetings, Pro at $20/seat, Business at $40/seat with confirmation governance, and Enterprise on a custom plan.',
  alternates: { canonical: 'https://knowcap.ai/pricing' },
  openGraph: {
    title: 'Knowcap Pricing',
    description: 'Free to try, $20/seat for individuals, $40/seat for teams that need governance, or a custom Enterprise plan.',
    url: 'https://knowcap.ai/pricing',
    type: 'website',
    images: [{ url: '/og/default.jpg', width: 1376, height: 768, alt: 'Knowcap — The Trust Layer for AI Agents' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og/default.jpg'],
  },
}

const PRICING_CSS = `
.pr-body{padding:24px 0 110px}
.pr-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px;margin-top:8px;align-items:stretch}
@media(max-width:980px){.pr-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:560px){.pr-grid{grid-template-columns:1fr}}
.pr-card{display:flex;flex-direction:column;background:var(--white);border:1px solid var(--border);
  border-radius:12px;padding:26px 22px;position:relative}
.pr-card--hl{border-color:var(--green);box-shadow:0 10px 30px rgba(31,107,58,.12)}
.pr-badge{position:absolute;top:-11px;left:22px;background:var(--green);color:#fff;
  font-family:var(--mono);font-size:10.5px;font-weight:600;letter-spacing:.08em;
  text-transform:uppercase;padding:4px 10px;border-radius:100px}
.pr-name{font-family:var(--disp);font-weight:560;font-size:19px;color:var(--ink)}
.pr-audience{font-size:12.5px;color:var(--sec);margin-top:2px;min-height:32px}
.pr-price-row{display:flex;align-items:baseline;flex-wrap:wrap;gap:6px;margin:18px 0 2px}
.pr-price{font-family:var(--disp);font-weight:500;font-size:clamp(1.7rem,3vw,2.1rem);color:var(--ink);letter-spacing:-.02em}
.pr-price-note{flex-basis:100%;font-size:12.5px;color:var(--sec)}
.pr-features{list-style:none;margin:20px 0 22px;padding:0;display:flex;flex-direction:column;gap:10px;flex:1}
.pr-features li{display:flex;gap:9px;font-size:13.5px;line-height:1.5;color:var(--ink-soft)}
.pr-check{flex-shrink:0;color:var(--green);font-weight:700;margin-top:1px}
.pr-note{margin-top:36px;text-align:center;font-size:13.5px;color:var(--sec)}
.pr-note a{color:var(--green);text-decoration:underline;text-underline-offset:3px}
`

export default function PricingPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const registerUrl = withCampaignParams('https://app.knowcap.ai/register', searchParams, 'pricing_page')
  return (
    <EditorialShell registerHref={registerUrl}>
      <style dangerouslySetInnerHTML={{ __html: PRICING_CSS }} />
      <PageHero
        kicker="Pricing"
        title="Simple pricing that grows with your team"
        sub="Start free. Upgrade when a lifetime of 5 meetings isn’t enough, or when your team needs confirmation governance. No annual lock-in offer today — pay monthly, cancel anytime."
      />
      <div className="pr-body">
        <div className="cl-wrap">
          <div className="pr-grid">
            {PRICING_TIERS.map((tier) => {
              const href = tier.cta === 'book' ? withCampaignParamsRelative('/book', searchParams, 'pricing_page') : registerUrl
              const isExternal = tier.cta === 'register'
              return (
                <div key={tier.slug} className={`pr-card${tier.highlight ? ' pr-card--hl' : ''}`}>
                  {tier.highlight && <span className="pr-badge">Most popular</span>}
                  <div className="pr-name">{tier.name}</div>
                  <div className="pr-audience">{tier.audience}</div>
                  <div className="pr-price-row">
                    <span className="pr-price">{tier.price}</span>
                    <span className="pr-price-note">{tier.priceNote}</span>
                  </div>
                  <ul className="pr-features">
                    {tier.features.map((f) => (
                      <li key={f}>
                        <span className="pr-check" aria-hidden="true">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  {isExternal ? (
                    <a className={`cl-btn ${tier.highlight ? 'cl-btn--solid' : 'cl-btn--ghost'}`} href={href} style={{ textAlign: 'center' }}>
                      {tier.ctaLabel}
                    </a>
                  ) : (
                    <Link className="cl-btn cl-btn--ghost" href={href} style={{ textAlign: 'center' }}>
                      {tier.ctaLabel}
                    </Link>
                  )}
                </div>
              )
            })}
          </div>
          <p className="pr-note">
            Every tier includes a named human confirming each claim before any agent acts. Have questions about which plan fits?{' '}
            <Link href="/contact-us">Talk to us</Link>.
          </p>
        </div>
      </div>
    </EditorialShell>
  )
}
