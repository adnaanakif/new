import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { createClientSession, verifyAccessCode, CLIENT_SESSION_COOKIE, sessionCookieOptions } from '@/lib/session'

const MAX_ATTEMPTS = 10
const WINDOW_MS = 5 * 60 * 1000

function getClientIp(request: NextRequest) {
  return request.headers.get('x-real-ip')?.trim() || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
}

async function isRateLimited(key: string) {
  const now = new Date()
  const windowStart = new Date(now.getTime() - WINDOW_MS).toISOString()
  const { data } = await supabaseAdmin.from('client_auth_attempts').select('attempts, window_started_at, blocked_until').eq('key', key).maybeSingle()
  if (!data) return false
  if (data.blocked_until && new Date(data.blocked_until).getTime() > now.getTime()) return true
  if (new Date(data.window_started_at).getTime() < new Date(windowStart).getTime()) return false
  return data.attempts >= MAX_ATTEMPTS
}

async function recordFailedAttempt(key: string) {
  const now = new Date()
  const { data } = await supabaseAdmin.from('client_auth_attempts').select('attempts, window_started_at').eq('key', key).maybeSingle()
  const inWindow = data && new Date(data.window_started_at).getTime() >= now.getTime() - WINDOW_MS
  const attempts = inWindow ? data.attempts + 1 : 1
  await supabaseAdmin.from('client_auth_attempts').upsert({ key, attempts, window_started_at: inWindow ? data.window_started_at : now.toISOString(), blocked_until: attempts >= MAX_ATTEMPTS ? new Date(now.getTime() + WINDOW_MS).toISOString() : null, updated_at: now.toISOString() })
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request)
  if (await isRateLimited(`ip:${ip}`)) {
    return NextResponse.json({ success: false, message: 'Too many attempts. Try again later.' }, { status: 429 })
  }

  const body = await request.json().catch(() => ({})) as { access_code?: string }
  const accessCode = body.access_code?.trim()
  if (!accessCode || accessCode.length > 120) return NextResponse.json({ success: false, message: 'Enter a valid access code.' }, { status: 400 })

  const { data: clients, error } = await supabaseAdmin.from('clients').select('id, access_code_hash').not('access_code_hash', 'is', null)
  const client = clients?.find((candidate) => verifyAccessCode(accessCode, candidate.access_code_hash))
  if (error) {
    console.error('[v0] Client authentication lookup failed:', error.message)
    return NextResponse.json({ success: false, message: 'Unable to sign in right now.' }, { status: 500 })
  }
  if (!client) {
    await recordFailedAttempt(`ip:${ip}`)
    return NextResponse.json({ success: false, message: 'Invalid access code.' }, { status: 401 })
  }

  await supabaseAdmin.from('client_auth_attempts').delete().eq('key', `ip:${ip}`)
  const session = createClientSession(client.id)
  const response = NextResponse.json({ success: true })
  response.cookies.set(CLIENT_SESSION_COOKIE, session.value, sessionCookieOptions(session.maxAge))
  return response
}

export async function DELETE() {
  const response = NextResponse.json({ success: true })
  response.cookies.set(CLIENT_SESSION_COOKIE, '', sessionCookieOptions(0))
  return response
}
