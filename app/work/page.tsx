'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Header from '@/components/header'
import Footer from '@/components/footer'
import AnimatedHeroTitle from '@/components/animated-hero-title'
import WorkSection from '@/components/work'

// ─── Hero ─────────────────────────────────────────────────────────
function WorkHero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start end', 'end start'],
  })
  const heroImageY = useTransform(scrollYProgress, [0, 1], ['-24%', '24%'])
  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.0])

  useEffect(() => { setIsMounted(true) }, [])

  const heroImage = '/work-hero.svg'

  return (
    <div
      ref={heroRef}
      className="relative w-screen -mx-[calc(50vw-50%)] overflow-hidden"
      style={{ aspectRatio: '3 / 2' }}
    >
      {heroImage && (
        <motion.div
          className="absolute inset-0 h-full w-full min-w-full"
          style={{ y: heroImageY, scale: heroImageScale }}
        >
          <img
            src={heroImage}
            alt="Work"
            className="block h-full w-full min-w-full max-w-none object-cover"
            loading="eager"
            decoding="async"
          />
        </motion.div>
      )}

      {/* "Great Work" title — centered, looping slide animation */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden px-2 lg:px-4">
        <AnimatedHeroTitle text="GREAT WORK" color="text-white" />
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
