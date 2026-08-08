'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Header from '@/components/header'
import Footer from '@/components/footer'
import AnimatedHeroTitle from '@/components/animated-hero-title'

function AboutHero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [, setIsMounted] = useState(false)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start end', 'end start'],
  })
  const heroImageY = useTransform(scrollYProgress, [0, 1], ['-24%', '24%'])
  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.0])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div
      ref={heroRef}
      className="relative w-screen -mx-[calc(50vw-50%)] overflow-hidden"
      style={{ height: 'min(100vh, calc(100vw * 16 / 9))' }}
    >
      <motion.div className="h-full w-full" style={{ y: heroImageY, scale: heroImageScale }}>
        <img
          src="/work-hero.svg"
          alt="About Lozinr"
          className="h-full w-full object-cover"
          loading="eager"
          decoding="async"
        />
      </motion.div>
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden px-2 lg:px-4">
        <AnimatedHeroTitle text="ABOUT" />
      </div>
    </div>
  )
}

export default function AboutPage() {
  return (
    <>
      <Header preloaderDone={true} />
      <main className="min-h-screen bg-background text-foreground">
        <AboutHero />
      </main>
      <Footer />
    </>
  )
}
