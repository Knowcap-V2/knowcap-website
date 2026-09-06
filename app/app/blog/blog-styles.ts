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
.kb-article pre{background:var(--bg-muted);border:1px solid var(--border);border-radius:12px;padding:18px 20px;overflow-x:auto;margin:0 0 26px}
.kb-article pre code{background:none;border:0;padding:0;font-size:13px;line-height:1.6;color:var(--ink-2);white-space:pre}
.kb-article table{width:100%;border-collapse:collapse;margin:0 0 26px;font-size:14.5px}
.kb-article th,.kb-article td{border:1px solid var(--border);padding:10px 12px;text-align:left;vertical-align:top}
.kb-article th{background:var(--accent-light);font-family:var(--font-space-grotesk),sans-serif;font-weight:600;color:var(--ink)}
.kb-article td{color:var(--ink-2)}
.kb-article[dir="rtl"] th,.kb-article[dir="rtl"] td{text-align:right}
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
.kb-template-dl{max-width:720px;margin:0 auto 8px;padding:0 40px}
.kb-template-dl-card{display:flex;align-items:center;gap:16px;background:var(--accent-light);border:1px solid rgba(31,107,58,.25);border-radius:14px;padding:20px 24px}
.kb-template-dl-icon{flex-shrink:0;width:42px;height:42px;border-radius:10px;background:var(--accent);color:#fff;display:flex;align-items:center;justify-content:center;font-size:19px}
.kb-template-dl-body{flex:1;min-width:0}
.kb-template-dl-label{font-family:var(--font-space-grotesk),sans-serif;font-weight:600;font-size:15px;color:var(--ink);margin-bottom:2px}
.kb-template-dl-sub{font-family:var(--font-mono),monospace;font-size:11.5px;color:var(--ink-3)}
.kb-template-dl-btn{flex-shrink:0;background:var(--accent);color:#fff;text-decoration:none;padding:10px 20px;border-radius:8px;font-weight:600;font-size:14px;white-space:nowrap}
.kb-template-dl-btn:hover{opacity:.9}
@media(max-width:640px){.kb-template-dl{padding:0 20px}.kb-template-dl-card{flex-wrap:wrap}.kb-template-dl-btn{width:100%;text-align:center}}
.kb-post-offer{max-width:720px;margin:14px auto 0;padding:0 40px;animation:kbPostOfferIn .3s ease}
.kb-post-offer-card{display:flex;align-items:center;gap:16px;background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:18px 24px}
.kb-post-offer-body{flex:1;min-width:0}
.kb-post-offer-head{font-family:var(--font-space-grotesk),sans-serif;font-weight:600;font-size:14.5px;color:var(--ink);margin-bottom:4px}
.kb-post-offer-sub{font-size:13.5px;line-height:1.55;color:var(--ink-2)}
.kb-post-offer-btn{flex-shrink:0;background:var(--ink);color:#fff;text-decoration:none;padding:10px 18px;border-radius:8px;font-weight:600;font-size:13.5px;white-space:nowrap}
.kb-post-offer-btn:hover{opacity:.88}
.kb-post-offer[dir="rtl"] .kb-post-offer-card{text-align:right}
@keyframes kbPostOfferIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
@media(max-width:640px){.kb-post-offer{padding:0 20px}.kb-post-offer-card{flex-wrap:wrap}.kb-post-offer-btn{width:100%;text-align:center}}
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
.kb-progress{position:fixed;top:0;left:0;right:0;height:3px;z-index:1000;background:transparent;pointer-events:none}
.kb-progress-bar{height:100%;background:var(--accent);transition:width .1s linear}
.kb-article-wrap{max-width:1080px;margin:0 auto;display:flex;gap:40px;justify-content:center;align-items:flex-start}
.kb-article-wrap .kb-article{width:100%;max-width:720px;margin:0}
.kb-toc{width:220px;flex:0 0 220px;position:sticky;top:120px;align-self:flex-start;max-height:calc(100vh - 160px);overflow:auto;margin-top:56px;padding:0 0 0 14px;font-family:var(--font-mono),monospace;font-size:12px;line-height:1.45;color:var(--ink-3)}
.kb-toc-label{text-transform:uppercase;letter-spacing:.08em;font-size:10.5px;font-weight:700;color:var(--ink-3);margin-bottom:12px}
.kb-toc ul{list-style:none;margin:0;padding:0}
.kb-toc li{margin:0 0 8px;padding:0}
.kb-toc-l3{padding-inline-start:14px}
.kb-toc a{display:block;color:var(--ink-3);text-decoration:none;border-left:2px solid transparent;padding:2px 0 2px 10px;transition:color .15s,border-color .15s}
.kb-toc a:hover{color:var(--accent)}
.kb-toc .is-active>a{color:var(--accent);border-left-color:var(--accent);font-weight:700}
.kb-toc[dir="rtl"]{padding:0 14px 0 0;text-align:right}
.kb-toc[dir="rtl"] a{border-left:0;border-right:2px solid transparent;padding:2px 10px 2px 0}
.kb-toc[dir="rtl"] .is-active>a{border-right-color:var(--accent)}
.kb-callout{background:var(--surface);border:1px solid var(--border);border-left:3px solid var(--accent);border-radius:12px;padding:16px 20px;margin:24px 0;color:var(--ink-2)}
.kb-callout p{margin:0 0 12px;color:var(--ink-2);font-size:16px;line-height:1.7}
.kb-callout p:last-child{margin-bottom:0}
.kb-callout-key{background:var(--accent-light);border-left-color:var(--accent)}
.kb-callout-warn{border-left-color:#B07C28}
.kb-article[dir="rtl"] .kb-callout{border-left-width:1px;border-right:3px solid var(--accent)}
.kb-article[dir="rtl"] .kb-callout-key{border-right-color:var(--accent)}
.kb-article[dir="rtl"] .kb-callout-warn{border-right-color:#B07C28}
.kb-byline{display:inline-flex;align-items:center}
.kb-avatar{display:inline-flex;width:26px;height:26px;border-radius:50%;background:var(--accent);color:#fff;font-family:var(--font-space-grotesk),sans-serif;font-size:11px;font-weight:700;align-items:center;justify-content:center;margin-inline-end:7px;vertical-align:middle;line-height:1}
.kb-filter{max-width:1100px;margin:28px auto 0;padding:0 40px;display:flex;gap:8px;flex-wrap:wrap}
.kb-filter-pill{font-family:var(--font-mono),monospace;font-size:12px;padding:6px 14px;border-radius:999px;border:1px solid var(--border);background:var(--surface);color:var(--ink-2);cursor:pointer;transition:background .15s,border-color .15s,color .15s}
.kb-filter-pill:hover{border-color:var(--accent);color:var(--accent)}
.kb-filter-pill.is-active{background:var(--accent);color:#fff;border-color:var(--accent)}
.kb-featured-wrap{max-width:1100px;margin:0 auto;padding:24px 40px 0}
.kb-card-featured{padding:34px;min-height:230px}
.kb-card-featured h2{font-size:22px;line-height:1.25}
.kb-card-featured p{font-size:15px;max-width:760px}
.kb-card-tag-persona{background:var(--accent-light);color:var(--accent);border-color:rgba(31,107,58,.18)}
.kb-empty{max-width:1100px;margin:0 auto;padding:40px;color:var(--ink-3);text-align:center}
@media(max-width:1024px){.kb-article-wrap{display:block;max-width:none}.kb-article-wrap .kb-article{margin:0 auto}.kb-toc{display:none}}
@media(max-width:640px){.kb-filter,.kb-featured-wrap{padding-left:20px;padding-right:20px}.kb-filter{margin-top:22px}.kb-card-featured{padding:26px}.kb-card-featured h2{font-size:19px}.kb-empty{padding:32px 20px}}`
