'use client'

/**
 * EditorialShell — shared V6b "Editorial Light" chrome for every subpage.
 *
 * Same design language as the homepage (components/home-commitment.tsx):
 * cream paper, Fraunces display (SOFT/WONK axes), Inter body, JetBrains Mono
 * marginalia, green #1F6B3A accent, ink header bar, dark ink footer.
 * The token + chrome CSS below is a subset of the homepage CSS string —
 * if you change tokens here, change them there too.
 */

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const APP_URL = 'https://app.knowcap.ai'

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:ital,wght@0,400;0,500;1,400&family=Space+Grotesk:wght@400;500;600;700&display=swap');

.cl-root{
  --cream:#FBFAF8; --white:#FFFFFF; --border:#E7E4DD; --border-2:#DCD7CB;
  --ink:#18181B; --ink-soft:#2A2A2F; --sec:#4A4F5A;
  --green:#1F6B3A; --green-deep:#17522C; --green-tint:#E8F5ED; --green-dark:#7ED39B;
  --amber:#B07C28;
  --disp:'Space Grotesk',system-ui,sans-serif;
  --body:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
  --mono:'JetBrains Mono','SFMono-Regular',monospace;
  background:var(--cream); color:var(--ink); font-family:var(--body);
  font-size:16px; line-height:1.6; -webkit-font-smoothing:antialiased;
  text-rendering:optimizeLegibility; min-height:100vh;
  display:flex; flex-direction:column;
}
.cl-root *,.cl-root *::before,.cl-root *::after{box-sizing:border-box}
.cl-root ::selection{background:var(--green-tint);color:var(--green-deep)}
.cl-root :where(h1,h2,h3){font-family:var(--disp);color:var(--ink);margin:0;text-wrap:balance}
.cl-root :where(p,blockquote,figure,figcaption,pre,ul,ol){margin:0;text-wrap:pretty}
.cl-root :where(a){color:inherit;text-decoration:none}
.cl-root a:focus-visible,.cl-root summary:focus-visible,.cl-root button:focus-visible{
  outline:2px solid var(--green);outline-offset:3px;border-radius:4px}
.cl-footer a:focus-visible{outline-color:var(--green-dark)}
.cl-wrap{max-width:1180px;margin:0 auto;padding:0 40px;width:100%}
@media(max-width:720px){.cl-wrap{padding:0 22px}}

/* mono kicker */
.cl-kicker{font-family:var(--mono);font-size:11px;font-weight:500;letter-spacing:.14em;
  text-transform:uppercase;color:var(--sec)}
.cl-kicker .cl-kdot{color:var(--green)}

/* header — light editorial masthead */
.cl-header{position:fixed;inset:0 0 auto 0;z-index:50;border-top:3px solid var(--ink);
  background:transparent;transition:background-color .25s,border-color .25s}
.cl-header[data-scrolled="true"]{background:rgba(251,250,248,.92);backdrop-filter:blur(8px);
  border-bottom:1px solid var(--border)}
.cl-nav{display:flex;align-items:center;justify-content:space-between;height:64px}
.cl-brand{display:flex;align-items:center;gap:10px;font-family:var(--disp);font-weight:600;
  font-size:19px;letter-spacing:-.01em;font-variation-settings:'SOFT' 40,'WONK' 0;color:var(--ink)}
.cl-brand img{border-radius:6px}
.cl-brand-cap{color:var(--green)}
.cl-navlinks{display:flex;gap:26px}
@media(max-width:760px){.cl-navlinks{display:none}}
.cl-navlink{font-size:13.5px;font-weight:500;color:var(--sec);transition:color .15s}
.cl-navlink:hover{color:var(--green)}
.cl-navauth{display:flex;align-items:center;gap:16px}
.cl-login{font-size:13.5px;font-weight:500;color:var(--sec);transition:color .15s}
.cl-login:hover{color:var(--ink)}

/* buttons */
.cl-btn{display:inline-block;font-family:var(--body);font-size:15px;font-weight:600;
  letter-spacing:.01em;padding:14px 28px;border-radius:3px;cursor:pointer;
  transition:background-color .18s ease,color .18s ease,border-color .18s ease,
    transform .18s ease,box-shadow .18s ease}
