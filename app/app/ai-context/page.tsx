import type { Metadata } from 'next'
import EditorialShell, { PageHero } from '@/components/editorial/shell'

/**
 * /ai-context — "Your AI finally knows the team" (direction B, picked by Hassan 16 Sep 2026).
 *
 * A NEW page; the homepage is untouched. Status pills are checked against production code
 * (design-manager run 50, 28 Sep 2026): WhatsApp, meetings, screen recordings and the Claude
 * connection are live; email is a one-email-at-a-time extension button; ChatGPT is not verified.
 * Change a pill only after re-checking the product. noindex until Hassan says it goes live.
 */

const REGISTER_URL = 'https://app.knowcap.ai/register?utm_source=ai_context_page'

export const metadata: Metadata = {
  title: 'Your AI Finally Knows the Team — Knowcap',
  description:
    'Knowcap listens to your meetings, reads your WhatsApp groups and watches your screen recordings, so Claude already has the context before you type the question.',
  robots: { index: false, follow: false },
}

type Status = 'live' | 'partial' | 'roadmap'

const SOURCES: { name: string; body: string; status: Status; pill: string }[] = [
  {
    name: 'WhatsApp groups',
    body: 'Pick the groups that matter. Knowcap keeps them synced in the background from the moment you link your number.',
    status: 'live',
    pill: 'Live today',
  },
  {
    name: 'Meetings',
    body: 'A bot joins your scheduled calls, records them and writes down who said what, searchable once the meeting ends.',
    status: 'live',
    pill: 'Live today',
  },
  {
    name: 'Screen recordings',
    body: 'Drop in a screen recording and Knowcap reads the screen itself (dashboards, tickets, documents), not just the narration.',
    status: 'live',
    pill: 'Live today',
  },
  {
    name: 'Email',
    body: 'One click in the browser extension sends the email you are reading into Knowcap. Reading your whole inbox on its own is not built yet.',
    status: 'partial',
    pill: 'Partial: one email at a time',
  },
]

const CSS = `
.ac-section{padding:56px 0}
@media(max-width:720px){.ac-section{padding:40px 0}}
.ac-head{max-width:640px;margin:0 auto 36px;text-align:center}
.ac-h2{font-weight:460;font-size:clamp(1.6rem,3vw,2.2rem);line-height:1.15;letter-spacing:-.015em;margin-top:10px}
.ac-lead{margin-top:14px;font-size:16px;line-height:1.7;color:var(--sec)}

.ac-ctas{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:28px}

.ac-chat{max-width:720px;margin:8px auto 0;background:var(--white);border:1px solid var(--border);
  border-radius:12px;box-shadow:0 24px 60px rgba(24,24,27,.10);overflow:hidden;text-align:left}
.ac-chat-bar{padding:12px 18px;border-bottom:1px solid var(--border);font-family:var(--mono);
  font-size:11.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--sec)}
.ac-chat-body{padding:22px;display:flex;flex-direction:column;gap:14px}
.ac-q{align-self:flex-end;max-width:80%;background:var(--cream);border:1px solid var(--border);
  border-radius:12px 12px 4px 12px;padding:11px 15px;font-size:14.5px}
.ac-a{max-width:92%;background:var(--green-tint);border-radius:12px 12px 12px 4px;padding:14px 16px;
  font-size:14.5px;line-height:1.65;color:var(--ink-soft)}
.ac-cites{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}
.ac-cite{font-family:var(--mono);font-size:11px;color:var(--green-deep);background:var(--white);
  border:1px solid var(--border);border-radius:20px;padding:2px 10px}
.ac-note{text-align:center;font-size:12.5px;color:var(--sec);margin-top:12px;font-style:italic}

.ac-sources{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
@media(max-width:960px){.ac-sources{grid-template-columns:repeat(2,1fr)}}
@media(max-width:520px){.ac-sources{grid-template-columns:1fr}}
.ac-src{background:var(--white);border:1px solid var(--border);border-radius:10px;padding:22px;
  display:flex;flex-direction:column}
.ac-src h3{font-size:1.05rem;font-weight:560}
.ac-src p{margin-top:8px;font-size:14px;line-height:1.6;color:var(--sec);flex:1}
.ac-pill{align-self:flex-start;margin-top:14px;font-family:var(--mono);font-size:11px;font-weight:500;
  border-radius:20px;padding:3px 10px}
.ac-pill--live{background:var(--green-tint);color:var(--green-deep)}
.ac-pill--partial{background:#FBEFD8;color:#7A4E0E}
.ac-pill--roadmap{background:#EEF0F3;color:var(--sec)}

.ac-mcp{background:var(--ink);color:var(--cream);border-radius:4px;padding:48px 40px}
@media(max-width:720px){.ac-mcp{padding:36px 22px}}
.ac-mcp .ac-h2{color:var(--cream);text-align:center}
.ac-mcp .cl-kicker{color:rgba(251,250,248,.6);display:block;text-align:center}
.ac-mcp-row{display:grid;grid-template-columns:1fr auto 1fr;gap:20px;align-items:center;margin-top:30px}
@media(max-width:720px){.ac-mcp-row{grid-template-columns:1fr}}
.ac-mcp-card{border:1px solid rgba(251,250,248,.14);border-radius:8px;padding:18px;text-align:center}
.ac-mcp-card strong{display:block;font-family:var(--disp);font-size:1.1rem;font-weight:560}
.ac-mcp-card span{display:block;margin-top:6px;font-family:var(--mono);font-size:11.5px}
.ac-mcp-card--live span{color:var(--green-dark)}
.ac-mcp-card--roadmap span{color:rgba(251,250,248,.6)}
.ac-mcp-mid{text-align:center;font-family:var(--mono);font-size:11px;letter-spacing:.1em;color:rgba(251,250,248,.5)}
.ac-mcp-text{margin-top:26px;font-size:15px;line-height:1.7;color:rgba(251,250,248,.75);max-width:720px;
  margin-left:auto;margin-right:auto}
.ac-mcp-text strong{color:var(--cream)}

.ac-proof{max-width:640px;margin:0 auto;border:1.5px dashed var(--border-2);border-radius:10px;
  padding:26px;text-align:center;color:var(--sec);font-size:14.5px;line-height:1.65}

.ac-closer{background:var(--green);border-radius:4px;padding:56px 32px;text-align:center;margin-bottom:110px}
.ac-closer h2{color:#fff;font-weight:460;font-size:clamp(1.5rem,3vw,2rem);max-width:560px;margin:0 auto}
.ac-closer p{color:rgba(255,255,255,.8);margin:14px auto 26px;max-width:520px}
.ac-closer .cl-btn{background:#fff;color:var(--green-deep);border-color:#fff}
.ac-closer .cl-btn:hover{background:var(--cream);border-color:var(--cream)}
`

