'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { PORTAL_NAV_ITEMS } from '@/lib/portal-nav'

type PortalShellProps = {
  contactName?: string
  eyebrow: string
  title: string
  children: React.ReactNode
}

export function PortalShell({ contactName, eyebrow, title, children }: PortalShellProps) {
  const pathname = usePathname()
  const router = useRouter()

  async function signOut() {
    await fetch('/api/client-auth', { method: 'DELETE' })
    router.push('/client-portal')
    router.refresh()
  }

  return (
    <main className="min-h-screen bg-[#11100f] text-[#f2f0ea]">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="group/sidebar w-full border-b border-[#3a3835] bg-[#191817] lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r">
          <div className="relative overflow-hidden px-6 py-7 lg:px-7 lg:py-8">
            <div className="pointer-events-none absolute -right-16 -top-20 size-48 rounded-full bg-[#dd491b]/10 blur-3xl transition-transform duration-700 group-hover/sidebar:translate-x-5" />
            <Link href="/client-portal" className="relative block w-fit transition-opacity duration-300 hover:opacity-70" aria-label="Lozinr client portal home">
              <img src="/wordmark.svg" alt="Lozinr" className="h-auto w-28" />
            </Link>
            <p className="relative mt-5 text-[14px] font-normal uppercase tracking-normal text-[#8f8a83]">Client workspace</p>
          </div>
          <nav aria-label="Client workspace navigation" className="scrollbar-hide flex gap-2 overflow-x-auto px-4 pb-4 lg:flex-col lg:gap-1 lg:px-4 lg:py-8">
            <Link
              href="/client-portal"
              className={`group flex min-w-[170px] items-center justify-between border px-4 py-4 transition-all duration-300 lg:min-w-0 ${pathname === '/client-portal' ? 'border-[#6b6762] bg-[#242220] shadow-[inset_3px_0_0_#dd491b]' : 'border-transparent hover:border-[#6b6762] hover:bg-[#211f1d]'}`}
            >
              <span className="text-[16px] font-medium transition-transform duration-300 group-hover:translate-x-1">Overview</span>
              <span className="text-[11px] font-normal text-[#8f8a83]">00</span>
            </Link>
            {PORTAL_NAV_ITEMS.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex min-w-[170px] items-center justify-between border px-4 py-4 transition-all duration-300 lg:min-w-0 ${pathname === item.href ? 'border-[#6b6762] bg-[#242220] shadow-[inset_3px_0_0_#dd491b]' : 'border-transparent hover:border-[#6b6762] hover:bg-[#211f1d]'}`}
              >
                <span className="text-[16px] font-medium transition-transform duration-300 group-hover:translate-x-1">{item.label}</span>
                <span className="text-[11px] font-normal text-[#8f8a83]">0{index + 1}</span>
              </Link>
            ))}
          </nav>
          <button type="button" onClick={signOut} className="mx-6 mb-6 hidden text-left text-xs text-[#b8b3ab] underline underline-offset-4 transition-colors hover:text-[#f2f0ea] lg:block">
            Sign out
          </button>
        </aside>
        <section className="flex-1">
          <header className="flex items-center justify-between border-b border-[#3a3835] px-6 py-5 md:px-10">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#8f8a83]">{eyebrow}</p>
              <h1 className="mt-2 text-2xl font-medium md:text-3xl">{title}</h1>
            </div>
            <button type="button" onClick={signOut} className="text-xs text-[#b8b3ab] underline underline-offset-4 lg:hidden">
              Sign out
            </button>
          </header>
          <div className="px-6 py-8 md:px-10 md:py-12">{children}</div>
        </section>
      </div>
    </main>
  )
}
