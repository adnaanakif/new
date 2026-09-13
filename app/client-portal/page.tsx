'use client'

import Link from 'next/link'
import { FormEvent, useEffect, useState } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'

type Client = { project_name: string; contact_name: string }

export default function ClientPortalPage() {
  const [accessCode, setAccessCode] = useState('')
  const [client, setClient] = useState<Client | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetch('/api/client-portal/me').then(async (response) => {
      if (response.ok) setClient((await response.json()).client)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    const response = await fetch('/api/client-auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ access_code: accessCode }) })
    const result = await response.json()
    if (!response.ok) setError(result.message ?? 'Unable to sign in.')
    else {
      const profile = await fetch('/api/client-portal/me')
      if (profile.ok) setClient((await profile.json()).client)
    }
    setSubmitting(false)
  }

  async function signOut() {
    await fetch('/api/client-auth', { method: 'DELETE' })
    setClient(null)
    setAccessCode('')
  }

  return <>
    <Header preloaderDone={true} />
    <main className="min-h-[70vh] bg-background px-6 py-24 text-foreground">
      <div className="mx-auto flex max-w-xl flex-col gap-10">
        {loading ? <p className="text-muted-foreground">Loading portal...</p> : client ? <section className="flex flex-col gap-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-2"><p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Client portal</p><h1 className="text-4xl font-medium tracking-tight">Welcome, {client.contact_name}</h1></div>
            <button type="button" onClick={signOut} className="text-sm underline underline-offset-4">Sign out</button>
          </div>
          <div className="border border-border p-6"><p className="text-sm text-muted-foreground">Project</p><p className="mt-2 text-2xl">{client.project_name}</p><p className="mt-8 text-muted-foreground">Your secure client workspace is ready.</p><Link href="/brand-questionnaire" className="mt-8 inline-flex bg-foreground px-5 py-3 text-sm font-medium text-background">Open brand questionnaire</Link></div>
        </section> : <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-3"><p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Private workspace</p><h1 className="text-5xl font-medium tracking-tight">Client portal</h1><p className="max-w-md text-muted-foreground">Enter the access code provided by your Lozinr team.</p></div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4"><label htmlFor="access-code" className="text-sm">Access code</label><input id="access-code" value={accessCode} onChange={(event) => setAccessCode(event.target.value)} autoComplete="off" className="border border-border bg-transparent px-4 py-3 outline-none focus:border-foreground" placeholder="Enter your access code" required />{error && <p role="alert" className="text-sm text-destructive">{error}</p>}<button disabled={submitting} className="bg-foreground px-5 py-3 text-background disabled:opacity-50">{submitting ? 'Signing in...' : 'Continue'}</button></form>
        </section>}
      </div>
    </main>
    <Footer />
  </>
}
