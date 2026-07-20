'use client'

import Link from 'next/link'
import EditorialShell, { PageHero } from '@/components/editorial/shell'
import ABTracker from '@/components/ab-tracker'

const APP_URL = 'https://app.knowcap.ai'

const CSS = `
/* Theme Overrides for Scope Creep (Warm Cream Paper Mode) */
.cl-root.sc-cream {
  --cream: #FBFAF8;
  --white: #FFFFFF;
  --border: #E7E4DD;
  --border-2: #DCD7CB;
  --ink: #18181B;
  --ink-soft: #2A2A2F;
  --sec: #4A4F5A;
  --green: #1F6B3A;
  --green-deep: #17522C;
  --green-tint: #E8F5ED;
  --green-dark: #7ED39B;
  background: var(--cream);
  color: var(--ink);
}

/* Custom Rhythm & Layout */
.sc-section {
  padding: clamp(80px, 10vw, 120px) 0;
  border-top: 1px solid var(--border);
}
.sc-section--paper {
  background: var(--white);
}
.sc-dot-grid {
  background-image: radial-gradient(var(--border-2) 1px, transparent 0);
  background-size: 24px 24px;
}
.sc-head {
  max-width: 800px;
  margin-bottom: 56px;
}
.sc-h2 {
  font-weight: 700;
  font-size: clamp(2rem, 3.8vw, 3.2rem);
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--ink);
}
.sc-h2 em {
  font-style: italic;
  font-weight: 600;
  color: var(--green);
}
.sc-lead {
  margin-top: 24px;
  font-size: 18px;
  line-height: 1.7;
  color: var(--sec);
  max-width: 65ch;
}

/* Section Margins */
.sc-reg {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}
.sc-reg-no {
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--sec);
}
.sc-reg-rule {
  height: 1px;
  flex: 1;
  background: var(--border);
}

/* CTAs & Trust Badges */
.sc-cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  margin-top: 32px;
}
.sc-trust-badges {
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
.sc-trust-badges span {
  display: flex;
  align-items: center;
  gap: 8px;
}
.sc-trust-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--green);
}

/* 3-Column Bilateral Ledger Graphic */
.sc-bilateral-container {
  margin: 64px auto 0;
  max-width: 1100px;
}
.sc-bilateral-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr 1fr;
  gap: 20px;
}
@media(max-width: 980px) {
  .sc-bilateral-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}
.sc-col {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.02);
}
.sc-col-header {
  font-family: var(--mono);
  font-size: 11px;
  text-transform: uppercase;
  color: var(--sec);
  border-bottom: 1px solid var(--border);
  padding-bottom: 12px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.sc-col-title {
  font-weight: 600;
  color: var(--ink);
}

/* Chat Messages */
.sc-chat {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.sc-msg {
  max-width: 85%;
  padding: 12px;
  border-radius: 8px;
  font-size: 13.5px;
  line-height: 1.45;
}
.sc-msg--client {
  background: #F3F4F6;
  color: var(--ink);
  align-self: flex-start;
  border-bottom-left-radius: 2px;
}
.sc-msg--partner {
  background: var(--green-tint);
  color: var(--green-deep);
  align-self: flex-end;
  border-bottom-right-radius: 2px;
}
.sc-chat-meta {
  font-family: var(--mono);
  font-size: 9px;
  margin-top: 4px;
  color: var(--sec);
  display: block;
}

/* Commitments/Living Agreement */
.sc-agreement-card {
  border: 1px solid var(--border-2);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 14px;
  background: var(--cream);
}
.sc-agreement-card:last-child {
  margin-bottom: 0;
}
.sc-ag-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.sc-badge {
  font-family: var(--mono);
  font-size: 9px;
  text-transform: uppercase;
  padding: 2.5px 8px;
  border-radius: 3px;
  font-weight: 500;
}
.sc-badge--pending {
  background: #FEF3C7;
  color: #D97706;
}
.sc-badge--confirmed {
  background: var(--green-tint);
  color: var(--green-deep);
}
.sc-ag-text {
  font-size: 14px;
  line-height: 1.5;
  font-weight: 500;
}
.sc-ag-meta {
  font-family: var(--mono);
  font-size: 10.5px;
  color: var(--sec);
  margin-top: 8px;
  border-top: 1px dashed var(--border);
  padding-top: 8px;
}

/* Odoo Output */
.sc-odoo-task {
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 14px;
  background: #FDFDFD;
  margin-bottom: 12px;
}
.sc-odoo-id {
  font-family: var(--mono);
  font-size: 11px;
  color: #7C3AED;
}
.sc-odoo-title {
  font-size: 14px;
  font-weight: 600;
  margin: 4px 0 8px;
}
.sc-odoo-meta {
  font-size: 12px;
  color: var(--sec);
  display: flex;
  justify-content: space-between;
}

/* Case Study Grid */
.sc-grid-2x2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 48px;
}
@media(max-width: 760px) {
  .sc-grid-2x2 {
    grid-template-columns: 1fr;
  }
}
.sc-case-card {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 32px;
}
.sc-case-card h3 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
}
.sc-case-card p {
  color: var(--sec);
  font-size: 15px;
  line-height: 1.6;
}
.sc-metric {
  font-family: var(--mono);
  font-size: 28px;
  font-weight: 600;
  color: var(--green);
  margin-bottom: 16px;
  display: block;
}
`

