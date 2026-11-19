'use client'

/**
 * IngestionGlobe — the hero motion graphic for knowcap.ai.
 * capture (real tool logos) -> network-graph knowledge globe -> human approve
 * -> the 4 closing agents. Mouse-reactive; a guided example cycles one claim
 * per actionable type (Decision/Task/Commitment/Risk). Self-contained canvas +
 * DOM tiles, ig- scoped so it can't clash with the page styles.
 * Logos live in /public/globe-icons/.
 */

import { useEffect, useRef } from 'react'

const CSS = `
.ig-flow{position:absolute;inset:0;
  --ink1:#191F2E;--ink2:#4A4F5A;--ink3:#8A8F99;--cream:#F5F7FA;--border:#E7E4DD;--green:#1F6B3A;
  font-family:'Space Grotesk',system-ui,sans-serif}
.ig-flow canvas{position:absolute;inset:0;width:100%;height:100%;z-index:1}
.ig-tile{position:absolute;z-index:2;display:flex;flex-direction:column;align-items:center;gap:6px;transform:translate(-50%,-50%);width:84px;pointer-events:none}
.ig-tile .ig-ico{width:46px;height:46px;border-radius:13px;display:grid;place-items:center;box-shadow:0 5px 14px rgba(25,31,46,.12)}
.ig-tile .ig-ico img{width:27px;height:27px;display:block}
.ig-tile .ig-ico{transition:transform .35s cubic-bezier(.2,.7,.2,1),box-shadow .35s ease}
.ig-tile.ig-hot .ig-ico{transform:translateY(-5px) scale(1.1);box-shadow:0 12px 26px rgba(31,107,58,.32),0 0 0 3px rgba(31,107,58,.18)}
.ig-tile:not(.ig-agent) .ig-ico{background:#fff;border:1px solid var(--border)}
.ig-tile:not(.ig-agent) .ig-nm{display:none}
.ig-tile .ig-nm{font:600 11px 'Space Grotesk',sans-serif;color:var(--ink2);text-align:center;white-space:nowrap}
.ig-tile.ig-agent .ig-ico{font-size:18px;border:1px solid var(--border)}
.ig-human{position:absolute;z-index:2;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;gap:7px;pointer-events:none}
.ig-human .ig-avs{display:flex}
.ig-human .ig-av{width:36px;height:36px;border-radius:50%;border:2.5px solid var(--cream);margin-left:-9px;display:grid;place-items:center;color:#fff;font:700 12px 'Space Grotesk',sans-serif;box-shadow:0 3px 10px rgba(25,31,46,.14)}
.ig-human .ig-av:first-child{margin-left:0}
.ig-human .ig-lab{font:600 11.5px 'Space Grotesk',sans-serif;color:var(--ink1);background:#fff;border:1px solid var(--border);border-radius:999px;padding:4px 12px;white-space:nowrap;box-shadow:0 2px 6px rgba(25,31,46,.06)}
.ig-human .ig-sub{font:700 9px 'JetBrains Mono',monospace;letter-spacing:.1em;text-transform:uppercase;color:var(--green)}
.ig-gcap{display:none;position:absolute;z-index:2;transform:translate(-50%,0);font:600 12px 'Space Grotesk',sans-serif;color:var(--ink3);white-space:nowrap;text-align:center}
.ig-gcap b{color:var(--ink1);font-weight:600}
.ig-story{position:absolute;z-index:3;transform:translate(-50%,0);font:600 12.5px 'Space Grotesk',sans-serif;color:var(--ink1);background:#fff;border:1px solid var(--border);border-radius:999px;padding:7px 15px;box-shadow:0 4px 14px rgba(25,31,46,.08);white-space:nowrap;display:flex;align-items:center}
.ig-story .ig-sd{width:8px;height:8px;border-radius:50%;margin-right:8px;display:inline-block}
.ig-stage{position:absolute;z-index:2;transform:translate(-50%,0);font:700 10.5px 'Space Grotesk',sans-serif;letter-spacing:.05em;text-transform:uppercase;color:var(--ink3);white-space:nowrap}
.ig-stage b{display:inline-grid;place-items:center;width:16px;height:16px;border-radius:50%;background:var(--green);color:#fff;font:700 9px 'JetBrains Mono',monospace;margin-right:6px;vertical-align:middle}
.ig-legend{position:absolute;left:24px;bottom:18px;z-index:3;display:flex;gap:12px;flex-wrap:wrap;font-size:11px;color:var(--ink2);background:rgba(255,255,255,.7);backdrop-filter:blur(6px);border:1px solid var(--border);border-radius:10px;padding:8px 12px}
.ig-legend .ig-chip{display:inline-flex;align-items:center;gap:6px;font-weight:600}
.ig-legend .ig-ld{width:9px;height:9px;border-radius:50%}
/* tablet — shrink tiles so 4 columns still fit */
@media(max-width:1000px){
  .ig-tile{width:72px}
  .ig-tile .ig-ico{width:40px;height:40px}
  .ig-tile .ig-ico img{width:21px;height:21px}
  .ig-tile .ig-nm{font-size:10px}
}
/* phone — globe only, stacked under the headline */
@media(max-width:640px){
  .ig-flow{position:relative;inset:auto;height:340px}
  .ig-tile,.ig-human,.ig-stage,.ig-story{display:none}
  .ig-legend{left:50%;transform:translateX(-50%);bottom:6px;justify-content:center;max-width:calc(100% - 24px)}
}
`

