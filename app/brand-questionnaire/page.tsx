'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { ClientLoginForm } from '@/components/client-login-form'
import { QUESTIONNAIRE_QUESTIONS, questionnaireEntries } from '@/lib/questionnaire'

function BrandQuestionnaireHero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start end', 'end start'] })
  const heroImageY = useTransform(scrollYProgress, [0, 1], ['-24%', '24%'])
  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1])

  return (
    <div ref={heroRef} className="relative -mx-[calc(50vw-50%)] w-screen overflow-hidden" style={{ height: 'min(100vh, calc(100vw * 16 / 9))' }}>
      <motion.div className="h-full w-full" style={{ y: heroImageY, scale: heroImageScale }}>
        <img src="/work-hero.svg" alt="Brand Questionnaire" className="h-full w-full object-cover" loading="eager" decoding="async" />
      </motion.div>
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden px-2 lg:px-4">
        <div className="h-[58px] overflow-hidden md:h-[126px] lg:h-[187px]"><motion.div className="flex flex-col" animate={{ y: ['0%', '0%', '-50%', '-50%'] }} transition={{ duration: 5.5, times: [0, .42, .58, 1], repeat: Infinity, ease: [.76, 0, .24, 1] }}>
          <motion.h1 animate={{ scale: [1, 1, .985, 1, 1] }} transition={{ duration: 5.5, times: [0, .4, .5, .6, 1], repeat: Infinity, ease: 'easeInOut' }} className="text-center text-[64px] font-medium leading-[.9] tracking-tighter text-foreground md:text-[140px] lg:text-[208px]">Questionnaire</motion.h1>
          <h1 className="text-center text-[64px] font-medium leading-[.9] tracking-tighter text-foreground md:text-[140px] lg:text-[208px]">Questionnaire</h1>
        </motion.div></div>
      </div>
    </div>
  )
}

type QuestionnaireEntry = { id: string; question: string; answer: string }

function QuestionnaireForm({ initialAnswers, onSubmitted }: { initialAnswers: Record<string, string>; onSubmitted: () => void }) {
  const [answers, setAnswers] = useState(initialAnswers)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault(); setSubmitting(true); setError(null)
    try {
      const response = await fetch('/api/client-portal/questionnaire', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ answers }) })
      const data = await response.json()
      if (!response.ok || !data.success) setError(data.message ?? 'Something went wrong.')
      else onSubmitted()
    } catch { setError('Something went wrong. Please try again.') } finally { setSubmitting(false) }
  }
  return <form onSubmit={handleSubmit} className="mx-auto flex max-w-2xl flex-col gap-8 px-4 py-16">
    {QUESTIONNAIRE_QUESTIONS.map((question) => <div key={question.id} className="flex flex-col gap-2"><label htmlFor={question.id} className="font-medium text-foreground">{question.label}</label>{question.type === 'textarea' ? <textarea id={question.id} value={answers[question.id] ?? ''} onChange={(event) => setAnswers((current) => ({ ...current, [question.id]: event.target.value }))} rows={4} className="rounded-md border border-border bg-transparent px-4 py-3 text-foreground outline-none focus:border-foreground" /> : <input id={question.id} value={answers[question.id] ?? ''} onChange={(event) => setAnswers((current) => ({ ...current, [question.id]: event.target.value }))} className="rounded-md border border-border bg-transparent px-4 py-3 text-foreground outline-none focus:border-foreground" />}</div>)}
    {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
    <button type="submit" disabled={submitting} className="self-start rounded-md bg-foreground px-4 py-3 font-medium text-background disabled:opacity-50">{submitting ? 'Saving…' : 'Submit answers'}</button>
  </form>
}

function QuestionnaireSummary({ entries, onEdit }: { entries: QuestionnaireEntry[]; onEdit: () => void }) {
  return <div className="mx-auto max-w-2xl px-4 py-16"><div className="mb-8 flex items-center justify-between gap-4"><p className="text-lg font-medium text-foreground">Thanks — your answers are saved.</p><button onClick={onEdit} className="text-sm text-muted-foreground underline">Edit answers</button></div><div className="flex flex-col gap-6">{entries.map((entry) => <div key={entry.id}><p className="text-sm text-muted-foreground">{entry.question}</p><p className="text-foreground">{entry.answer || '—'}</p></div>)}</div></div>
}

export default function BrandQuestionnairePage() {
  const [status, setStatus] = useState<'loading' | 'guest' | 'form' | 'summary'>('loading')
  const [entries, setEntries] = useState<QuestionnaireEntry[]>([])
  const [initialAnswers, setInitialAnswers] = useState<Record<string, string>>({})
  async function loadMe() {
    try {
      const response = await fetch('/api/client-portal/me')
      if (!response.ok) { setStatus('guest'); return }
      const data = await response.json(); const saved = Array.isArray(data.client.questionnaire) ? data.client.questionnaire : []
      setEntries(saved); setInitialAnswers(Object.fromEntries(saved.map((entry: QuestionnaireEntry) => [entry.id, entry.answer])))
      setStatus(data.client.questionnaire_submitted ? 'summary' : 'form')
    } catch { setStatus('guest') }
  }
  useEffect(() => { loadMe() }, [])
  return <><Header preloaderDone={true} /><main className="min-h-screen bg-background text-white"><BrandQuestionnaireHero />{status === 'guest' && <ClientLoginForm onSuccess={loadMe} />}{status === 'form' && <QuestionnaireForm initialAnswers={initialAnswers} onSubmitted={loadMe} />}{status === 'summary' && <QuestionnaireSummary entries={entries.length ? entries : questionnaireEntries(initialAnswers)} onEdit={() => setStatus('form')} />}</main><Footer /></>
}
