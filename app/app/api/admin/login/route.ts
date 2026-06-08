import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { signAdminCookie } from '@/lib/adminAuth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { passcode } = body as { passcode?: string }

    if (!passcode || typeof passcode !== 'string') {
      return NextResponse.json({ error: 'Passcode is required' }, { status: 400 })
    }

    const expected = process.env.ADMIN_PASSCODE
    if (!expected) {
      console.error('[admin/login] ADMIN_PASSCODE env var is not set')
      return NextResponse.json({ error: 'server misconfigured' }, { status: 500 })
    }

    // Constant-time comparison to prevent timing attacks
    const a = Buffer.from(passcode)
    const b = Buffer.from(expected)
    const match =
      a.length === b.length && crypto.timingSafeEqual(a, b)

    if (!match) {
      return NextResponse.json({ error: 'Invalid passcode' }, { status: 401 })
    }

    // Issue a signed HttpOnly cookie
    const res = NextResponse.json({ ok: true }, { status: 200 })
    signAdminCookie(res)
    return res
  } catch (error) {
    console.error('[admin/login] error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
