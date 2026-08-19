'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
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
    <motion.div
      {...reveal}
      transition={{ ...reveal.transition, delay: 0.1 }}
      className="w-full flex flex-col gap-6"
    >
      {children}
    </motion.div>
  )
}

// Each word's opacity is tied directly to scroll progress — not a one-time
// triggered animation.
function ScrollWord({
  word,
  progress,
  range,
  isLast,
}: {
  word: string
  progress: MotionValue<number>
  range: [number, number]
  isLast: boolean
}) {
  const opacity = useTransform(progress, range, [0, 1])
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {word}
      {isLast ? '' : '\u00A0'}
    </motion.span>
  )
}

// Pins the section in place (sticky) while the user scrolls through it —
// words across all paragraphs light up one by one, in sequence, tied to
// scroll position. The page won't move past this block until every word
// has been revealed; once fully revealed, normal scrolling continues and
// the section unpins.
function StickyWordReveal({ paragraphs, className = '' }: { paragraphs: string[]; className?: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  })

  const paragraphWords = paragraphs.map((p) => p.split(' '))
  const totalWords = paragraphWords.reduce((sum, w) => sum + w.length, 0)
  let wordCounter = 0

  return (
    // Extra scroll height = the "runway" that gets consumed while pinned.
    // More words → a bit more runway so the reveal doesn't feel rushed.
    <div ref={wrapperRef} className="relative" style={{ height: `${Math.min(420, 220 + totalWords * 2.5)}vh` }}>
      <div className="sticky top-0 flex min-h-screen items-center">
        <div className={className}>
          {paragraphWords.map((words, pIdx) => (
            <p key={pIdx}>
              {words.map((word, wIdx) => {
                const globalIndex = wordCounter++
                const start = globalIndex / totalWords
                const end = (globalIndex + 1) / totalWords
                return (
                  <ScrollWord
                    key={wIdx}
                    word={word}
                    progress={scrollYProgress}
                    range={[start, end]}
                    isLast={wIdx === words.length - 1}
                  />
                )
              })}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

// border prop removed entirely — no divider between sections anymore
function AboutSection({ title, children, fullWidth = false }: { title: string; children: React.ReactNode; fullWidth?: boolean }) {
  return (
    <section
      className="flex flex-col gap-6 py-20 md:py-28"
      aria-labelledby={`${title.toLowerCase().replaceAll(' ', '-')}-heading`}
    >
      <div className="flex flex-col gap-6 mb-12">
        <h2 id={`${title.toLowerCase().replaceAll(' ', '-')}-heading`} className="text-foreground font-medium uppercase tracking-tighter leading-[0.9] text-[64px] md:text-[100px] lg:text-[120px]">
          {title}
        </h2>
        <div className="w-full h-0.5 bg-foreground" />
      </div>
      <div className={fullWidth ? 'w-full' : 'grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 md:gap-6 items-start'}>
        {children}
      </div>
    </section>
  )
}

// Each value is a full-width row with a thin divider — matches the
// border-b list pattern used in process.tsx and work.tsx, instead of a
// solid full-bleed block. The hover dot uses the foreground color for a
// stronger, more direct interaction cue.
const VALUES = [
  'Craft over decoration.',
  'Clarity before creativity.',
  'Built to last, not to trend.',
  'Honest over impressive.',
  'Founders first.',
]

function ValueRow({ text, index }: { text: string; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      {...reveal}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex w-full items-center gap-6 border-b border-foreground py-6 last:border-none md:py-8"
    >
      <span
        className="h-[40px] w-[40px] shrink-0 rounded-full bg-foreground transition-opacity duration-300"
        style={{ opacity: isHovered ? 1 : 0 }}
        aria-hidden="true"
      />
      <span className="text-[20px] font-medium tracking-tight text-muted-foreground/50 md:text-[28px]">
        {String(index + 1).padStart(2, '0')}
      </span>
      <p className="text-[24px] font-medium leading-tight tracking-tighter text-foreground md:text-[48px] lg:text-[56px]">
        {text}
      </p>
    </motion.div>
  )
}

function AboutContent() {
  return (
    <div className="flex flex-col px-4 text-foreground lg:px-9">
      <AboutSection title="The Studio" fullWidth>
        <StickyWordReveal
          className="flex flex-col gap-6 text-[22px] leading-snug tracking-tight text-foreground md:text-[30px] lg:text-[38px]"
          paragraphs={[
            "Lozinr started with one belief: most brands don't fail because they look bad. They fail because they were never given direction in the first place.",
            `We're a branding studio built for founders who are past the "let's just make a logo" stage — people building companies meant to last, not just launch.`,
            'Every project runs through one framework. Every decision is judged against one question: does this serve the business, or just decorate it?',
          ]}
        />
      </AboutSection>

      <AboutSection title="How We Work">
        <>
          <AboutImage label="Method image" src="work-hero.svg" />
          <AboutText>
            <div className="flex flex-col gap-5 text-[18px] leading-tight tracking-tight text-foreground lg:text-[22px]">
              <p>We call it the Lozinr Method — six stages, one direction.</p>
              <ol className="flex flex-col gap-3">
                <li><strong>Listen</strong> — We start by understanding the business, not the aesthetic preferences.</li>
                <li><strong>Orient</strong> — We find where the brand actually stands, against competitors and against the truth.</li>
                <li><strong>Zero In</strong> — We narrow until one clear direction remains.</li>
                <li><strong>Ignite</strong> — We build the identity system around that direction.</li>
                <li><strong>Narrate</strong> — We shape how the brand speaks, not just how it looks.</li>
                <li><strong>Reinforce</strong> — We hand over a system built to stay consistent long after we&apos;re gone.</li>
              </ol>
            </div>
          </AboutText>
        </>
      </AboutSection>

      <AboutSection title="Who We Work With" fullWidth>
        <StickyWordReveal
          className="flex flex-col gap-6 text-[22px] leading-snug tracking-tight text-foreground md:text-[30px] lg:text-[38px]"
          paragraphs={[
            'We work with founders building something worth remembering — companies with real traction, real teams, or real ambition behind them.',
            `We're not the studio for a first logo. We're the studio for when "good enough" stops being good enough.`,
          ]}
        />
      </AboutSection>

      <section className="flex flex-col gap-6 py-20 md:py-28" aria-labelledby="what-we-stand-for-heading">
        <div className="flex flex-col gap-6 mb-12">
          <h2 id="what-we-stand-for-heading" className="text-foreground font-medium uppercase tracking-tighter leading-[0.9] text-[64px] md:text-[100px] lg:text-[120px]">What We Stand For</h2>
          <div className="w-full h-0.5 bg-foreground" />
        </div>
        <div className="flex w-full flex-col">
          {VALUES.map((value, index) => (
            <ValueRow key={value} text={value} index={index} />
          ))}
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