function TickIcon() {
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

export default function LandingScopeCreep() {
  return (
    <div className="cl-root sc-cream sc-dot-grid">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <ABTracker variant="landing-scope-creep" />
      <EditorialShell>
        {/* Hero Section */}
        <div className="cl-page-hero">
          <div className="cl-wrap">
            <span className="cl-kicker">
              Knowcap <span className="cl-kdot">·</span> For Odoo Partners &amp; Agencies
            </span>
            <h1 className="cl-page-h1" style={{ maxWidth: '960px', margin: '0 auto' }}>
              Kill scope creep with your clients. <br />
              Auto-build <em>living agreements</em> from meetings &amp; WhatsApp.
            </h1>
            <p className="cl-page-sub" style={{ maxWidth: '750px', margin: '24px auto 0' }}>
              Every implementation hinges on what was agreed in client calls. Knowcap captures commitments from both sides, creates shared audit trails, and automatically maps confirmed scope to Odoo tasks.
            </p>
            <div className="sc-cta-row">
              <a className="cl-btn cl-btn--solid" href={`${APP_URL}/register`}>
                Start Verifying Free <ArrowRight />
              </a>
              <Link className="cl-btn cl-btn--ghost" href="/book">
                Book a Partner Demo
              </Link>
            </div>
            <div className="sc-trust-badges">
              <span><span className="sc-trust-dot" /> Bi-lateral confirmation rails</span>
              <span><span className="sc-trust-dot" /> Instant Odoo task generation</span>
              <span><span className="sc-trust-dot" /> Protect project margins</span>
            </div>
          </div>
        </div>

        {/* 3-Column Visual Pipeline */}
        <section className="sc-section sc-section--paper">
          <div className="cl-wrap">
            <div className="sc-head" style={{ textAlign: 'center', margin: '0 auto 56px' }}>
              <div className="sc-reg">
                <span className="sc-reg-no">§ Flow Architecture</span>
                <span className="sc-reg-rule" />
              </div>
              <h2 className="sc-h2">From Client Chat to Verified Task</h2>
              <p className="sc-lead" style={{ margin: '16px auto 0' }}>
                Stop relying on messy meeting notes or untraceable WhatsApp updates. Build a bilateral chain of truth.
              </p>
            </div>

            <div className="sc-bilateral-container">
              <div className="sc-bilateral-grid">
                {/* Column 1: Chat Ingestion */}
                <div className="sc-col">
                  <div className="sc-col-header">
                    <span className="sc-col-title">1. Source Stream</span>
                    <span>WhatsApp</span>
                  </div>
                  <div className="sc-chat">
                    <div className="sc-msg sc-msg--client">
                      "Can we add the custom reports module to Ariika's portal for the release next week?"
                      <span className="sc-chat-meta">Client · 10:14 AM</span>
                    </div>
                    <div className="sc-msg sc-msg--partner">
                      "Sure, we can do that. That falls under our custom change-request rate of $150/hr."
                      <span className="sc-chat-meta">Partner · 10:15 AM</span>
                    </div>
                    <div className="sc-msg sc-msg--client">
                      "Yes, go ahead. Approved."
                      <span className="sc-chat-meta">Client · 10:16 AM</span>
                    </div>
                  </div>
                </div>

                {/* Column 2: Bilateral Ledger */}
                <div className="sc-col" style={{ border: '2px solid var(--green)', transform: 'scale(1.02)' }}>
                  <div className="sc-col-header">
                    <span className="sc-col-title" style={{ color: 'var(--green)' }}>2. Living Agreement</span>
                    <span style={{ color: 'var(--green)', fontWeight: '600' }}>Extraction</span>
                  </div>
                  <div className="sc-agreement-card">
                    <div className="sc-ag-status">
                      <span className="sc-badge sc-badge--pending">Awaiting Final Confirm</span>
                    </div>
                    <p className="sc-ag-text">
                      "Add custom reports module to Ariika portal."
                    </p>
                    <div className="sc-ag-meta">
                      Scope · Estimated: 12 hrs · Rate: $150/hr
                    </div>
                  </div>
                  <div className="sc-agreement-card">
                    <div className="sc-ag-status">
                      <span className="sc-badge sc-badge--confirmed">Bilateral Confirmed</span>
                    </div>
                    <p className="sc-ag-text">
                      "Warranty window extension to 90 days."
                    </p>
                    <div className="sc-ag-meta">
                      Policy · Signed: Client &amp; Hassan E.
                    </div>
                  </div>
                </div>

                {/* Column 3: Odoo Output */}
                <div className="sc-col">
                  <div className="sc-col-header">
                    <span className="sc-col-title">3. Verified Odoo Tasks</span>
                    <span>Odoo Studio</span>
                  </div>
                  <div className="sc-odoo-task" style={{ opacity: 0.5 }}>
                    <span className="sc-odoo-id">TASK-441</span>
                    <h3 className="sc-odoo-title">Extend warranty policies</h3>
                    <div className="sc-odoo-meta">
                      <span>Status: Complete</span>
                      <span>12 hrs</span>
                    </div>
                  </div>
                  <div className="sc-odoo-task">
                    <span className="sc-odoo-id">TASK-452</span>
                    <h3 className="sc-odoo-title">Custom reports module portal</h3>
                    <div className="sc-odoo-meta">
                      <span style={{ color: '#D97706', fontWeight: 500 }}>Status: Draft</span>
                      <span>Pending CR approval</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Case Studies / Metrics */}
        <section className="sc-section">
          <div className="cl-wrap">
            <div className="sc-head">
              <div className="sc-reg">
                <span className="sc-reg-no">§ Partner Outcomes</span>
                <span className="sc-reg-rule" />
              </div>
              <h2 className="sc-h2">Protected Margins. Happy Clients.</h2>
            </div>
            <div className="sc-grid-2x2">
              <div className="sc-case-card">
                <span className="sc-metric">100%</span>
                <h3>Scope Visibility</h3>
                <p>
                  Every change request, extra module request, and deadline shift is extracted from calls and WhatsApp, cataloged, and signed off bilateral-style. Never debate scope disputes again.
                </p>
              </div>
              <div className="sc-case-card">
                <span className="sc-metric">1.6×</span>
                <h3>Project Velocity</h3>
                <p>
                  Odoo developers get clean, verified specifications mapped straight to tasks, skipping the back-and-forth alignment meetings.
                </p>
              </div>
              <div className="sc-case-card">
                <span className="sc-metric">50%</span>
                <h3>Less Admin Work</h3>
                <p>
                  Stop spending Friday afternoons manually reviewing WhatsApp logs, Slack history, and meeting recordings to write client update briefs. Knowcap does it in real-time.
                </p>
              </div>
              <div className="sc-case-card">
                <span className="sc-metric">0%</span>
                <h3>Billing Leaks</h3>
                <p>
                  Every extra hour of custom development has an immutable attestation trail linking it back to the client's explicit verbal or written approval.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="sc-section sc-section--paper">
          <div className="cl-wrap">
            <div className="sc-head">
              <div className="sc-reg">
                <span className="sc-reg-no">§ Active Pilots</span>
                <span className="sc-reg-rule" />
              </div>
              <h2 className="sc-h2">Trusted by SME Integrators</h2>
            </div>
            <div className="sc-grid-2x2" style={{ gridTemplateColumns: '1fr 1fr 1fr', marginTop: '32px' }}>
              <div className="sc-case-card" style={{ padding: '24px' }}>
                <p style={{ fontStyle: 'italic', marginBottom: '16px' }}>
                  "Knowcap cut our client support disputes to zero. The audit trail of who approved the scope change is immutable."
                </p>
                <strong style={{ display: 'block', fontSize: '14px' }}>Ibrahim Abed</strong>
                <span style={{ fontSize: '12px', color: 'var(--sec)' }}>Plementus (Odoo Partner)</span>
              </div>
              <div className="sc-case-card" style={{ padding: '24px' }}>
                <p style={{ fontStyle: 'italic', marginBottom: '16px' }}>
                  "We map every verified commitment directly to our Github PRs and Odoo tasks. Project documentation happens automatically."
                </p>
                <strong style={{ display: 'block', fontSize: '14px' }}>Mohamed Jamal</strong>
                <span style={{ fontSize: '12px', color: 'var(--sec)' }}>BI Solutions (KSA)</span>
              </div>
              <div className="sc-case-card" style={{ padding: '24px' }}>
                <p style={{ fontStyle: 'italic', marginBottom: '16px' }}>
                  "The client signs off on commitments right inside WhatsApp. There's no learning curve for them, just pure clarity."
                </p>
                <strong style={{ display: 'block', fontSize: '14px' }}>Ariika Team</strong>
                <span style={{ fontSize: '12px', color: 'var(--sec)' }}>Implementation Client</span>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="sc-section">
          <div className="cl-wrap" style={{ textAlign: 'center' }}>
            <h2 className="sc-h2">Protect your agency margins today.</h2>
            <p className="sc-lead" style={{ margin: '16px auto 32px' }}>
              Free 15-day trial (Business Tier). Integrated with Odoo.
            </p>
            <a className="cl-btn cl-btn--solid" href={`${APP_URL}/register`}>
              Start Your Free Trial <ArrowRight />
            </a>
          </div>
        </section>
      </EditorialShell>
    </div>
  )
}
