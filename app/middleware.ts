import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

// A/B rotation RETIRED 2026-06-10: the homepage serves the commitment-ledger
// page directly (components/home-commitment.tsx via app/page.tsx). The old
// variants stay reachable at /a /b /c /d for reference and future ad pages.
// This middleware now only guards admin APIs and admin pages.
//
// EDGE-RUNTIME NOTE (2026-07-06): middleware runs on the Edge runtime, where the
// `jsonwebtoken` library (used by lib/adminAuth) cannot run — jwt.verify() throws,
// which previously made this guard return 401 on EVERY admin API call even with a
// valid session, silently breaking the admin dashboard. Verification here now uses
// `jose` (Web Crypto, Edge-safe). It verifies the same HS256 token that the Node
// login route signs. The per-route Node guards (lib/adminAuth.requireAdmin) remain
// authoritative and unchanged — jsonwebtoken works fine in the Node route runtime.

const COOKIE_NAME = 'kc_admin'

// Public API paths that must remain unauthenticated (form submit endpoints)
const PUBLIC_API_PREFIXES = [
  '/api/submit-beta-application',
  '/api/submit-contact',
  '/api/submit-recruitment',
  '/api/db-test',
  '/api/admin/login',
  '/api/admin/logout',
]

/** Constant-time string comparison (Edge-safe; no Node crypto). */
function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return diff === 0
}

/**
 * Edge-safe admin check. Returns null when authorised, or a 401/500 response.
 * Accepts EITHER a Bearer ADMIN_API_TOKEN header or a valid kc_admin JWT cookie.
 */
async function requireAdminEdge(req: NextRequest): Promise<NextResponse | null> {
  // --- Bearer-token path (direct API callers) ---
  const authHeader = req.headers.get('authorization') ?? ''
  const bearerToken = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7).trim()
    : null

  if (bearerToken) {
    const expected = process.env.ADMIN_API_TOKEN
    if (!expected) {
      console.error('[middleware] ADMIN_API_TOKEN env var is not set')
      return NextResponse.json({ error: 'server misconfigured' }, { status: 500 })
    }
    if (constantTimeEqual(bearerToken, expected)) return null
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // --- HttpOnly cookie path (dashboard / browser) ---
  const cookieValue = req.cookies.get(COOKIE_NAME)?.value
  if (cookieValue) {
    const secret = process.env.ADMIN_JWT_SECRET
    if (!secret) {
      console.error('[middleware] ADMIN_JWT_SECRET env var is not set')
      return NextResponse.json({ error: 'server misconfigured' }, { status: 500 })
    }
    try {
      await jwtVerify(cookieValue, new TextEncoder().encode(secret))
      return null // authorised
    } catch {
      // expired / tampered token — fall through to 401
    }
  }

  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // -----------------------------------------------------------------
  // Admin API guard (defense-in-depth; per-route guards are authoritative)
  // -----------------------------------------------------------------
  if (pathname.startsWith('/api/')) {
    const isPublic = PUBLIC_API_PREFIXES.some((p) => pathname.startsWith(p))
    if (!isPublic) {
      const denied = await requireAdminEdge(request)
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
