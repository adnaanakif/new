'use client'

import { use } from 'react'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import Header from '@/components/header'
import Footer from '@/components/footer'
import AnimatedHeroTitle from '@/components/animated-hero-title'
import { getCaseStudy } from '@/lib/case-studies'

const REVEAL_DURATION = 0.9
const REVEAL_DELAY = 0.15
const REVEAL_EASE = [0.76, 0, 0.24, 1] as const

// ─── Curtain — solid panel that wipes away on mount to reveal the page ────
function RevealCurtain() {
  return (
    <motion.div
      initial={{ scaleY: 1 }}
      animate={{ scaleY: 0 }}
      transition={{ duration: REVEAL_DURATION, delay: REVEAL_DELAY, ease: REVEAL_EASE }}
      style={{ transformOrigin: 'top' }}
      className="fixed inset-0 z-50 bg-background"
      aria-hidden="true"
    />
  )
}

// ─── Hero — full-device-height image with animated centered title ─────────
function CaseStudyHero({ name, heroImage }: { name: string; heroImage: string }) {
  return (
    <div
      className="relative w-screen -mx-[calc(50vw-50%)] overflow-hidden"
      style={{ height: '100svh' }}
    >
      <motion.img
        src={heroImage}
        alt={name}
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
        decoding="async"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, delay: REVEAL_DELAY, ease: REVEAL_EASE }}
      />

      {/* Gradient / scrim — same convention as work page hero */}
      <div className="absolute inset-0 bg-background" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: REVEAL_DELAY + REVEAL_DURATION - 0.35, ease: 'easeOut' }}
        className="absolute inset-0 flex items-center justify-center overflow-hidden px-2 lg:px-4"
      >
        <AnimatedHeroTitle text={name.toUpperCase()} />
      </motion.div>
    </div>
  )
}

// ─── Service pill — static bar, no hover animation ─────────────────────────
function ServicePill({ label }: { label: string }) {
  return (
    <div className="flex w-full items-center justify-center bg-foreground/60 px-6 py-4 text-center text-[16px] font-medium tracking-tight text-background md:text-[18px]">
      {label}
    </div>
  )
}

// ─── Details — left title/subtitle, right static service pills ────────────
function CaseStudyDetails({
  name,
  subtitle,
  services,
}: {
  name: string
  subtitle: string
  services: string[]
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: REVEAL_DELAY + REVEAL_DURATION - 0.2, ease: 'easeOut' }}
      className="border-b-2 border-foreground px-4 py-12 lg:px-9 lg:py-16"
    >
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
        <div className="flex flex-col gap-4 lg:max-w-2xl">
          <h2 className="text-[40px] font-medium leading-[0.95] tracking-tighter md:text-[56px]">
            {name}
          </h2>
          <p className="text-[18px] leading-tight tracking-tight text-foreground/80 md:text-[20px]">
            {subtitle}
          </p>
        </div>

        <div className="flex w-full flex-col gap-1 lg:w-[340px] lg:shrink-0">
          {services.map((service) => (
            <ServicePill key={service} label={service} />
          ))}
        </div>
      </div>
    </motion.section>
  )
}

// ─── Gallery — 10 full-bleed images, single column, no rounding ───────────
function CaseStudyGallery({ images, name }: { images: string[]; name: string }) {
  return (
    <section className="flex flex-col gap-1 px-4 py-12 lg:px-9">
      {images.map((src, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full overflow-hidden bg-foreground/10"
        >
          <img
            src={src}
            alt={`${name} — image ${index + 1}`}
            className="h-full w-full object-cover"
          />
        </motion.div>
      ))}
    </section>
  )
}

export default function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
  const project = getCaseStudy(slug)

  if (!project) notFound()

  return (
    <>
      <RevealCurtain />
      <Header preloaderDone={true} />
      <main className="min-h-screen bg-background text-foreground">
        <CaseStudyHero name={project.name} heroImage={project.heroImage} />
        <CaseStudyDetails
          name={project.name}
          subtitle={project.subtitle}
          services={project.services}
        />
        <CaseStudyGallery images={project.images} name={project.name} />
      </main>
      <Footer />
    </>
  )
}
