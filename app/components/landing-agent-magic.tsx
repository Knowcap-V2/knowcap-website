'use client'

import Link from 'next/link'
import EditorialShell, { PageHero } from '@/components/editorial/shell'
import ABTracker from '@/components/ab-tracker'

const APP_URL = 'https://app.knowcap.ai'

const CSS = `
/* Theme Overrides for Agent Magic (High-Contrast Kinetic Dark Mode) */
.cl-root.am-magic {
  --cream: #030303;
  --white: #0C0C0E;
  --border: #1B1B22;
  --border-2: #2B2C3A;
  --ink: #F9FAFB;
  --ink-soft: #D1D5DB;
  --sec: #9CA3AF;
  --green: #1F6B3A;
  --green-deep: #10B981;
  --green-tint: rgba(16, 185, 129, 0.1);
  --green-dark: #34D399;
  
  --fact-color: #10B981;
  --risk-color: #EF4444;
  --decision-color: #8B5CF6;
  --task-color: #3B82F6;
  --person-color: #F59E0B;
  
  background: var(--cream);
  color: var(--ink);
}

.am-magic .cl-header {
  border-top-color: var(--green-deep);
}
.am-magic .cl-header[data-scrolled="true"] {
  background: rgba(3, 3, 3, 0.9);
  border-bottom-color: var(--border);
}
.am-magic .cl-footer {
  border-top: 1px solid var(--border);
}

/* Custom Rhythm & Layout */
.am-section {
  padding: clamp(80px, 10vw, 120px) 0;
  border-top: 1px solid var(--border);
}
.am-section--darker {
  background: #000000;
}
.am-head {
  max-width: 800px;
  margin-bottom: 56px;
}
.am-h2 {
  font-weight: 700;
  font-size: clamp(2rem, 3.8vw, 3.2rem);
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--ink);
}
.am-h2 em {
  font-style: normal;
  color: var(--green-dark);
}
.am-lead {
  margin-top: 24px;
  font-size: 18px;
  line-height: 1.7;
  color: var(--sec);
  max-width: 65ch;
}

/* Section Margins */
.am-reg {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}
.am-reg-no {
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--green-dark);
}
.am-reg-rule {
  height: 1px;
  flex: 1;
  background: var(--border);
}

/* CTAs & Trust Badges */
.am-cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  margin-top: 32px;
}

/* Kinetic Timeline Visual */
.am-timeline-container {
  margin: 64px auto 0;
  max-width: 1000px;
  border-left: 2px solid var(--border);
  padding-left: 32px;
  position: relative;
}
.am-node {
  position: relative;
  margin-bottom: 40px;
}
.am-node:last-child {
  margin-bottom: 0;
}
.am-node-dot {
  position: absolute;
  left: -41px;
  top: 6px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 4px solid var(--cream);
}
.am-node-ts {
  font-family: var(--mono);
  font-size: 12px;
  color: var(--sec);
  margin-bottom: 8px;
  display: block;
}
.am-node-card {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 20px 24px;
}
.am-node-card h3 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
}
.am-node-card p {
  font-size: 14.5px;
  line-height: 1.5;
  color: var(--ink-soft);
}
.am-flow-output {
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px dashed var(--border);
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: var(--mono);
  font-size: 12.5px;
}

/* Category Ontology Pills */
.am-pill {
  font-family: var(--mono);
  font-size: 10.5px;
  text-transform: uppercase;
  padding: 3px 10px;
  border-radius: 999px;
  font-weight: 600;
}
.am-pill--fact { background: rgba(16, 185, 129, 0.15); color: var(--fact-color); }
.am-pill--risk { background: rgba(239, 68, 68, 0.15); color: var(--risk-color); }
.am-pill--decision { background: rgba(139, 92, 246, 0.15); color: var(--decision-color); }
.am-pill--task { background: rgba(59, 130, 246, 0.15); color: var(--task-color); }
.am-pill--person { background: rgba(245, 158, 11, 0.15); color: var(--person-color); }

/* Grid metrics */
.am-grid-metrics {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 56px;
}
@media(max-width: 860px) {
  .am-grid-metrics {
    grid-template-columns: 1fr 1fr;
  }
}
.am-metric-card {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 24px;
  text-align: center;
}
.am-metric-val {
  font-family: var(--mono);
  font-size: 36px;
  font-weight: 700;
  color: var(--green-dark);
  margin-bottom: 8px;
}
.am-metric-lbl {
  font-size: 13.5px;
  color: var(--sec);
}
`

