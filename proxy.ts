import { NextRequest, NextResponse } from 'next/server'

// ─── Route protection ─────────────────────────────────────────────────────
// Runs on every request to these paths, BEFORE the page renders. So typing
// lozinr.com/invoice directly into the address bar no longer works without
// the session cookie set by /api/client-auth after a correct password.
// ────────────────────────────────────────────────────────────────────────

const COOKIE_NAME = 'client_area_session'

const PROTECTED_PATHS = [
  '/invoice',
  '/contract',
  '/brand-strategy',
  '/brand-questionnaire',
  '/brand-guidelines',
  '/proposal',
  '/client-portal',
]

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  const isProtected = PROTECTED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  )

  if (!isProtected) {
    return NextResponse.next()
  }

  const session = req.cookies.get(COOKIE_NAME)?.value
  if (session === 'granted') {
    return NextResponse.next()
  }

  const url = req.nextUrl.clone()
  url.pathname = '/'
  url.searchParams.set('locked', pathname)
  return NextResponse.redirect(url)
}

export const config = {
  matcher: [
    '/invoice/:path*',
    '/contract/:path*',
    '/brand-strategy/:path*',
    '/brand-questionnaire/:path*',
    '/brand-guidelines/:path*',
    '/proposal/:path*',
    '/client-portal/:path*',
  ],
}
