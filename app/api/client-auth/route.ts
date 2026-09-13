import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createClientSession, CLIENT_SESSION_COOKIE, sessionCookieOptions } from '@/lib/session'

const MAX_ATTEMPTS = 5
const attempts = new Map<string, { count: number; resetAt: number }>()

function getSupabaseAdmin() {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { autoRefreshToken: false, persistSession: false } })
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const current = attempts.get(ip)
  if (current && Date.now() < current.resetAt && current.count >= MAX_ATTEMPTS) {
    return NextResponse.json({ success: false, message: 'Too many attempts. Try again later.' }, { status: 429 })
  }

  const body = await request.json().catch(() => ({})) as { access_code?: string }
  const accessCode = body.access_code?.trim()
  if (!accessCode || accessCode.length > 120) return NextResponse.json({ success: false, message: 'Enter a valid access code.' }, { status: 400 })

  const { data: client, error } = await getSupabaseAdmin().from('clients').select('id').eq('access_code', accessCode).maybeSingle()
  if (error) {
    console.error('[v0] Client authentication lookup failed:', error.message)
    return NextResponse.json({ success: false, message: 'Unable to sign in right now.' }, { status: 500 })
  }
  if (!client) {
    const next = current && Date.now() < current.resetAt ? { count: current.count + 1, resetAt: current.resetAt } : { count: 1, resetAt: Date.now() + 15 * 60 * 1000 }
    attempts.set(ip, next)
    return NextResponse.json({ success: false, message: 'Invalid access code.' }, { status: 401 })
  }

  attempts.delete(ip)
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
