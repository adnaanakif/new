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

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
}

function AboutImage({ label, src }: { label: string; src: string }) {
  return (
    <motion.div {...reveal} className="w-full">
      <a href="#" aria-label={label} className="block aspect-video w-full overflow-hidden bg-foreground">
        <img src={src} alt={label} className="h-full w-full object-cover" loading="lazy" />
      </a>
    </motion.div>
  )
}

function AboutText({ children }: { children: React.ReactNode }) {
  return (
    <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.1 }} className="w-full flex flex-col gap-6">
      <div className="flex min-h-full w-full items-center px-0 py-2 text-foreground md:px-0 md:py-4">{children}</div>
    </motion.div>
  )
}

function AboutSection({ title, children, reverse = false, border = true }: { title: string; children: React.ReactNode; reverse?: boolean; border?: boolean }) {
  return (
    <section className={`flex flex-col gap-8 py-12 md:gap-6 md:py-16 ${border ? 'border-t-2 border-foreground' : ''}`} aria-labelledby={`${title.toLowerCase().replaceAll(' ', '-')}-heading`}>
      <h2 id={`${title.toLowerCase().replaceAll(' ', '-')}-heading`} className="text-foreground font-medium uppercase tracking-tighter leading-[0.9] text-[64px] md:text-[100px] lg:text-[120px]">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 md:gap-6 items-start">
        {children}
      </div>
    </section>
  )
}

function AboutContent() {
  return (
    <div className="flex flex-col px-4 pb-20 pt-12 md:px-8 md:pb-28 md:pt-20 lg:px-10">
      <AboutSection title="The Studio" border={false}>
        <>
          <AboutImage label="Studio image" src="/about-studio.png" />
          <AboutText>
            <div className="flex flex-col gap-5 text-xl leading-relaxed md:text-2xl">
              <p>Lozinr started with one belief: most brands don&apos;t fail because they look bad. They fail because they were never given direction in the first place.</p>
              <p>We&apos;re a branding studio built for founders who are past the &quot;let&apos;s just make a logo&quot; stage — people building companies meant to last, not just launch.</p>
              <p>Every project runs through one framework. Every decision is judged against one question: does this serve the business, or just decorate it?</p>
            </div>
          </AboutText>
        </>
      </AboutSection>

      <AboutSection title="How We Work">
        <>
          <AboutText>
            <div className="flex flex-col gap-5 text-xl leading-relaxed md:text-2xl">
              <p>We call it the Lozinr Method — six stages, one direction.</p>
              <ol className="flex flex-col gap-3 text-lg md:text-xl">
                <li><strong>Listen</strong> — We start by understanding the business, not the aesthetic preferences.</li>
                <li><strong>Orient</strong> — We find where the brand actually stands, against competitors and against the truth.</li>
                <li><strong>Zero In</strong> — We narrow until one clear direction remains.</li>
                <li><strong>Ignite</strong> — We build the identity system around that direction.</li>
                <li><strong>Narrate</strong> — We shape how the brand speaks, not just how it looks.</li>
                <li><strong>Reinforce</strong> — We hand over a system built to stay consistent long after we&apos;re gone.</li>
              </ol>
            </div>
          </AboutText>
          <AboutImage label="Method image" src="/about-method.png" />
        </>
      </AboutSection>

      <AboutSection title="Who We Work With">
        <>
          <AboutImage label="Client image" src="/about-clients.png" />
          <AboutText>
            <div className="flex flex-col gap-5 text-xl leading-relaxed md:text-2xl">
              <p>We work with founders building something worth remembering — companies with real traction, real teams, or real ambition behind them.</p>
              <p>We&apos;re not the studio for a first logo. We&apos;re the studio for when &quot;good enough&quot; stops being good enough.</p>
            </div>
          </AboutText>
        </>
      </AboutSection>

      <section className="flex flex-col gap-8 py-12 md:gap-6 md:py-16" aria-labelledby="what-we-stand-for-heading">
        <h2 id="what-we-stand-for-heading" className="text-foreground font-medium uppercase tracking-tighter leading-[0.9] text-[64px] md:text-[100px] lg:text-[120px]">What We Stand For</h2>
        <div className="flex min-h-64 w-full items-center justify-center bg-destructive px-6 py-12 text-center text-2xl leading-tight text-destructive-foreground md:min-h-80 md:text-4xl">
          <div className="flex max-w-3xl flex-col gap-3">
            <p>Craft over decoration.</p>
            <p>Clarity before creativity.</p>
            <p>Built to last, not to trend.</p>
            <p>Honest over impressive.</p>
            <p>Founders first.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function AboutPage() {
  return (
    <>
      <Header preloaderDone={true} />
      <main className="min-h-screen bg-background text-foreground">
        <AboutHero />
        <AboutContent />
      </main>
      <Footer />
    </>
  )
}
