'use client'

/**
 * /offer — Knowcap Odoo Partner Edition pilot offer.
 *
 * Re-skinned onto the V6b "Editorial Light" system (EditorialShell + cl-* tokens).
 * Positioning: Knowcap is verified work intelligence — the trust layer for AI
 * agents. The artifacts a partner cares about (step-by-step SOPs, change-order
 * evidence, the searchable record of every decision) are OUTPUTS of that loop,
 * not the product itself. Meetings are one input among several.
 *
 * Preserved exactly: the cost-of-inaction math, the value stack, the pilot
 * pricing, the buy.stripe.com checkout CTA, and the 30-day guarantee.
 */

import { useEffect } from 'react'
import Link from 'next/link'
import EditorialShell, { PageHero } from '@/components/editorial/shell'

const APP_URL = 'https://app.knowcap.ai'
const STRIPE_CHECKOUT = 'https://buy.stripe.com/5kQ14n4Tm9STca94bH0co05'

const CSS = `
/* ---- value stack ---------------------------------------------------- */
.of-section{padding:clamp(56px,6vw,88px) 0}
.of-section--tint{background:var(--white);border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
.of-head{max-width:760px;margin:0 auto;text-align:center}
.of-h2{font-family:var(--disp);font-size:clamp(1.6rem,3vw,2.3rem);font-weight:460;
  letter-spacing:-.02em;font-variation-settings:'SOFT' 55,'WONK' 0;line-height:1.14}
.of-h2 em{font-style:italic;font-weight:540;font-variation-settings:'SOFT' 70,'WONK' 1;color:var(--green)}
.of-lead{margin:18px auto 0;max-width:60ch;font-size:16px;line-height:1.7;color:var(--sec)}

/* mono register label, centered */
.of-reg{display:inline-flex;align-items:center;gap:8px;font-family:var(--mono);font-size:11px;
  font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:var(--sec);margin-bottom:16px}
.of-reg .of-reg-n{color:var(--green)}

/* cost-of-inaction — dark ink panel */
.of-cost{margin:36px auto 0;max-width:720px;background:var(--ink);color:rgba(251,250,248,.78);
  border-radius:12px;padding:clamp(28px,4vw,44px);text-align:left}
.of-cost h3{font-family:var(--disp);font-size:clamp(1.2rem,2.2vw,1.6rem);font-weight:460;
  font-variation-settings:'SOFT' 55,'WONK' 0;color:var(--cream);margin-bottom:16px;letter-spacing:-.01em}
.of-cost p{font-size:16px;line-height:1.7;margin:0}
.of-cost strong{color:var(--cream);font-weight:600}
.of-cost .of-burn{display:block;margin-top:14px;font-family:var(--mono);font-size:12.5px;
  letter-spacing:.02em;color:var(--green-dark)}

/* card grid */
.of-grid{display:grid;grid-template-columns:1fr;gap:20px;margin-top:48px}
@media(min-width:760px){.of-grid{grid-template-columns:1fr 1fr}}
.of-card{background:var(--white);border:1px solid var(--border);border-radius:12px;
  padding:28px;display:flex;flex-direction:column;transition:transform .18s ease,box-shadow .18s ease}
.of-card:hover{transform:translateY(-2px);box-shadow:0 10px 28px rgba(24,24,27,.07)}
.of-card--service{border-color:var(--border-2);background:color-mix(in srgb,var(--green) 3%,var(--white))}
.of-card-title{font-family:var(--disp);font-size:1.3rem;font-weight:500;letter-spacing:-.01em;
  font-variation-settings:'SOFT' 55,'WONK' 0;color:var(--ink);margin:14px 0 4px}
.of-card-sub{font-size:13.5px;font-weight:600;color:var(--green-deep);margin-bottom:16px;
  letter-spacing:.01em}
.of-card-sub--service{color:var(--amber)}
.of-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:11px}
.of-list li{display:flex;gap:10px;align-items:flex-start;font-size:14.5px;line-height:1.6;color:var(--sec)}
.of-list li strong{color:var(--ink);font-weight:600}
.of-list svg{flex:none;margin-top:4px}
.of-card-text{font-size:14.5px;line-height:1.7;color:var(--sec);margin:0}
.of-card-text strong{color:var(--ink);font-weight:600}
.of-card-foot{margin-top:auto;padding-top:18px}
.of-card-val{margin-top:18px;padding-top:16px;border-top:1px solid var(--border);
  font-family:var(--mono);font-size:11.5px;letter-spacing:.03em;color:var(--sec)}
.of-card-val strong{color:var(--ink);font-weight:600}

/* status tags */
.of-tag{display:inline-block;align-self:flex-start;font-family:var(--mono);font-size:9.5px;
  font-weight:500;letter-spacing:.12em;text-transform:uppercase;padding:3px 9px;border-radius:3px}
.of-tag--live{background:var(--green-tint);color:var(--green-deep)}
.of-tag--future{background:color-mix(in srgb,var(--amber) 14%,var(--cream));color:var(--amber)}
.of-tag--service{background:transparent;color:var(--sec);border:1px solid var(--border-2)}

/* pricing panel — dark ink */
.of-price{margin:0 auto;max-width:680px;background:var(--ink);color:rgba(251,250,248,.78);
  border-radius:16px;padding:clamp(32px,5vw,52px);text-align:center}
.of-price .of-reg{color:rgba(251,250,248,.6);margin-bottom:18px}
.of-price .of-reg-n{color:var(--green-dark)}
.of-price-h{font-family:var(--disp);font-size:clamp(1.5rem,3vw,2.1rem);font-weight:460;
  font-variation-settings:'SOFT' 55,'WONK' 0;color:var(--cream);letter-spacing:-.02em;margin-bottom:10px}
.of-spots{display:inline-block;font-family:var(--mono);font-size:12px;font-weight:500;
  letter-spacing:.08em;text-transform:uppercase;color:var(--green-dark);
  border:1px solid rgba(126,211,155,.4);border-radius:100px;padding:6px 16px;margin-bottom:30px}
.of-price-row{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;
  gap:0 36px;margin-bottom:26px}
.of-price-was,.of-price-now{display:flex;flex-direction:column;align-items:center;gap:6px;padding:8px 0}
.of-price-was{border-right:1px solid rgba(251,250,248,.16);padding-right:36px}
@media(max-width:520px){.of-price-was{border-right:0;border-bottom:1px solid rgba(251,250,248,.16);
  padding-right:0;padding-bottom:18px;margin-bottom:6px}}
.of-price-cap{font-family:var(--mono);font-size:11px;letter-spacing:.06em;text-transform:uppercase;
  color:rgba(251,250,248,.55)}
.of-price-strike{font-family:var(--disp);font-size:1.6rem;font-weight:420;color:rgba(251,250,248,.5);
  text-decoration:line-through}
.of-price-main{font-family:var(--disp);font-weight:480;font-variation-settings:'SOFT' 55,'WONK' 0;
  font-size:clamp(2.6rem,6vw,3.4rem);line-height:1;letter-spacing:-.02em;color:var(--green-dark)}
.of-price-main span{font-size:1rem;font-weight:400;color:rgba(251,250,248,.6);font-family:var(--body)}
.of-save{display:inline-block;font-family:var(--mono);font-size:12.5px;font-weight:500;
  letter-spacing:.02em;color:var(--green-dark);background:rgba(126,211,155,.1);
  border:1px solid rgba(126,211,155,.28);border-radius:8px;padding:10px 18px;margin-bottom:28px}
.of-price .cl-btn--solid{background:var(--green-dark);color:var(--ink);border-color:var(--green-dark)}
.of-price .cl-btn--solid:hover{background:#fff;border-color:#fff;color:var(--ink);
  box-shadow:0 6px 22px rgba(126,211,155,.28)}
.of-fine{margin-top:16px;font-family:var(--mono);font-size:11px;letter-spacing:.03em;
  color:rgba(251,250,248,.5)}

/* guarantee */
.of-guarantee{margin:0 auto;max-width:680px;background:var(--white);border:1px solid var(--border);
  border-top:3px solid var(--green);border-radius:12px;padding:clamp(28px,4vw,44px);text-align:center}
.of-guarantee h3{font-family:var(--disp);font-size:clamp(1.3rem,2.4vw,1.7rem);font-weight:460;
  font-variation-settings:'SOFT' 55,'WONK' 0;letter-spacing:-.015em;color:var(--ink);margin-bottom:16px}
.of-guarantee p{font-size:15.5px;line-height:1.7;color:var(--sec);margin:0 0 12px}
.of-guarantee .of-g-list{list-style:none;margin:20px auto;padding:0;max-width:48ch;text-align:left;
  display:flex;flex-direction:column;gap:12px}
.of-guarantee .of-g-list li{display:flex;gap:12px;align-items:flex-start;font-size:15px;
  line-height:1.6;color:var(--ink)}
.of-g-num{font-family:var(--mono);font-size:12px;font-weight:500;color:var(--green);flex:none;
  margin-top:2px}
.of-g-final{margin-top:8px;font-family:var(--disp);font-size:1.1rem;font-weight:500;
  font-variation-settings:'SOFT' 55,'WONK' 0;color:var(--green-deep)}

.of-cta-row{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin-top:40px}
@media(max-width:560px){.of-cta-row{flex-direction:column}}
`

