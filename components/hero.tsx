'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

interface HeroSectionProps {
  triggerAnimation?: boolean
}

const SMOOTH_EASE = [0.16, 1, 0.3, 1] as const

export default function HeroSection({ triggerAnimation = false }: HeroSectionProps) {
  const directionStart = 0.1
  const { scrollY } = useScroll()
  const heroArtworkY = useTransform(scrollY, [0, 700], [0, -220])

  return (
    <section className="sticky top-0 z-0 flex h-[98svh] items-end justify-center overflow-hidden bg-background lg:h-screen">
            {/* Top Right - Eyebrow text + description */}
      <motion.div
        className="absolute top-24 right-4 left-4 z-20 max-w-none text-left lg:top-15 lg:right-9 lg:left-auto lg:max-w-[600px]"
        initial={{ opacity: 0, y: -20 }}
        animate={triggerAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{
          delay: directionStart + 0.2,
          duration: 0.85,
          ease: SMOOTH_EASE,
        }}
      >
        <p className="text-[20px] lg:text-[26px] font-regular tracking-tight text-foreground">
          Direction before design
        </p>
        <p className="mt-1 text-[20px] lg:text-[26px] leading-tight text-foreground">
          Lozinr is a brand identity studio helping funded startups and ambitious founders build distinctive brands through strategy, identity systems, and timeless design.
        </p>
      </motion.div>

      <div className="relative z-10 flex h-full w-full items-end">
        <div className="flex w-full flex-col items-center justify-end gap-0">

          {/* Top Column - DIRECTION (SVG) */}
          <motion.div
            className="relative w-full text-center"
            style={{ y: heroArtworkY }}
            initial={{ opacity: 0, y: 20 }}
            animate={triggerAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              delay: directionStart,
              duration: 0.85,
              ease: SMOOTH_EASE,
            }}
          >
            {/* Clip wrapper: shows only top 60% of the SVG, bottom 40% hidden */}
            <div className="relative w-full aspect-[857.41/107.4] overflow-hidden px-4 lg:px-9">
              <svg
                viewBox="0 0 2034 394"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-0 left-0 block h-auto w-full max-w-none text-foreground px-4 lg:px-9"
                role="img"
                aria-label="Lozinr"
              >
                <path fill="currentColor" d="M1090.1 0.000976562V394H1176.74V0.000976562H1090.1Z"/>
                <path fill="currentColor" d="M476.614 0.000976562C374.365 0.000976562 291.47 88.1925 291.47 197C291.47 305.794 374.365 394 476.614 394C578.848 394 661.743 305.794 661.743 197C661.743 88.1925 578.848 0.000976562 476.614 0.000976562ZM476.614 317.593C414.016 317.593 363.287 263.605 363.287 197C363.287 130.396 414.016 76.4077 476.614 76.4077C539.197 76.4077 589.94 130.396 589.94 197C589.94 263.605 539.197 317.593 476.614 317.593Z"/>
                <path fill="currentColor" d="M1285.71 105.016L1330.09 394H1232.17V0.000976562H1325.85L1526.54 289.235L1482.19 0.000976562H1580.11V394H1486.42L1285.71 105.016Z"/>
                <path fill="currentColor" d="M910.093 39.0501L688.347 90.3292V0.000976562H1034.67L808.778 354.743L1034.67 303.671V394H688.347L910.093 39.0501Z"/>
                <path fill="currentColor" d="M0 0.000976562H90.3271L76.3998 354.95L278.67 303.671V394H0V0.000976562Z"/>
                <path fill="currentColor" d="M1875.43 235.37H1883.28C1915.78 235.37 1945.2 222.203 1966.51 200.896C1987.8 179.603 2000.97 150.186 2000.97 117.685C2000.97 52.6841 1948.28 0 1883.28 0H1635.54V394H1725.51V209.643L1751.05 235.37L1908.49 393.939H2034L1875.43 235.37ZM1725.51 174.561V69.5268H1855.2C1884.21 69.5268 1907.72 93.0365 1907.72 122.044C1907.72 136.548 1901.84 149.669 1892.34 159.177C1882.83 168.684 1869.71 174.561 1855.2 174.561H1725.51Z"/>
              </svg>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
