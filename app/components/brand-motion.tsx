'use client'

/**
 * BrandMotion — the Brand System's motion and hover layer, mounted once per page
 * (home-commitment.tsx and editorial/shell.tsx). Plain DOM code, no new package.
 *
 *  1 star field (fixed canvas behind the sections, pointer pushes stars away)
 *  2 3px progress line at the top
 *  3 headings come in word by word (h1 at load, each h2 once when it enters)
 *  4 (the retuned scroll reveal lives in the pages' CSS strings)
 *  5 cards tilt toward the pointer (5 degrees at most) and carry a soft light
 *  6 buttons pull a few pixels toward the pointer
 *  7 plain percentage numbers count up once
 *  8 a ring that trails the pointer and grows over links and buttons
 *  9 (the moving "Works with" line lives in the home page's JSX and CSS)
 *
 * Fine pointers only for 5, 6 and 8. With reduced motion on: stars stand still, no tilt,
 * no ring, no pull, headings are left whole, numbers are left as written.
 * One animation loop, paused while the tab is hidden.
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
#bm-cur.big{width:88px;height:88px;left:-44px;top:-44px;background:rgba(31,107,58,.1)}
.bm-w{display:inline-block;overflow:hidden;vertical-align:bottom;padding:0 .08em .14em 0;margin:0 -.08em -.14em 0}
.bm-wi{display:inline-block;transform:translateY(125%) rotate(8deg);transform-origin:0 100%;
  transition:transform .95s ${EASE}}
.bm-in .bm-wi{transform:none}
.cl-root .bm-tilting.bm-tilting{transition:transform .12s linear,box-shadow .4s ease,background-color .3s ease,border-color .3s ease;
  transform:perspective(900px) rotateX(var(--bm-rx,0deg)) rotateY(var(--bm-ry,0deg)) translateY(var(--bm-ty,0px));
  background-color:rgba(255,255,255,.72);border-radius:22px;
  box-shadow:0 24px 54px rgba(31,107,58,.2),inset 0 1px 0 rgba(255,255,255,.55);
  background-image:radial-gradient(420px circle at var(--bm-mx,50%) var(--bm-my,50%),rgba(31,107,58,.13),rgba(31,107,58,0) 62%)}
.cl-root .cl-code.bm-tilting.bm-tilting{background-color:#191F2E;
  background-image:radial-gradient(420px circle at var(--bm-mx,50%) var(--bm-my,50%),rgba(52,211,153,.16),rgba(52,211,153,0) 62%)}
@media (prefers-reduced-motion:reduce){
  .bm-wi{transform:none;transition:none}
  #bm-prog,#bm-cur{display:none}
}
`

const CARD = '.cl-pcol,.cl-step,.cl-proof-item,.cl-latest-card,.cl-story-shot,.cl-code,.cl-appwin,.cl-card'
const OVER = 'a,button,summary,.cl-latest-card'

type Star = { x: number; y: number; z: number; ox: number; oy: number; vx: number; vy: number; tw: number; big: boolean }

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
      n.style.transitionDelay = `${i++ * 70}ms`
      n.textContent = p
      w.appendChild(n)
      frag.appendChild(w)
    })
    parent.replaceChild(frag, t)
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

    /* ---- 3. headings, word by word (left whole with reduced motion) */
    const headings = RM ? [] : ([...root.querySelectorAll('h1, h2')] as HTMLElement[]).filter((h) => !h.closest('.ig-flow'))
    headings.forEach(splitWords)
    const h1s = headings.filter((h) => h.tagName === 'H1')
    const h2s = headings.filter((h) => h.tagName === 'H2')
    let raf0 = 0
    if (h1s.length) raf0 = requestAnimationFrame(() => { raf0 = requestAnimationFrame(() => h1s.forEach((h) => h.classList.add('bm-in'))) })
    let hio: IntersectionObserver | null = null
    if (h2s.length && 'IntersectionObserver' in window) {
      hio = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('bm-in'); hio?.unobserve(e.target) } }), { threshold: 0.2 })
      h2s.forEach((h) => hio?.observe(h))
    } else h2s.forEach((h) => h.classList.add('bm-in'))
    cleanups.push(() => { cancelAnimationFrame(raf0); hio?.disconnect() })

    /* ---- 1. stars, 2. progress, 8. ring: built here, driven by one loop below */
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
    let px = -9999, py = -9999, ux = -9999, uy = -9999
    const size = () => {
      sw = window.innerWidth; sh = window.innerHeight; sd = Math.min(window.devicePixelRatio || 1, 2)
      sky.width = Math.round(sw * sd); sky.height = Math.round(sh * sd)
      docH = Math.max(1, document.documentElement.scrollHeight - sh)
    }
    size()

    /* ---- 7. count-up targets */
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

    const draw = (ms: number, y: number) => {
      if (!sg) return
      sg.setTransform(sd, 0, 0, sd, 0, 0)
      sg.clearRect(0, 0, sw, sh)
      const HH = sh + 80, T = ms / 1000
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
        sg.fillStyle = col
        if (s.big) {
          const r = 3 + s.z * 4.5
          sg.beginPath(); sg.moveTo(X, Y - r); sg.quadraticCurveTo(X, Y, X + r, Y); sg.quadraticCurveTo(X, Y, X, Y + r); sg.quadraticCurveTo(X, Y, X - r, Y); sg.quadraticCurveTo(X, Y, X, Y - r); sg.fill()
        } else { sg.beginPath(); sg.arc(X, Y, 0.8 + s.z * 1.3, 0, 6.2832); sg.fill() }
      }
    }

    let raf = 0, nTick = 0
    const tick = (ms: number) => {
      if ((nTick++ % 120) === 0) docH = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const y = window.scrollY
      prog.style.transform = `scaleX(${clamp(y / docH, 0, 1).toFixed(4)})`
      draw(ms, y)
      if (cur && px > -9000) {
        if (ux < -9000) { ux = px; uy = py }
        ux += (px - ux) * 0.24; uy += (py - uy) * 0.24
        cur.style.translate = `${ux.toFixed(1)}px ${uy.toFixed(1)}px`
        cur.style.opacity = '1'
      }
      for (let i = counters.length - 1; i >= 0; i--) {
        const c = counters[i]
        const k = clamp((ms - c.t0) / 1600, 0, 1), e = 1 - Math.pow(1 - k, 4)
        c.node.nodeValue = `${Math.round(c.n * e)}%`
        if (k >= 1) counters.splice(i, 1)
      }
      raf = requestAnimationFrame(tick)
    }
    const start = () => { if (!raf && !RM) raf = requestAnimationFrame(tick) }
    const stop = () => { cancelAnimationFrame(raf); raf = 0 }
    const onVis = () => { if (document.hidden) stop(); else start() }
    document.addEventListener('visibilitychange', onVis)
    cleanups.push(() => { stop(); document.removeEventListener('visibilitychange', onVis) })
    if (RM) {
      draw(0, 0)
      const still = () => { prog.style.transform = `scaleX(${clamp(window.scrollY / docH, 0, 1).toFixed(4)})` }
      window.addEventListener('scroll', still, { passive: true })
      cleanups.push(() => window.removeEventListener('scroll', still))
    } else start()
    const onResize = () => { size(); if (RM) draw(0, 0) }
    window.addEventListener('resize', onResize)
    cleanups.push(() => window.removeEventListener('resize', onResize))

    /* ---- 5. tilt and light, 6. button pull, 8. ring size (fine pointers only) */
    if (FINE && !RM) {
      let card: HTMLElement | null = null
      let pulled: HTMLElement | null = null
      const release = (c: HTMLElement) => {
        c.classList.remove('bm-tilting')
        ;['--bm-rx', '--bm-ry', '--bm-mx', '--bm-my', '--bm-ty'].forEach((p) => c.style.removeProperty(p))
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
          card.style.setProperty('--bm-rx', `${((0.5 - y) * 10 * k).toFixed(2)}deg`)
          card.style.setProperty('--bm-ry', `${((x - 0.5) * 10 * k).toFixed(2)}deg`)
          card.style.setProperty('--bm-ty', card.tagName === 'A' ? '-3px' : '0px')
          card.style.setProperty('--bm-mx', `${(x * 100).toFixed(1)}%`)
          card.style.setProperty('--bm-my', `${(y * 100).toFixed(1)}%`)
        }
        const b = target && target.closest ? (target.closest('.cl-btn') as HTMLElement | null) : null
        if (pulled && pulled !== b) { pulled.style.translate = ''; pulled = null }
        if (b) {
          const r = b.getBoundingClientRect()
          b.style.translate = `${clamp((px - r.left - r.width / 2) * 0.2, -5, 5).toFixed(1)}px ${clamp((py - r.top - r.height / 2) * 0.3, -4, 4).toFixed(1)}px`
          pulled = b
        }
      }
      const onOver = (e: PointerEvent) => {
        if (!cur) return
        const t = e.target as Element | null
        cur.classList.toggle('big', !!(t && t.closest && t.closest(OVER)))
      }
      const onLeave = () => { px = -9999; ux = -9999; if (cur) cur.style.opacity = '0'; if (card) { release(card); card = null } }
      document.addEventListener('pointermove', onMove, { passive: true })
      document.addEventListener('pointerover', onOver, { passive: true })
      document.documentElement.addEventListener('pointerleave', onLeave)
      cleanups.push(() => {
        document.removeEventListener('pointermove', onMove)
        document.removeEventListener('pointerover', onOver)
        document.documentElement.removeEventListener('pointerleave', onLeave)
        if (card) release(card)
        if (pulled) pulled.style.translate = ''
      })
    }

    return () => { cleanups.forEach((f) => f()) }
  }, [])
  return null
}
