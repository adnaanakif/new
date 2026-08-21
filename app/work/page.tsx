'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import AnimatedHeroTitle from '@/components/animated-hero-title'
import WorkSection from '@/components/work'

// ─── Hero ─────────────────────────────────────────────────────────
function WorkHero() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => { setIsMounted(true) }, [])

  return (
    <div
      className="relative w-screen -mx-[calc(50vw-50%)] overflow-hidden bg-background"
      style={{ aspectRatio: '3 / 2' }}
    >
      {/* "Great Work" title — centered, looping slide animation */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden px-2 lg:px-4">
        <AnimatedHeroTitle text="GREAT WORK" color="text-foreground" />
      </div>
    </div>
  )
}

// ─── Main ────────────────────────────────────────────────────────
export default function WorkPage() {
  return (
    <>
      <Header preloaderDone={true} />
      <main className="min-h-screen bg-background text-white">

        {/* Hero */}
        <WorkHero />

        <WorkSection showHeader={false} />

      </main>
      <Footer />
    </>
  )
}
