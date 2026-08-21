'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const PROJECTS = [
  {
    title: 'BAKED',
    slug: 'BAKED',
    description: `A bakery brand built on real community trust.
An identity made to match the warmth of the shop.`,
    imageAlt: 'BAKED brand project preview',
    imageSrc: '/baked-thumbnail-new.jpg',
    imageFirst: true,
  },
  {
    title: 'Bekary',
    slug: 'baked-2',
    description: `Great brands aren't built by decoration.
They're built through clear thinking, intentional systems, and decisions that serve the business.`,
    imageAlt: 'Bekary brand project preview',
    imageFirst: false,
  },
  {
    title: 'Bekary',
    slug: 'baked-3',
    description: `Great brands aren't built by decoration.
They're built through clear thinking, intentional systems, and decisions that serve the business.`,
    imageAlt: 'Bekary brand project preview',
    imageFirst: true,
  },
]

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
}

// Nav bar's own sticky offset (matches "Featured Work" heading's top-10)
const HEADER_STICKY_TOP = 40

// Extra gap you want between the "Featured Work" heading and the thumbnails
const THUMBNAIL_GAP = 100

// Thumbnails stick this far from the top of viewport
const STICKY_TOP = HEADER_STICKY_TOP + THUMBNAIL_GAP

function ProjectImage({ alt, slug, src = '#' }: { alt: string; slug: string; src?: string }) {
  return (
    <motion.div
      {...reveal}
      className="relative block aspect-video w-full overflow-hidden bg-foreground"
    >
      <Link href={`/work/${slug}`} aria-label={`View ${alt}`} className="block h-full w-full">
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      </Link>
    </motion.div>
  )
}

function AnimatedCaseStudyLabel({ isHovered }: { isHovered: boolean }) {
  const label = 'View Case Study'

  return (
    <span className="relative block h-6 overflow-hidden leading-6">
      <motion.span
        className="block whitespace-nowrap"
        animate={{ y: isHovered ? -24 : 0 }}
        transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
      >
        <span className="flex h-6 items-center justify-center whitespace-nowrap">
          {label}
        </span>
        <span className="flex h-6 items-center justify-center whitespace-nowrap" aria-hidden="true">
          {label.split('').map((char, index) => (
            <motion.span
              key={`${char}-${index}`}
              className="inline-block"
              initial={{ opacity: 0, y: 10 }}
              animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: isHovered ? index * 0.025 : 0, duration: 0.4, ease: 'easeOut' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </span>
      </motion.span>
    </span>
  )
}

function CaseStudyButton({ slug }: { slug: string }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href={`/work/${slug}`}
      aria-label="View Case Study"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      className="flex min-h-14 w-full items-center justify-center bg-[#232121] px-4 py-3 text-center text-[18px] text-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
    >
      <AnimatedCaseStudyLabel isHovered={isHovered} />
    </Link>
  )
}

function ProjectContent({
  title,
  description,
  slug,
}: {
  title: string
  description: string
  slug: string
}) {
  return (
    <motion.div
      {...reveal}
      transition={{ ...reveal.transition, delay: 0.1 }}
      className="flex w-full flex-col items-start justify-start gap-5"
    >
      <div className="flex flex-col gap-3">
        <h3 className="text-2xl font-medium tracking-tight text-foreground">{title}</h3>
        <p className="whitespace-pre-line text-[18px] leading-tight tracking-tight text-foreground lg:text-[22px]">
          {description}
        </p>
      </div>
      <CaseStudyButton slug={slug} />
    </motion.div>
  )
}

export default function WorkSection({ showHeader = true }: { showHeader?: boolean }) {
  return (
    <section
      className="w-full bg-background px-4 py-20 text-foreground md:py-28 lg:px-9"
      aria-labelledby={showHeader ? 'our-work-heading' : undefined}
    >
      {showHeader && (
        <div
          className="sticky z-20 mb-12 flex flex-col gap-6 bg-background py-2"
          style={{ top: HEADER_STICKY_TOP }}
        >
          <h2 id="our-work-heading" className="text-foreground font-medium uppercase tracking-tighter leading-[0.9] text-[28px] md:text-[36px] lg:text-[40px]">
            Featured Work
          </h2>
          <div className="h-0.5 w-full bg-foreground" />
        </div>
      )}

      <div className="flex flex-col">
        {PROJECTS.map((project, index) => (
          <div
            key={`${project.title}-${index}`}
            className="lg:sticky flex min-h-[calc(100vh-10px)] flex-col justify-center gap-10 border-t border-foreground/20 bg-background pb-10 pt-2 first:border-t-0 last:pb-0 lg:grid lg:grid-cols-2 lg:items-start lg:gap-6"
            style={{ top: STICKY_TOP, zIndex: index + 10 }}
          >
            <ProjectImage alt={project.imageAlt} slug={project.slug} src={project.imageSrc} />
            <ProjectContent title={project.title} description={project.description} slug={project.slug} />
          </div>
        ))}
      </div>
    </section>
  )
}