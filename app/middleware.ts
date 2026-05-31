import { NextRequest, NextResponse } from 'next/server'

// Live A/B copy test: the homepage random-rotates between the two finalist
// copies only — B (outcome) and D (magic) — both in the themed impeccable
// design, so COPY is the only variable. A and C exist at /a and /c for review
// but are out of rotation. Theme is NOT rotated: each page defaults to baseline
// and the visitor can switch via the nav.
const VARIANTS = ['b', 'd'] as const
const VARIANT_COOKIE = 'kc-landing-variant'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

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
  matcher: ['/'],
}
