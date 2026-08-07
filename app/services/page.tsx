'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Header from '@/components/header'
import Footer from '@/components/footer'

// ─── Hero — same structure/animation as the Work page hero ─────────
function ServicesHero() {
  const heroRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start end', 'end start'],
  })
  const heroImageY = useTransform(scrollYProgress, [0, 1], ['-24%', '24%'])
  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.0])

  const heroImage = '/services-hero.jpg'

  return (
    <div
      ref={heroRef}
      className="relative w-screen -mx-[calc(50vw-50%)] overflow-hidden"
      style={{ height: 'min(100vh, calc(100vw * 16 / 9))' }}
    >
      <motion.div className="w-full h-full" style={{ y: heroImageY, scale: heroImageScale }}>
        <img
          src={heroImage}
          alt="Services"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
      </motion.div>

      {/* Gradient — same as work/about page */}
      <div className="absolute inset-0 bg-background" />

      {/* Title — centered, looping slide animation, same as Work page */}
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
              Services
            </motion.h1>
            <h1 className="text-[64px] md:text-[140px] lg:text-[208px] font-medium tracking-tighter leading-[0.9] text-foreground text-center">
              Services
            </h1>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// ─── Services offered — Identity System / Launch Kit / Refresh ─────
type Service = {
  id: number
  title: string
  audience: string
  includes: string[]
  priceLabel: string
  price: string
}

const services: Service[] = [
  {
    id: 1,
    title: 'Brand Identity System',
    audience: 'Early-stage & growth-stage founders',
    includes: [
      'Discovery Workshop',
      'Brand Strategy',
      'Logo System',
      'Typography',
      'Color System',
      'Brand Guidelines',
      'Core Brand Assets',
    ],
    priceLabel: 'Start',
    price: '$3,000–5,000',
  },
  {
    id: 2,
    title: 'Brand Launch Kit',
    audience: 'For founders launching a company.',
    includes: ['Brand Identity', 'Social assets', 'Website direction', 'Pitch deck direction', 'Launch assets'],
    priceLabel: 'Price target',
    price: '$5,000–9,000',
  },
  {
    id: 3,
    title: 'Brand Refresh / Rebrand',
    audience: 'For existing businesses.',
    includes: ['Brand Audit', 'Strategy', 'Identity Refresh', 'Updated Guidelines'],
    priceLabel: 'Price target',
    price: '$5,000–12,000',
  },
]

function ServiceColumn({ service }: { service: Service }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: '-80px' }}
      className="flex flex-col h-full px-4 lg:px-6 py-10 lg:py-12 lg:first:pl-0 lg:last:pr-0"
    >
      <h3 className="text-[48px] font-medium tracking-tight leading-[1.2] text-foreground">
        {service.title}
      </h3>
      <p className="mt-2 text-[18px] font-medium tracking-tight text-foreground">{service.audience}</p>

      <ul className="mt-6 space-y-2.5 flex-1">
        {service.includes.map((item) => (
          <li
            key={item}
            className="flex items-center gap-2.5 text-[18px] leading-snug tracking-tight text-foreground/85"
          >
            <span className="w-[13px] h-[13px] rounded-full bg-foreground flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-8 pt-6 border-t border-foreground">
        <span className="text-[18px] tracking-tight text-foreground">{service.priceLabel}</span>
        <p className="mt-1.5 text-[22px] font-medium tracking-tight text-foreground">{service.price}</p>
      </div>
    </motion.div>
  )
}

function ServicesOffered() {
  return (
    <div className="w-full bg-background text-foreground py-16 md:py-24 px-4 md:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceColumn key={service.id} service={service} />
        ))}
      </div>
    </div>
  )
}

// ─── Main ────────────────────────────────────────────────────────────
export default function ServicesPage() {
  return (
    <>
      <Header preloaderDone={true} />
      <main className="min-h-screen bg-background text-foreground">
        <ServicesHero />
        <ServicesOffered />
      </main>
      <Footer />
    </>
  )
}