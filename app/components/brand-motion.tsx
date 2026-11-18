'use client'

/**
 * BrandMotion — the Brand System's motion and hover layer, mounted once per page
 * (home-commitment.tsx and editorial/shell.tsx). Plain DOM code, no package, one animation loop.
 *
 * Scroll-linked (read from the one loop, native scrolling):
 *   star field that streaks with scroll speed, progress line, headings word by word,
 *   parallax on pictures / cards / big numbers, pictures that open from a window,
 *   the four steps that light up in order with a line drawn along them,
 *   numbers that count and rules that draw, the moving "Works with" line that speeds up and leans,
 *   the closing band that grows in with its headline lit word by word, the hero globe that spins up.
 * Hover (fine pointers only):
 *   stronger button pull, sweep of light, press ripple, card tilt (8 degrees) with inner depth and a lit edge,
 *   header-link underline from the side the pointer came from, a pointer ring that stretches with speed,
 *   headline words that lean away from the pointer. (FAQ rows, footer links, works-with names, step counters,
 *   blog cards are CSS in the style tag below.)
 * Reduced motion: stars still, headings whole, nothing else moves. Touch: nothing depends on hover.
 */

import { useEffect, useLayoutEffect } from 'react'

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

const EASE = 'cubic-bezier(.2,.7,.2,1)'

