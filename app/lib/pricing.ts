/**
 * The locked pricing ladder — Odoo EPIC 24 (#6071), locked 2026-06-22 / restated
 * 2026-07-30. Numbers and per-tier capabilities below are NOT copied from the Odoo
 * card text — they are independently re-verified against the live `plans` table
 * (Supabase, public.plans) on 2026-08-03: free=$0 (5-meeting lifetime cap),
 * pro=$20/seat (monthly_price_cents 2000), business=$40/seat (4000),
 * enterprise=custom (monthly_price_cents is a 0 placeholder — negotiated).
 * Feature bullets are drawn from each plan's own `capabilities` jsonb column,
 * not invented — see PR body for the exact query.
 *
 * Annual billing is deliberately NOT offered on this page. #6953 (EPIC 24's
 * sibling ticket) found the app charges the full monthly price when a customer
 * picks annual today — no annual Stripe price exists yet — and is removing the
 * annual option everywhere (paywall, settings, pricing page, marketing site) for
 * exactly that reason before the 16 Aug launch. Add annual back here only after
 * #6953 Part B ships a real annual price.
 */

export type PricingTier = {
  slug: 'free' | 'pro' | 'business' | 'enterprise'
  name: string
  price: string
  priceNote: string
  audience: string
  features: string[]
  ctaLabel: string
  cta: 'register' | 'book'
  highlight?: boolean
}

export const PRICING_TIERS: PricingTier[] = [
  {
    slug: 'free',
    name: 'Free',
    price: '$0',
    priceNote: 'no card required',
    audience: 'Try it — light, personal use',
    features: [
      'Full Pro features for 5 lifetime meetings',
      'Capture meetings, voice notes, chats',
      'Every decision, task and risk extracted as a claim card',
      'A named human confirms each claim before anything acts',
    ],
    ctaLabel: 'Start free',
    cta: 'register',
  },
  {
    slug: 'pro',
    name: 'Pro',
    price: '$20',
    priceNote: 'per seat / month',
    audience: 'The individual — uncapped',
    features: [
      'Unlimited meetings, no lifetime cap',
      'Chat and ask across everything you’ve captured',
      'Your own memory graph, artifacts, and broadcasts',
      'Calendar, Meet, and Gmail integrations',
    ],
    ctaLabel: 'Start free',
    cta: 'register',
    highlight: true,
  },
  {
    slug: 'business',
    name: 'Business',
    price: '$40',
    priceNote: 'per seat / month',
    audience: 'The team lead — governance + control',
    features: [
      'Everything in Pro, for the whole team',
      'Who-can-confirm — confirmation governance',
      'Admin analytics across the organization',
      'Connect your own tools over MCP — agents read and act',
    ],
    ctaLabel: 'Start free',
    cta: 'register',
  },
  {
    slug: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    priceNote: 'book a call',
    audience: 'IT & security — negotiated',
    features: [
      'Everything in Business',
      'Vertical templates for your industry',
      'SSO, audit logs, and a compliance review',
      'Dedicated onboarding',
    ],
    ctaLabel: 'Book a call',
    cta: 'book',
  },
]
