'use client'

import { motion } from 'framer-motion'

interface HeroSectionProps {
  triggerAnimation?: boolean
}

const SMOOTH_EASE = [0.16, 1, 0.3, 1] as const

const letterVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
  },
}

export default function HeroSection({ triggerAnimation = false }: HeroSectionProps) {
  const directionStart = 0.1
  const directionEnd = directionStart + 0.85

  const beforeDesignDelay = directionEnd - 0.25 // slight overlap for smoothness
  const taglineLine1Delay = beforeDesignDelay + 0.55
  const taglineLineStagger = 0.1 // gap between line 1 and line 2
  const taglineLine2Delay = taglineLine1Delay + taglineLineStagger

  const taglineLine1 = 'We build strategic brands that create clarity,'
  const taglineLine2 = 'earn trust, and stand the test of time.'

  return (
    <section className="relative isolate flex h-screen items-center justify-center overflow-hidden bg-background">
      <img
        src="/footer-working.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10" aria-hidden="true" />
      <div className="relative z-10 w-full px-4 lg:px-6">
        <div className="flex flex-col items-center justify-center gap-0">

          {/* Top Column - DIRECTION (SVG) */}
          <motion.div
            className="text-center w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={triggerAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              delay: directionStart,
              duration: 0.85,
              ease: SMOOTH_EASE,
            }}
          >
            <svg
  viewBox="0 0 857.41 179"
  xmlns="http://www.w3.org/2000/svg"
  className="h-auto w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-6 text-background"
  style={{
    maxWidth: 'clamp(280px, 90vw, 1400px)',
  }}
>
  <path fill="currentColor" d="M41.8,1.84v142.91h85.45v32.41H3.25V1.84h38.55Z"/>
  <path fill="currentColor" d="M135.8,55.78c3.74-10.67,9.11-19.98,16.12-27.92,7.01-7.95,15.62-14.17,25.82-18.69,10.2-4.52,21.69-6.78,34.47-6.78s24.46,2.26,34.58,6.78c10.12,4.52,18.69,10.75,25.7,18.69,7.01,7.94,12.38,17.25,16.12,27.92,3.74,10.67,5.61,22.24,5.61,34.7s-1.87,23.48-5.61,34c-3.74,10.52-9.11,19.67-16.12,27.46-7.01,7.79-15.58,13.9-25.7,18.34-10.13,4.44-21.65,6.66-34.58,6.66s-24.27-2.22-34.47-6.66c-10.2-4.44-18.81-10.55-25.82-18.34-7.01-7.79-12.38-16.94-16.12-27.46-3.74-10.52-5.61-21.85-5.61-34s1.87-24.03,5.61-34.7ZM169.33,110.93c1.64,6.62,4.24,12.58,7.83,17.88,3.58,5.3,8.26,9.54,14.02,12.73,5.76,3.19,12.77,4.79,21.03,4.79s15.27-1.6,21.03-4.79c5.76-3.19,10.43-7.44,14.02-12.73,3.58-5.29,6.19-11.25,7.83-17.88,1.64-6.62,2.45-13.44,2.45-20.45s-.82-14.41-2.45-21.26c-1.64-6.85-4.25-12.97-7.83-18.34-3.59-5.37-8.26-9.66-14.02-12.85-5.77-3.19-12.78-4.79-21.03-4.79s-15.27,1.6-21.03,4.79c-5.77,3.19-10.44,7.48-14.02,12.85-3.59,5.37-6.19,11.49-7.83,18.34-1.64,6.86-2.45,13.94-2.45,21.26s.82,13.83,2.45,20.45Z"/>
  <path fill="currentColor" d="M392.2,34.25h-86.68V1.84h138v30.45l-94.05,112.46h96.5v32.41h-147.82v-30.45l94.04-112.46Z"/>
  <path fill="currentColor" d="M508.63,1.84v175.32h-38.55V1.84h38.55Z"/>
  <path fill="currentColor" d="M571.05,1.84l73.17,117.62h.49V1.84h36.1v175.32h-38.55l-72.93-117.37h-.49v117.37h-36.1V1.84h38.31Z"/>
  <path fill="currentColor" d="M799.46,1.84c7.86,0,14.94,1.27,21.24,3.81,6.3,2.54,11.7,6.02,16.21,10.44,4.5,4.42,7.94,9.54,10.31,15.35,2.37,5.81,3.56,12.07,3.56,18.78,0,10.31-2.17,19.24-6.51,26.76-4.34,7.53-11.42,13.26-21.24,17.19v.49c4.75,1.31,8.67,3.31,11.79,6.02,3.11,2.7,5.65,5.89,7.61,9.58,1.96,3.68,3.4,7.73,4.3,12.15.9,4.42,1.51,8.84,1.84,13.26.16,2.79.33,6.06.49,9.82.16,3.77.45,7.61.86,11.54.41,3.93,1.06,7.65,1.96,11.17.9,3.52,2.25,6.51,4.05,8.96h-38.55c-2.13-5.56-3.44-12.19-3.93-19.89-.49-7.69-1.23-15.06-2.21-22.1-1.31-9.17-4.09-15.88-8.35-20.13-4.26-4.26-11.22-6.38-20.87-6.38h-38.55v68.51h-38.55V1.84h94.54ZM785.71,81.15c8.84,0,15.47-1.96,19.89-5.89,4.42-3.93,6.63-10.31,6.63-19.15s-2.21-14.69-6.63-18.54c-4.42-3.84-11.05-5.77-19.89-5.77h-42.23v49.36h42.23Z"/>
