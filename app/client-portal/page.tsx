'use client'

import Link from 'next/link'
import { FormEvent, useEffect, useState } from 'react'
import { PORTAL_NAV_ITEMS as portalLinks } from '@/lib/portal-nav'

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
    try {
      const response = await fetch('/api/client-auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ access_code: accessCode }) })
      const result = await response.json().catch(() => ({}))
      if (!response.ok) setError(result.message ?? 'Unable to sign in.')
      else {
        const profile = await fetch('/api/client-portal/me')
        if (profile.ok) setClient((await profile.json()).client)
        else setError('Your session could not be loaded. Please try again.')
      }
    } catch {
      setError('Unable to sign in right now. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  async function signOut() {
    await fetch('/api/client-auth', { method: 'DELETE' })
    setClient(null)
    setAccessCode('')
  }

  if (loading) return <main className="flex min-h-screen items-center justify-center bg-[#11100f] text-[#f2f0ea]"><p className="text-sm uppercase tracking-[0.2em] text-[#b8b3ab]">Loading workspace</p></main>

  if (!client) return <main className="flex min-h-screen items-center justify-center bg-[#11100f] px-6 text-[#f2f0ea]"><section className="w-full max-w-md"><p className="mb-5 text-[16px] uppercase tracking-[-0.02em] text-[#b8b3ab]">Lozinr / private workspace</p><h1 className="text-5xl font-medium tracking-tight">Client portal</h1><p className="mt-5 max-w-sm text-[#b8b3ab]">Enter the access code provided by your Lozinr team.</p><form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-4"><label htmlFor="access-code" className="text-sm">Access code</label><input id="access-code" value={accessCode} onChange={(event) => setAccessCode(event.target.value)} autoComplete="off" className="border border-[#6b6762] bg-transparent px-4 py-3 outline-none focus:border-[#f2f0ea]" placeholder="Enter your access code" required />{error && <p role="alert" className="text-sm text-[#dd491b]">{error}</p>}<button disabled={submitting} className="bg-[#f2f0ea] px-5 py-3 text-sm font-medium text-[#11100f] disabled:opacity-50">{submitting ? 'Signing in...' : 'Enter workspace'}</button></form></section></main>

  return <main className="min-h-screen bg-[#11100f] text-[#f2f0ea]"><div className="flex min-h-screen flex-col lg:flex-row"><aside className="w-full border-b border-[#3a3835] bg-[#191817] lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r"><div className="flex items-center justify-between px-6 py-6 lg:block"><p className="text-xl font-medium tracking-[-0.06em]">LOZINR</p><p className="mt-2 hidden text-[10px] uppercase tracking-[0.28em] text-[#8f8a83] lg:block">Client workspace</p></div><nav aria-label="Client workspace navigation" className="scrollbar-hide flex gap-2 overflow-x-auto px-4 pb-4 lg:flex-col lg:px-4 lg:py-8">{portalLinks.map((item, index) => <Link key={item.href} href={item.href} className="min-w-[170px] border border-transparent px-3 py-3 transition-colors hover:border-[#6b6762] lg:min-w-0"><span className="block text-[10px] text-[#8f8a83]">0{index + 1}</span><span className="mt-1 block text-sm">{item.label}</span></Link>)}</nav><button type="button" onClick={signOut} className="mx-6 mb-6 hidden text-left text-xs text-[#b8b3ab] underline underline-offset-4 lg:block">Sign out</button></aside><section className="flex-1"><header className="flex items-center justify-between border-b border-[#3a3835] px-6 py-5 md:px-10"><div><p className="text-[10px] uppercase tracking-[0.28em] text-[#8f8a83]">Overview</p><h1 className="mt-2 text-2xl font-medium md:text-3xl">Welcome, {client.contact_name}</h1></div><button type="button" onClick={signOut} className="text-xs text-[#b8b3ab] underline underline-offset-4 lg:hidden">Sign out</button></header><div className="px-6 py-8 md:px-10 md:py-12"><div className="border border-[#6b6762] bg-[#191817] p-6 md:p-8"><p className="text-xs uppercase tracking-[0.25em] text-[#8f8a83]">Current project</p><div className="mt-3 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><h2 className="text-3xl font-medium tracking-tight">{client.project_name}</h2><p className="mt-3 max-w-lg text-sm leading-6 text-[#b8b3ab]">Your project workspace is ready. Use the navigation to move between your strategy, documents, payments, and brand assets.</p></div><span className="w-fit border border-[#dd491b] px-3 py-2 text-xs uppercase tracking-[0.18em] text-[#dd491b]">In progress</span></div></div><div className="mt-12 flex items-end justify-between gap-4"><div><p className="text-xs uppercase tracking-[0.25em] text-[#8f8a83]">Workspace sections</p><h2 className="mt-2 text-2xl font-medium">Your project, in one place.</h2></div><span className="hidden text-xs text-[#8f8a83] md:block">{portalLinks.length} sections</span></div><div className="mt-6 grid gap-px border border-[#3a3835] bg-[#3a3835] md:grid-cols-2 xl:grid-cols-3">{portalLinks.map((item, index) => <Link key={item.href} href={item.href} className="group bg-[#11100f] p-5 transition-colors hover:bg-[#242220]"><div className="flex items-start justify-between gap-4"><span className="text-xs text-[#8f8a83]">0{index + 1}</span><span className="text-xs text-[#dd491b] transition-transform group-hover:translate-x-1">→</span></div><h3 className="mt-12 text-lg font-medium">{item.label}</h3><p className="mt-2 text-sm leading-6 text-[#b8b3ab]">{item.description}</p><p className="mt-6 text-xs uppercase tracking-[0.18em] text-[#8f8a83]">{item.status} section</p></Link>)}</div></div></section></div></main>
}
