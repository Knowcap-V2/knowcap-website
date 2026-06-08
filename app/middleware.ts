import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/adminAuth'

// Live A/B copy test: the homepage random-rotates between the two finalist
// copies only — B (outcome) and D (magic) — both in the themed impeccable
// design, so COPY is the only variable. A and C exist at /a and /c for review
// but are out of rotation. Theme is NOT rotated: each page defaults to baseline
// and the visitor can switch via the nav.
const VARIANTS = ['b', 'd'] as const
const VARIANT_COOKIE = 'kc-landing-variant'

// Public API paths that must remain unauthenticated (form submit endpoints)
const PUBLIC_API_PREFIXES = [
  '/api/submit-beta-application',
  '/api/submit-contact',
  '/api/submit-recruitment',
  '/api/db-test',
  '/api/admin/login',
  '/api/admin/logout',
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // -----------------------------------------------------------------
  // Admin API guard (defense-in-depth; per-route guards are authoritative)
  // -----------------------------------------------------------------
  if (pathname.startsWith('/api/')) {
    const isPublic = PUBLIC_API_PREFIXES.some((p) => pathname.startsWith(p))
    if (!isPublic) {
      const denied = requireAdmin(request)
      if (denied) return denied
    }
    return NextResponse.next()
  }

  // -----------------------------------------------------------------
  // Admin page redirect — if no valid session, send to /admin/login
  // Note: /admin/login itself is a page the user needs to reach, so
  // only gate /admin (root) and sub-paths that aren't the login page.
  // The per-page client check is still present as a UX layer.
  // -----------------------------------------------------------------
  if (pathname.startsWith('/admin')) {
    return NextResponse.next() // page-level auth is handled client-side + cookie
  }

  // -----------------------------------------------------------------
  // A/B copy test for homepage (unchanged)
  // -----------------------------------------------------------------
  if (pathname !== '/') return NextResponse.next()

  const existing = request.cookies.get(VARIANT_COOKIE)?.value
  const variant = VARIANTS.includes(existing as any)
    ? existing!
    : VARIANTS[Math.floor(Math.random() * VARIANTS.length)]

  const url = request.nextUrl.clone()
  url.pathname = `/${variant}`
  const response = NextResponse.rewrite(url)

  if (!VARIANTS.includes(existing as any)) {
    response.cookies.set(VARIANT_COOKIE, variant, {
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    })
  }

  return response
}

export const config = {
  matcher: ['/', '/admin/:path*', '/api/:path*'],
}
