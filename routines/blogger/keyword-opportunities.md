# Blogger keyword opportunities (per persona)

**Routine config — not general SEO research.** This is the primary keyword source for the `blogger` routine's input #5. It exists because the only SEO audit in the hub (`SEO-AUDIT-2026-06-01.md`) is a *technical/on-page health* audit with no keyword table, and Google Trends has **negligible volume for this B2B ICP** (dry-run 2026-06-14: closest odoo term scored EG 0.9 / SA 0.6 / AE 0.0 on a 0–100 scale). So keyword targets here are **pain-and-intent derived**, validated against the few Arabic terms that DO show real Saudi search volume — not against Trends.

**How the routine uses this:** pick the persona (round-robin), read its table, choose the highest-priority keyword NOT already covered in the last 20 shipped slugs, pass it as `target_keyword`. Trends is advisory only (a tiebreaker, never a gate).

**Maintenance:** update when positioning shifts or a keyword ships. Each ship → mark the row `shipped: <slug>`. Re-derive from `../claude-knowcap/knowledge/strategies/POSITIONING.md` buyer pains + `PRODUCT-PERSONAS.md`.

---

## Real MENA search signals (the only volume-validated terms we have)

Mined from shipped posts that targeted Arabic/Saudi search behavior. These have *actual* documented volume, unlike the English B2B terms:

| Term | Signal | Source post |
|---|---|---|
| `محضر اجتماع` / "mahdar egtmaa" (meeting minutes, AR) | Saudi searches ~89× more than rest of GCC | `why-saudis-search-mahdar-egtmaa-89x-more-than-gcc` |
| "AI meeting notes" (Saudi Arabia) | ~3,000,000% growth trend | `why-saudi-arabia-search-ai-meeting-notes-3-million-percent` |
| "Saudi PDPL" / PDPL Article 36 | regulatory-driven, rising | `saudi-pdpl-article-36-audit-firms-ai-meeting-records` |

**Takeaway:** Arabic + Saudi + regulatory terms carry real volume. English B2B feature terms do not. Lead Arabic/KSA angles when the persona allows.

---

## odoo-partners — Phase 1 beachhead (STRONG)

Pain source: POSITIONING.md Buyer 1 (SOW scope disputes, "but you said this was in scope", devs translating meeting decisions to Studio, informal billing audit trail).

| Priority | Keyword | Intent | Angle | Status |
|---|---|---|---|---|
| 1 | Odoo implementation scope creep | problem-aware | week-8 kickoff-vs-Studio mismatch; scope creep = request with no matching commitment | shipped (dry-run draft 2026-06-14) |
| 2 | Odoo SOW change request tracking | solution-seeking | confirmed change-order trail vs WhatsApp/email memory | open |
| 3 | Odoo go-live decision sign-off | bottom-funnel | who confirmed the go/no-go, and can you prove it | open |

## mena-audit-firms — Phase 2, KSA-first (STRONG)

Pain source: PRODUCT-PERSONAS.md §4 + POSITIONING.md Buyer 2 (Saudi PDPL Art 36, SAR 5M fines, 48 SDAIA decisions, engagement letters/audit memos drafted from unverified transcripts).

| Priority | Keyword | Intent | Angle | Status |
|---|---|---|---|---|
| 1 | Saudi PDPL Article 36 AI compliance | regulatory | already shipped — DEDUP, don't repeat | shipped: `saudi-pdpl-article-36-audit-firms-ai-meeting-records` |
| 2 | audit engagement letter AI provenance | problem-aware | drafting from "what the CFO said" is Art 35/36 exposure | open |
| 3 | SOCPA AI governance attestation | solution-seeking | client RFPs now demand an AI-governance attestation | open |

## regulated-verticals — Phase 2 (finance / legal / health)

Pain source: POSITIONING.md Buyer 2 (regulator mandates human attestation: FINRA 3110, ESMA MiFID II, ABA Op. 512, CMS MA Final Rule, GDPR Art 22).

| Priority | Keyword | Intent | Angle | Status |
|---|---|---|---|---|
| 1 | GDPR Article 22 human attestation AI | regulatory | rubber-stamp human is legally insufficient (CJEU SCHUFA) | open |
| 2 | FINRA Rule 3110 AI meeting records | regulatory | advisor calls → supervised, attested records | open |
| 3 | ABA Opinion 512 AI client matters | regulatory | provenance per claim on AI-drafted legal memos | open |

## mena-agencies — DEPRIORITIZED (research flags as anti-buyer)

⚠ The segmentation study (`PRODUCT-PERSONAS.md` §2) rates agencies a **VITAMIN / anti-buyer** — no regulator forcing spend, over-served by Granola/Fathom, low LTV. The routine roster still lists `mena-agencies`, but **prefer skipping this persona's turn** unless a specific multilingual/compliance angle appears. Roster-vs-research mismatch flagged for Hassan.

| Priority | Keyword | Intent | Angle | Status |
|---|---|---|---|---|
| low | Arabic English client brief documentation | problem-aware | bilingual code-switching record (multilingual angle) | shipped (adjacent): `uae-multilingual-meeting-problem-no-ai-tool-solves` |

---

## Open-keyword shortlist (next picks, dedup-clean)

1. `Odoo SOW change request tracking` (odoo-partners) — strongest open, beachhead persona
2. `GDPR Article 22 human attestation AI` (regulated-verticals) — regulatory volume
3. `audit engagement letter AI provenance` (mena-audit-firms) — KSA tailwind