const CSS = `
.cl-root{position:relative;isolation:isolate}
.cl-root > section,.cl-root > main,.cl-root > footer{position:relative;z-index:1}
#bm-sky{position:fixed;inset:0;width:100%;height:100%;z-index:0;pointer-events:none}
#bm-prog{position:fixed;left:0;top:0;right:0;height:3px;z-index:60;transform-origin:0 50%;transform:scaleX(0);
  background:linear-gradient(90deg,#1F6B3A,#34D399);pointer-events:none}
#bm-cur{position:fixed;left:-20px;top:-20px;width:40px;height:40px;border-radius:50%;
  border:1.5px dashed rgba(31,107,58,.8);z-index:90;pointer-events:none;opacity:0;
  transition:opacity .4s,width .35s ${EASE},height .35s ${EASE},left .35s ${EASE},top .35s ${EASE},background .35s}
#bm-cur::after{content:'';position:absolute;left:50%;top:50%;width:5px;height:5px;margin:-2.5px 0 0 -2.5px;border-radius:50%;background:#1F6B3A}
#bm-cur.big{width:88px;height:88px;left:-44px;top:-44px;background:rgba(31,107,58,.1)}
.bm-w{display:inline-block;overflow:hidden;vertical-align:bottom;padding:0 .14em .14em .14em;margin:0 -.14em -.14em -.14em}
.bm-wi{display:inline-block;transform:translateY(125%) rotate(8deg);transform-origin:0 100%;
  transition:transform .95s ${EASE},translate .3s ease-out,opacity .3s ease}
.bm-in .bm-wi{transform:none}
.bm-scrub .bm-wi{transform:none;transition:opacity .2s linear;opacity:calc(.22 + .78*var(--bm-l,0))}

/* cards: tilt up to 8 degrees, light follows the pointer, inner parts shift the other way, the edge lights where the pointer is */
.cl-root .bm-tilting.bm-tilting{transition:transform .12s linear,box-shadow .4s ease,background-color .3s ease,border-color .3s ease;
  position:relative;
  transform:perspective(900px) rotateX(var(--bm-rx,0deg)) rotateY(var(--bm-ry,0deg)) translateY(var(--bm-ty,0px));
  background-color:rgba(255,255,255,.72);border-radius:22px;
  box-shadow:0 24px 54px rgba(31,107,58,.2),inset 0 1px 0 rgba(255,255,255,.55);
  background-image:radial-gradient(420px circle at var(--bm-mx,50%) var(--bm-my,50%),rgba(31,107,58,.13),rgba(31,107,58,0) 62%)}
.cl-root .cl-code.bm-tilting.bm-tilting{background-color:#191F2E;
  background-image:radial-gradient(420px circle at var(--bm-mx,50%) var(--bm-my,50%),rgba(52,211,153,.16),rgba(52,211,153,0) 62%)}
.bm-tilting > :not(.bm-edge){translate:calc(var(--bm-px,0)*-9px) calc(var(--bm-py,0)*-7px);transition:translate .15s linear}
.bm-edge{position:absolute;inset:0;border-radius:inherit;padding:1.5px;pointer-events:none;opacity:0;transition:opacity .3s;
  background:radial-gradient(200px circle at var(--bm-mx,50%) var(--bm-my,50%),#1F6B3A,rgba(31,107,58,.0) 70%);
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;
  mask:linear-gradient(#000 0 0) content-box exclude,linear-gradient(#000 0 0)}
.bm-tilting > .bm-edge{opacity:1}
.cl-latest-card img,.cl-story-shot img{transition:transform 5s ${EASE}}
.cl-latest-card:hover img,.cl-story-shot:hover img{transform:scale(1.07)}

/* pictures open from a window */
.bm-js .bm-unmask{clip-path:inset(14% 10% 14% 10% round 22px);transition:clip-path 1.2s ${EASE}}
.bm-js .bm-unmask.bm-open{clip-path:inset(-90px -90px -90px -90px round 22px)}

/* the four steps, tied to scroll */
.bm-js .cl-steps{position:relative}
.bm-js .cl-steps::after{content:'';position:absolute;left:0;top:-1px;height:2px;width:calc(var(--bm-sp,0)*100%);
  background:linear-gradient(90deg,#1F6B3A,#34D399);pointer-events:none}
.cl-root.bm-js .cl-steps.bm-on .cl-step:not(.bm-lit){opacity:.42}
.cl-root.bm-js .cl-steps.bm-on .cl-step.bm-lit .cl-step-num{transform:scale(1.1);box-shadow:0 12px 30px rgba(31,107,58,.4)}
.cl-step-num{position:relative;transition:transform .5s ${EASE},box-shadow .3s ease}
.cl-step-num::after{content:'';position:absolute;inset:0;border-radius:50%;border:2px solid #34D399;opacity:0;pointer-events:none}
.cl-step:hover .cl-step-num::after{animation:bm-ring 1s ease-out}
@keyframes bm-ring{0%{opacity:.9;transform:scale(1)}100%{opacity:0;transform:scale(2.3)}}

/* rule lines draw */
.bm-js .cl-proof-item{border-top-color:transparent;position:relative}
.bm-js .cl-proof-item::before{content:'';position:absolute;left:0;right:0;top:-2px;height:2px;background:#1F6B3A;
  transform:scaleX(0);transform-origin:0 50%;transition:transform 1.1s ${EASE}}
.bm-js .cl-proof-item.bm-draw::before{transform:scaleX(1)}

/* buttons: sweep of light, pulsing point, press ripple */
.cl-btn{position:relative;overflow:hidden}
.cl-btn::after{content:'';position:absolute;top:0;bottom:0;left:-70%;width:50%;pointer-events:none;
  background:linear-gradient(100deg,rgba(255,255,255,0),rgba(255,255,255,.5),rgba(255,255,255,0));transform:skewX(-20deg);
  transition:left .8s ${EASE}}
.cl-btn--ghost::after{background:linear-gradient(100deg,rgba(31,107,58,0),rgba(31,107,58,.18),rgba(31,107,58,0))}
.cl-btn:hover::after{left:125%}
.cl-btn--solid::before{animation:bm-pulse 2.2s ease-in-out infinite}
@keyframes bm-pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.55);box-shadow:0 0 12px rgba(255,255,255,.9)}}
.bm-rip{position:absolute;width:12px;height:12px;margin:-6px 0 0 -6px;border-radius:50%;background:rgba(255,255,255,.5);
  pointer-events:none;transform:scale(0);animation:bm-rip .65s ${EASE} forwards}
.cl-btn--ghost .bm-rip{background:rgba(31,107,58,.22)}
@keyframes bm-rip{to{transform:scale(14);opacity:0}}

/* header links: underline draws from the side the pointer came from, letters lift in sequence */
.cl-navlink{position:relative}
.cl-navlink::after{content:'';position:absolute;left:0;right:0;bottom:9px;height:2px;border-radius:2px;background:#1F6B3A;
  transform:scaleX(0);transform-origin:var(--bm-from,0%) 50%;transition:transform .45s ${EASE}}
.cl-navlink:hover::after,.cl-navlink:focus-visible::after{transform:scaleX(1)}
.bm-l{display:inline-block;transition:transform .35s ${EASE}}
.cl-navlink:hover .bm-l{transform:translateY(-3px)}

/* FAQ rows */
.cl-faq details{background:linear-gradient(90deg,rgba(31,107,58,.09),rgba(31,107,58,0)) no-repeat 0 0/0% 100%;
  transition:background-size .55s ${EASE}}
.cl-faq details:hover{background-size:100% 100%}
.cl-faq summary{transition:color .15s ease,transform .4s ${EASE}}
.cl-faq details:hover summary{transform:translateX(6px)}
.cl-q-sign{display:inline-block;transition:transform .6s ${EASE}}
.cl-faq details:hover .cl-q-sign{transform:rotate(360deg) scale(1.15)}

/* works-with names */
.cl-works-item{display:inline-block;transition:transform .35s ${EASE},color .25s ease,opacity .25s ease;transform-origin:50% 60%}
.cl-marq-set:hover .cl-works-item{opacity:.5}
.cl-marq-set .cl-works-item:hover{opacity:1;color:#1F6B3A;transform:scale(1.22)}

/* footer links: arrow slides in, underline draws */
.cl-fcol a,.cl-footer-fam a{width:fit-content;background:linear-gradient(currentColor,currentColor) no-repeat 0 calc(50% + 10px)/0% 1px;
  transition:color .15s,background-size .4s ${EASE}}
.cl-fcol a:hover,.cl-footer-fam a:hover{background-size:100% 1px}
.cl-fcol a::after{content:'\\2192';margin-left:8px;opacity:0;transform:translateX(-8px);transition:opacity .3s ease,transform .4s ${EASE}}
.cl-fcol a:hover::after{opacity:.9;transform:none}

@media (prefers-reduced-motion:reduce){
  .bm-wi{transform:none;transition:none}
  #bm-prog,#bm-cur{display:none}
  .cl-btn--solid::before{animation:none}
  .cl-step:hover .cl-step-num::after{animation:none}
}
`

