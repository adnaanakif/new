'use client'

import { use, useState } from 'react'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import Header from '@/components/header'
import Footer from '@/components/footer'
import AnimatedHeroTitle from '@/components/animated-hero-title'
import { getCaseStudy } from '@/lib/case-studies'

// ─── Hero — full-device-height image with animated centered title ─────────
function CaseStudyHero({ name, heroImage }: { name: string; heroImage: string }) {
  return (
    <div
      className="relative w-screen -mx-[calc(50vw-50%)] overflow-hidden"
      style={{ height: '100svh' }}
    >
      <img
        src={heroImage}
        alt={name}
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
        decoding="async"
      />

      {/* Gradient / scrim — same convention as work page hero */}
      <div className="absolute inset-0 bg-background" />

      <div className="absolute inset-0 flex items-center justify-center overflow-hidden px-2 lg:px-4">
        <AnimatedHeroTitle text={name} />
      </div>
    </div>
  )
}

// ─── "What We Did" link — slide/underline hover effect ────────────────────
function WhatWeDidLink({ label, href }: { label: string; href: string }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group inline-flex w-fit items-center gap-3 border-2 border-foreground px-6 py-3 text-foreground"
    >
      <span className="relative block h-6 overflow-hidden leading-6">
        <motion.span
          className="block whitespace-nowrap text-[16px] tracking-tight"
          animate={{ y: hovered ? -24 : 0 }}
          transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
        >
          <span className="flex h-6 items-center whitespace-nowrap">{label}</span>
          <span className="flex h-6 items-center whitespace-nowrap" aria-hidden="true">
            {label}
          </span>
        </motion.span>
      </span>
      <motion.span
        animate={{ x: hovered ? 4 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="text-[18px] leading-none"
        aria-hidden="true"
      >
        &rarr;
      </motion.span>
    </a>
  )
}

// ─── Details — left title/subtitle, right "What We Did" CTA ───────────────
function CaseStudyDetails({
  name,
  subtitle,
  whatWeDid,
}: {
  name: string
  subtitle: string
  whatWeDid: { label: string; href: string }
}) {
  return (
    <section className="border-b-2 border-foreground px-4 py-12 lg:px-9 lg:py-16">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <div className="flex flex-col gap-4 lg:max-w-2xl">
          <h2 className="text-[40px] font-medium leading-[0.95] tracking-tighter md:text-[56px]">
            {name}
          </h2>
          <p className="text-[18px] leading-tight tracking-tight text-foreground/80 md:text-[20px]">
            {subtitle}
          </p>
        </div>

        <div className="shrink-0">
          <WhatWeDidLink label={whatWeDid.label} href={whatWeDid.href} />
        </div>
      </div>
    </section>
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
      <Header preloaderDone={true} />
      <main className="min-h-screen bg-background text-foreground">
        <CaseStudyHero name={project.name} heroImage={project.heroImage} />
        <CaseStudyDetails
          name={project.name}
          subtitle={project.subtitle}
          whatWeDid={project.whatWeDid}
        />
        <CaseStudyGallery images={project.images} name={project.name} />
      </main>
      <Footer />
    </>
  )
}
