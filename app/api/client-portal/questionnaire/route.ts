import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { CLIENT_SESSION_COOKIE, readClientSession } from '@/lib/session'
import { hasAnswers, normalizeAnswers } from '@/lib/questionnaire'

export async function GET(request: NextRequest) {
  const session = readClientSession(request.cookies.get(CLIENT_SESSION_COOKIE)?.value)
  if (!session) return NextResponse.json({ authenticated: false }, { status: 401 })
  const { data, error } = await supabaseAdmin.from('client_questionnaires').select('answers, submitted_at').eq('client_id', session.clientId).maybeSingle()
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
  const { error } = await supabaseAdmin.from('client_questionnaires').upsert({ client_id: session.clientId, answers, submitted_at: now, updated_at: now }, { onConflict: 'client_id' })
  if (error) {
    console.error('[v0] Questionnaire save failed:', error.message)
    return NextResponse.json({ success: false, message: 'Unable to save your answers.' }, { status: 500 })
  }
  return NextResponse.json({ success: true })
}