.cl-btn--solid{background:var(--green);color:#fff;border:1px solid var(--green)}
.cl-btn--solid:hover{background:var(--green-deep);border-color:var(--green-deep);
  transform:translateY(-1px);box-shadow:0 6px 18px rgba(31,107,58,.22)}
.cl-btn--ghost{background:transparent;color:var(--ink);border:1px solid var(--ink)}
.cl-btn--ghost:hover{background:var(--ink);color:var(--cream);transform:translateY(-1px)}
.cl-btn--sm{padding:9px 18px;font-size:13.5px}

/* subpage hero */
.cl-page-main{flex:1}
.cl-page-hero{padding:148px 0 42px;text-align:center}
@media(max-width:720px){.cl-page-hero{padding:120px 0 32px}}
.cl-page-hero .cl-kicker{display:block;margin-bottom:18px}
.cl-page-h1{font-weight:460;font-variation-settings:'SOFT' 55,'WONK' 0;
  font-size:clamp(2.1rem,4.4vw,3.4rem);line-height:1.1;letter-spacing:-.02em}
.cl-page-sub{margin:22px auto 0;font-size:17px;line-height:1.7;color:var(--sec);max-width:58ch}
.cl-page-body{padding:24px 0 110px}

/* prose — legal + long-form pages */
.cl-prose{max-width:760px;margin:0 auto;font-size:15.5px;line-height:1.75;color:var(--ink-soft)}
.cl-prose h2{font-size:1.55rem;font-weight:500;font-variation-settings:'SOFT' 55,'WONK' 0;
  margin:44px 0 14px;letter-spacing:-.012em}
.cl-prose h3{font-size:1.15rem;font-weight:560;margin:30px 0 10px}
.cl-prose p{margin:0 0 14px}
.cl-prose ul,.cl-prose ol{margin:0 0 14px;padding-left:24px}
.cl-prose li{margin-bottom:6px}
.cl-prose a{color:var(--green);text-decoration:underline;text-underline-offset:3px}
.cl-prose strong{color:var(--ink)}

/* cards + form fields on editorial paper */
.cl-card{background:var(--white);border:1px solid var(--border);border-radius:10px}
.cl-input{width:100%;font-family:var(--body);font-size:15px;color:var(--ink);
  background:var(--white);border:1px solid var(--border-2);border-radius:6px;
  padding:12px 14px;outline:none;transition:border-color .15s,box-shadow .15s}
.cl-input:focus{border-color:var(--green);box-shadow:0 0 0 3px var(--green-tint)}
.cl-label{display:block;font-size:13px;font-weight:600;color:var(--ink);margin-bottom:6px}

/* footer — dark, 4-column sitemap */
.cl-footer{background:var(--ink);color:rgba(251,250,248,.65);padding:56px 0 44px;font-size:13.5px}
.cl-footer-top{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;
  gap:14px 28px;padding-bottom:30px;margin-bottom:32px;border-bottom:1px solid rgba(251,250,248,.12)}
.cl-footer-brand{display:flex;align-items:center;gap:10px;font-family:var(--disp);
  font-weight:600;font-size:16px;font-variation-settings:'SOFT' 40,'WONK' 0;color:var(--cream)}
.cl-footer-brand img{border-radius:5px}
.cl-footer-line{font-family:var(--mono);font-size:11.5px;letter-spacing:.03em;
  color:rgba(251,250,248,.65)}
.cl-footer-line .cl-fl-ink{color:var(--cream)}
.cl-footer-line .cl-fl-green{color:var(--green-dark)}
.cl-footer-cols{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:28px 36px}
@media(max-width:720px){.cl-footer-cols{grid-template-columns:repeat(2,1fr);gap:28px 24px}}
.cl-fcol{display:flex;flex-direction:column;gap:9px}
.cl-fcol-h{font-family:var(--mono);font-size:10.5px;font-weight:500;letter-spacing:.12em;
  text-transform:uppercase;color:var(--green-dark);margin-bottom:3px}
.cl-fcol a{color:rgba(251,250,248,.65);transition:color .15s;font-size:13px}
.cl-fcol a:hover{color:var(--cream)}
.cl-footer-bottom{margin-top:34px;padding-top:18px;border-top:1px solid rgba(251,250,248,.12)}
.cl-footer-copy{font-family:var(--mono);font-size:11.5px;letter-spacing:.03em;
  color:rgba(251,250,248,.55)}
`

export function EditorialHeader() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header className="cl-header" data-scrolled={scrolled}>
      <div className="cl-wrap cl-nav">
        <Link href="/" className="cl-brand">
          <Image src="/logos/logo.jpg" alt="" width={28} height={28} priority />
          <span>Know<span className="cl-brand-cap">cap</span></span>
        </Link>
        <nav className="cl-navlinks" aria-label="Primary">
          <a className="cl-navlink" href="/#loop">How it works</a>
          <a className="cl-navlink" href="/#mcp">For your agents</a>
          <a className="cl-navlink" href="/#faq">FAQ</a>
          <Link className="cl-navlink" href="/compare">Compare</Link>
          <Link className="cl-navlink" href="/contact-us">Contact</Link>
        </nav>
        <div className="cl-navauth">
          <a className="cl-login" href={`${APP_URL}/login`}>Log in</a>
          <a className="cl-btn cl-btn--solid cl-btn--sm" href={`${APP_URL}/register`}>Get Started Free</a>
        </div>
      </div>
    </header>
  )
}

export function EditorialFooter() {
  return (
    <footer className="cl-footer">
      <div className="cl-wrap">
        <div className="cl-footer-top">
          <div className="cl-footer-brand">
            <Image src="/logos/logo.jpg" alt="" width={22} height={22} />
            Knowcap
          </div>
          <p className="cl-footer-line">
            <span className="cl-fl-ink">Knowcap</span> is verified work intelligence for AI agents.{' '}
            <span className="cl-fl-green">Humans confirm. Agents act.</span>
          </p>
        </div>
        <nav className="cl-footer-cols" aria-label="Footer">
          <div className="cl-fcol">
            <div className="cl-fcol-h">Product</div>
            <a href="/#loop">How it works</a>
            <a href="/#mcp">For your agents</a>
            <a href="/#faq">FAQ</a>
            <Link href="/for/odoo-partners">For Odoo partners</Link>
            <Link href="/developers">Developers</Link>
          </div>
          <div className="cl-fcol">
            <div className="cl-fcol-h">Compare</div>
            <Link href="/compare/knowcap-vs-otter">Knowcap vs Otter</Link>
            <Link href="/compare/knowcap-vs-fireflies">Knowcap vs Fireflies</Link>
            <Link href="/compare/knowcap-vs-granola">Knowcap vs Granola</Link>
            <Link href="/compare/knowcap-vs-fellow">Knowcap vs Fellow</Link>
            <Link href="/compare/knowcap-vs-read-ai">Knowcap vs Read.ai</Link>
          </div>
          <div className="cl-fcol">
            <div className="cl-fcol-h">Company</div>
            <Link href="/blog">Blog</Link>
            <Link href="/team">Team</Link>
            <Link href="/careers">Careers</Link>
            <Link href="/meet-us">Meet us</Link>
            <Link href="/contact-us">Contact</Link>
          </div>
          <div className="cl-fcol">
            <div className="cl-fcol-h">Get started</div>
            <a href={`${APP_URL}/register`}>Get Started Free</a>
            <a href={`${APP_URL}/login`}>Log in</a>
            <Link href="/policy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </nav>
        <div className="cl-footer-bottom">
          <span className="cl-footer-copy">© 2026 Knowcap</span>
        </div>
      </div>
    </footer>
  )
}

export function PageHero({
  kicker,
  title,
  sub,
}: {
  kicker?: string
  title: React.ReactNode
  sub?: React.ReactNode
}) {
  return (
    <div className="cl-page-hero">
      <div className="cl-wrap">
        {kicker && (
          <span className="cl-kicker">
            Knowcap <span className="cl-kdot">·</span> {kicker}
          </span>
        )}
        <h1 className="cl-page-h1">{title}</h1>
        {sub && <p className="cl-page-sub">{sub}</p>}
      </div>
    </div>
  )
}

export default function EditorialShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="cl-root">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <EditorialHeader />
      <main className="cl-page-main">{children}</main>
      <EditorialFooter />
    </div>
  )
}