export default function IngestionGlobe() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const cvRef = useRef<HTMLCanvasElement>(null)
  const tilesRef = useRef<HTMLDivElement>(null)
  const legendRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cv = cvRef.current!, tilesEl = tilesRef.current!, legendEl = legendRef.current!
    const ctx = cv.getContext('2d')!
    let raf = 0, vis = true
    const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches /* reduced motion: draw once and hold still, no pointer effects */

    const B = { a: '#1F6B3A', rgb: '31,107,58' }
    const TYPES = [
      { k: 'Decision', c: '#4A2FA8' }, { k: 'Task', c: '#1B4F8F' },
      { k: 'Commitment', c: '#0E7490' }, { k: 'Risk', c: '#9B1D1D' }, { k: 'Note', c: '#6B7280' },
    ]
    const SOURCES = [
      { n: 'Gmail', c: '#EA4335', f: 'gmail.svg', ty: 0 },
      { n: 'WhatsApp', c: '#25D366', f: 'whatsapp.svg', ty: 1 },
      { n: 'Slack', c: '#4A154B', f: 'slack.svg', ty: 2 },
      { n: 'Zoom', c: '#2D8CFF', f: 'zoom.svg', ty: 3 },
      { n: 'Teams', c: '#6264A7', f: 'teams.svg', ty: 4 },
      { n: 'Google Meet', c: '#00832D', f: 'googlemeet.svg', ty: null as number | null },
    ]
    const AGENTS = [
      { e: '⚖', n: 'Decision Logger', ty: 0 }, { e: '✓', n: 'Task Runner', ty: 1 },
      { e: '◆', n: 'Commitment Keeper', ty: 2 }, { e: '⚑', n: 'Risk Mitigator', ty: 3 },
    ]
    const HUMANS = [
      { i: 'HA', c: 'linear-gradient(135deg,#4A2FA8,#1B4F8F)' },
      { i: 'SK', c: '#1F6B3A' }, { i: '+3', c: '#8A8F99' },
    ]
    legendEl.innerHTML = TYPES.map(t => `<span class="ig-chip" style="color:${t.c}"><span class="ig-ld" style="background:${t.c}"></span>${t.k}</span>`).join('')

    const N = 150, pts: any[] = []
    for (let i = 0; i < N; i++) { const y = 1 - (i / (N - 1)) * 2; const rad = Math.sqrt(Math.max(0, 1 - y * y)); const th = Math.PI * (3 - Math.sqrt(5)) * i; pts.push({ x: Math.cos(th) * rad, y, z: Math.sin(th) * rad, ty: i % TYPES.length, lab: (i % 19 === 9) }) }
    const edges: number[][] = []
    for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) { const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, dz = pts[i].z - pts[j].z; if (dx * dx + dy * dy + dz * dz < 0.16) edges.push([i, j]) }

    let srcA: any[] = [], agA: any[] = [], GX = 0, GY = 0, GR = 0, HX = 0, HY = 0
    function hexa(h: string, a: number) { const n = parseInt(h.slice(1), 16); return 'rgba(' + ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + a + ')' }
    function buildTiles() {
      tilesEl.innerHTML = ''; srcA = []; agA = []
      SOURCES.forEach(s => { const el = document.createElement('div'); el.className = 'ig-tile'; el.innerHTML = `<div class="ig-ico"><img src="/globe-icons/${s.f}?v=2" alt="${s.n}"></div><div class="ig-nm">${s.n}</div>`; tilesEl.appendChild(el); srcA.push({ el, ty: s.ty }) })
      AGENTS.forEach(a => { const c = TYPES[a.ty].c; const el = document.createElement('div'); el.className = 'ig-tile ig-agent'; el.innerHTML = `<div class="ig-ico" style="background:${hexa(c, 0.12)};color:${c};border-color:${hexa(c, 0.35)}">${a.e}</div><div class="ig-nm">${a.n}</div>`; tilesEl.appendChild(el); agA.push({ el, ty: a.ty }) })
      const hu = document.createElement('div'); hu.className = 'ig-human'; hu.dataset.h = '1'; hu.innerHTML = `<div class="ig-avs">${HUMANS.map(h => `<span class="ig-av" style="background:${h.c}">${h.i}</span>`).join('')}</div><div class="ig-lab">You + team</div><div class="ig-sub">Approve</div>`; tilesEl.appendChild(hu)
      const cap = document.createElement('div'); cap.className = 'ig-gcap'; cap.dataset.cap = '1'; cap.innerHTML = 'Knowledge layer · <b>decisions · tasks · commitments · risks · notes</b>'; tilesEl.appendChild(cap)
      const st = document.createElement('div'); st.className = 'ig-story'; st.dataset.story = '1'; st.innerHTML = '<span class="ig-sd"></span><span class="ig-tx"></span>'; tilesEl.appendChild(st)
      ;[['1', 'Capture'], ['2', 'Knowledge layer'], ['3', 'You approve'], ['4', 'Agents act']].forEach((s, i) => { const el = document.createElement('div'); el.className = 'ig-stage'; el.dataset.stage = String(i); el.innerHTML = '<b>' + s[0] + '</b>' + s[1]; tilesEl.appendChild(el) })
    }
    const $ = (sel: string) => tilesEl.querySelector(sel) as HTMLElement | null

    let W = 0, H = 0, DPR = 1
    function layout() {
      DPR = Math.min(2, window.devicePixelRatio || 1); const r = cv.getBoundingClientRect(); W = r.width; H = r.height; cv.width = W * DPR; cv.height = H * DPR; ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
      const narrow = W < 640
      const top = Math.max(H * 0.40, 400), bot = H * 0.99, bh = bot - top
      if (narrow) { GX = W * 0.5; GY = H * 0.52; GR = Math.min(W * 0.42, H * 0.42, 200) }
      // absolute cap so the globe is the SAME size at every zoom / screen (no ballooning when zoomed out)
      else { GX = W * 0.44; GY = top + bh * 0.52; GR = Math.min(W * 0.24, bh * 0.52, 280) }
      HX = W * 0.69; HY = GY; const lx = W * 0.11, rx = W * 0.90
      const colH = H * 0.92 - top
      srcA.forEach((o, i) => { const y = top + colH * ((i + 0.5) / SOURCES.length); o.x = lx; o.y = y; o.el.style.left = lx + 'px'; o.el.style.top = y + 'px' })
      agA.forEach((o, i) => { const y = top + colH * ((i + 0.5) / AGENTS.length); o.x = rx; o.y = y; o.el.style.left = rx + 'px'; o.el.style.top = y + 'px' })
      const hu = $('.ig-human'); if (hu) { hu.style.left = HX + 'px'; hu.style.top = HY + 'px' }
      const cap = $('.ig-gcap'); if (cap) { cap.style.left = GX + 'px'; cap.style.top = (GY + GR + 16) + 'px' }
      const st = $('.ig-story'); if (st) { st.style.left = GX + 'px'; st.style.top = (GY + GR + 44) + 'px' }
      ;[lx, GX, HX, rx].forEach((x, i) => { const el = $('.ig-stage[data-stage="' + i + '"]'); if (el) { el.style.left = x + 'px'; el.style.top = (top - 26) + 'px' } })
    }

    let mx = -9999, my = -9999, ox = 0, oy = 0, over = false
    /* pieces of information: a pool of 40 that fly from the pointer (or a tool tile) into the globe, tumbling and shrinking.
       Each one that lands turns into a lit dot of its claim colour on the sphere that fades back in about a second. */
    const NP = 40
    type Piece = { on: boolean; out: boolean; k: number; x0: number; y0: number; cx: number; cy: number; x1: number; y1: number; u: number; dur: number; col: string; rot: number; spin: number; s: number }
    const pcs: Piece[] = Array.from({ length: NP }, () => ({ on: false, out: false, k: 0, x0: 0, y0: 0, cx: 0, cy: 0, x1: 0, y1: 0, u: 0, dur: 0.4, col: '#000', rot: 0, spin: 0, s: 8 }))
    let pNext = 0, lastSpawn = 0, lastStream = 0, lastOut = 0, spX = 0, spY = 0, hotSrc = -1, hotAg = -1, hg = 0, swellK = 0, ripG = 9, wasInG = false, lastP: { sx: number; sy: number; z: number }[] = []
    const lit = new Float32Array(N), litc: string[] = new Array(N).fill('#1F6B3A')
    function freePiece() { for (let n = 0; n < NP; n++) { const j = (pNext + n) % NP; if (!pcs[j].on) { pNext = (j + 1) % NP; return pcs[j] } } return null }
    function spawnIn(x: number, y: number, ty: number) {
      const p = freePiece(); if (!p) return
      const dx = x - GX, dy = y - GY, d = Math.hypot(dx, dy) || 1, ex = GX + (dx / d) * GR * 0.5, ey = GY + (dy / d) * GR * 0.5
      const bend = (Math.random() - 0.5) * 0.5
      /* a page a little more often than the other four kinds */
      p.on = true; p.out = false; p.k = Math.random() < 0.36 ? 0 : 1 + ((Math.random() * 4) | 0); p.x0 = x; p.y0 = y; p.x1 = ex; p.y1 = ey
      p.cx = x + (ex - x) * 0.5 - (ey - y) * bend; p.cy = y + (ey - y) * 0.5 + (ex - x) * bend
      /* big enough (about 21 to 28 px) and slow enough (0.42 to 0.75 s) to be read as pages and messages, not dots */
      p.u = 0; p.dur = 0.42 + Math.random() * 0.33; p.col = TYPES[ty].c; p.rot = (Math.random() - 0.5) * 1.2; p.spin = (Math.random() - 0.5) * 4; p.s = 10.5 + Math.random() * 3.5
    }
    function spawnOut(a: any) {
      const p = freePiece(); if (!p) return
      const ep = edgePoint(a.x, a.y), x1 = a.x - 24, y1 = a.y, bend = (Math.random() - 0.5) * 0.3
      p.on = true; p.out = true; p.k = 0; p.x0 = ep.x; p.y0 = ep.y; p.x1 = x1; p.y1 = y1
      p.cx = ep.x + (x1 - ep.x) * 0.5 - (y1 - ep.y) * bend; p.cy = ep.y + (y1 - ep.y) * 0.5 + (x1 - ep.x) * bend
      p.u = 0; p.dur = 0.5 + Math.random() * 0.3; p.col = TYPES[a.ty].c; p.rot = 0; p.spin = 0; p.s = 4.5
    }
    function burst(x: number, y: number, n: number) {
      for (let i = 0; i < n; i++) {
        if (Math.hypot(x - GX, y - GY) < GR * 1.6) { const a = Math.random() * 6.283, r = GR * (1.7 + Math.random() * 0.5); spawnIn(GX + Math.cos(a) * r, GY + Math.sin(a) * r, (Math.random() * TYPES.length) | 0) }
        else spawnIn(x + (Math.random() - 0.5) * 16, y + (Math.random() - 0.5) * 16, (Math.random() * TYPES.length) | 0)
      }
    }
    function setHot(si: number, ai: number) {
      if (si !== hotSrc) { if (hotSrc >= 0) srcA[hotSrc].el.classList.remove('ig-hot'); hotSrc = si; if (si >= 0) srcA[si].el.classList.add('ig-hot') }
      if (ai !== hotAg) { if (hotAg >= 0) agA[hotAg].el.classList.remove('ig-hot'); hotAg = ai; if (ai >= 0) agA[ai].el.classList.add('ig-hot') }
    }
    const onMove = (e: MouseEvent) => {
      const r = cv.getBoundingClientRect(); mx = (e.clientX - r.left) * (W / (r.width || 1)); my = (e.clientY - r.top) * (H / (r.height || 1)); over = true
      if (W < 640) return
      let si = -1, ai = -1
      srcA.forEach((o, i) => { if (Math.hypot(mx - o.x, my - o.y) < 34) si = i })
      agA.forEach((o, i) => { if (Math.hypot(mx - o.x, my - o.y) < 34) ai = i })
      setHot(si, ai)
      const now = performance.now(), moved = Math.abs(mx - spX) + Math.abs(my - spY)
      if (si < 0 && ai < 0 && Math.hypot(mx - GX, my - GY) > GR * 1.03 && now - lastSpawn > 40 && moved > 3) { spawnIn(mx, my, (Math.random() * TYPES.length) | 0); lastSpawn = now; spX = mx; spY = my }
    }
    const onLeave = () => { over = false; mx = -9999; my = -9999; setHot(-1, -1) }
    const onDown = (e: PointerEvent) => { const r = cv.getBoundingClientRect(); burst((e.clientX - r.left) * (W / (r.width || 1)), (e.clientY - r.top) * (H / (r.height || 1)), 5) }
    const onResize = () => { layout(); if (RM) frame(0) }
    if (!RM) { cv.addEventListener('mousemove', onMove); cv.addEventListener('mouseleave', onLeave); cv.addEventListener('pointerdown', onDown) }
    window.addEventListener('resize', onResize)

    let ang = 0, pops: any[] = [], lastPop = 0
    function edgePoint(x: number, y: number) { const dx = x - GX, dy = y - GY, d = Math.hypot(dx, dy) || 1; return { x: GX + dx / d * GR, y: GY + dy / d * GR } }
    function lerp(a: number, b: number, e: number) { return a + (b - a) * e }
    function eio(t: number) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2 }
    function roundRect(x: number, y: number, w: number, h: number, r: number) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath() }
    function drawChip(cx: number, cy: number, label: string, sub: string, col: string, approved: boolean, sc: number) {
      const w = 158 * sc, h = 42 * sc, x = cx - w / 2, y = cy - h / 2; ctx.fillStyle = '#fff'; ctx.strokeStyle = hexa(col, 0.55); ctx.lineWidth = 1.5; roundRect(x, y, w, h, 11 * sc); ctx.fill(); ctx.stroke()
      ctx.fillStyle = col; ctx.font = '700 ' + (9.5 * sc) + 'px "Space Grotesk",sans-serif'; ctx.fillText(label, x + 12 * sc, y + 16 * sc)
      ctx.fillStyle = '#191F2E'; ctx.font = '600 ' + (11.5 * sc) + 'px "Space Grotesk",sans-serif'; ctx.fillText(sub, x + 12 * sc, y + 31 * sc)
      if (approved) { const ax = x + w - 15 * sc, ay = cy; ctx.fillStyle = '#1F6B3A'; ctx.beginPath(); ctx.arc(ax, ay, 8 * sc, 0, 7); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.8 * sc; ctx.beginPath(); ctx.moveTo(ax - 3.2 * sc, ay + .3 * sc); ctx.lineTo(ax - 0.7 * sc, ay + 3 * sc); ctx.lineTo(ax + 3.6 * sc, ay - 3 * sc); ctx.stroke() }
    }
    const STORY_EX = [{ src: 'Gmail', sub: 'Drop the per-seat tier' }, { src: 'WhatsApp', sub: 'Flip 5 capture routes' }, { src: 'Slack', sub: 'SOP by Friday' }, { src: 'Zoom', sub: 'Customs delay risks Sept' }]
    function drawStory(t: number) {
      if (srcA.length < 4 || agA.length < 4) return
      const C = 9000, idx = Math.floor((t % (C * 4)) / C), e = t % C
      const ty = idx, col = TYPES[ty].c, ex = STORY_EX[idx], src = srcA[idx], ag = agA[idx], agName = AGENTS[idx].n
      const g0 = { x: src.x + 24, y: src.y }, gc = { x: GX, y: GY }, hu = { x: HX, y: HY }, agp = { x: ag.x - 24, y: ag.y }
      let cap = '', pos = gc, mode = 'chip', sc = 1, al = 1, ok = false
      if (e < 2200) { const p = eio(e / 2200); pos = { x: lerp(g0.x, gc.x, p), y: lerp(g0.y, gc.y, p) }; mode = 'token'; cap = 'Capturing from ' + ex.src }
      else if (e < 3800) { const p = eio(Math.min(1, (e - 2200) / 600)); pos = gc; sc = 0.55 + 0.45 * p; cap = 'Becomes a ' + TYPES[ty].k }
      else if (e < 5800) { const p = eio((e - 3800) / 2000); pos = { x: lerp(gc.x, hu.x, p), y: lerp(gc.y, hu.y, p) }; ok = e > 5200; cap = ok ? 'You approve it' : 'You review' }
      else if (e < 7900) { const p = eio((e - 5800) / 2100); pos = { x: lerp(hu.x, agp.x, p), y: lerp(hu.y, agp.y, p) }; ok = true; cap = 'Routed to ' + agName }
      else { al = 1 - (e - 7900) / 1100; pos = agp; ok = true; cap = TYPES[ty].k + ' closed' }
      ctx.save(); ctx.globalAlpha = Math.max(0, al)
      if (mode === 'token') { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(pos.x, pos.y, 6, 0, 7); ctx.fill(); ctx.strokeStyle = hexa(col, 0.4); ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(pos.x, pos.y, 11, 0, 7); ctx.stroke() }
      else drawChip(pos.x, pos.y, TYPES[ty].k.toUpperCase(), ex.sub, col, ok, sc)
      ctx.restore()
      const st = $('.ig-story'); if (st) { st.style.opacity = String(Math.max(0, al)); (st.querySelector('.ig-sd') as HTMLElement).style.background = ok && e >= 3800 && e < 5800 ? '#1F6B3A' : col; (st.querySelector('.ig-tx') as HTMLElement).textContent = cap }
    }
    /* the five kinds of information, drawn small (about 14 to 20 px) */
    function drawPiece(k: number, s: number, col: string) {
      ctx.lineWidth = 1.5; ctx.strokeStyle = col; ctx.fillStyle = '#fff'; ctx.lineCap = 'round'
      if (k === 0) { roundRect(-0.7 * s, -s, 1.4 * s, 2 * s, 2); ctx.fill(); ctx.stroke(); ctx.beginPath(); for (let i = 0; i < 3; i++) { ctx.moveTo(-0.4 * s, (-0.45 + i * 0.5) * s); ctx.lineTo((i === 2 ? 0.1 : 0.4) * s, (-0.45 + i * 0.5) * s) } ctx.stroke() }
      else if (k === 1) { roundRect(-s, -0.75 * s, 2 * s, 1.4 * s, 4); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-0.6 * s, 0.65 * s); ctx.lineTo(-0.7 * s, s); ctx.lineTo(-0.15 * s, 0.65 * s); ctx.fillStyle = '#fff'; ctx.fill(); ctx.stroke(); ctx.fillStyle = col; for (let i = -1; i <= 1; i++) { ctx.beginPath(); ctx.arc(i * 0.5 * s, -0.05 * s, 1.2, 0, 7); ctx.fill() } }
      else if (k === 2) { ctx.fillStyle = hexa(col, 0.16); roundRect(-0.9 * s, -0.9 * s, 1.8 * s, 1.8 * s, 2); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(0.35 * s, 0.9 * s); ctx.lineTo(0.9 * s, 0.35 * s); ctx.lineTo(0.35 * s, 0.35 * s); ctx.closePath(); ctx.fillStyle = col; ctx.fill(); ctx.beginPath(); ctx.moveTo(-0.55 * s, -0.4 * s); ctx.lineTo(0.5 * s, -0.4 * s); ctx.moveTo(-0.55 * s, 0); ctx.lineTo(0.2 * s, 0); ctx.stroke() }
      else if (k === 3) { roundRect(-s, -0.8 * s, 2 * s, 1.6 * s, 3); ctx.fill(); ctx.stroke(); ctx.fillStyle = col; roundRect(-s, -0.8 * s, 2 * s, 0.55 * s, 3); ctx.fill(); for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc((-0.5 + i * 0.5) * s, 0.35 * s, 1.1, 0, 7); ctx.fill() } }
      else { roundRect(-s, -0.7 * s, 2 * s, 1.4 * s, 0.7 * s); ctx.fill(); ctx.stroke(); ctx.fillStyle = col; const hs = [0.3, 0.7, 1, 0.6, 0.35]; for (let i = 0; i < 5; i++) { const h = hs[i] * s * 0.9; ctx.fillRect((-0.8 + i * 0.4) * s - 0.7, -h / 2, 1.5, h) } }
    }
    function frame(t: number) {
      /* out of view: keep the clock, skip the drawing (it used to redraw for the whole page scroll) */
      if (!vis && !RM) { (frame as any).last = t; raf = requestAnimationFrame(frame); return }
      const rgb = B.rgb; ctx.clearRect(0, 0, W, H)
      const dt = Math.min(0.05, Math.max(0, (t - (frame as any).last) / 1000) || 0.016); (frame as any).last = t
      const bm = (window as unknown as { __bm?: { vel: number; hp: number } }).__bm
      const spin = bm ? 1 + 3 * bm.hp + Math.min(4, Math.abs(bm.vel) * 0.003) : 1 /* the page's scroll spins the globe up */
      const inG = !RM && over && Math.hypot(mx - GX, my - GY) < GR * 1.03
      hg += ((inG ? 1 : 0) - hg) * 0.08
      if (inG && !wasInG) ripG = 0; wasInG = inG
      swellK *= Math.exp(-dt * 6)
      const swell = 1 + 0.04 * hg + 0.025 * swellK
      /* the pieces: fly, then land as a lit dot on the sphere */
      if (!RM) {
        if (hotSrc >= 0 && t - lastStream > 110) { lastStream = t; const o = srcA[hotSrc]; spawnIn(o.x + 24, o.y, o.ty != null ? o.ty : ((Math.random() * TYPES.length) | 0)) }
        if (hotAg >= 0 && t - lastOut > 150) { lastOut = t; spawnOut(agA[hotAg]) }
        for (let i = 0; i < NP; i++) {
          const p = pcs[i]; if (!p.on) continue
          p.u += dt / p.dur
          if (p.u >= 1) {
            p.on = false
            if (!p.out && lastP.length) {
              let bi = -1, bd = 1e9; for (let j = 0; j < lastP.length; j++) { if (lastP[j].z < -0.05) continue; const d = Math.hypot(lastP[j].sx - p.x1, lastP[j].sy - p.y1); if (d < bd) { bd = d; bi = j } }
              if (bi >= 0) { lit[bi] = 1; litc[bi] = p.col; swellK = Math.min(1, swellK + 0.35) }
            }
          }
        }
        for (let j = 0; j < N; j++) if (lit[j] > 0) lit[j] = Math.max(0, lit[j] - dt)
        if (ripG < 1) ripG += dt * 1.1
      }
      const tox = over ? ((mx - GX) / W) * 0.7 : 0, toy = over ? ((my - GY) / H) * 0.6 : 0; ox += (tox - ox) * 0.06; oy += (toy - oy) * 0.06
      const ry = ang + ox, rx = -0.30 + oy; const now = t * 0.00045
      const narrow = W < 640
      const gs = Math.max(0.55, Math.min(1, GR / 280)) // scale dot/edge weight with globe size -> same density at every viewport
      if (!narrow) {
      srcA.forEach((o, i) => {
        const ep = edgePoint(o.x, o.y); const tc = o.ty != null ? TYPES[o.ty].c : null
        ctx.strokeStyle = tc ? hexa(tc, 0.18) : 'rgba(138,143,153,0.16)'; ctx.lineWidth = 1.3; ctx.setLineDash([2, 8]); ctx.beginPath(); ctx.moveTo(o.x + 24, o.y); ctx.lineTo(ep.x, ep.y); ctx.stroke(); ctx.setLineDash([])
        for (let k = 0; k < 3; k++) { const p = (now + i * 0.13 + k / 3) % 1; const px = (o.x + 24) + (ep.x - (o.x + 24)) * p, py = o.y + (ep.y - o.y) * p; const a = Math.sin(p * Math.PI) * 0.9; ctx.beginPath(); ctx.arc(px, py, 3.4, 0, 7); ctx.fillStyle = tc ? hexa(tc, a) : 'rgba(138,143,153,' + a + ')'; ctx.fill() }
      })
      const hep = edgePoint(HX, HY)
      ctx.strokeStyle = 'rgba(138,143,153,0.30)'; ctx.lineWidth = 1.6; ctx.setLineDash([2, 8]); ctx.beginPath(); ctx.moveTo(hep.x, hep.y); ctx.lineTo(HX - 44, HY); ctx.stroke(); ctx.setLineDash([])
      for (let k = 0; k < 4; k++) { const p = (now * 1.1 + k / 4) % 1; const px = hep.x + ((HX - 44) - hep.x) * p, py = hep.y + (HY - hep.y) * p; ctx.beginPath(); ctx.arc(px, py, 3.4, 0, 7); ctx.fillStyle = 'rgba(138,143,153,' + (Math.sin(p * Math.PI) * 0.8) + ')'; ctx.fill() }
      agA.forEach((o, i) => {
        const ac = TYPES[o.ty].c; ctx.strokeStyle = hexa(ac, 0.24); ctx.lineWidth = 1.3; ctx.setLineDash([2, 8]); ctx.beginPath(); ctx.moveTo(HX + 44, HY); ctx.lineTo(o.x - 24, o.y); ctx.stroke(); ctx.setLineDash([])
        for (let k = 0; k < 2; k++) { const p = (now + i * 0.2 + k / 2) % 1; const px = (HX + 44) + ((o.x - 24) - (HX + 44)) * p, py = HY + (o.y - HY) * p; ctx.beginPath(); ctx.arc(px, py, 3.2, 0, 7); ctx.fillStyle = hexa(ac, Math.sin(p * Math.PI) * 0.82); ctx.fill() }
      })
      const ap = (now * 1.0) % 1; ctx.strokeStyle = hexa(B.a, (1 - ap) * 0.4); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(HX, HY, 10 + ap * 22, 0, 7); ctx.stroke()
      if (t - lastPop > 500) { lastPop = t; const cs = srcA.filter(o => o.ty != null && o.ty !== 4); const s = cs[(Math.random() * cs.length) | 0]; if (s) { const ep = edgePoint(s.x, s.y); pops.push({ x: ep.x, y: ep.y, ty: TYPES[s.ty], age: 0 }) } }
      pops = pops.filter(o => o.age < 1); pops.forEach(o => { o.age += 0.02; const al = 1 - o.age; ctx.strokeStyle = hexa(o.ty.c, al * 0.6); ctx.lineWidth = 1.4; ctx.beginPath(); ctx.arc(o.x, o.y, 4 + o.age * 16, 0, 7); ctx.stroke(); ctx.fillStyle = hexa(o.ty.c, al); ctx.font = '700 9.5px "Space Grotesk",sans-serif'; ctx.fillText(o.ty.k, o.x + 7, o.y - 6) })
      }
      const P = pts.map(p => { let x = p.x * Math.cos(ry) - p.z * Math.sin(ry), z = p.x * Math.sin(ry) + p.z * Math.cos(ry), y = p.y; const y2 = y * Math.cos(rx) - z * Math.sin(rx), z2 = y * Math.sin(rx) + z * Math.cos(rx); const sc = 1 / (1.8 - z2 * 0.6); return { sx: GX + x * GR * swell * sc, sy: GY + y2 * GR * swell * sc, z: z2 } })
      lastP = P
      const near = P.map(p => { if (!over) return 9999; return Math.hypot(p.sx - mx, p.sy - my) })
      edges.forEach(([a, b]) => { const A = P[a], Bp = P[b], depth = (A.z + Bp.z) / 2; let al = Math.max(0, 0.05 + (depth + 1) / 2 * 0.13); const nf = Math.min(near[a], near[b]); if (nf < 150) al += (1 - nf / 150) * 0.4; ctx.strokeStyle = 'rgba(' + rgb + ',' + al + ')'; ctx.lineWidth = (nf < 150 ? 1 : 0.6) * gs; ctx.beginPath(); ctx.moveTo(A.sx, A.sy); ctx.lineTo(Bp.sx, Bp.sy); ctx.stroke() })
      if (over) P.forEach((p, i) => { if (near[i] < 170) { const al = (1 - near[i] / 170) * 0.5; ctx.strokeStyle = 'rgba(' + rgb + ',' + al + ')'; ctx.lineWidth = 0.8 * gs; ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(p.sx, p.sy); ctx.stroke() } })
      P.forEach((p, i) => {
        const t2 = (p.z + 1) / 2; const col = TYPES[pts[i].ty].c; let al = 0.32 + t2 * 0.6, rad = (1.9 + t2 * 2.7) * gs
        if (near[i] < 150) { const k = 1 - near[i] / 150; al = Math.min(1, al + k * 0.5); rad += k * 2.5 * gs }
        if (lit[i] > 0 && p.z > -0.05) { const L = lit[i]; ctx.beginPath(); ctx.arc(p.sx, p.sy, rad + 5 * L * gs, 0, 7); ctx.fillStyle = hexa(litc[i], 0.22 * L); ctx.fill(); ctx.beginPath(); ctx.arc(p.sx, p.sy, rad + 2.6 * L * gs, 0, 7); ctx.fillStyle = hexa(litc[i], Math.min(1, 0.4 + 0.6 * L)); ctx.fill(); return }
        ctx.beginPath(); ctx.arc(p.sx, p.sy, rad, 0, 7); ctx.fillStyle = hexa(col, al); ctx.fill()
        if (pts[i].lab && pts[i].ty !== 4 && p.z > -0.1) { ctx.fillStyle = 'rgba(25,31,46,' + (0.4 + t2 * 0.5) + ')'; ctx.font = '600 10.5px "Space Grotesk",sans-serif'; ctx.fillText(TYPES[pts[i].ty].k, p.sx + rad + 5, p.sy + 4) }
      })
      if (!narrow) drawStory(t)
      /* one ripple ring leaves the globe when the pointer arrives on it */
      if (!RM && ripG < 1) { ctx.strokeStyle = hexa(B.a, (1 - ripG) * 0.5); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(GX, GY, GR * 0.57 * swell * (1.02 + 0.55 * ripG), 0, 7); ctx.stroke() }
      /* pieces of information in flight: tumbling, shrinking as they near the globe */
      if (!RM) for (let i = 0; i < NP; i++) {
        const p = pcs[i]; if (!p.on) continue
        const u = Math.min(1, p.u), e = u * u * (3 - 2 * u), v = 1 - e
        const x = v * v * p.x0 + 2 * v * e * p.cx + e * e * p.x1, y = v * v * p.y0 + 2 * v * e * p.cy + e * e * p.y1
        if (p.out) { ctx.fillStyle = p.col; ctx.globalAlpha = Math.min(1, (1 - u) * 2.2); ctx.beginPath(); ctx.arc(x, y, p.s, 0, 7); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(x - 2, y + 0.2); ctx.lineTo(x - 0.5, y + 1.8); ctx.lineTo(x + 2.4, y - 1.8); ctx.stroke(); ctx.globalAlpha = 1; continue }
        ctx.save(); ctx.translate(x, y); ctx.rotate(p.rot + p.spin * u); ctx.globalAlpha = Math.min(1, (1 - u) * 4 + 0.1)
        const sc = 1 - 0.62 * e * e; drawPiece(p.k, p.s * sc, p.col); ctx.restore()
      }
      if (!RM) {
        /* what is in flight and lit, for the tests */
        let live = 0, litN = 0; for (let i = 0; i < NP; i++) if (pcs[i].on) live++; for (let j = 0; j < N; j++) if (lit[j] > 0) litN++
        const tag = live + '/' + litN + '/' + hg.toFixed(1) + '/' + (hotSrc >= 0 ? 's' + hotSrc : hotAg >= 0 ? 'a' + hotAg : '-'); if (cv.dataset.pc !== tag) cv.dataset.pc = tag
        ang += 0.0008 * (1 + 3.5 * hg) * spin; raf = requestAnimationFrame(frame)
      }
    }

    buildTiles(); layout()
    const io = 'IntersectionObserver' in window ? new IntersectionObserver((es) => { vis = es[es.length - 1].isIntersecting }, { rootMargin: '160px' }) : null
    io?.observe(cv)
    if (RM) frame(0); else raf = requestAnimationFrame(frame)
    return () => { cancelAnimationFrame(raf); io?.disconnect(); cv.removeEventListener('mousemove', onMove); cv.removeEventListener('mouseleave', onLeave); cv.removeEventListener('pointerdown', onDown); window.removeEventListener('resize', onResize); tilesEl.innerHTML = '' }
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="ig-flow" ref={wrapRef} aria-label="How Knowcap works: capture from your tools, structure into a knowledge graph, you approve, agents act">
        <canvas ref={cvRef} />
        <div ref={tilesRef} />
        <div className="ig-legend" ref={legendRef} />
      </div>
    </>
  )
}
