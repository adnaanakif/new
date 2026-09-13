export const QUESTIONNAIRE_QUESTIONS = [
  { id: 'business_overview', label: 'Tell us about your business and what you do.', type: 'textarea' },
  { id: 'target_audience', label: 'Who is your ideal audience or customer?', type: 'textarea' },
  { id: 'competitors', label: 'Who are your main competitors or references?', type: 'textarea' },
  { id: 'brand_personality', label: 'What should the brand feel like?', type: 'textarea' },
  { id: 'avoid_list', label: 'Is there anything the brand should avoid?', type: 'textarea' },
  { id: 'inspiration', label: 'Share any visual or brand inspiration.', type: 'textarea' },
  { id: 'tagline', label: 'Do you have a tagline or key message?', type: 'text' },
  { id: 'timeline', label: 'What is your ideal timeline?', type: 'text' },
] as const

export type QuestionnaireAnswers = Record<string, string>

export function normalizeAnswers(input: unknown): QuestionnaireAnswers {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return {}
  const source = input as Record<string, unknown>
  return Object.fromEntries(
    QUESTIONNAIRE_QUESTIONS.map(({ id }) => [id, typeof source[id] === 'string' ? source[id].trim().slice(0, 5000) : '']),
  )
}

export function questionnaireEntries(answers: QuestionnaireAnswers) {
  return QUESTIONNAIRE_QUESTIONS.map(({ id, label }) => ({ id, question: label, answer: answers[id] ?? '' }))
}

export function hasAnswers(answers: QuestionnaireAnswers) {
  return QUESTIONNAIRE_QUESTIONS.some(({ id }) => Boolean(answers[id]))
}
