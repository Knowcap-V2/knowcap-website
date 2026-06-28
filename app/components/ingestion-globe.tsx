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
  --ink1:#18181B;--ink2:#4A4F5A;--ink3:#8A8F99;--cream:#FBFAF8;--border:#E7E4DD;--green:#1F6B3A;
  font-family:'Space Grotesk',system-ui,sans-serif}
.ig-flow canvas{position:absolute;inset:0;width:100%;height:100%;z-index:1}
.ig-tile{position:absolute;z-index:2;display:flex;flex-direction:column;align-items:center;gap:6px;transform:translate(-50%,-50%);width:84px;pointer-events:none}
.ig-tile .ig-ico{width:46px;height:46px;border-radius:13px;display:grid;place-items:center;box-shadow:0 5px 14px rgba(24,24,27,.12)}
.ig-tile .ig-ico img{width:27px;height:27px;display:block}
.ig-tile:not(.ig-agent) .ig-ico{background:#fff;border:1px solid var(--border)}
.ig-tile:not(.ig-agent) .ig-nm{display:none}
.ig-tile .ig-nm{font:600 11px 'Space Grotesk',sans-serif;color:var(--ink2);text-align:center;white-space:nowrap}
.ig-tile.ig-agent .ig-ico{font-size:18px;border:1px solid var(--border)}
.ig-human{position:absolute;z-index:2;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;gap:7px;pointer-events:none}
.ig-human .ig-avs{display:flex}
.ig-human .ig-av{width:36px;height:36px;border-radius:50%;border:2.5px solid var(--cream);margin-left:-9px;display:grid;place-items:center;color:#fff;font:700 12px 'Space Grotesk',sans-serif;box-shadow:0 3px 10px rgba(24,24,27,.14)}
.ig-human .ig-av:first-child{margin-left:0}
.ig-human .ig-lab{font:600 11.5px 'Space Grotesk',sans-serif;color:var(--ink1);background:#fff;border:1px solid var(--border);border-radius:999px;padding:4px 12px;white-space:nowrap;box-shadow:0 2px 6px rgba(24,24,27,.06)}
.ig-human .ig-sub{font:700 9px 'JetBrains Mono',monospace;letter-spacing:.1em;text-transform:uppercase;color:var(--green)}
.ig-gcap{display:none;position:absolute;z-index:2;transform:translate(-50%,0);font:600 12px 'Space Grotesk',sans-serif;color:var(--ink3);white-space:nowrap;text-align:center}
.ig-gcap b{color:var(--ink1);font-weight:600}
.ig-story{position:absolute;z-index:3;transform:translate(-50%,0);font:600 12.5px 'Space Grotesk',sans-serif;color:var(--ink1);background:#fff;border:1px solid var(--border);border-radius:999px;padding:7px 15px;box-shadow:0 4px 14px rgba(24,24,27,.08);white-space:nowrap;display:flex;align-items:center}
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
    let raf = 0

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
      SOURCES.forEach(s => { const el = document.createElement('div'); el.className = 'ig-tile'; el.innerHTML = `<div class="ig-ico"><img src="/globe-icons/${s.f}" alt="${s.n}"></div><div class="ig-nm">${s.n}</div>`; tilesEl.appendChild(el); srcA.push({ el, ty: s.ty }) })
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
      const top = H * 0.45, bot = H * 0.99, bh = bot - top
      if (narrow) { GX = W * 0.5; GY = H * 0.52; GR = Math.min(W * 0.42, H * 0.42) }
      else { GX = W * 0.44; GY = top + bh * 0.50; GR = Math.min(W * 0.21, bh * 0.50) }
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
    const onMove = (e: MouseEvent) => { const r = cv.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; over = true }
    const onLeave = () => { over = false; mx = -9999; my = -9999 }
    cv.addEventListener('mousemove', onMove); cv.addEventListener('mouseleave', onLeave); window.addEventListener('resize', layout)

    let ang = 0, pops: any[] = [], lastPop = 0
    function edgePoint(x: number, y: number) { const dx = x - GX, dy = y - GY, d = Math.hypot(dx, dy) || 1; return { x: GX + dx / d * GR, y: GY + dy / d * GR } }
    function lerp(a: number, b: number, e: number) { return a + (b - a) * e }
    function eio(t: number) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2 }
    function roundRect(x: number, y: number, w: number, h: number, r: number) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath() }
    function drawChip(cx: number, cy: number, label: string, sub: string, col: string, approved: boolean, sc: number) {
      const w = 158 * sc, h = 42 * sc, x = cx - w / 2, y = cy - h / 2; ctx.fillStyle = '#fff'; ctx.strokeStyle = hexa(col, 0.55); ctx.lineWidth = 1.5; roundRect(x, y, w, h, 11 * sc); ctx.fill(); ctx.stroke()
      ctx.fillStyle = col; ctx.font = '700 ' + (9.5 * sc) + 'px "Space Grotesk",sans-serif'; ctx.fillText(label, x + 12 * sc, y + 16 * sc)
      ctx.fillStyle = '#18181B'; ctx.font = '600 ' + (11.5 * sc) + 'px "Space Grotesk",sans-serif'; ctx.fillText(sub, x + 12 * sc, y + 31 * sc)
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
    function frame(t: number) {
      const rgb = B.rgb; ctx.clearRect(0, 0, W, H)
      const tox = over ? ((mx - GX) / W) * 0.7 : 0, toy = over ? ((my - GY) / H) * 0.6 : 0; ox += (tox - ox) * 0.06; oy += (toy - oy) * 0.06
      const ry = ang + ox, rx = -0.30 + oy; const now = t * 0.00045
      const narrow = W < 640
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
      const P = pts.map(p => { let x = p.x * Math.cos(ry) - p.z * Math.sin(ry), z = p.x * Math.sin(ry) + p.z * Math.cos(ry), y = p.y; const y2 = y * Math.cos(rx) - z * Math.sin(rx), z2 = y * Math.sin(rx) + z * Math.cos(rx); const sc = 1 / (1.8 - z2 * 0.6); return { sx: GX + x * GR * sc, sy: GY + y2 * GR * sc, z: z2 } })
      const near = P.map(p => { if (!over) return 9999; return Math.hypot(p.sx - mx, p.sy - my) })
      edges.forEach(([a, b]) => { const A = P[a], Bp = P[b], depth = (A.z + Bp.z) / 2; let al = Math.max(0, 0.05 + (depth + 1) / 2 * 0.13); const nf = Math.min(near[a], near[b]); if (nf < 150) al += (1 - nf / 150) * 0.4; ctx.strokeStyle = 'rgba(' + rgb + ',' + al + ')'; ctx.lineWidth = nf < 150 ? 1 : 0.6; ctx.beginPath(); ctx.moveTo(A.sx, A.sy); ctx.lineTo(Bp.sx, Bp.sy); ctx.stroke() })
      if (over) P.forEach((p, i) => { if (near[i] < 170) { const al = (1 - near[i] / 170) * 0.5; ctx.strokeStyle = 'rgba(' + rgb + ',' + al + ')'; ctx.lineWidth = 0.8; ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(p.sx, p.sy); ctx.stroke() } })
      P.forEach((p, i) => {
        const t2 = (p.z + 1) / 2; const col = TYPES[pts[i].ty].c; let al = 0.32 + t2 * 0.6, rad = 1.9 + t2 * 2.7
        if (near[i] < 150) { const k = 1 - near[i] / 150; al = Math.min(1, al + k * 0.5); rad += k * 2.5 }
        ctx.beginPath(); ctx.arc(p.sx, p.sy, rad, 0, 7); ctx.fillStyle = hexa(col, al); ctx.fill()
        if (pts[i].lab && pts[i].ty !== 4 && p.z > -0.1) { ctx.fillStyle = 'rgba(24,24,27,' + (0.4 + t2 * 0.5) + ')'; ctx.font = '600 10.5px "Space Grotesk",sans-serif'; ctx.fillText(TYPES[pts[i].ty].k, p.sx + rad + 5, p.sy + 4) }
      })
      if (!narrow) drawStory(t)
      ang += 0.0008; raf = requestAnimationFrame(frame)
    }

    buildTiles(); layout(); raf = requestAnimationFrame(frame)
    return () => { cancelAnimationFrame(raf); cv.removeEventListener('mousemove', onMove); cv.removeEventListener('mouseleave', onLeave); window.removeEventListener('resize', layout); tilesEl.innerHTML = '' }
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