function Tick() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8.5L6.5 12L13 4.5" stroke="#1F6B3A" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function OfferPage() {
  useEffect(() => {
    document.title = 'Knowcap Pilot Offer — Odoo Partner Edition'
  }, [])

  return (
    <EditorialShell>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <PageHero
        kicker="Pilot Program · Odoo Partner Edition"
        title={<>Stop the 180-hour leak. Keep every promise <em>on the record.</em></>}
        sub="Knowcap is verified work intelligence — the trust layer for your AI agents. It captures the conversations your implementation runs on, turns them into a confirmed record of every decision, and hands your team the SOPs, change-order evidence, and searchable history as outputs. Protect your margins. Automate your documentation."
      />

      <div className="cl-page-body">
        <div className="cl-wrap">

          {/* COST OF INACTION */}
          <section className="of-section" style={{ paddingTop: 0 }}>
            <div className="of-head">
              <span className="of-reg"><span className="of-reg-n">§01</span> · The cost of inaction</span>
              <div className="of-cost">
                <h3>What an unmanaged project actually costs you</h3>
                <p>
                  You pay a Senior Consultant ~70k EGP/month ($2k–5k USD), but you bill them at{' '}
                  <strong>$75 USD/hr</strong>.
                  <br /><br />
                  When they waste <strong>180 hours</strong> on rework and support, you aren&apos;t
                  losing cheap salaries. You are losing <strong>$13,500 USD</strong> in billable
                  revenue per project.
                  <span className="of-burn">That is 4–7× their monthly salary — burned.</span>
                </p>
              </div>
            </div>
          </section>

          {/* VALUE STACK */}
          <section className="of-section">
            <div className="of-head">
              <span className="of-reg"><span className="of-reg-n">§02</span> · The value stack</span>
              <h2 className="of-h2">What you get with <em>pilot access</em></h2>
              <p className="of-lead">
                The system that closes the loop, the upgrades you keep for life, and two
                done-for-you services to get your team live without lifting a finger.
              </p>
            </div>

            <div className="of-grid">
              {/* 1 — Core System */}
              <div className="of-card">
                <span className="of-tag of-tag--live">Live now</span>
                <h3 className="of-card-title">1. The core system</h3>
                <p className="of-card-sub">Unlimited seats &amp; magic links</p>
                <ul className="of-list">
                  <li><Tick /><span><strong>Step-by-step SOPs, generated:</strong> capture a walkthrough — a meeting, a call, or a screen recording — and Knowcap turns it into a structured, shareable SOP.</span></li>
                  <li><Tick /><span><strong>Unlimited magic links:</strong> share any captured walkthrough with a client in one link, branded as yours.</span></li>
                  <li><Tick /><span><strong>Project memory:</strong> a searchable, confirmed record of every decision — proof you can point to when scope is disputed.</span></li>
                </ul>
                <div className="of-card-foot">
                  <p className="of-card-val">Standard value: <strong>$1,000/mo</strong></p>
                </div>
              </div>

              {/* 2 — Tech Bonuses */}
              <div className="of-card">
                <span className="of-tag of-tag--future">Q1 future-lock</span>
                <h3 className="of-card-title">2. Tech bonuses</h3>
                <p className="of-card-sub">Lifetime enterprise upgrades</p>
                <ul className="of-list">
                  <li><Tick /><span><strong>White labeling:</strong> your brand, your domain, your colors.</span></li>
                  <li><Tick /><span><strong>Bilingual agent:</strong> an Arabic / English agent trained on your confirmed docs and project memory.</span></li>
                  <li><Tick /><span><strong>Grandfathered status:</strong> you never pay extra for these.</span></li>
                </ul>
                <div className="of-card-foot">
                  <p className="of-card-val">Future value: <strong>+$500/mo</strong></p>
                </div>
              </div>

              {/* 3 — White Glove Ingestion */}
              <div className="of-card of-card--service">
                <span className="of-tag of-tag--service">Done-for-you service</span>
                <h3 className="of-card-title">3. &ldquo;White glove&rdquo; ingestion</h3>
                <p className="of-card-sub of-card-sub--service">We do the work for you</p>
                <p className="of-card-text">
                  Send us your 10 most critical documents (PDFs, Docs, SOPs). My team will{' '}
                  <strong>manually upload, tag, and structure them</strong> into Knowcap for you —
                  so your project memory is populated on day one.
                </p>
                <div className="of-card-foot">
                  <p className="of-card-val">Service value: <strong>$1,500 (one-time)</strong></p>
                </div>
              </div>

              {/* 4 — On-Prem Strategy */}
              <div className="of-card of-card--service">
                <span className="of-tag of-tag--service">Done-for-you service</span>
                <h3 className="of-card-title">4. On-prem strategy</h3>
                <p className="of-card-sub of-card-sub--service">60-day handholding</p>
                <p className="of-card-text">
                  <strong>8× strategy calls</strong> (4/mo for 2 months). We guide your
                  infrastructure, workflow optimization, and team training personally.
                </p>
                <div className="of-card-foot">
                  <p className="of-card-val">Consulting value: <strong>$1,000 (waived)</strong></p>
                </div>
              </div>
            </div>
          </section>

          {/* PRICING */}
          <section className="of-section of-section--tint" style={{ marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)', paddingLeft: 22, paddingRight: 22 }}>
            <div className="of-price">
              <span className="of-reg"><span className="of-reg-n">§03</span> · Limited pilot offer</span>
              <h2 className="of-price-h">The pilot investment</h2>
              <span className="of-spots">Only 2 spots left</span>

              <div className="of-price-row">
                <div className="of-price-was">
                  <span className="of-price-cap">First-month value</span>
                  <span className="of-price-strike">$4,000+</span>
                </div>
                <div className="of-price-now">
                  <span className="of-price-cap">Your pilot price</span>
                  <span className="of-price-main">$350 <span>USD/mo</span></span>
                </div>
              </div>

              <div className="of-save">You save $13,800 USD per year</div>

              <div>
                <a href={STRIPE_CHECKOUT} className="cl-btn cl-btn--solid">Activate Pilot License</a>
              </div>
              <p className="of-fine">Offer expires when the last 2 spots are filled.</p>
            </div>
          </section>

          {/* GUARANTEE */}
          <section className="of-section">
            <div className="of-head" style={{ marginBottom: 28 }}>
              <span className="of-reg"><span className="of-reg-n">§04</span> · Risk-free</span>
            </div>
            <div className="of-guarantee">
              <h3>The risk-free performance guarantee</h3>
              <p>We take all the risk. Put Knowcap on your messiest project.</p>
              <p>If within the first 30 days, Knowcap does not:</p>
              <ul className="of-g-list">
                <li><span className="of-g-num">01</span><span>Generate one complex SOP from a captured walkthrough, instantly</span></li>
                <li><span className="of-g-num">02</span><span>Resolve a scope-creep dispute using the confirmed record of what was said</span></li>
                <li><span className="of-g-num">03</span><span>Demonstrate a path to saving 50 hours per 500-hour project</span></li>
              </ul>
              <p className="of-g-final">We will refund 100% of your subscription.</p>
              <p className="of-fine"><Link href="/refund-policy">Full refund policy</Link></p>
            </div>

            <div className="of-cta-row">
              <a href={STRIPE_CHECKOUT} className="cl-btn cl-btn--solid">Activate Pilot License</a>
              <Link href="/book" className="cl-btn cl-btn--ghost">Book a Demo</Link>
            </div>
            <p className="of-fine" style={{ textAlign: 'center', color: 'var(--sec)', marginTop: 18 }}>
              Prefer to see it first? <a href={`${APP_URL}/register`} style={{ color: 'var(--green)', textDecoration: 'underline', textUnderlineOffset: 3 }}>Start free</a> — no credit card.
            </p>
          </section>

        </div>
      </div>
    </EditorialShell>
  )
}
