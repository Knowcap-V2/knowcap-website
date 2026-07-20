'use client'

import Link from 'next/link'
import EditorialShell, { PageHero } from '@/components/editorial/shell'
import ABTracker from '@/components/ab-tracker'

const APP_URL = 'https://app.knowcap.ai'

const CSS = `
/* Theme Overrides for Trust Layer (Premium Dark Mode) */
.cl-root.tl-dark {
  --cream: #0A0A0B;
  --white: #111218;
  --border: #1F222F;
  --border-2: #2E3347;
  --ink: #F3F4F6;
  --ink-soft: #9CA3AF;
  --sec: #9CA3AF;
  --green: #1F6B3A;
  --green-deep: #2F9E56;
  --green-tint: rgba(31, 107, 58, 0.15);
  --green-dark: #7ED39B;
  --amber: #B07C28;
  background: var(--cream);
  color: var(--ink);
}

.tl-dark .cl-header {
  border-top-color: var(--green);
}
.tl-dark .cl-header[data-scrolled="true"] {
  background: rgba(10, 10, 11, 0.85);
  border-bottom-color: var(--border);
}
.tl-dark .cl-footer {
  border-top: 1px solid var(--border);
}

/* Custom Rhythm & Layout */
.tl-section {
  padding: clamp(80px, 10vw, 120px) 0;
  border-top: 1px solid var(--border);
}
.tl-section--darker {
  background: #050506;
}
.tl-head {
  max-width: 800px;
  margin-bottom: 56px;
}
.tl-h2 {
  font-weight: 700;
  font-size: clamp(2rem, 3.8vw, 3.2rem);
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--ink);
}
.tl-h2 em {
  font-style: normal;
  color: var(--green-deep);
}
.tl-lead {
  margin-top: 24px;
  font-size: 18px;
  line-height: 1.7;
  color: var(--sec);
  max-width: 65ch;
}

/* Section Margins */
.tl-reg {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}
.tl-reg-no {
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--green-deep);
}
.tl-reg-rule {
  height: 1px;
  flex: 1;
  background: var(--border);
}

/* CTAs & Trust Badges */
.tl-cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  margin-top: 32px;
}
.tl-trust-badges {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px 24px;
  margin-top: 40px;
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.02em;
  color: var(--sec);
}
.tl-trust-badges span {
  display: flex;
  align-items: center;
  gap: 8px;
}
.tl-trust-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--green-deep);
}

/* Verification Gate Interactive Graphic */
.tl-gate-container {
  margin: 64px auto 0;
  max-width: 1000px;
  background: #111218;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.4);
}
.tl-gate-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 24px;
}
.tl-gate-title {
  font-family: var(--mono);
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--ink);
}
.tl-gate-status {
  font-family: var(--mono);
  font-size: 12px;
  color: var(--green-deep);
}
.tl-gate-grid {
  display: grid;
  grid-template-columns: 1fr 60px 1fr;
  gap: 20px;
  align-items: center;
}
@media(max-width: 860px) {
  .tl-gate-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .tl-gate-connector {
    transform: rotate(90deg);
    margin: 0 auto;
  }
}
.tl-gate-side {
  background: #181922;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 24px;
}
.tl-gate-label {
  font-family: var(--mono);
  font-size: 11px;
  text-transform: uppercase;
  color: var(--sec);
  margin-bottom: 16px;
  display: inline-block;
  letter-spacing: 0.05em;
}
.tl-gate-connector {
  display: flex;
  justify-content: center;
  color: var(--green-deep);
}
.tl-card {
  background: #1e202d;
  border: 1px solid var(--border-2);
  border-radius: 8px;
  padding: 16px 20px;
  margin-bottom: 12px;
}
.tl-card:last-child {
  margin-bottom: 0;
}
.tl-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.tl-card-meta {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--sec);
}
.tl-badge {
  font-family: var(--mono);
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  padding: 2px 8px;
  border-radius: 4px;
}
.tl-badge--claim {
  background: rgba(239, 68, 68, 0.15);
  color: #EF4444;
  border: 1px solid rgba(239, 68, 68, 0.3);
}
.tl-badge--evidence {
  background: var(--green-tint);
  color: var(--green-deep);
  border: 1px solid rgba(31, 107, 58, 0.3);
}
.tl-card-text {
  font-size: 15px;
  line-height: 1.5;
  color: var(--ink);
  margin-bottom: 12px;
}
.tl-action-banner {
  background: rgba(31, 107, 58, 0.1);
  border-left: 3px solid var(--green);
  padding: 8px 12px;
  font-family: var(--mono);
  font-size: 11.5px;
  color: var(--green-dark);
  border-radius: 0 4px 4px 0;
}
.tl-btn-verify {
  width: 100%;
  text-align: center;
  background: var(--green);
  border: 1px solid var(--green);
  color: white;
  padding: 10px;
  border-radius: 6px;
  font-family: var(--mono);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.tl-btn-verify:hover {
  background: var(--green-deep);
  border-color: var(--green-deep);
}

/* Feature Grid */
.tl-features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
@media(max-width: 860px) {
  .tl-features {
    grid-template-columns: 1fr;
  }
}
.tl-feature-card {
  background: #111218;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 32px;
}
.tl-feature-card h3 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--ink);
}
.tl-feature-card p {
  color: var(--sec);
  font-size: 14.5px;
  line-height: 1.6;
}

/* Audit Logs Table */
.tl-audit-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 32px;
  font-size: 14px;
}
.tl-audit-table th, .tl-audit-table td {
  padding: 16px;
  text-align: left;
  border-bottom: 1px solid var(--border);
}
.tl-audit-table th {
  font-family: var(--mono);
  font-size: 11px;
  text-transform: uppercase;
  color: var(--sec);
  font-weight: 500;
}
.tl-audit-table td {
  color: var(--ink-soft);
}
.tl-audit-table td.tl-mono-cell {
  font-family: var(--mono);
  font-size: 13px;
  color: var(--green-dark);
}
`

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ display: 'inline-block', marginRight: '6px' }}>
      <path d="M3 8.5L6.5 12L13 4.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg width="16" height="12" viewBox="0 0 15 11" fill="none" aria-hidden="true" style={{ display: 'inline-block', marginLeft: '6px', verticalAlign: 'middle' }}>
      <path d="M1 5.5h12M9 1l4 4.5L9 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function LandingTrustLayer() {
  return (
    <div className="cl-root tl-dark">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <ABTracker variant="landing-trust-layer" />
      <EditorialShell>
        {/* Hero Section */}
        <div className="cl-page-hero">
          <div className="cl-wrap">
            <span className="cl-kicker">
              Knowcap <span className="cl-kdot">·</span> Secured AI Agent Memory
            </span>
            <h1 className="cl-page-h1" style={{ maxWidth: '900px', margin: '0 auto' }}>
              Most AI agents act on what they <em>think</em> is true. <br />
              Knowcap agents act only on what a <em>human</em> said is true.
            </h1>
            <p className="cl-page-sub" style={{ maxWidth: '720px', margin: '24px auto 0' }}>
              Turn human claims into evidence your AI agents can act on. Capture meetings, messages, and recordings — promote the verified parts to evidence agents can use.
            </p>
            <div className="tl-cta-row">
              <a className="cl-btn cl-btn--solid" href={`${APP_URL}/register`}>
                Start Verifying <ArrowRight />
              </a>
              <Link className="cl-btn cl-btn--ghost" href="/book" style={{ color: 'var(--ink)', borderColor: 'var(--border-2)' }}>
                Request API Access
              </Link>
            </div>
            <div className="tl-trust-badges">
              <span><span className="tl-trust-dot" /> Every claim requires human signature</span>
              <span><span className="tl-trust-dot" /> Audit trails out-of-the-box</span>
              <span><span className="tl-trust-dot" /> Built for Saudi PDPL &amp; GDPR Art 22</span>
            </div>
          </div>
        </div>

        {/* Verification Gate Graphic */}
        <section className="tl-section tl-section--darker">
          <div className="cl-wrap">
            <div className="tl-head" style={{ textAlign: 'center', margin: '0 auto 48px' }}>
              <div className="tl-reg">
                <span className="tl-reg-no">§ Interactive Demo</span>
                <span className="tl-reg-rule" />
              </div>
              <h2 className="tl-h2">The Verification Gate</h2>
              <p className="tl-lead" style={{ margin: '16px auto 0' }}>
                How Knowcap screens out hallucinations, hearsay, and unconfirmed scope decisions from your agent runtime.
              </p>
            </div>

            <div className="tl-gate-container">
              <div className="tl-gate-header">
                <span className="tl-gate-title">Knowcap Pipeline Control</span>
                <span className="tl-gate-status">● Live Stream Enabled</span>
              </div>
              <div className="tl-gate-grid">
                {/* Left Side: Unverified Claims */}
                <div className="tl-gate-side">
                  <span className="tl-gate-label">1. Extracted Claims (Awaiting Review)</span>
                  <div className="tl-card">
                    <div className="tl-card-header">
                      <span className="tl-card-meta">Call · 0:14:32</span>
                      <span className="tl-badge tl-badge--claim">Claim</span>
                    </div>
                    <p className="tl-card-text">
                      "Let's add the custom reports module to Ariika's sprint next week."
                    </p>
                    <button className="tl-btn-verify" onClick={() => alert('Claim promoted to Verified Evidence. Live agents updated.')}>
                      Approve &amp; Commit
                    </button>
                  </div>
                  <div className="tl-card" style={{ opacity: 0.6 }}>
                    <div className="tl-card-header">
                      <span className="tl-card-meta">Telegram · 15:40</span>
                      <span className="tl-badge tl-badge--claim">Claim</span>
                    </div>
                    <p className="tl-card-text">
                      "Client approved the invoice for the extra development hours."
                    </p>
                  </div>
                </div>

                {/* Connector */}
                <div className="tl-gate-connector">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>

                {/* Right Side: Verified Evidence */}
                <div className="tl-gate-side">
                  <span className="tl-gate-label">2. Verified Evidence (MCP Layer)</span>
                  <div className="tl-card">
                    <div className="tl-card-header">
                      <span className="tl-card-meta">Confirmed by Hassan E. · 19:15</span>
                      <span className="tl-badge tl-badge--evidence">Evidence</span>
                    </div>
                    <p className="tl-card-text">
                      "Warranty window extended to 90 days for all future shipments."
                    </p>
                    <div className="tl-action-banner">
                      <CheckIcon /> Agent updated Shopify policies automatically.
                    </div>
                  </div>
                  <div className="tl-card">
                    <div className="tl-card-header">
                      <span className="tl-card-meta">Confirmed by Client · 14:02</span>
                      <span className="tl-badge tl-badge--evidence">Evidence</span>
                    </div>
                    <p className="tl-card-text">
                      "Phase 2 billing is milestone-based: 40% dev, 60% handover."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="tl-section">
          <div className="cl-wrap">
            <div className="tl-head">
              <div className="tl-reg">
                <span className="tl-reg-no">§ Core Infrastructure</span>
                <span className="tl-reg-rule" />
              </div>
              <h2 className="tl-h2">Designed for High-Risk, High-Trust Environments</h2>
            </div>
            <div className="tl-features">
              <div className="tl-feature-card">
                <h3>Structured Ingestion</h3>
                <p>
                  Capture from Meet, WhatsApp, Telegram, document uploads, and APIs. We reconstruct clean logs with timestamps and speaker attribution back to the source.
                </p>
              </div>
              <div className="tl-feature-card">
                <h3>MCP Enforcement</h3>
                <p>
                  Our Model Context Protocol server enforces <code>verification_strictness = "human_only"</code>. Your agents can query facts, but they cannot access unverified claims.
                </p>
              </div>
              <div className="tl-feature-card">
                <h3>Bilateral Ledger</h3>
                <p>
                  Create living agreements where both sides (consulting firm and client) sign off on commitments, neutralizing scope creep before it starts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Audit Logs Visual Section */}
        <section className="tl-section tl-section--darker">
          <div className="cl-wrap">
            <div className="tl-head">
              <div className="tl-reg">
                <span className="tl-reg-no">§ Audit Defense</span>
                <span className="tl-reg-rule" />
              </div>
              <h2 className="tl-h2">Bulletproof Audit Trails</h2>
              <p className="tl-lead">
                Every action taken by your agent maps back to a human confirmation. Complete compliance infrastructure.
              </p>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table className="tl-audit-table">
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>Agent Action</th>
                    <th>Verified Fact</th>
                    <th>Attestation Signature</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="tl-mono-cell">2026-07-19 19:14</td>
                    <td>Generated Shopify PRD</td>
                    <td>"Warranty extended to 90 days"</td>
                    <td>Hassan E. (CEO) · Verified ID 884</td>
                  </tr>
                  <tr>
                    <td className="tl-mono-cell">2026-07-19 16:32</td>
                    <td>Dispatched supplier email</td>
                    <td>"Vendor late fee active after 48h delay"</td>
                    <td>Belal A. (Ops) · Verified ID 719</td>
                  </tr>
                  <tr>
                    <td className="tl-mono-cell">2026-07-19 11:05</td>
                    <td>Created Odoo Studio Task</td>
                    <td>"Sprints start on Sundays"</td>
                    <td>Client Confirm · Verified ID 342</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="tl-section">
          <div className="cl-wrap" style={{ textAlign: 'center' }}>
            <h2 className="tl-h2">Stop hallucinating company context.</h2>
            <p className="tl-lead" style={{ margin: '16px auto 32px' }}>
              Anthropic gives your agents skills. Knowcap gives them truth.
            </p>
            <a className="cl-btn cl-btn--solid" href={`${APP_URL}/register`}>
              Deploy Your Trust Layer Free <ArrowRight />
            </a>
          </div>
        </section>
      </EditorialShell>
    </div>
  )
}
