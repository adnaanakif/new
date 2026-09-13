import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { CLIENT_SESSION_COOKIE, readClientSession } from '@/lib/session'
import { hasAnswers, normalizeAnswers } from '@/lib/questionnaire'

function adminClient() {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { autoRefreshToken: false, persistSession: false } })
}

export async function GET(request: NextRequest) {
  const session = readClientSession(request.cookies.get(CLIENT_SESSION_COOKIE)?.value)
  if (!session) return NextResponse.json({ authenticated: false }, { status: 401 })
  const { data, error } = await adminClient().from('client_questionnaires').select('answers, submitted_at').eq('client_id', session.clientId).maybeSingle()
  if (error) return NextResponse.json({ message: 'Unable to load questionnaire.' }, { status: 500 })
  return NextResponse.json({ answers: data?.answers ?? {}, submitted: Boolean(data?.submitted_at) })
}

export async function POST(request: NextRequest) {
  const session = readClientSession(request.cookies.get(CLIENT_SESSION_COOKIE)?.value)
  if (!session) return NextResponse.json({ success: false, message: 'Please sign in first.' }, { status: 401 })
  const body = await request.json().catch(() => ({}))
  const answers = normalizeAnswers(body?.answers)
  if (!hasAnswers(answers)) return NextResponse.json({ success: false, message: 'Please answer at least one question.' }, { status: 400 })
  const now = new Date().toISOString()
  const { error } = await adminClient().from('client_questionnaires').upsert({ client_id: session.clientId, answers, submitted_at: now, updated_at: now }, { onConflict: 'client_id' })
  if (error) {
    console.error('[v0] Questionnaire save failed:', error.message)
    return NextResponse.json({ success: false, message: 'Unable to save your answers.' }, { status: 500 })
  }
  return NextResponse.json({ success: true })
}
