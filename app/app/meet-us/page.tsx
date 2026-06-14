'use client'

/**
 * Meet Us — "let us connect" router page.
 * Re-skinned onto the V6b "Editorial Light" system (EditorialShell + PageHero).
 * Five stakeholder cards route to the real internal pages: /invest, /partner,
 * /team, /vendor, /book. Positioning line ties Knowcap to the trust layer.
 */

import { useEffect } from 'react'
import Link from 'next/link'
import { Users, TrendingUp, Handshake, HeartHandshake, UserCog } from 'lucide-react'
import EditorialShell, { PageHero } from '@/components/editorial/shell'

const MU_CSS = `
.mu-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:8px}
@media(max-width:920px){.mu-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:600px){.mu-grid{grid-template-columns:1fr}}

.mu-card{display:flex;flex-direction:column;align-items:flex-start;text-align:left;
  padding:28px 26px 26px;border:1px solid var(--border);border-radius:12px;
  background:var(--white);transition:border-color .2s ease,box-shadow .2s ease,transform .2s ease}
.mu-card:hover{border-color:rgba(31,107,58,.4);transform:translateY(-3px);
  box-shadow:0 10px 28px rgba(24,24,27,.08)}

.mu-ico{width:48px;height:48px;border-radius:11px;display:flex;align-items:center;
  justify-content:center;background:var(--green-tint);color:var(--green-deep);margin-bottom:18px}
.mu-ico svg{width:24px;height:24px}

.mu-card-kicker{font-family:var(--mono);font-size:10.5px;font-weight:500;letter-spacing:.14em;
  text-transform:uppercase;color:var(--green);margin-bottom:8px}
.mu-card h3{font-family:var(--disp);font-weight:540;font-variation-settings:'SOFT' 55,'WONK' 0;
  font-size:1.18rem;line-height:1.25;letter-spacing:-.01em;color:var(--ink)}
.mu-card p{margin-top:10px;font-size:14.5px;line-height:1.65;color:var(--sec)}
.mu-card-go{margin-top:auto;padding-top:18px;font-family:var(--mono);font-size:12px;
  letter-spacing:.04em;color:var(--sec);transition:color .15s ease;display:inline-flex;
  align-items:center;gap:6px}
.mu-card:hover .mu-card-go{color:var(--green)}
.mu-card-go .mu-arr{transition:transform .2s ease}
.mu-card:hover .mu-card-go .mu-arr{transform:translateX(3px)}

.mu-note{margin:48px auto 0;max-width:60ch;text-align:center;font-family:var(--mono);
  font-size:12.5px;line-height:1.7;letter-spacing:.02em;color:var(--sec)}
.mu-note::before{content:'* ';color:var(--green)}
.mu-note a{color:var(--green);text-decoration:underline;text-underline-offset:3px}
`

const STAKEHOLDERS = [
  {
    id: 'book',
    kicker: 'Customers',
    title: 'Strategy Consultation',
    icon: Users,
    description:
      'Walk through your delivery loop and see how verified work intelligence fits your team.',
    route: '/book',
    cta: 'Book a session',
  },
  {
    id: 'invest',
    kicker: 'Investors',
    title: 'Investor Discussion',
    icon: TrendingUp,
    description:
      'Explore the vision, the moat, and the growth roadmap behind the trust layer for AI agents.',
    route: '/invest',
    cta: 'Talk investment',
  },
  {
    id: 'partner',
    kicker: 'Builders',
    title: 'Technology Partnership',
    icon: Handshake,
    description:
      'Build verified, agent-ready workflows together — strategic collaboration, real integrations.',
    route: '/partner',
    cta: 'Partner with us',
  },
  {
    id: 'team',
    kicker: 'Talent',
    title: 'Culture & Team Fit',
    icon: HeartHandshake,
    description:
      'Meet the people building Knowcap and find out where your mindset fits.',
    route: '/team',
    cta: 'Meet the team',
  },
  {
    id: 'vendor',
    kicker: 'Vendors',
    title: 'Vendor Partnership',
    icon: UserCog,
    description:
      'Discuss B2B partnerships, procurement, and collaboration opportunities with Knowcap.',
    route: '/vendor',
    cta: 'Start a conversation',
  },
]

export default function MeetUsPage() {
  useEffect(() => {
    document.title = 'Meet Us | Knowcap.ai'
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: MU_CSS }} />
      <EditorialShell>
        <PageHero
          kicker="Connect with us"
          title={
            <>
              Let&rsquo;s meet &amp; <span style={{ color: 'var(--green)' }}>collaborate</span>.
            </>
          }
          sub="Knowcap is the trust layer for AI agents — verified work intelligence your team confirms and your agents act on. Whether you are a customer, investor, partner, future teammate, or vendor, pick the door that fits."
        />
        <div className="cl-page-body">
          <div className="cl-wrap">
            <div className="mu-grid">
              {STAKEHOLDERS.map((s) => {
                const Icon = s.icon
                return (
                  <Link key={s.id} href={s.route} className="mu-card">
                    <span className="mu-ico" aria-hidden="true">
                      <Icon strokeWidth={1.75} />
                    </span>
                    <span className="mu-card-kicker">{s.kicker}</span>
                    <h3>{s.title}</h3>
                    <p>{s.description}</p>
                    <span className="mu-card-go">
                      {s.cta} <span className="mu-arr" aria-hidden="true">→</span>
                    </span>
                  </Link>
                )
              })}
            </div>
            <p className="mu-note">
              Not sure which fits? <Link href="/contact-us">Contact us</Link> and we&rsquo;ll point
              you to the right person.
            </p>
          </div>
        </div>
      </EditorialShell>
    </>
  )
}
