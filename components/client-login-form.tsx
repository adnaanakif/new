'use client'

import { useState } from 'react'

export function ClientLoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [accessCode, setAccessCode] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      const response = await fetch('/api/client-auth', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ access_code: accessCode }),
      })
      const data = await response.json()
      if (!response.ok || !data.success) {
        setError(data.message ?? 'Invalid access code.')
        return
      }
      onSuccess()
    } catch {
      setError('Unable to sign in right now. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-4 px-4 py-16">
      <div className="flex flex-col gap-2">
        <label htmlFor="client-access-code" className="font-medium text-foreground">Client access code</label>
        <input id="client-access-code" value={accessCode} onChange={(event) => setAccessCode(event.target.value)} autoComplete="one-time-code" required className="rounded-md border border-border bg-transparent px-4 py-3 text-foreground outline-none focus:border-foreground" />
      </div>
      {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
      <button type="submit" disabled={submitting} className="self-start rounded-md bg-foreground px-4 py-3 font-medium text-background disabled:opacity-50">
        {submitting ? 'Signing in…' : 'Continue'}
      </button>
    </form>
  )
}
