import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/adminAuth'

// A/B rotation RETIRED 2026-06-10: the homepage serves the commitment-ledger
// page directly (components/home-commitment.tsx via app/page.tsx). The old
// variants stay reachable at /a /b /c /d for reference and future ad pages.
// This middleware now only guards admin APIs and admin pages.

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

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
}
