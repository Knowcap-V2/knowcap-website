import { NextRequest, NextResponse } from 'next/server'

// Live A/B copy test: two finalists, both in the impeccable design, so COPY is
// the only variable.
//   bi → /bi  (Version B copy: outcome-first + the 80-second Odoo demo)
//   di → /di  (Version D copy: show-the-magic + L1/L2/L3 escalation)
// The cream A/C and the old cream B/D + the /e variant are retired from the
// random rotation (still reachable by direct URL). The /bi and /di pages have a
// fixed design and ignore the theme switcher, so no theme rotation here.
const VARIANTS = ['bi', 'di'] as const
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
