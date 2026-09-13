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
        <aside className="w-full border-b border-[#3a3835] bg-[#191817] lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between px-6 py-6 lg:block">
            <Link href="/client-portal" className="text-xl font-medium tracking-[-0.06em]">LOZINR</Link>
            <p className="mt-2 hidden text-[10px] uppercase tracking-[0.28em] text-[#8f8a83] lg:block">Client workspace</p>
          </div>
          <nav aria-label="Client workspace navigation" className="scrollbar-hide flex gap-2 overflow-x-auto px-4 pb-4 lg:flex-col lg:px-4 lg:py-8">
            <Link
              href="/client-portal"
              className={`min-w-[170px] border px-3 py-3 transition-colors lg:min-w-0 ${pathname === '/client-portal' ? 'border-[#6b6762] bg-[#242220]' : 'border-transparent hover:border-[#6b6762]'}`}
            >
              <span className="block text-[10px] text-[#8f8a83]">00</span>
              <span className="mt-1 block text-sm">Overview</span>
            </Link>
            {PORTAL_NAV_ITEMS.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`min-w-[170px] border px-3 py-3 transition-colors lg:min-w-0 ${pathname === item.href ? 'border-[#6b6762] bg-[#242220]' : 'border-transparent hover:border-[#6b6762]'}`}
              >
                <span className="block text-[10px] text-[#8f8a83]">0{index + 1}</span>
                <span className="mt-1 block text-sm">{item.label}</span>
              </Link>
            ))}
          </nav>
          <button type="button" onClick={signOut} className="mx-6 mb-6 hidden text-left text-xs text-[#b8b3ab] underline underline-offset-4 lg:block">
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
