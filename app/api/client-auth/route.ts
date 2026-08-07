import { NextRequest, NextResponse } from 'next/server'

// ─── Server-side password gate ────────────────────────────────────────────
// The real password NEVER ships to the browser. It only lives here, on the
// server, read from an environment variable.
//
// Add this to your .env.local (already gitignored — do not commit it), and
// also add it in Vercel → Project → Settings → Environment Variables:
//
//   CLIENT_AREA_PASSWORD=ClientSam
// ────────────────────────────────────────────────────────────────────────

const COOKIE_NAME = 'client_area_session'
const MAX_ATTEMPTS = 3
const LOCKOUT_MS = 60 * 60 * 1000 // 1 hour
const SESSION_MS = 24 * 60 * 60 * 1000 // 24 hour login session

type Attempt = { count: number; lockedUntil: number | null }
const attempts = new Map<string, Attempt>()

function getIp(req: NextRequest): string {
  const fwd = req.headers.get('x-forwarded-for')
  return fwd ? fwd.split(',')[0].trim() : 'unknown'
}

export async function GET(req: NextRequest) {
  const session = req.cookies.get(COOKIE_NAME)?.value
  return NextResponse.json({ authenticated: session === 'granted' })
}

export async function POST(req: NextRequest) {
  const ip = getIp(req)
  const record = attempts.get(ip) ?? { count: 0, lockedUntil: null }

  if (record.lockedUntil && Date.now() < record.lockedUntil) {
    const minutesLeft = Math.ceil((record.lockedUntil - Date.now()) / 60000)
    return NextResponse.json(
      { success: false, locked: true, message: `Too many attempts. Try again in ${minutesLeft} min.` },
      { status: 429 }
    )
  }

  if (record.lockedUntil && Date.now() >= record.lockedUntil) {
    record.count = 0
    record.lockedUntil = null
  }

  const body = await req.json().catch(() => ({}))
  const { password } = body as { password?: string }

  const correctPassword = process.env.CLIENT_AREA_PASSWORD
  if (!correctPassword) {
    console.error('CLIENT_AREA_PASSWORD is not set in environment variables.')
    return NextResponse.json({ success: false, message: 'Server misconfigured.' }, { status: 500 })
  }

  if (password === correctPassword) {
    attempts.delete(ip)

    const res = NextResponse.json({ success: true })
    res.cookies.set(COOKIE_NAME, 'granted', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_MS / 1000,
    })
    return res
  }

  record.count += 1
  if (record.count >= MAX_ATTEMPTS) {
    record.lockedUntil = Date.now() + LOCKOUT_MS
  }
  attempts.set(ip, record)

  const attemptsRemaining = Math.max(0, MAX_ATTEMPTS - record.count)
  return NextResponse.json(
    {
      success: false,
      locked: record.lockedUntil !== null,
      attemptsRemaining,
      message:
        attemptsRemaining > 0
          ? `Incorrect password. (${attemptsRemaining} attempts remaining)`
          : 'Too many attempts. Try again in 1 hour.',
    },
    { status: 401 }
  )
}