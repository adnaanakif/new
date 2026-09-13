'use client'

import { useEffect, useState } from 'react'
import { PortalShell } from '@/components/portal-shell'
import { QUESTIONNAIRE_QUESTIONS, questionnaireEntries } from '@/lib/questionnaire'

type QuestionnaireEntry = { id: string; question: string; answer: string }

function QuestionnaireForm({ initialAnswers, onSubmitted }: { initialAnswers: Record<string, string>; onSubmitted: () => void }) {
  const [answers, setAnswers] = useState(initialAnswers)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      const response = await fetch('/api/client-portal/questionnaire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      })
      const data = await response.json()
      if (!response.ok || !data.success) setError(data.message ?? 'Something went wrong.')
      else onSubmitted()
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-2xl flex-col gap-8">
      {QUESTIONNAIRE_QUESTIONS.map((question) => (
        <div key={question.id} className="flex flex-col gap-2">
          <label htmlFor={question.id} className="font-medium text-[#f2f0ea]">{question.label}</label>
          {question.type === 'textarea' ? (
            <textarea
              id={question.id}
              value={answers[question.id] ?? ''}
              onChange={(event) => setAnswers((current) => ({ ...current, [question.id]: event.target.value }))}
              rows={4}
              className="border border-[#6b6762] bg-transparent px-4 py-3 text-[#f2f0ea] outline-none focus:border-[#f2f0ea]"
            />
          ) : (
            <input
              id={question.id}
              value={answers[question.id] ?? ''}
              onChange={(event) => setAnswers((current) => ({ ...current, [question.id]: event.target.value }))}
              className="border border-[#6b6762] bg-transparent px-4 py-3 text-[#f2f0ea] outline-none focus:border-[#f2f0ea]"
            />
          )}
        </div>
      ))}
      {error && <p role="alert" className="text-sm text-[#dd491b]">{error}</p>}
      <button type="submit" disabled={submitting} className="self-start bg-[#f2f0ea] px-5 py-3 text-sm font-medium text-[#11100f] disabled:opacity-50">
        {submitting ? 'Saving…' : 'Submit answers'}
      </button>
    </form>
  )
}

function QuestionnaireSummary({ entries, onEdit }: { entries: QuestionnaireEntry[]; onEdit: () => void }) {
  return (
    <div className="max-w-2xl">
      <div className="mb-8 flex items-center justify-between gap-4">
        <p className="text-lg font-medium text-[#f2f0ea]">Thanks — your answers are saved.</p>
        <button onClick={onEdit} className="text-sm text-[#b8b3ab] underline underline-offset-4">Edit answers</button>
      </div>
      <div className="flex flex-col gap-6">
        {entries.map((entry) => (
          <div key={entry.id}>
            <p className="text-sm text-[#8f8a83]">{entry.question}</p>
            <p className="text-[#f2f0ea]">{entry.answer || '—'}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function BrandQuestionnairePage() {
  const [status, setStatus] = useState<'loading' | 'form' | 'summary'>('loading')
  const [entries, setEntries] = useState<QuestionnaireEntry[]>([])
  const [initialAnswers, setInitialAnswers] = useState<Record<string, string>>({})

  async function loadMe() {
    try {
      const response = await fetch('/api/client-portal/me')
      if (!response.ok) return
      const data = await response.json()
      const saved = Array.isArray(data.client.questionnaire) ? data.client.questionnaire : []
      setEntries(saved)
      setInitialAnswers(Object.fromEntries(saved.map((entry: QuestionnaireEntry) => [entry.id, entry.answer])))
      setStatus(data.client.questionnaire_submitted ? 'summary' : 'form')
    } catch {
      setStatus('form')
    }
  }

  useEffect(() => { loadMe() }, [])

  return (
    <PortalShell eyebrow="Documents" title="Brand Questionnaire">
      {status === 'loading' && <p className="text-sm text-[#8f8a83]">Loading…</p>}
      {status === 'form' && <QuestionnaireForm initialAnswers={initialAnswers} onSubmitted={loadMe} />}
      {status === 'summary' && (
        <QuestionnaireSummary entries={entries.length ? entries : questionnaireEntries(initialAnswers)} onEdit={() => setStatus('form')} />
      )}
    </PortalShell>
  )
}
