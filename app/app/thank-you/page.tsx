'use client'

/**
 * /thank-you — form-success landing (redirect target for contact-us + careers).
 * V6b "Editorial Light" re-skin: cream paper, Fraunces display, green accent,
 * dark-ink footer supplied by EditorialShell. The legacy blue gradient hero,
 * its display font, and the standalone footer import were removed.
 *
 * Keeps the original ?type= switch (beta / contact / application / default) and
 * the Suspense boundary required around useSearchParams.
 */

import { useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import EditorialShell, { PageHero } from '@/components/editorial/shell'

const TY_CSS = `
.ty-body{padding:24px 0 110px}
.ty-confirm{max-width:640px;margin:0 auto;text-align:center}

/* check seal */
.ty-seal{width:58px;height:58px;margin:0 auto 26px;border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  background:var(--green-tint);border:1px solid color-mix(in srgb,var(--green) 28%,transparent)}
.ty-seal svg{width:26px;height:26px;stroke:var(--green);stroke-width:2.4;
  stroke-linecap:round;stroke-linejoin:round;fill:none}

.ty-msg{margin:0 auto;font-size:16.5px;line-height:1.75;color:var(--sec);max-width:54ch}

.ty-cta-row{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin-top:34px}

/* connect band */
.ty-connect{margin-top:18px;padding-top:46px;border-top:1px solid var(--border)}
.ty-connect-head{text-align:center;margin-bottom:30px}
.ty-connect-head .cl-kicker{display:block;margin-bottom:12px}
.ty-connect-h2{font-family:var(--disp);font-weight:460;
  font-variation-settings:'SOFT' 55,'WONK' 0;letter-spacing:-.02em;
  font-size:clamp(1.4rem,2.6vw,1.85rem);line-height:1.15}
.ty-connect-sub{margin:12px auto 0;font-size:15px;line-height:1.65;color:var(--sec);max-width:46ch}

.ty-cards{display:grid;grid-template-columns:1fr 1fr;gap:18px;max-width:760px;margin:0 auto}
@media(max-width:640px){.ty-cards{grid-template-columns:1fr}}
.ty-card{display:block;background:var(--white);border:1px solid var(--border);border-radius:10px;
  padding:26px 24px;transition:border-color .18s ease,transform .18s ease,box-shadow .18s ease}
.ty-card:hover{border-color:color-mix(in srgb,var(--green) 35%,var(--border));
  transform:translateY(-2px);box-shadow:0 10px 26px rgba(24,24,27,.07)}
.ty-card-top{display:flex;align-items:center;gap:13px;margin-bottom:14px}
.ty-card-ico{width:42px;height:42px;border-radius:9px;flex-shrink:0;
  display:flex;align-items:center;justify-content:center;
  background:var(--green-tint);border:1px solid color-mix(in srgb,var(--green) 22%,transparent)}
.ty-card-ico svg{width:20px;height:20px;stroke:var(--green);stroke-width:2;
  stroke-linecap:round;stroke-linejoin:round;fill:none}
.ty-card-h3{font-family:var(--body);font-size:16px;font-weight:600;color:var(--ink);margin:0}
.ty-card-p{font-size:14px;line-height:1.6;color:var(--sec);margin:0 0 16px}
.ty-card-go{display:inline-flex;align-items:center;gap:7px;font-size:13.5px;font-weight:600;
  font-family:var(--mono);letter-spacing:.02em;color:var(--green)}
.ty-card:hover .ty-card-go{gap:10px}
.ty-card-go svg{width:15px;height:15px;stroke:currentColor;stroke-width:2.2;
  stroke-linecap:round;stroke-linejoin:round;fill:none;transition:transform .18s ease}
.ty-card:hover .ty-card-go svg{transform:translateX(3px)}

.ty-loading{min-height:70vh;display:flex;align-items:center;justify-content:center}
.ty-loading-inner{text-align:center;color:var(--sec)}
.ty-spinner{width:34px;height:34px;margin:0 auto 16px;border-radius:50%;
  border:3px solid var(--border-2);border-top-color:var(--green);
  animation:ty-spin .8s linear infinite}
.ty-loading-txt{font-family:var(--mono);font-size:12px;letter-spacing:.1em;text-transform:uppercase}
@keyframes ty-spin{to{transform:rotate(360deg)}}
`

function getMessage(type: string) {
  switch (type) {
    case 'beta':
      return {
        kicker: 'Beta application',
        title: 'Thanks — your application is in.',
        message:
          'We are reviewing applications and will be in touch within 48 hours if your profile is a strong match for the pilot program.',
      }
    case 'contact':
      return {
        kicker: 'Message received',
        title: 'Thanks — we will be in touch.',
        message:
          'Our team will review your message and get back to you within 24 hours. We appreciate your interest in Knowcap.',
      }
    case 'application':
      return {
        kicker: 'Application submitted',
        title: 'Thanks for applying to join the team.',
        message:
          'We are glad you want to build with us. Our team will review your application and reach out if your profile matches what we are looking for.',
      }
    default:
      return {
        kicker: 'Submission received',
        title: 'Thanks — we will be in touch.',
        message: 'Your submission has been received. We will get back to you soon.',
      }
  }
}

function ThankYouContent() {
  const searchParams = useSearchParams()
  const type = searchParams.get('type') || 'submission'

  useEffect(() => {
    document.title = 'Thank You | Knowcap'
  }, [])

  useEffect(() => {
    // Google Ads conversion — fires once when a real lead form (beta / contact)
    // lands here. 'application' = a careers/job applicant, not an ad lead — skip.
    if (type !== 'beta' && type !== 'contact') return
    ;(window as any).gtag?.('event', 'conversion', {
      send_to: 'AW-18263083552/T8BkCM-svMMcEKCUwoRE',
      value: 1.0,
      currency: 'EGP',
    })
  }, [type])

  const content = getMessage(type)

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: TY_CSS }} />
      <EditorialShell>
        <PageHero kicker={content.kicker} title={content.title} />
        <div className="ty-body">
          <div className="cl-wrap">
            <div className="ty-confirm">
              <div className="ty-seal" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <p className="ty-msg">{content.message}</p>
              <div className="ty-cta-row">
                <Link className="cl-btn cl-btn--solid" href="/">
                  Back to home →
                </Link>
                <Link className="cl-btn cl-btn--ghost" href="/contact-us">
                  Contact us
                </Link>
              </div>
            </div>

            <div className="ty-connect">
              <div className="ty-connect-head">
                <span className="cl-kicker">
                  Knowcap <span className="cl-kdot">·</span> Stay connected
                </span>
                <h2 className="ty-connect-h2">Follow along while we build</h2>
                <p className="ty-connect-sub">
                  Join the community and follow the journey as Knowcap becomes the trust layer for AI agents.
                </p>
              </div>

              <div className="ty-cards">
                <a
                  className="ty-card"
                  href="https://www.instagram.com/knowcap.ai?igsh=dXF3bnJueW5ocXc2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="ty-card-top">
                    <span className="ty-card-ico" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
                        <circle cx="12" cy="12" r="4.2" />
                        <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
                      </svg>
                    </span>
                    <h3 className="ty-card-h3">Follow on Instagram</h3>
                  </div>
                  <p className="ty-card-p">
                    Behind-the-scenes builds, product launches, and the story as it happens.
                  </p>
                  <span className="ty-card-go">
                    Follow us
                    <svg viewBox="0 0 24 24">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </a>

                <a
                  className="ty-card"
                  href="https://chat.whatsapp.com/EJEH9M7Edb4CupXijC7GCE"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="ty-card-top">
                    <span className="ty-card-ico" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.7-5.2A8.5 8.5 0 1 1 21 11.5Z" />
                        <path d="M8.6 8.4c.2-.5.4-.5.7-.5h.5c.2 0 .4 0 .6.5l.7 1.6c.1.2 0 .4 0 .5l-.4.5c-.1.2-.2.3 0 .6.5.8 1.2 1.4 2 1.8.3.2.4.1.6 0l.5-.6c.2-.2.3-.2.5-.1l1.5.7c.2.1.4.2.4.4 0 .5-.2 1.3-.6 1.5-.4.3-1 .5-2.6-.1a8 8 0 0 1-4.4-4.3c-.3-.8-.3-1.5-.1-1.9Z" />
                      </svg>
                    </span>
                    <h3 className="ty-card-h3">Join the WhatsApp community</h3>
                  </div>
                  <p className="ty-card-p">
                    Ask questions, swap notes with other teams, and get early access to updates.
                  </p>
                  <span className="ty-card-go">
                    Join community
                    <svg viewBox="0 0 24 24">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </EditorialShell>
    </>
  )
}

export default function ThankYouPage() {
  return (
    <Suspense
      fallback={
        <div className="cl-root">
          <style dangerouslySetInnerHTML={{ __html: TY_CSS }} />
          <div className="ty-loading">
            <div className="ty-loading-inner">
              <div className="ty-spinner" />
              <p className="ty-loading-txt">Loading</p>
            </div>
          </div>
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  )
}