function ArrowRight() {
  return (
    <svg width="16" height="12" viewBox="0 0 15 11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', marginLeft: '6px', verticalAlign: 'middle' }}>
      <path d="M1 5.5h12M9 1l4 4.5L9 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function LandingAgentMagic() {
  return (
    <div className="cl-root am-magic">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <ABTracker variant="landing-agent-magic" />
      <EditorialShell>
        {/* Hero Section */}
        <div className="cl-page-hero">
          <div className="cl-wrap">
            <span className="cl-kicker">
              Knowcap <span className="cl-kdot">·</span> Active Agent Automation
            </span>
            <h1 className="cl-page-h1" style={{ maxWidth: '1000px', margin: '0 auto' }}>
              Your meeting just flagged a risk, drafted mitigations,<br />
              and contacted a supplier. <em>Before it ended.</em>
            </h1>
            <p className="cl-page-sub" style={{ maxWidth: '780px', margin: '24px auto 0' }}>
              Most meeting recorders summarize and stop. Knowcap connects your meeting audio directly to your agent workflows. Verify commitments in real-time, trigger tasks, and let agents act instantly.
            </p>
            <div className="am-cta-row">
              <a className="cl-btn cl-btn--solid" href={`${APP_URL}/register`} style={{ background: 'var(--green-deep)', borderColor: 'var(--green-deep)' }}>
                Deploy Live Agents <ArrowRight />
              </a>
              <Link className="cl-btn cl-btn--ghost" href="/book" style={{ color: 'var(--ink)', borderColor: 'var(--border-2)' }}>
                Watch Demo
              </Link>
            </div>
          </div>
        </div>

        {/* Real-time Flow Timeline */}
        <section className="am-section am-section--darker">
          <div className="cl-wrap">
            <div className="am-head" style={{ textAlign: 'center', margin: '0 auto 56px' }}>
              <div className="am-reg">
                <span className="am-reg-no">§ Active Execution Timeline</span>
                <span className="am-reg-rule" />
              </div>
              <h2 className="am-h2">The Real-Time Ingest &amp; Trigger Flow</h2>
              <p className="am-lead" style={{ margin: '16px auto 0' }}>
                See how a verbal supply-chain discussion is transformed, validated, and actioned within 10 seconds.
              </p>
            </div>

            <div className="am-timeline-container">
              {/* Node 1: Capture */}
              <div className="am-node">
                <div className="am-node-dot" style={{ background: 'var(--person-color)' }} />
                <span className="am-node-ts">00:02:14 · Call Audio Ingestion</span>
                <div className="am-node-card">
                  <h3>
                    <span className="am-pill am-pill--person">Person</span>
                    Marcus (Operations Director)
                  </h3>
                  <p>
                    "Our shipping vendor just warned us that shipment B-34 is delayed. We need to alert the KSA team and find a secondary supplier ASAP."
                  </p>
                </div>
              </div>

              {/* Node 2: Extract & Classify */}
              <div className="am-node">
                <div className="am-node-dot" style={{ background: 'var(--risk-color)' }} />
                <span className="am-node-ts">00:02:15 · Extraction &amp; Risk Audit</span>
                <div className="am-node-card">
                  <h3>
                    <span className="am-pill am-pill--risk">Risk</span>
                    Supply Chain Delays · Shipment B-34
                  </h3>
                  <p>
                    <strong>Identified impact:</strong> High risk to KSA launch date. <br />
                    <strong>Auto-drafted mitigation:</strong> Query secondary regional logistics networks.
                  </p>
                </div>
              </div>

              {/* Node 3: Attestation Gate */}
              <div className="am-node">
                <div className="am-node-dot" style={{ background: 'var(--decision-color)' }} />
                <span className="am-node-ts">00:02:18 · Bilateral Confirmation Request</span>
                <div className="am-node-card" style={{ border: '1px solid rgba(139, 92, 246, 0.4)' }}>
                  <h3>
                    <span className="am-pill am-pill--decision">Decision</span>
                    Approve Supplier Action Request
                  </h3>
                  <p>
                    Verify logistics query payload and trigger autonomous sourcing agents.
                  </p>
                  <div className="am-flow-output" style={{ color: 'var(--green-dark)' }}>
                    <span>● Verified by Hassan E. via Telegram signature</span>
                  </div>
                </div>
              </div>

              {/* Node 4: Action Dispatch */}
              <div className="am-node">
                <div className="am-node-dot" style={{ background: 'var(--task-color)' }} />
                <span className="am-node-ts">00:02:20 · Agent Execution Dispatched</span>
                <div className="am-node-card">
                  <h3>
                    <span className="am-pill am-pill--task">Task</span>
                    Autonomous Sourcing Sprints
                  </h3>
                  <p>
                    Secondary shipping provider queried via API. Mitigating quotes compiled.
                  </p>
                  <div className="am-flow-output">
                    <span style={{ color: 'var(--green-dark)' }}>✓ Sourcing payload sent to Aramex API (ID: 9812)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5 Layer-1 Categories Ontology section */}
        <section className="am-section">
          <div className="cl-wrap">
            <div className="am-head">
              <div className="am-reg">
                <span className="am-reg-no">§ Data Ontology</span>
                <span className="am-reg-rule" />
              </div>
              <h2 className="am-h2">The 5 Pillars of Verified Fact</h2>
              <p className="am-lead">
                Knowcap doesn't store plain text chunks. We structure your organization's entire memory into 5 distinct, auditable categories.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginTop: '32px' }}>
              <div className="am-metric-card" style={{ borderTop: '4px solid var(--fact-color)' }}>
                <span className="am-pill am-pill--fact" style={{ display: 'inline-block', marginBottom: '12px' }}>Fact</span>
                <p style={{ fontSize: '13px', color: 'var(--sec)', textAlign: 'left' }}>
                  Verifiable assertions that are structurally immutable (e.g. system URLs, verified API configurations).
                </p>
              </div>
              <div className="am-metric-card" style={{ borderTop: '4px solid var(--risk-color)' }}>
                <span className="am-pill am-pill--risk" style={{ display: 'inline-block', marginBottom: '12px' }}>Risk</span>
                <p style={{ fontSize: '13px', color: 'var(--sec)', textAlign: 'left' }}>
                  Identified issues, blockages, or client complaints that require tracking or mitigations.
                </p>
              </div>
              <div className="am-metric-card" style={{ borderTop: '4px solid var(--decision-color)' }}>
                <span className="am-pill am-pill--decision" style={{ display: 'inline-block', marginBottom: '12px' }}>Decision</span>
                <p style={{ fontSize: '13px', color: 'var(--sec)', textAlign: 'left' }}>
                  Agreements, choices, and approvals made by key stakeholders during meetings or discussions.
                </p>
              </div>
              <div className="am-metric-card" style={{ borderTop: '4px solid var(--task-color)' }}>
                <span className="am-pill am-pill--task" style={{ display: 'inline-block', marginBottom: '12px' }}>Task</span>
                <p style={{ fontSize: '13px', color: 'var(--sec)', textAlign: 'left' }}>
                  Action items assigned to a person or team to fulfill commitments and mitigate risks.
                </p>
              </div>
              <div className="am-metric-card" style={{ borderTop: '4px solid var(--person-color)' }}>
                <span className="am-pill am-pill--person" style={{ display: 'inline-block', marginBottom: '12px' }}>Person</span>
                <p style={{ fontSize: '13px', color: 'var(--sec)', textAlign: 'left' }}>
                  Key stakeholders, roles, and ownership records bound to all actions and confirmations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quantifiable Magic Metrics */}
        <section className="am-section am-section--darker">
          <div className="cl-wrap">
            <div className="am-head" style={{ textAlign: 'center', margin: '0 auto 56px' }}>
              <h2 className="am-h2">Velocity Meets Compliance</h2>
              <p className="am-lead" style={{ margin: '16px auto 0' }}>
                How organizations leverage the speed of autonomous AI without risking legal or operational errors.
              </p>
            </div>

            <div className="am-grid-metrics">
              <div className="am-metric-card">
                <div className="am-metric-val">10s</div>
                <div className="am-metric-lbl">Speech-to-Action Latency</div>
              </div>
              <div className="am-metric-card">
                <div className="am-metric-val">0</div>
                <div className="am-metric-lbl">Unsigned Agent Decisions</div>
              </div>
              <div className="am-metric-card">
                <div className="am-metric-val">100%</div>
                <div className="am-metric-lbl">Audit Provenance Logs</div>
              </div>
              <div className="am-metric-card">
                <div className="am-metric-val">2 min</div>
                <div className="am-metric-lbl">Average Review Time per Meeting</div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="am-section">
          <div className="cl-wrap" style={{ textAlign: 'center' }}>
            <h2 className="am-h2">Let your agents work on confirmed truth.</h2>
            <p className="am-lead" style={{ margin: '16px auto 32px' }}>
              Integrate the Knowcap MCP server into your custom AI systems in under 5 minutes.
            </p>
            <a className="cl-btn cl-btn--solid" href={`${APP_URL}/register`} style={{ background: 'var(--green-deep)', borderColor: 'var(--green-deep)' }}>
              Get Your API Keys <ArrowRight />
            </a>
          </div>
        </section>
      </EditorialShell>
    </div>
  )
}
