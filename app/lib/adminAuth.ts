import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'

const COOKIE_NAME = 'kc_admin'

/**
 * Verify the incoming request carries a valid admin session.
 *
 * Accepts EITHER:
 *  - HttpOnly signed JWT cookie `kc_admin` (browser / dashboard flows)
 *  - `Authorization: Bearer <ADMIN_API_TOKEN>` header (curl / API flows)
 *
 * Returns null on success, a 401 NextResponse on failure.
 */
export function requireAdmin(req: NextRequest): NextResponse | null {
  // --- Bearer-token path (direct API callers) ---
  const authHeader = req.headers.get('authorization') ?? ''
  const bearerToken = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7).trim()
    : null

  if (bearerToken) {
    const expected = process.env.ADMIN_API_TOKEN
    if (!expected) {
      console.error('[adminAuth] ADMIN_API_TOKEN env var is not set')
      return NextResponse.json({ error: 'server misconfigured' }, { status: 500 })
    }
    // Constant-time comparison to prevent timing attacks
    try {
      const a = Buffer.from(bearerToken)
      const b = Buffer.from(expected)
      if (a.length === b.length && crypto.timingSafeEqual(a, b)) {
        return null // authorised
      }
    } catch {
      // fall through to 401
    }
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // --- HttpOnly cookie path (dashboard / browser) ---
  const cookieValue = req.cookies.get(COOKIE_NAME)?.value
  if (cookieValue) {
    const secret = process.env.ADMIN_JWT_SECRET
    if (!secret) {
      console.error('[adminAuth] ADMIN_JWT_SECRET env var is not set')
      return NextResponse.json({ error: 'server misconfigured' }, { status: 500 })
    }
    try {
      jwt.verify(cookieValue, secret)
      return null // authorised
    } catch {
      // expired / tampered token — fall through to 401
    }
  }

  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}

/**
 * Sign a short-lived admin JWT and return a Set-Cookie header value.
 * Used only by the login route — keep cookie attrs strict.
 */
export function signAdminCookie(res: NextResponse): void {
  const secret = process.env.ADMIN_JWT_SECRET
  if (!secret) throw new Error('ADMIN_JWT_SECRET is not set')
  const token = jwt.sign({ role: 'admin' }, secret, { expiresIn: '12h' })
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 12, // 12 h
    path: '/',
  })
}

/**
 * Clear the admin session cookie (logout).
 */
export function clearAdminCookie(res: NextResponse): void {
  res.cookies.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  })
}