const CARD = '.cl-pcol,.cl-step,.cl-proof-item,.cl-latest-card,.cl-story-shot,.cl-code,.cl-appwin,.cl-card'
const OVER = 'a,button,summary,.cl-latest-card'
const PARALLAX: Array<[string, number]> = [
  ['.cl-story-shot', 40], ['.cl-appwin', 30], ['.cl-proof-num', -26], ['.cl-code', -18],
  ['.cl-latest-card', 16], ['.cl-pcol', 14], ['.cl-step', 10],
]

type Star = { x: number; y: number; z: number; ox: number; oy: number; vx: number; vy: number; tw: number; big: boolean }
type Par = { el: HTMLElement; sp: number; top: number; h: number; off: number }
type Wd = { el: HTMLElement; cx: number; cy: number; lean: boolean }

function rnd(i: number) {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}
const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v)

function splitWords(h: HTMLElement) {
  if (h.querySelector('.bm-w')) return /* already split (React strict mode runs the effect twice in development) */
  h.setAttribute('aria-label', (h.innerText || h.textContent || '').replace(/\s+/g, ' ').trim())
  const walker = document.createTreeWalker(h, NodeFilter.SHOW_TEXT)
  const nodes: Text[] = []
  while (walker.nextNode()) nodes.push(walker.currentNode as Text)
  let i = 0
  nodes.forEach((t) => {
    const parent = t.parentNode
    if (!parent) return
    const frag = document.createDocumentFragment()
    ;(t.nodeValue || '').split(/(\s+)/).forEach((p) => {
      if (!p) return
      if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(p)); return }
      const w = document.createElement('span')
      w.className = 'bm-w'
      w.setAttribute('aria-hidden', 'true')
      const n = document.createElement('span')
      n.className = 'bm-wi'
      n.style.transitionDelay = `${i++ * 70}ms,0s,0s`
      n.textContent = p
      w.appendChild(n)
      frag.appendChild(w)
    })
    parent.replaceChild(frag, t)
  })
}

function splitLetters(a: HTMLElement) {
  if (a.querySelector('.bm-l') || a.children.length) return
  const txt = a.textContent || ''
  a.setAttribute('aria-label', txt)
  a.textContent = ''
  txt.split('').forEach((ch, i) => {
    const s = document.createElement('span')
    s.className = 'bm-l'
    s.setAttribute('aria-hidden', 'true')
    s.style.transitionDelay = `${i * 18}ms`
    s.textContent = ch === ' ' ? ' ' : ch
    a.appendChild(s)
  })
}