</svg>
          </motion.div>

          {/* Middle Column - BEFORE DESIGN (masked slide-up reveal) */}
          <div className="text-center w-full overflow-hidden lg:mt-8 mt-5">
            <motion.h2
              className="text-background text-balance font-semibold uppercase tracking-tighter leading-[0.92] text-[clamp(2.75rem,10vw,5.5rem)]"
              initial={{ y: '100%', opacity: 0 }}
              animate={
                triggerAnimation
                  ? { y: '0%', opacity: 1 }
                  : { y: '100%', opacity: 0 }
              }
              transition={{
                delay: beforeDesignDelay,
                duration: 1,
                ease: SMOOTH_EASE,
              }}
            >
              Direction Before Design
            </motion.h2>
          </div>

          {/* Bottom Column - Tagline */}
          <div className="text-center w-full lg:mt-6 mt-4">

            {/* Desktop — two lines, each masked and sliding up independently */}
            <div className="hidden lg:flex lg:flex-col lg:items-center text-pretty text-lg leading-tight font-normal text-background max-w-lg mx-auto text-[18px]">
              <div className="overflow-hidden">
                <motion.p
                  initial={{ y: '100%', opacity: 0 }}
                  animate={
                    triggerAnimation
                      ? { y: '0%', opacity: 1 }
                      : { y: '100%', opacity: 0 }
                  }
                  transition={{
                    delay: taglineLine1Delay,
                    duration: 0.8,
                    ease: SMOOTH_EASE,
                  }}
                >
                  {taglineLine1}
                </motion.p>
              </div>
              <div className="overflow-hidden">
                <motion.p
                  initial={{ y: '100%', opacity: 0 }}
                  animate={
                    triggerAnimation
                      ? { y: '0%', opacity: 1 }
                      : { y: '100%', opacity: 0 }
                  }
                  transition={{
                    delay: taglineLine2Delay,
                    duration: 0.8,
                    ease: SMOOTH_EASE,
                  }}
                >
                  {taglineLine2}
                </motion.p>
              </div>
            </div>

            {/* Mobile / Tablet — single wrapped paragraph, simple fade */}
            <motion.p
              className="lg:hidden text-pretty text-base font-normal text-background max-w-md mx-auto leading-tight sm:text-lg"
              initial={{ y: 20, opacity: 0, filter: 'blur(4px)' }}
              animate={
                triggerAnimation
                  ? { y: 0, opacity: 1, filter: 'blur(0px)' }
                  : { y: 20, opacity: 0, filter: 'blur(4px)' }
              }
              transition={{
                delay: taglineLine1Delay,
                duration: 0.8,
                ease: SMOOTH_EASE,
              }}
            >
              We build strategic brands that create clarity, earn trust, and stand the test of time.
            </motion.p>

          </div>
        </div>
      </div>
    </section>
  )
}
