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
      style={{ height: 'min(100vh, calc(100vw * 16 / 9))' }}
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
    title: 'BRAND GUIDELINES TEMPLATE',
    price: '$49',
    imageSrc: '#',
    imageAlt: 'Bakery Brand Kit template preview',
    href: '#',
  },
  {
    title: 'BRAND PROPOSAL TEMPLATE',
    price: '$35',
    imageSrc: '#',
    bgMediaSrc:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Proposal%20Template-NkbsqdoyqfoD3dFsiCA1Rp1qyyEA8J.gif',
    imageAlt: 'Brand Proposal',
    href: 'https://template.lozinr.com/l/brandproposal?layout=profile',
  },
  {
    title: 'INVOICE TEMPLATE',
    price: '$79',
    imageSrc: '#',
    imageAlt: 'Studio Brand System template preview',
    href: '#',
  },
  {
    title: 'CONTRACT TEMPLATE',
    price: '$39',
    imageSrc: '#',
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
  bgMediaSrc,
  imageAlt,
  href,
}: {
  title: string
  price: string
  imageSrc: string
  bgMediaSrc?: string
  imageAlt: string
  href: string
}) {
  return (
    <motion.div {...reveal} className="flex flex-col gap-2">
      <Link
        href={href}
        aria-label={`View ${title}`}
        className="group relative block aspect-square w-full overflow-hidden bg-foreground"
      >
        {bgMediaSrc && (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={bgMediaSrc}
              alt={imageAlt}
              className="h-2/3 w-2/3 object-contain"
            />
          </div>
        )}
      </Link>

      <div className="flex flex-col items-start gap-0.5">
        <h3 className="text-[18px] font-medium tracking-tight text-foreground lg:text-[20px]">
          {title}
        </h3>
        <span className="text-[16px] tracking-tight text-foreground lg:text-[18px]">
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
      <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:gap-x-4 lg:gap-y-10">
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
