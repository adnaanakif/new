'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Header from '@/components/header'
import Footer from '@/components/footer'
import AnimatedHeroTitle from '@/components/animated-hero-title'

// ─── Hero — identical structure to the /work page hero ────────────
function TemplatesHero() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => { setIsMounted(true) }, [])

  return (
    <div
      className="relative w-screen -mx-[calc(50vw-50%)] overflow-hidden bg-background"
      style={{ aspectRatio: '3 / 2' }}
    >
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden px-2 lg:px-4">
        <AnimatedHeroTitle text="TEMPLATES" color="text-foreground" />
      </div>
    </div>
  )
}

// ─── Template data ─────────────────────────────────────────────────
// Update `href` on each item to point at the real product / checkout link.
const TEMPLATES = [
  {
    title: 'Bakery Brand Kit',
    price: '$49',
    imageSrc: '/baked-01.jpg',
    imageAlt: 'Bakery Brand Kit template preview',
    href: '#',
  },
  {
    title: 'Bekary Identity Pack',
    price: '$59',
    imageSrc: '/baked-02.jpg',
    imageAlt: 'Bekary Identity Pack template preview',
    href: '#',
  },
  {
    title: 'Studio Brand System',
    price: '$79',
    imageSrc: '/baked-03.jpg',
    imageAlt: 'Studio Brand System template preview',
    href: '#',
  },
  {
    title: 'Minimal Logo Suite',
    price: '$39',
    imageSrc: '/baked-04.jpg',
    imageAlt: 'Minimal Logo Suite template preview',
    href: '#',
  },
]

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
}

// ─── Thumbnail ──────────────────────────────────────────────────────
function TemplateThumbnail({
  title,
  price,
  imageSrc,
  imageAlt,
  href,
}: {
  title: string
  price: string
  imageSrc: string
  imageAlt: string
  href: string
}) {
  return (
    <motion.div {...reveal} className="flex flex-col gap-3">
      <Link
        href={href}
        aria-label={`View ${title}`}
        className="group relative block aspect-square w-full overflow-hidden bg-[#232121]"
      >
        <img
          src={imageSrc}
          alt={imageAlt}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </Link>

      <div className="flex items-center justify-between gap-4">
        <h3 className="text-[18px] font-medium tracking-tight text-foreground lg:text-[20px]">
          {title}
        </h3>
        <span className="shrink-0 text-[18px] tracking-tight text-foreground lg:text-[20px]">
          {price}
        </span>
      </div>
    </motion.div>
  )
}

// ─── Templates grid — 2 cols desktop, 1 col mobile ─────────────────
function TemplatesGrid() {
  return (
    <section className="w-full bg-background px-4 py-16 text-foreground md:py-20 lg:px-9">
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:gap-x-9 lg:gap-y-14">
        {TEMPLATES.map((template) => (
          <TemplateThumbnail key={template.title} {...template} />
        ))}
      </div>
    </section>
  )
}

// ─── Main ────────────────────────────────────────────────────────
export default function TemplatesPage() {
  return (
    <>
      <Header preloaderDone={true} />
      <main className="min-h-screen bg-background text-white">

        {/* Hero */}
        <TemplatesHero />

        {/* Templates thumbnail grid */}
        <TemplatesGrid />

      </main>
      <Footer />
    </>
  )
}