export default function BrandMotion() {
  useIsoLayoutEffect(() => {
    const root = document.querySelector('.cl-root') as HTMLElement | null
    if (!root) return
    const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const FINE = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const PHONE = window.matchMedia('(max-width: 720px)').matches || !FINE
    const cleanups: Array<() => void> = []

    const style = document.createElement('style')
    style.setAttribute('data-brand-motion', '')
    style.textContent = CSS
    document.head.appendChild(style)
    cleanups.push(() => style.remove())
    if (!RM) { root.classList.add('bm-js'); cleanups.push(() => root.classList.remove('bm-js')) }

    /* ---- headings, word by word (left whole with reduced motion) */
    const headings = RM ? [] : ([...root.querySelectorAll('h1, h2')] as HTMLElement[]).filter((h) => !h.closest('.ig-flow'))
    headings.forEach(splitWords)
    const closerH = (headings.find((h) => h.closest('.cl-closer')) || null) as HTMLElement | null
    if (closerH) closerH.classList.add('bm-scrub', 'bm-in')
    const h1s = headings.filter((h) => h.tagName === 'H1')
    const h2s = headings.filter((h) => h.tagName === 'H2' && h !== closerH)
    let raf0 = 0
    if (h1s.length) raf0 = requestAnimationFrame(() => { raf0 = requestAnimationFrame(() => h1s.forEach((h) => h.classList.add('bm-in'))) })
    let hio: IntersectionObserver | null = null
    if (h2s.length && 'IntersectionObserver' in window) {
      hio = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('bm-in'); hio?.unobserve(e.target) } }), { threshold: 0.2 })
      h2s.forEach((h) => hio?.observe(h))
    } else h2s.forEach((h) => h.classList.add('bm-in'))
    cleanups.push(() => { cancelAnimationFrame(raf0); hio?.disconnect() })

    /* ---- header links: letters */
    if (!RM && FINE) {
      ;([...root.querySelectorAll('.cl-navlinks .cl-navlink')] as HTMLElement[]).forEach(splitLetters)
      const nl = [...root.querySelectorAll('.cl-navlink')] as HTMLElement[]
      const enter = (e: Event) => {
        const a = e.currentTarget as HTMLElement, r = a.getBoundingClientRect()
        a.style.setProperty('--bm-from', (e as PointerEvent).clientX < r.left + r.width / 2 ? '0%' : '100%')
      }
      const leave = (e: Event) => {
        const a = e.currentTarget as HTMLElement, r = a.getBoundingClientRect()
        a.style.setProperty('--bm-from', (e as PointerEvent).clientX < r.left + r.width / 2 ? '0%' : '100%')
      }
      nl.forEach((a) => { a.addEventListener('pointerenter', enter); a.addEventListener('pointerleave', leave) })
      cleanups.push(() => nl.forEach((a) => { a.removeEventListener('pointerenter', enter); a.removeEventListener('pointerleave', leave) }))
    }

    /* ---- pictures open from a window, rules draw, tilt edge elements */
    const unmasks = RM ? [] : ([...root.querySelectorAll('.cl-story-shot, .cl-appwin')] as HTMLElement[])
    unmasks.forEach((e) => e.classList.add('bm-unmask'))
    const rules = RM ? [] : ([...root.querySelectorAll('.cl-proof-item')] as HTMLElement[])
    let mio: IntersectionObserver | null = null
    if ('IntersectionObserver' in window && (unmasks.length || rules.length)) {
      mio = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return
        const el = e.target as HTMLElement
        if (el.classList.contains('bm-unmask')) el.classList.add('bm-open')
        if (el.classList.contains('cl-proof-item')) el.classList.add('bm-draw')
        mio?.unobserve(el)
      }), { threshold: 0.25 })
      unmasks.forEach((e) => mio?.observe(e)); rules.forEach((e) => mio?.observe(e))
    } else { unmasks.forEach((e) => e.classList.add('bm-open')); rules.forEach((e) => e.classList.add('bm-draw')) }
    cleanups.push(() => mio?.disconnect())
    const cards = FINE && !RM ? ([...root.querySelectorAll(CARD)] as HTMLElement[]) : []
    cards.forEach((c) => { const i = document.createElement('i'); i.className = 'bm-edge'; i.setAttribute('aria-hidden', 'true'); c.appendChild(i) })
    cleanups.push(() => cards.forEach((c) => c.querySelector(':scope > .bm-edge')?.remove()))

    /* ---- stars, progress, ring */
    const sky = document.createElement('canvas')
    sky.id = 'bm-sky'
    sky.setAttribute('aria-hidden', 'true')
    root.insertBefore(sky, root.firstChild)
    cleanups.push(() => sky.remove())
    const sg = sky.getContext('2d')
    const prog = document.createElement('div')
    prog.id = 'bm-prog'
    document.body.appendChild(prog)
    cleanups.push(() => prog.remove())
    let cur: HTMLDivElement | null = null
    if (FINE && !RM) { cur = document.createElement('div'); cur.id = 'bm-cur'; document.body.appendChild(cur); const c = cur; cleanups.push(() => c.remove()) }

    const SN = PHONE ? 45 : 90
    const stars: Star[] = []
    for (let i = 0; i < SN; i++) stars.push({ x: rnd(i * 7 + 2), y: rnd(i * 13 + 5), z: 0.25 + rnd(i * 3 + 1) * 0.75, ox: 0, oy: 0, vx: 0, vy: 0, tw: rnd(i * 5 + 3) * 6.2832, big: i % 7 === 0 })
    let sw = 0, sh = 0, sd = 1, docH = 1
    let px = -9999, py = -9999, ux = -9999, uy = -9999, pux = 0, puy = 0
    const size = () => {
      sw = window.innerWidth; sh = window.innerHeight; sd = Math.min(window.devicePixelRatio || 1, 2)
      sky.width = Math.round(sw * sd); sky.height = Math.round(sh * sd)
      docH = Math.max(1, document.documentElement.scrollHeight - sh)
    }
    size()

    /* ---- count-up targets */
    type Counter = { el: HTMLElement; node: Text; n: number; t0: number }
    const counters: Counter[] = []
    const nums = RM ? [] : ([...root.querySelectorAll('.cl-proof-num')] as HTMLElement[]).filter((e) => /^\d+%$/.test((e.textContent || '').trim()))
    let cio: IntersectionObserver | null = null
    if (nums.length && 'IntersectionObserver' in window) {
      cio = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return
        const el = e.target as HTMLElement
        cio?.unobserve(el)
        const node = el.firstChild
        if (!node || node.nodeType !== 3) return
        el.style.fontVariantNumeric = 'tabular-nums'
        counters.push({ el, node: node as Text, n: parseInt((node.nodeValue || '0'), 10), t0: performance.now() })
      }), { threshold: 0.4 })
      nums.forEach((el) => cio?.observe(el))
    }
    cleanups.push(() => cio?.disconnect())

    /* ---- scroll-linked things, with positions cached (re-read every 60 frames and on resize) */
    const pars: Par[] = []
    if (!RM) PARALLAX.forEach(([sel, sp]) => ([...root.querySelectorAll(sel)] as HTMLElement[]).forEach((el, i) => pars.push({ el, sp: sel === '.cl-latest-card' || sel === '.cl-pcol' || sel === '.cl-step' ? (i % 2 ? -sp : sp) : sp, top: 0, h: 0, off: 0 })))
    const steps = RM ? null : (root.querySelector('.cl-steps') as HTMLElement | null)
    const stepEls = steps ? ([...steps.querySelectorAll('.cl-step')] as HTMLElement[]) : []
    const closer = RM ? null : (root.querySelector('.cl-closer') as HTMLElement | null)
    const marq = RM ? null : (root.querySelector('.cl-marq-track') as HTMLElement | null)
    const marqSet = marq ? (marq.querySelector('.cl-marq-set') as HTMLElement | null) : null
    const words: Wd[] = []
    if (!RM && FINE) headings.forEach((h) => { if (h !== closerH) h.querySelectorAll('.bm-wi').forEach((el) => words.push({ el: el as HTMLElement, cx: 0, cy: 0, lean: false })) })
    const geo = { stepsTop: 0, stepsH: 0, closerTop: 0, closerH: 0, closerWords: [] as HTMLElement[], marqW: 0, heroH: 1 }
    if (closerH) geo.closerWords = [...closerH.querySelectorAll('.bm-wi')] as HTMLElement[]
    const hero = root.querySelector('.clh-hero') as HTMLElement | null
    const flow = hero ? (hero.querySelector('.ig-flow') as HTMLElement | null) : null
    let marqHover = false, marqX = 0
    if (marq) {
      const m = marq.parentElement as HTMLElement
      const a = () => { marqHover = true }, b = () => { marqHover = false }
      m.addEventListener('pointerenter', a); m.addEventListener('pointerleave', b)
      cleanups.push(() => { m.removeEventListener('pointerenter', a); m.removeEventListener('pointerleave', b); marq.style.transform = '' })
    }
    const cache = () => {
      const y = window.scrollY
      pars.forEach((p) => { const r = p.el.getBoundingClientRect(); p.top = r.top + y - p.off; p.h = r.height })
      if (steps) { const r = steps.getBoundingClientRect(); geo.stepsTop = r.top + y; geo.stepsH = r.height }
      if (closer) { const r = closer.getBoundingClientRect(); geo.closerTop = r.top + y; geo.closerH = r.height }
      if (marqSet) geo.marqW = marqSet.offsetWidth + 18
      if (hero) geo.heroH = Math.max(1, hero.offsetHeight * 0.9)
      words.forEach((w) => { const r = w.el.getBoundingClientRect(); w.cx = r.left + r.width / 2; w.cy = r.top + y + r.height / 2 })
    }
    cache()

    const draw = (ms: number, y: number, vel: number, tt: number) => {
      if (!sg) return
      sg.setTransform(sd, 0, 0, sd, 0, 0)
      sg.clearRect(0, 0, sw, sh)
      const HH = sh + 80, T = tt / 1000, stv = clamp(vel * 0.04, -120, 120)
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i]
        const X = s.x * sw + s.ox
        const Y = (((s.y * HH - (RM ? 0 : y) * s.z * 0.35) % HH) + HH) % HH - 40 + s.oy
        if (!RM && ux > -9000) {
          const dx = X - ux, dy = Y - uy, d2 = dx * dx + dy * dy
          if (d2 < 36100) { const d = Math.sqrt(d2) || 1, f = 1 - d / 190; s.vx += (dx / d) * f * 2.6; s.vy += (dy / d) * f * 2.6 }
        }
        if (!RM) { s.vx += -s.ox * 0.018; s.vy += -s.oy * 0.018; s.vx *= 0.9; s.vy *= 0.9; s.ox += s.vx; s.oy += s.vy }
        const mint = i % 3 === 0
        const al = (0.22 + 0.5 * s.z) * (RM ? 0.8 : 0.55 + 0.45 * Math.sin(T * 1.2 + s.tw)) * (mint ? 1.25 : 1)
        const col = (mint ? 'rgba(52,211,153,' : 'rgba(31,107,58,') + clamp(al, 0, 1).toFixed(2) + ')'
        sg.fillStyle = col; sg.strokeStyle = col
        if (!RM && Math.abs(stv) > 5) { sg.lineWidth = 1 + s.z * 1.5; sg.lineCap = 'round'; sg.beginPath(); sg.moveTo(X, Y); sg.lineTo(X, Y - stv * s.z); sg.stroke() }
        else if (s.big) {
          const r = 3 + s.z * 4.5
          sg.beginPath(); sg.moveTo(X, Y - r); sg.quadraticCurveTo(X, Y, X + r, Y); sg.quadraticCurveTo(X, Y, X, Y + r); sg.quadraticCurveTo(X, Y, X - r, Y); sg.quadraticCurveTo(X, Y, X, Y - r); sg.fill()
        } else { sg.beginPath(); sg.arc(X, Y, 0.8 + s.z * 1.3, 0, 6.2832); sg.fill() }
      }
    }

    let raf = 0, nTick = 0, lastY = window.scrollY, lastT = performance.now(), vel = 0, tt = 0
    const bmState = ((window as unknown) as { __bm?: { vel: number; hp: number } })
    bmState.__bm = { vel: 0, hp: 0 }
    const tick = (ms: number) => {
      const dt = Math.max(1, ms - lastT)
      if ((nTick++ % 60) === 0) { docH = Math.max(1, document.documentElement.scrollHeight - window.innerHeight); cache() }
      const y = window.scrollY, vh = window.innerHeight
      vel += (((y - lastY) / dt) * 1000 - vel) * 0.12; lastY = y; lastT = ms
      tt += dt * (1 + Math.min(6, Math.abs(vel) * 0.004))
      const heroP = clamp(y / geo.heroH, 0, 1)
      if (bmState.__bm) { bmState.__bm.vel = vel; bmState.__bm.hp = heroP }
      prog.style.transform = `scaleX(${clamp(y / docH, 0, 1).toFixed(4)})`
      draw(ms, y, vel, tt)
      /* ring: follows the pointer, stretches along the direction of travel when it moves fast */
      if (cur && px > -9000) {
        if (ux < -9000) { ux = px; uy = py; pux = ux; puy = uy }
        pux = ux; puy = uy
        ux += (px - ux) * 0.24; uy += (py - uy) * 0.24
        const sp = Math.hypot(ux - pux, uy - puy), ang = Math.atan2(uy - puy, ux - pux)
        const st = 1 + Math.min(0.9, sp / 18)
        cur.style.translate = `${ux.toFixed(1)}px ${uy.toFixed(1)}px`
        cur.style.transform = st > 1.06 ? `rotate(${ang.toFixed(3)}rad) scale(${st.toFixed(2)},${(1 / Math.sqrt(st)).toFixed(2)})` : ''
        cur.style.opacity = '1'
      }
      /* counters */
      for (let i = counters.length - 1; i >= 0; i--) {
        const c = counters[i]
        const k = clamp((ms - c.t0) / 1600, 0, 1), e = 1 - Math.pow(1 - k, 4)
        c.node.nodeValue = `${Math.round(c.n * e)}%`
        if (k >= 1) counters.splice(i, 1)
      }
      if (!RM) {
        /* parallax: pictures, cards and big numbers drift at different speeds while they cross the screen */
        for (let i = 0; i < pars.length; i++) {
          const p = pars[i]
          const c = p.top + p.h / 2 - y
          if (c < -vh || c > 2 * vh) continue
          const k = clamp((c - vh / 2) / (vh / 2), -1, 1)
          p.off = -k * p.sp
          p.el.style.translate = `0 ${p.off.toFixed(1)}px`
        }
        /* steps: light up in order, a line drawn along them (runs backwards when scrolling up) */
        if (steps) {
          const sp = clamp((y + vh * 0.72 - geo.stepsTop) / (geo.stepsH + vh * 0.25), 0, 1)
          steps.style.setProperty('--bm-sp', sp.toFixed(3))
          steps.classList.toggle('bm-on', sp > 0.02 && sp < 1)
          stepEls.forEach((s, i) => s.classList.toggle('bm-lit', sp >= (i + 0.45) / (stepEls.length + 0.45)))
        }
        /* closing band: grows in from 92%, headline lit word by word with the scroll */
        if (closer) {
          const k = clamp((y + vh - geo.closerTop) / (vh * 0.9), 0, 1)
          closer.style.scale = (0.92 + 0.08 * k).toFixed(3)
          const w = geo.closerWords, lit = clamp((y + vh * 0.85 - geo.closerTop) / (vh * 0.55), 0, 1) * (w.length + 1)
          for (let i = 0; i < w.length; i++) w[i].style.setProperty('--bm-l', clamp(lit - i, 0, 1).toFixed(2))
        }
        /* works-with line: speeds up and leans with scroll speed */
        if (marq && geo.marqW) {
          if (!marqHover) marqX -= (dt / 1000) * (geo.marqW / 40 + Math.min(900, Math.abs(vel)) * 0.9) * (vel < -30 ? -1 : 1)
          marqX = ((marqX % geo.marqW) + geo.marqW) % geo.marqW
          marq.style.animation = 'none'
          marq.style.transform = `translateX(${(-marqX).toFixed(1)}px) skewX(${clamp(vel * -0.012, -14, 14).toFixed(2)}deg)`
        }
        /* hero: the globe spins up (read by the globe), grows slightly and drifts as you scroll away */
        if (flow) flow.style.transform = heroP > 0.001 ? `translateY(${(y * 0.1).toFixed(1)}px) scale(${(1 + 0.06 * heroP).toFixed(3)})` : ''
        /* headline words lean away from the pointer (every other frame, rects cached) */
        if (words.length && (nTick & 1) === 0) {
          const hasP = px > -9000
          for (let i = 0; i < words.length; i++) {
            const w = words[i], cy = w.cy - y
            if (!hasP || cy < -120 || cy > vh + 120) { if (w.lean) { w.el.style.translate = ''; w.lean = false } continue }
            const dx = w.cx - px, dy = cy - py, d = Math.hypot(dx, dy)
            if (d < 120) { const f = (1 - d / 120) * 6, n = d || 1; w.el.style.translate = `${((dx / n) * f).toFixed(1)}px 0px`; w.lean = true }
            else if (w.lean) { w.el.style.translate = ''; w.lean = false }
          }
        }
      }
      raf = requestAnimationFrame(tick)
    }
    const start = () => { if (!raf && !RM) { lastT = performance.now(); raf = requestAnimationFrame(tick) } }
    const stop = () => { cancelAnimationFrame(raf); raf = 0 }
    const onVis = () => { if (document.hidden) stop(); else start() }
    document.addEventListener('visibilitychange', onVis)
    cleanups.push(() => { stop(); document.removeEventListener('visibilitychange', onVis); if (flow) flow.style.transform = ''; bmState.__bm = undefined })
    if (RM) {
      draw(0, 0, 0, 0)
      const still = () => { prog.style.transform = `scaleX(${clamp(window.scrollY / docH, 0, 1).toFixed(4)})` }
      window.addEventListener('scroll', still, { passive: true })
      cleanups.push(() => window.removeEventListener('scroll', still))
    } else start()
    const onResize = () => { size(); cache(); if (RM) draw(0, 0, 0, 0) }
    window.addEventListener('resize', onResize)
    cleanups.push(() => window.removeEventListener('resize', onResize))

    /* ---- tilt and light, button pull and ripple (fine pointers only) */
    if (FINE && !RM) {
      let card: HTMLElement | null = null
      let pulled: HTMLElement | null = null
      const release = (c: HTMLElement) => {
        c.classList.remove('bm-tilting')
        ;['--bm-rx', '--bm-ry', '--bm-mx', '--bm-my', '--bm-ty', '--bm-px', '--bm-py'].forEach((p) => c.style.removeProperty(p))
      }
      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== 'mouse') return
        px = e.clientX; py = e.clientY
        if (ux < -9000) { ux = px; uy = py }
        const target = e.target as Element | null
        /* a card is let go only when the pointer is 14px outside it, so a tilting edge never flickers */
        if (card) {
          const r = card.getBoundingClientRect()
          if (px < r.left - 14 || px > r.right + 14 || py < r.top - 14 || py > r.bottom + 14) { release(card); card = null }
        }
        if (!card && target && target.closest) {
          const t = target.closest(CARD) as HTMLElement | null
          if (t) { card = t; t.classList.add('bm-tilting') }
        }
        if (card) {
          const r = card.getBoundingClientRect()
          const x = clamp((px - r.left) / r.width, 0, 1), y = clamp((py - r.top) / r.height, 0, 1), k = Math.min(1, 520 / r.width)
          card.style.setProperty('--bm-rx', `${((0.5 - y) * 16 * k).toFixed(2)}deg`)
          card.style.setProperty('--bm-ry', `${((x - 0.5) * 16 * k).toFixed(2)}deg`)
          card.style.setProperty('--bm-ty', card.tagName === 'A' ? '-3px' : '0px')
          card.style.setProperty('--bm-mx', `${(x * 100).toFixed(1)}%`)
          card.style.setProperty('--bm-my', `${(y * 100).toFixed(1)}%`)
          card.style.setProperty('--bm-px', (x - 0.5).toFixed(3))
          card.style.setProperty('--bm-py', (y - 0.5).toFixed(3))
        }
        const b = target && target.closest ? (target.closest('.cl-btn') as HTMLElement | null) : null
        if (pulled && pulled !== b) { pulled.style.translate = ''; pulled = null }
        if (b) {
          const r = b.getBoundingClientRect()
          b.style.translate = `${clamp((px - r.left - r.width / 2) * 0.3, -10, 10).toFixed(1)}px ${clamp((py - r.top - r.height / 2) * 0.4, -7, 7).toFixed(1)}px`
          pulled = b
        }
      }
      const onOver = (e: PointerEvent) => {
        if (!cur) return
        const t = e.target as Element | null
        cur.classList.toggle('big', !!(t && t.closest && t.closest(OVER)))
      }
      const onDown = (e: PointerEvent) => {
        const t = e.target as Element | null
        const b = t && t.closest ? (t.closest('.cl-btn') as HTMLElement | null) : null
        if (!b) return
        const r = b.getBoundingClientRect(), s = document.createElement('span')
        s.className = 'bm-rip'; s.style.left = `${e.clientX - r.left}px`; s.style.top = `${e.clientY - r.top}px`
        b.appendChild(s); window.setTimeout(() => s.remove(), 700)
      }
      const onLeave = () => { px = -9999; ux = -9999; if (cur) cur.style.opacity = '0'; if (card) { release(card); card = null } }
      document.addEventListener('pointermove', onMove, { passive: true })
      document.addEventListener('pointerover', onOver, { passive: true })
      document.addEventListener('pointerdown', onDown, { passive: true })
      document.documentElement.addEventListener('pointerleave', onLeave)
      cleanups.push(() => {
        document.removeEventListener('pointermove', onMove)
        document.removeEventListener('pointerover', onOver)
        document.removeEventListener('pointerdown', onDown)
        document.documentElement.removeEventListener('pointerleave', onLeave)
        if (card) release(card)
        if (pulled) pulled.style.translate = ''
      })
    }

    return () => { cleanups.forEach((f) => f()) }
  }, [])
  return null
}
