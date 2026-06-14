/**
 * Shared CSS for all /compare/* pages.
 * Uses cl-root CSS vars from EditorialShell — must render inside an EditorialShell.
 */
export const COMPARE_CSS = `
.cm-table-wrap{overflow-x:auto;border:1px solid var(--border);border-radius:6px;background:var(--white)}
.cm-table{width:100%;border-collapse:collapse;min-width:680px}
.cm-table th,.cm-table td{padding:clamp(12px,1.5vw,16px) clamp(14px,1.8vw,20px);text-align:left;vertical-align:top;border-bottom:1px solid var(--border);font-size:.95rem;line-height:1.5}
.cm-table thead th{font-family:var(--mono);font-size:.7rem;letter-spacing:.12em;text-transform:uppercase;color:var(--sec);background:color-mix(in srgb,var(--green) 5%,var(--cream));border-bottom:1px solid var(--border-2)}
.cm-table thead .cm-us{color:var(--green);font-weight:600}
.cm-table tbody th{font-weight:500;color:var(--ink);width:36%;font-family:var(--body)}
.cm-table tbody td{color:var(--sec);width:32%}
.cm-cell-text{display:block;margin-top:2px;font-size:.9rem}
.cm-yes>span[aria-hidden]{color:var(--green);font-weight:700;margin-right:8px;display:inline-block}
.cm-no>span[aria-hidden]{color:var(--sec);opacity:.45;margin-right:8px;display:inline-block}
.cm-us-cell{background:color-mix(in srgb,var(--green) 4%,transparent);font-weight:500}
.cm-hl th,.cm-hl td{background:color-mix(in srgb,var(--green) 5%,transparent)}
.cm-hl .cm-us-cell{background:color-mix(in srgb,var(--green) 9%,transparent)}
.cm-table tbody tr:last-child th,.cm-table tbody tr:last-child td{border-bottom:0}
.cm-section{padding:clamp(48px,5vw,72px) 0}
.cm-h2{font-family:var(--disp);font-size:clamp(1.5rem,2.8vw,2rem);font-weight:460;letter-spacing:-.02em;font-variation-settings:'SOFT' 55,'WONK' 0;margin-bottom:12px}
.cm-lead{color:var(--sec);font-size:16px;line-height:1.7;max-width:64ch;margin-bottom:28px}
.cm-cta-row{display:flex;flex-wrap:wrap;gap:12px;margin-top:32px}
.cm-cta-center{justify-content:center}
.cm-faq{border-top:1px solid var(--border);margin-top:28px}
.cm-faq details{border-bottom:1px solid var(--border)}
.cm-faq summary{padding:18px 0;cursor:pointer;font-weight:500;font-size:15.5px;list-style:none;display:flex;justify-content:space-between;align-items:center;gap:16px;color:var(--ink)}
.cm-faq summary::-webkit-details-marker{display:none}
.cm-faq summary::after{content:'+';font-family:var(--mono);font-size:18px;color:var(--sec);flex-shrink:0}
.cm-faq details[open] summary::after{content:'−'}
.cm-faq-a{padding:0 0 18px;color:var(--sec);font-size:15px;line-height:1.75}
.cm-close{background:var(--ink);color:rgba(251,250,248,.7);text-align:center;padding:clamp(56px,6vw,80px) 40px}
.cm-close h2{font-family:var(--disp);font-size:clamp(1.7rem,3vw,2.4rem);font-weight:460;font-variation-settings:'SOFT' 55,'WONK' 0;color:#fff;margin-bottom:18px;letter-spacing:-.02em;line-height:1.15}
.cm-close p{font-size:15px;margin-bottom:28px}
.cm-close-link{display:inline-block;margin-top:18px;font-family:var(--mono);font-size:12.5px;color:var(--green-dark);text-decoration:none;border-bottom:1px solid rgba(126,211,155,.4);padding-bottom:1px}
.cm-close-link:hover{color:#fff;border-bottom-color:#fff}
@media(max-width:640px){.cm-cta-row{flex-direction:column}.cm-close{padding:48px 22px}}
`
