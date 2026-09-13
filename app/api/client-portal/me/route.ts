import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { CLIENT_SESSION_COOKIE, readClientSession } from '@/lib/session'

export async function GET(request: NextRequest) {
  const session = readClientSession(request.cookies.get(CLIENT_SESSION_COOKIE)?.value)
  if (!session) return NextResponse.json({ authenticated: false }, { status: 401 })

  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { autoRefreshToken: false, persistSession: false } })
  const { data, error } = await supabase.from('clients').select('id, project_name, contact_name').eq('id', session.clientId).maybeSingle()
  if (error || !data) return NextResponse.json({ authenticated: false }, { status: 401 })
  const { data: questionnaire } = await supabase.from('client_questionnaires').select('answers, submitted_at').eq('client_id', session.clientId).maybeSingle()
  const answers = questionnaire?.answers && typeof questionnaire.answers === 'object' ? questionnaire.answers as Record<string, string> : {}
  const entries = Object.entries(answers).map(([id, answer]) => ({ id, question: id, answer }))
  return NextResponse.json({
    authenticated: true,
    client: {
      ...data,
      questionnaire: entries,
      questionnaire_submitted: Boolean(questionnaire?.submitted_at),
    },
  })
}
