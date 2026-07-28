import type { Metadata } from 'next'
import EditorialShell, { PageHero } from '@/components/editorial/shell'

/**
 * /developers — public developer landing page.
 *
 * Fronts the Knowcap MCP server for people building agents, not people
 * evaluating the product. Same "Editorial Light" chrome as every other
 * subpage (see components/editorial/shell.tsx); the CSS below is a small,
 * page-scoped extension for the connect/stats/link-card blocks, in the
 * same pattern as meet-us (mu-*) and compare (ch-*).
 */

const REGISTER_URL = 'https://app.knowcap.ai/register?utm_source=developers_page'

export const metadata: Metadata = {
  title: 'Knowcap for Developers — MCP Server for AI Agents',
  description:
    'Connect Claude, Cursor, Codex, or Gemini to Knowcap in one line. 79 tools across 12 areas give your agents human-verified meeting facts, with citations back to the source.',
  alternates: { canonical: 'https://knowcap.ai/developers' },
  openGraph: {
    title: 'Knowcap for Developers — MCP Server for AI Agents',
    description:
      'One line connects your agents to human-verified meeting facts — 79 tools, 12 areas, full audit trail.',
    url: 'https://knowcap.ai/developers',
    type: 'website',
    images: [{ url: '/og/default.jpg', width: 1376, height: 768, alt: 'Knowcap for Developers' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og/default.jpg'],
  },
}

const CONNECT_CMD = 'claude mcp add --transport http knowcap https://mcp.knowcap.ai/mcp'

const STATS = [
  { n: '79', l: 'Tools' },
  { n: '12', l: 'Tool areas' },
  { n: '8', l: 'Resources' },
  { n: '8', l: 'Slash prompts' },
]

const AREAS = [
  'Projects', 'Sources', 'Memories', 'Artifacts', 'Folders', 'Chats',
  'Speakers', 'Sharing', 'Search', 'Digest', 'Hierarchy', 'Workflow',
]

const CLIENTS = ['Claude Code', 'claude.ai', 'Cursor', 'Codex', 'Gemini']

const REFERENCE_LINKS = [
  {
    kicker: 'Reference',
    title: 'Full API + tool reference',
    body: 'Every tool, resource, and prompt — parameters, return shapes, and examples.',
    href: 'https://docs.knowcap.ai',
    cta: 'Read the docs',
  },
  {
    kicker: 'Setup',
    title: 'Setup guide',
    body: 'Step-by-step connection instructions for every supported client.',
    href: 'https://mcp.knowcap.ai',
    cta: 'View setup guide',
  },
  {
    kicker: 'Machine-readable',
    title: 'Tool manifest',
    body: 'The full tool schema as JSON — for building against the server directly.',
    href: 'https://mcp.knowcap.ai/tools.json',
    cta: 'Get tools.json',
  },
]

const CSS = `
.dv-section{padding:56px 0}
.dv-section:first-of-type{padding-top:8px}
@media(max-width:720px){.dv-section{padding:40px 0}}
.dv-section-head{max-width:640px;margin:0 auto 36px;text-align:center}
.dv-h2{font-weight:460;font-variation-settings:'SOFT' 55,'WONK' 0;
  font-size:clamp(1.6rem,3vw,2.2rem);line-height:1.15;letter-spacing:-.015em;margin-top:10px}
.dv-lead{margin-top:14px;font-size:16px;line-height:1.7;color:var(--sec)}

.dv-connect{max-width:760px;margin:0 auto;text-align:center}
.dv-code{margin-top:26px;background:var(--ink);color:rgba(251,250,248,.9);border-radius:6px;
  padding:20px 24px;font-family:var(--mono);font-size:13.5px;line-height:1.6;text-align:left;
  overflow-x:auto;box-shadow:0 24px 60px rgba(24,24,27,.18)}
.dv-code .dv-prompt{color:var(--green-dark);margin-right:2px}
.dv-notes{margin-top:20px;display:flex;flex-direction:column;gap:8px}
.dv-note{font-size:14px;line-height:1.6;color:var(--sec)}
.dv-note strong{color:var(--ink)}

.dv-stats{display:grid;grid-template-columns:repeat(5,1fr);gap:14px;max-width:920px;margin:0 auto}
@media(max-width:760px){.dv-stats{grid-template-columns:repeat(3,1fr)}}
@media(max-width:480px){.dv-stats{grid-template-columns:repeat(2,1fr)}}
.dv-stat{text-align:center;padding:20px 10px;border:1px solid var(--border);border-radius:10px;background:var(--white)}
.dv-stat-n{font-family:var(--disp);font-weight:560;font-size:1.9rem;color:var(--green-deep);letter-spacing:-.02em}
.dv-stat-l{margin-top:4px;font-size:12px;color:var(--sec)}

.dv-areas{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;max-width:760px;margin:32px auto 0}
.dv-area{font-family:var(--mono);font-size:12.5px;letter-spacing:.02em;color:var(--ink-soft);
  border:1px solid var(--border-2);border-radius:20px;padding:7px 16px;background:var(--white)}

.dv-clients{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;align-items:center;max-width:760px;margin:0 auto}
.dv-client{font-family:var(--disp);font-weight:520;font-size:15px;color:var(--ink);
  border:1px solid var(--border);border-radius:8px;padding:12px 22px;background:var(--white)}
.dv-client-any{font-family:var(--body);font-size:14px;color:var(--sec)}

.dv-linkgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;max-width:1040px;margin:0 auto}
@media(max-width:860px){.dv-linkgrid{grid-template-columns:1fr}}
.dv-linkcard{display:flex;flex-direction:column;padding:26px 24px;border:1px solid var(--border);
  border-radius:12px;background:var(--white);text-decoration:none;
  transition:border-color .15s,box-shadow .15s,transform .15s}
.dv-linkcard:hover{border-color:rgba(31,107,58,.4);box-shadow:0 10px 28px rgba(24,24,27,.08);transform:translateY(-2px)}
.dv-link-kicker{font-family:var(--mono);font-size:10.5px;font-weight:500;letter-spacing:.12em;
  text-transform:uppercase;color:var(--green)}
.dv-linkcard h3{font-family:var(--disp);font-weight:540;font-size:1.1rem;margin:10px 0 8px;color:var(--ink)}
.dv-linkcard p{font-size:13.5px;line-height:1.6;color:var(--sec);flex:1}
.dv-linkcard-go{margin-top:16px;font-family:var(--mono);font-size:12px;color:var(--sec);transition:color .15s ease}
.dv-linkcard:hover .dv-linkcard-go{color:var(--green)}

.dv-closer-wrap{padding:56px 0 110px}
@media(max-width:860px){.dv-closer-wrap{padding:40px 0 72px}}
.dv-closer{background:var(--ink);color:var(--cream);border-radius:4px;padding:64px 56px;
  display:grid;grid-template-columns:repeat(12,1fr);gap:24px;align-items:center}
@media(max-width:860px){.dv-closer{grid-template-columns:1fr;row-gap:32px;padding:48px 30px}}
.dv-closer-text{grid-column:1/span 8}
.dv-closer-ctas{grid-column:9/span 4;display:flex;flex-direction:column;align-items:stretch;gap:12px}
@media(max-width:860px){.dv-closer-text,.dv-closer-ctas{grid-column:1/-1}
  .dv-closer-ctas{flex-direction:row;flex-wrap:wrap}}
.dv-closer .cl-kicker{color:rgba(251,250,248,.6)}
.dv-closer h2{font-weight:440;font-variation-settings:'SOFT' 55,'WONK' 0;
  font-size:clamp(1.6rem,3vw,2.1rem);line-height:1.22;letter-spacing:-.015em;margin-top:14px;color:var(--cream)}
.dv-closer-sub{margin-top:16px;font-size:15.5px;line-height:1.6;color:rgba(251,250,248,.7)}
.dv-closer .cl-btn{text-align:center}
.dv-closer .cl-btn--solid:hover{background:var(--green-dark);border-color:var(--green-dark);color:var(--ink)}
.dv-closer .cl-btn--ghost{color:var(--cream);border-color:rgba(251,250,248,.45)}
.dv-closer .cl-btn--ghost:hover{background:var(--cream);color:var(--ink);border-color:var(--cream)}
`

export default function DevelopersPage() {
  return (
    <EditorialShell>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <PageHero
        kicker="Developers"
        title={<>Give your agents verified facts, not guesses.</>}
        sub="Knowcap ships as an MCP server. Connect Claude, Cursor, Codex, or Gemini and your agents read what a named human already confirmed — every fact cited back to the exact moment it was said."
      />

      <div className="cl-page-body">
        <div className="cl-wrap">

          {/* ---------------------------------------------------- connect */}
          <section className="dv-section">
            <div className="dv-connect">
              <span className="cl-kicker">Connect</span>
              <h2 className="dv-h2">One line, and you&rsquo;re in.</h2>
              <p className="dv-lead">
                From Claude Code:
              </p>
              <pre className="dv-code" aria-label="Connect Knowcap via Claude Code">
                <span className="dv-prompt">$</span>{CONNECT_CMD}
              </pre>
              <div className="dv-notes">
                <p className="dv-note">
                  <strong>No API key to copy</strong> — this opens a browser sign-in.
                </p>
                <p className="dv-note">
                  Using claude.ai on the web? Add <strong>https://mcp.knowcap.ai/mcp</strong> as a
                  custom connector — same URL, no extra steps.
                </p>
              </div>
            </div>
          </section>

          {/* -------------------------------------------------- what's in */}
          <section className="dv-section">
            <div className="dv-section-head">
              <span className="cl-kicker">What&rsquo;s inside</span>
              <h2 className="dv-h2">One server, twelve tool areas.</h2>
              <p className="dv-lead">
                79 tools cover projects, sources, memories, artifacts, folders, chats, speakers,
                sharing, search, digest, hierarchy, and workflow. Every tool declares what it does
                before it runs, so your agent asks before making a change it cannot take back.
                There are also 8 resources and 8 slash prompts.
              </p>
            </div>
            <div className="dv-stats">
              {STATS.map((s) => (
                <div key={s.l} className="dv-stat">
                  <div className="dv-stat-n">{s.n}</div>
                  <div className="dv-stat-l">{s.l}</div>
                </div>
              ))}
            </div>
            <div className="dv-areas">
              {AREAS.map((a) => (
                <span key={a} className="dv-area">{a}</span>
              ))}
            </div>
          </section>

          {/* ------------------------------------------------- works with */}
          <section className="dv-section">
            <div className="dv-section-head">
              <span className="cl-kicker">Works with</span>
              <h2 className="dv-h2">Bring your own client.</h2>
              <p className="dv-lead">
                Claude Code, claude.ai, and any MCP-compatible client.
              </p>
            </div>
            <div className="dv-clients">
              {CLIENTS.map((c) => (
                <span key={c} className="dv-client">{c}</span>
              ))}
              <span className="dv-client-any">+ any MCP-compatible client</span>
            </div>
          </section>

          {/* --------------------------------------------------- reference */}
          <section className="dv-section">
            <div className="dv-section-head">
              <span className="cl-kicker">Reference</span>
              <h2 className="dv-h2">Everything you need to build.</h2>
            </div>
            <div className="dv-linkgrid">
              {REFERENCE_LINKS.map((l) => (
                <a key={l.href} href={l.href} className="dv-linkcard">
                  <span className="dv-link-kicker">{l.kicker}</span>
                  <h3>{l.title}</h3>
                  <p>{l.body}</p>
                  <span className="dv-linkcard-go">{l.cta} →</span>
                </a>
              ))}
            </div>
          </section>

        </div>
      </div>

      {/* ------------------------------------------------------- closer */}
      <section className="dv-closer-wrap">
        <div className="cl-wrap">
          <div className="dv-closer">
            <div className="dv-closer-text">
              <span className="cl-kicker">Knowcap <span className="cl-kdot">·</span> Get building</span>
              <h2>Your agents are only as good as what they know is true.</h2>
              <p className="dv-closer-sub">
                Connect the MCP server and give them a source of confirmed facts, with receipts.
              </p>
            </div>
            <div className="dv-closer-ctas">
              <a className="cl-btn cl-btn--solid" href="https://docs.knowcap.ai">
                Read the docs
              </a>
              <a className="cl-btn cl-btn--ghost" href={REGISTER_URL}>
                Get Started Free
              </a>
            </div>
          </div>
        </div>
      </section>
    </EditorialShell>
  )
}
