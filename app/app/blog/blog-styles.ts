/**
 * Shared scoped CSS for the blog surface (index + article pages).
 * Tokens follow docs/DESIGN.md — cream paper, Space Grotesk display,
 * JetBrains Mono for meta/claims, single green accent (#1F6B3A).
 * Injected as a <style> string (same pattern the compare pages use).
 */
export const BLOG_CSS = `
.kb-root{--bg:#FBFAF8;--surface:#FFFFFF;--bg-muted:#F5F4F1;--border:#E7E4DD;--ink:#18181B;--ink-2:#4A4F5A;--ink-3:#8A8F99;--accent:#1F6B3A;--accent-light:#E8F5ED;
  background:var(--bg);color:var(--ink);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:15px;line-height:1.6}
.kb-grotesk{font-family:var(--font-space-grotesk),sans-serif}
.kb-mono{font-family:var(--font-mono),monospace}
.kb-hero{background:var(--bg);color:var(--ink);padding:148px 40px 56px;border-bottom:1px solid var(--border)}
.kb-hero-inner{max-width:780px;margin:0 auto}
.kb-crumbs{font-family:var(--font-mono),monospace;font-size:12px;color:var(--ink-3);margin-bottom:28px}
.kb-crumbs a{color:var(--ink-3);text-decoration:none}
.kb-crumbs a:hover{color:var(--accent)}
.kb-eyebrow{font-family:var(--font-space-grotesk),sans-serif;font-size:10.5px;text-transform:uppercase;letter-spacing:.08em;font-weight:700;color:var(--ink-3);margin-bottom:12px}
.kb-h1{font-family:var(--font-space-grotesk),sans-serif;font-size:clamp(2rem,4.5vw,2.9rem);font-weight:700;letter-spacing:-.02em;line-height:1.15;margin:0 0 22px}
.kb-meta{display:flex;gap:20px;flex-wrap:wrap;font-family:var(--font-mono),monospace;font-size:12px;color:var(--ink-3)}
.kb-meta b{color:var(--ink);font-weight:500}
.kb-pills{display:flex;gap:8px;margin-bottom:18px;flex-wrap:wrap}
.kb-pill{font-family:var(--font-mono),monospace;font-size:11px;padding:4px 10px;border-radius:999px;background:var(--bg-muted);border:1px solid var(--border);color:var(--ink-2);display:inline-flex;align-items:center;gap:6px}
.kb-pill .kb-dot{width:6px;height:6px;border-radius:50%;background:var(--accent);display:inline-block}
.kb-provenance{background:var(--accent-light);border-bottom:1px solid var(--border);padding:12px 40px}
.kb-provenance-inner{max-width:780px;margin:0 auto;font-family:var(--font-mono),monospace;font-size:12px;color:var(--accent);display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.kb-provenance-inner .kb-dot{width:7px;height:7px;border-radius:50%;background:var(--accent);flex-shrink:0}
.kb-article{max-width:720px;margin:0 auto;padding:56px 40px 48px}
.kb-article p{margin:0 0 22px;color:var(--ink-2);font-size:16px;line-height:1.75}
.kb-article>p:first-of-type{color:var(--ink);font-size:17px}
.kb-article h2{font-family:var(--font-space-grotesk),sans-serif;font-size:clamp(1.4rem,3vw,1.7rem);font-weight:700;letter-spacing:-.02em;margin:44px 0 16px;color:var(--ink)}
.kb-article h3{font-family:var(--font-space-grotesk),sans-serif;font-size:16px;font-weight:600;margin:28px 0 10px;color:var(--ink)}
.kb-article h4{font-family:var(--font-space-grotesk),sans-serif;font-size:15px;font-weight:600;margin:24px 0 8px;color:var(--ink)}
.kb-article code{font-family:var(--font-mono),monospace;font-size:.86em;background:var(--bg-muted);border:1px solid var(--border);padding:1px 6px;border-radius:6px;color:var(--ink)}
.kb-article a{color:var(--accent);text-decoration:underline;text-decoration-color:rgba(31,107,58,.3);text-underline-offset:3px}
.kb-article a:hover{text-decoration-color:var(--accent)}
.kb-article ul,.kb-article ol{margin:0 0 22px;padding-left:24px;color:var(--ink-2);font-size:16px;line-height:1.75}
.kb-article li{margin-bottom:8px}
.kb-article blockquote{border-left:3px solid var(--accent);margin:0 0 22px;padding:4px 0 4px 20px}
.kb-article blockquote p{margin:0;color:var(--ink-2);font-style:italic}
.kb-article hr{border:0;border-top:1px solid var(--border);margin:36px 0}
.kb-article img{display:block;width:100%;height:auto;margin:30px 0 8px;border:1px solid var(--border);border-radius:14px;background:var(--surface)}
.kb-article p>em:only-child{display:block;text-align:center;font-size:13px;color:var(--ink-3);font-style:normal;margin:-2px 0 26px}
.kb-article[dir="rtl"]{text-align:right}
.kb-article[dir="rtl"] ul,.kb-article[dir="rtl"] ol{padding-left:0;padding-right:24px}
.kb-article[dir="rtl"] blockquote{border-left:0;border-right:3px solid var(--accent);padding:4px 20px 4px 0}
.kb-h1[dir="rtl"]{text-align:right}
.kb-related{max-width:720px;margin:0 auto;padding:0 40px 56px}
.kb-related-row{display:flex;gap:10px;flex-wrap:wrap}
.kb-related a{font-family:var(--font-mono),monospace;font-size:12px;color:var(--accent);text-decoration:none;border:1px solid var(--border);background:var(--surface);border-radius:999px;padding:6px 14px}
.kb-related a:hover{border-color:var(--accent)}
.kb-cta{background:linear-gradient(135deg,#18181B,#0A0A0A);padding:72px 40px;text-align:center;color:#fff}
.kb-cta h2{font-family:var(--font-space-grotesk),sans-serif;font-size:clamp(1.6rem,3vw,2.2rem);font-weight:700;letter-spacing:-.02em;margin:0 0 14px;color:#fff}
.kb-cta p{color:rgba(255,255,255,.55);font-size:15px;margin:0 0 28px}
.kb-btn{display:inline-block;background:var(--accent);color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600;font-size:15px}
.kb-index-head{background:var(--bg);color:var(--ink);padding:148px 40px 56px;border-bottom:1px solid var(--border)}
.kb-index-head-inner{max-width:1100px;margin:0 auto}
.kb-index-sub{color:var(--ink-2);font-size:16px;max-width:560px;margin:0}
.kb-grid{max-width:1100px;margin:0 auto;padding:48px 40px 72px;display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.kb-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:26px;display:flex;flex-direction:column;gap:12px;text-decoration:none;color:var(--ink);transition:border-color .15s,box-shadow .15s}
.kb-card:hover{border-color:#D9D5CC;box-shadow:0 2px 12px rgba(24,24,27,.06)}
.kb-card-date{font-family:var(--font-mono),monospace;font-size:11px;color:var(--ink-3)}
.kb-card h2{font-family:var(--font-space-grotesk),sans-serif;font-size:17px;font-weight:600;letter-spacing:-.01em;line-height:1.35;margin:0}
.kb-card p{font-size:13px;line-height:1.6;color:var(--ink-2);margin:0;flex:1}
.kb-card-tags{display:flex;gap:6px;flex-wrap:wrap}
.kb-card-tag{font-family:var(--font-mono),monospace;font-size:10.5px;color:var(--ink-3);background:var(--bg-muted);border:1px solid var(--border);border-radius:999px;padding:2px 9px}
.kb-card-read{font-family:var(--font-mono),monospace;font-size:11px;color:var(--accent)}
@media(max-width:960px){.kb-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:640px){.kb-grid{grid-template-columns:1fr;padding:32px 20px 56px}
.kb-hero,.kb-index-head,.kb-article,.kb-related,.kb-cta,.kb-provenance{padding-left:20px;padding-right:20px}}
`
