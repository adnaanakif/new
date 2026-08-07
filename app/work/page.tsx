'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import Header from '@/components/header'
import Footer from '@/components/footer'
import AnimatedHeroTitle from '@/components/animated-hero-title'
import { projectsData } from '@/lib/projects'

// ─── Hero ─────────────────────────────────────────────────────────
function WorkHero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start end', 'end start'],
  })
  const heroImageY = useTransform(scrollYProgress, [0, 1], ['-24%', '24%'])
  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.0])

  useEffect(() => { setIsMounted(true) }, [])

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
            alt="Work"
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
          />
        </motion.div>
      )}

      {/* Gradient — same as about page */}
      <div className="absolute inset-0 bg-background" />

      {/* "Great Work" title — centered, looping slide animation */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden px-2 lg:px-4">
        <AnimatedHeroTitle text="Great Work" />
      </div>
    </div>
  )
}

// ─── Card ────────────────────────────────────────────────────────
function TiltCard({
  project,
  sizes,
  className = '',
}: {
  project: (typeof projectsData)[0]
  sizes: string
  className?: string
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springRotateX = useSpring(rotateX, { stiffness: 120, damping: 20 })
  const springRotateY = useSpring(rotateY, { stiffness: 120, damping: 20 })

  // Parallax on scroll
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ['start end', 'end start'],
  })
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    rotateX.set(((e.clientY - cy) / rect.height) * -10)
    rotateY.set(((e.clientX - cx) / rect.width) * 10)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    setHovered(false)
  }

  return (
    <div className={`group ${className}`}>
      <Link href={`/projects/${project.name.toLowerCase().replace(/\s+/g, '-')}`}>
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX: springRotateX,
            rotateY: springRotateY,
            transformStyle: 'preserve-3d',
            perspective: 800,
          }}
          className="cursor-pointer"
        >
          <div
            ref={imgRef}
            className="relative w-full overflow-hidden bg-foreground/10"
            style={{ aspectRatio: '16/9' }}
          >
            <motion.div
              style={{
                y: parallaxY,
                rotateX: springRotateX,
                rotateY: springRotateY,
                transformStyle: 'preserve-3d',
                perspective: 800,
              }}
              className="absolute inset-0 scale-125"
            >
              <Image
                src={project.images[0]}
                alt={project.name}
                fill
                sizes={sizes}
                className="object-cover"
              />
            </motion.div>
          </div>

          <div className="pt-3 flex flex-col gap-3 mt-2">
            <h3 className="text-[24px] font-regular text-foreground tracking-tight leading-tight">
          {project.name}
        </h3>

        {/* Divider under the title */}
        <div className="h-px w-full bg-foreground" />

        <p className="text-[18px] font-regualar text-foreground leading-tight tracking-tight">
          {project.description}
        </p>

        <div className="flex items-center gap-2">
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: 0 }}
          >
            <span className="inline-block text-[16px] bg-foreground font-regular tracking-tight text-background rounded-full px-3 py-1">
              {project.category}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <span className="inline-block text-[16px] bg-foreground font-regular tracking-tight text-background rounded-full px-3 py-1">
              {project.year}
            </span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Link>
    </div>
  )
}

// ─── Main ────────────────────────────────────────────────────────
export default function WorkPage() {
  const displayProjects = projectsData.filter((p) => p.images[0] !== '#')

  return (
    <>
      <Header preloaderDone={true} />
      <main className="min-h-screen bg-background text-white">

        {/* Hero */}
        <WorkHero />

        {/* Projects Grid */}
        <div className="px-3 lg:px-6 pt-16 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-x-6 md:gap-x-7 gap-y-12 md:gap-y-20">
            {displayProjects.map((project) => (
              <TiltCard
                key={project.id}
                project={project}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ))}
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
