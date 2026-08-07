'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Header from '@/components/header'
import Footer from '@/components/footer'

// ─── Hero ─────────────────────────────────────────────────────────
function InsightsHero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start end', 'end start'],
  })
  const heroImageY = useTransform(scrollYProgress, [0, 1], ['-24%', '24%'])
  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.0])

  useEffect(() => { setIsMounted(true) }, [])

  // Add your own image to /public (e.g. insights-hero.jpg or .svg)
  // and update the path below to match.
  const heroImage = '/work-hero.svg'

  return (
    <div
      ref={heroRef}
      className="relative w-screen -mx-[calc(50vw-50%)] overflow-hidden"
      style={{ height: 'min(100vh, calc(100vw * 16 / 9))' }}
    >
      {heroImage && (
        <motion.div
          className="w-full h-full"
          style={{ y: heroImageY, scale: heroImageScale }}
        >
          <img
            src={heroImage}
            alt="Insights"
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
          />
        </motion.div>
      )}

      {/* Gradient — same as work/about page */}
      <div className="absolute inset-0 bg-background" />

      {/* Title — centered, looping slide animation */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden px-2 lg:px-4">
        <div className="overflow-hidden h-[58px] md:h-[126px] lg:h-[187px]">
          <motion.div
            className="flex flex-col"
            animate={{ y: ['0%', '0%', '-50%', '-50%'] }}
            transition={{
              duration: 5.5,
              times: [0, 0.42, 0.58, 1],
              repeat: Infinity,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            <motion.h1
              animate={{ scale: [1, 1, 0.985, 1, 1] }}
              transition={{ duration: 5.5, times: [0, 0.4, 0.5, 0.6, 1], repeat: Infinity, ease: 'easeInOut' }}
              className="text-[64px] md:text-[140px] lg:text-[208px] font-medium tracking-tighter leading-[0.9] text-foreground text-center"
            >
              Insights
            </motion.h1>
            <h1 className="text-[64px] md:text-[140px] lg:text-[208px] font-medium tracking-tighter leading-[0.9] text-foreground text-center">
              Insights
            </h1>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// ─── Main ────────────────────────────────────────────────────────
export default function InsightsPage() {
  return (
    <>
      <Header preloaderDone={true} />
      <main className="min-h-screen bg-background text-white">

        {/* Hero */}
        <InsightsHero />

        {/* Content — intentionally empty for now, tell me what to add next */}
        <div className="px-3 lg:px-6 pt-16 pb-20">
          {/* content goes here */}
        </div>

      </main>
      <Footer />
    </>
  )
}