export default function AiContextPage() {
  return (
    <EditorialShell registerHref={REGISTER_URL}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <PageHero
        kicker="Context for your AI"
        title={<>Your AI already knows what the team did this week.</>}
        sub="Knowcap listens to the meetings, reads the WhatsApp groups and watches the screen recordings, then lines it all up so Claude has the answer before you type the question. No more pasting context in from ten places."
      />

      <div className="cl-page-body">
        <div className="cl-wrap">
          <div className="ac-ctas" style={{ marginTop: 0, marginBottom: 40 }}>
            <a className="cl-btn cl-btn--solid" href={REGISTER_URL}>Give your AI the context</a>
            <a className="cl-btn cl-btn--ghost" href="#sources">See what it reads</a>
          </div>

          <div className="ac-chat" role="figure" aria-label="Example conversation with Claude, Knowcap connected">
            <div className="ac-chat-bar">Claude, with Knowcap connected</div>
            <div className="ac-chat-body">
              <div className="ac-q">What&rsquo;s blocking the launch?</div>
              <div className="ac-a">
                Two things: the pricing page copy is still waiting on legal sign-off (raised in
                Tuesday&rsquo;s stand-up), and the launch WhatsApp group flagged a checkout bug
                yesterday that nobody has picked up yet.
                <div className="ac-cites">
                  <span className="ac-cite">Tue stand-up, 09:14</span>
                  <span className="ac-cite">Launch group, yesterday</span>
                </div>
              </div>
            </div>
          </div>
          <p className="ac-note">An example of the shape of the answer, not a screenshot of a real account.</p>

          <section id="sources" className="ac-section">
            <div className="ac-head">
              <span className="cl-kicker">Where it listens</span>
              <h2 className="ac-h2">The team keeps working. Knowcap keeps up.</h2>
              <p className="ac-lead">Each label below says what works today, checked against the product itself.</p>
            </div>
            <div className="ac-sources">
              {SOURCES.map((s) => (
                <div key={s.name} className="ac-src">
                  <h3>{s.name}</h3>
                  <p>{s.body}</p>
                  <span className={`ac-pill ac-pill--${s.status}`}>{s.pill}</span>
                </div>
              ))}
            </div>
          </section>

          <section id="mcp" className="ac-section">
            <div className="ac-mcp">
              <span className="cl-kicker">How it reaches your AI</span>
              <h2 className="ac-h2">One connection, and Claude asks Knowcap directly.</h2>
              <div className="ac-mcp-row">
                <div className="ac-mcp-card ac-mcp-card--live">
                  <strong>Claude</strong>
                  <span>Live: Claude Code and claude.ai</span>
                </div>
                <div className="ac-mcp-mid">MCP</div>
                <div className="ac-mcp-card ac-mcp-card--roadmap">
                  <strong>ChatGPT</strong>
                  <span>Not yet</span>
                </div>
              </div>
              <p className="ac-mcp-text">
                You don&rsquo;t get a document to paste. Claude asks Knowcap the moment it needs the
                answer, over MCP, an open standard that works like a universal plug.{' '}
                <strong>The Claude connection works today. ChatGPT isn&rsquo;t connected yet</strong>,
                and we&rsquo;d rather say so than have you find out.
              </p>
            </div>
          </section>

          <section className="ac-section">
            <div className="ac-head">
              <span className="cl-kicker">Proof</span>
              <h2 className="ac-h2">Real results go here.</h2>
            </div>
            <div className="ac-proof">
              When early customers have run real weeks through Knowcap, this becomes their words and their
              numbers. Until then it stays empty on purpose.
            </div>
          </section>

          <div className="ac-closer">
            <h2>Give your AI the context it&rsquo;s been missing.</h2>
            <p>Connect WhatsApp, your meetings and Claude in about ten minutes.</p>
            <a className="cl-btn" href={REGISTER_URL}>Get started free</a>
          </div>
        </div>
      </div>
    </EditorialShell>
  )
}
