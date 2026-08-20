'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, usePathname } from 'next/navigation'



// ─── Typography Scale (Inter — entire website) ───────────────────────────────
// H1  : text-[40px] md:text-[72px] font-semibold tracking-tighter
// H2  : text-[30px] md:text-[52px] font-semibold tracking-tighter
// H3  : text-[22px] md:text-[32px] font-medium  tracking-tight
// Body: text-[15px] md:text-[17px] font-normal  leading-relaxed
// Cap : text-[11px] md:text-[12px] font-normal  tracking-wide uppercase
// Nav : text-[14px] md:text-[16px] font-medium  tracking-tight
// Menu: text-[44px] font-semibold tracking-tighter (mobile full-screen menu)
// ─────────────────────────────────────────────────────────────────────────────

const CONTACT_LINK = 'https://cal.com/adnanakif/30-min-meeting'

// Distance (px) from top before header bg / dark text kicks in,
// and distance (px) from bottom before header bg hides again — desktop nav + bg.
const SCROLL_THRESHOLD = 800

// Separate, larger threshold for mobile logo + hamburger color flip.
const SCROLL_THRESHOLD_MOBILE = 1200

function useHoverCapability() {
  const [canHover, setCanHover] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    const updateHoverCapability = () => setCanHover(mediaQuery.matches)
    updateHoverCapability()
    mediaQuery.addEventListener('change', updateHoverCapability)
    return () => mediaQuery.removeEventListener('change', updateHoverCapability)
  }, [])

  return canHover
}

// ─── Content fade/hide variants (used for everything in the header EXCEPT
// the hamburger button) — replaces the old whole-header slide-up. ─────────────
const contentGroupVariants = {
  visible: {
    transition: { staggerChildren: 0.04, staggerDirection: -1 as const },
  },
  hidden: {
    transition: { staggerChildren: 0.035 },
  },
}

const contentItemVariants = {
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
  hidden: {
    opacity: 0,
    y: -8,
    scale: 0.96,
    filter: 'blur(4px)',
    transition: { duration: 0.35, ease: [0.65, 0, 0.35, 1] as const },
  },
}

// Desktop left-nav items — no mount/reveal animation. Hover behaves exactly
// like the full-screen menu nav hover: text slides up and out while a
// letter-by-letter staggered duplicate slides up into view. No accent color.
function DesktopNavItem({
  label,
  onClick,
}: {
  label: string
  onClick?: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="text-[16px] font-medium uppercase tracking-tight h-full px-2 flex items-center overflow-hidden"
    >
      <div className="overflow-hidden h-6 relative">
        <motion.div
          animate={{ y: isHovered ? -24 : 0 }}
          transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Primary text */}
          <div className="h-6 flex items-center whitespace-nowrap">
            {label}
          </div>

          {/* Secondary text — letters stagger in on hover, same pattern as MobileNavItem */}
          <div className="h-6 flex items-center whitespace-nowrap">
            {label.split('').map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: 10 }}
                animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: isHovered ? i * 0.025 : 0, duration: 0.4, ease: 'easeOut' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </button>
  )
}

function ArrowGlyph({ color }: { color: string }) {
  return (
    <svg className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0" style={{ color }} viewBox="0 0 10 10" fill="none">
      <path d="M2 8L8 2M8 2H3M8 2V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Social links now fade/slide in on menu open and reverse (fade/slide out,
// reverse stagger order) on menu close — mirrors the open animation.
function SocialLinkWithAnimation({
  social,
  index,
  enterDelay,
  exitDelay,
  isMenuOpen,
  onClose,
}: {
  social: { name: string; link: string }
  index: number
  enterDelay: number
  exitDelay: number
  isMenuOpen: boolean
  onClose: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [introPlayed, setIntroPlayed] = useState(false)
  const slideTransition = { duration: 0.5, ease: [0.76, 0, 0.24, 1] as const }

  useEffect(() => {
    if (!isMenuOpen) {
      setIntroPlayed(false)
      return
    }
    const playTimer = setTimeout(() => setIntroPlayed(true), enterDelay * 1000)
    const resetTimer = setTimeout(() => setIntroPlayed(false), enterDelay * 1000 + 650)
    return () => {
      clearTimeout(playTimer)
      clearTimeout(resetTimer)
    }
  }, [isMenuOpen, enterDelay])

  const active = isHovered || introPlayed

  return (
    <motion.a
      href={social.link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClose}
      className="flex items-center gap-1.5 flex-shrink-0"
      initial={{ opacity: 0, y: 16 }}
      animate={isMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={
        isMenuOpen
          ? { delay: enterDelay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }
          : { delay: exitDelay, duration: 0.4, ease: [0.65, 0, 0.35, 1] }
      }
    >
      {/* Text pill — border only, filled layer rises up from the bottom on hover (and once on menu open) */}
      <div className="relative rounded-full border border-foreground/40 overflow-hidden">
        {/* Invisible sizer — gives the pill its width/height from content */}
        <span className="invisible flex items-center px-3 py-1.5 md:px-4 md:py-2 text-[11px] md:text-[16px] font-normal tracking-wide uppercase whitespace-nowrap">
          {social.name}
        </span>

        <motion.div
          className="absolute inset-0 flex items-center justify-center px-3 py-1.5 md:px-4 md:py-2 text-[11px] md:text-[16px] font-normal tracking-wide uppercase whitespace-nowrap text-foreground"
          animate={{ y: active ? '-100%' : '0%' }}
          transition={slideTransition}
        >
          {social.name}
        </motion.div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center px-3 py-1.5 md:px-4 md:py-2 text-[11px] md:text-[16px] font-normal tracking-wide uppercase whitespace-nowrap bg-foreground text-background"
          initial={{ y: '100%' }}
          animate={{ y: active ? '0%' : '100%' }}
          transition={slideTransition}
        >
          {social.name}
        </motion.div>
      </div>

      {/* Arrow circle — separate element, own border-only + bottom-up fill reveal. Visible on mobile too, slightly smaller there. */}
      <div className="flex relative w-6 h-6 md:w-7 md:h-7 rounded-full border border-foreground/40 overflow-hidden flex-shrink-0">
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ y: active ? '-100%' : '0%' }}
          transition={slideTransition}
        >
          <ArrowGlyph color="var(--foreground)" />
        </motion.div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-foreground"
          initial={{ y: '100%' }}
          animate={{ y: active ? '0%' : '100%' }}
          transition={slideTransition}
        >
          <ArrowGlyph color="var(--background)" />
        </motion.div>
      </div>
    </motion.a>
  )
}

// Mobile/menu nav items — letters stagger IN on open (top-down order),
// and stagger OUT in reverse (last item exits first, last letter exits first)
// on close, mirroring the open animation.
function MobileNavItem({
  label,
  isActive,
  enterDelay,
  exitDelay,
  isMenuOpen,
  onClick,
}: {
  label: string
  isActive: boolean
  enterDelay: number
  exitDelay: number
  isMenuOpen: boolean
  onClick: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [hasEntered, setHasEntered] = useState(false)
  const canHover = useHoverCapability()

  useEffect(() => {
    if (!isMenuOpen) setHasEntered(false)
  }, [isMenuOpen])

  const primaryVisible = isMenuOpen && (!canHover || !isHovered)
  const secondaryVisible = canHover && isHovered
  const charCount = label.length

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => canHover && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="lg:text-[79px] text-[48px] font-regular uppercase tracking-tighter leading-none overflow-hidden h-[96px] relative block text-foreground"
      style={{ fontFamily: 'var(--font-display)' }}
    >
      <div className="overflow-hidden h-[96px]">
        {/* Hover swap wrapper */}
        <motion.div
          animate={{ y: canHover && isHovered ? -96 : 0 }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Primary Text — letter by letter reveal on open, reverse letter-by-letter on close */}
          <div className="flex h-[96px] items-center">
            {label.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={
                  primaryVisible
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: isHovered ? -20 : 40 }
                }
                transition={
                  isMenuOpen
                    ? hasEntered
                      ? { delay: isHovered ? index * 0.025 : 0, duration: 0.5, ease: 'easeOut' }
                      : { delay: enterDelay + index * 0.03, duration: 0.6, ease: [0.16, 1, 0.3, 1] }
                    : {
                        delay: exitDelay + (charCount - 1 - index) * 0.03,
                        duration: 0.4,
                        ease: [0.65, 0, 0.35, 1],
                      }
                }
                onAnimationComplete={() => {
                  if (!hasEntered && isMenuOpen) setHasEntered(true)
                }}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>

          {/* Secondary Text — hover only */}
          <div className="flex h-[96px] items-center">
            {label.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  secondaryVisible
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{
                  delay: isHovered ? index * 0.025 : 0,
                  duration: 0.5,
                  ease: 'easeOut',
                }}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </button>
  )
}

// Right Side Navigation Items — Smaller text sizes
function RightNavItem({
  label,
  isActive,
  enterDelay,
  exitDelay,
  isMenuOpen,
  onClick,
}: {
  label: string
  isActive: boolean
  enterDelay: number
  exitDelay: number
  isMenuOpen: boolean
  onClick: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [hasEntered, setHasEntered] = useState(false)
  const canHover = useHoverCapability()

  useEffect(() => {
    if (!isMenuOpen) setHasEntered(false)
  }, [isMenuOpen])

  const primaryVisible = isMenuOpen && (!canHover || !isHovered)
  const secondaryVisible = canHover && isHovered
  const charCount = label.length

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => canHover && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="lg:text-[32px] text-[22px] font-regular uppercase tracking-tighter leading-none overflow-hidden h-[52px] relative block text-foreground"
      style={{ fontFamily: 'var(--font-display)' }}
    >
      <div className="overflow-hidden h-[52px]">
        {/* Hover swap wrapper */}
        <motion.div
          animate={{ y: canHover && isHovered ? -52 : 0 }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Primary Text — letter by letter reveal on open, reverse letter-by-letter on close */}
          <div className="flex h-[52px] items-center">
            {label.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={
                  primaryVisible
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: isHovered ? -20 : 40 }
                }
                transition={
                  isMenuOpen
                    ? hasEntered
                      ? { delay: isHovered ? index * 0.025 : 0, duration: 0.5, ease: 'easeOut' }
                      : { delay: enterDelay + index * 0.03, duration: 0.6, ease: [0.16, 1, 0.3, 1] }
                    : {
                        delay: exitDelay + (charCount - 1 - index) * 0.03,
                        duration: 0.4,
                        ease: [0.65, 0, 0.35, 1],
                      }
                }
                onAnimationComplete={() => {
                  if (!hasEntered && isMenuOpen) setHasEntered(true)
                }}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>

          {/* Secondary Text — hover only */}
          <div className="flex h-[52px] items-center">
            {label.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  secondaryVisible
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{
                  delay: isHovered ? index * 0.025 : 0,
                  duration: 0.5,
                  ease: 'easeOut',
                }}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </button>
  )
}

export default function Header({ preloaderDone }: { preloaderDone?: boolean } = {}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [isPastHero, setIsPastHero] = useState(false)
  const lastScrollYRef = useRef(0)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const isScrollingDown = currentScrollY > lastScrollYRef.current
      if (currentScrollY < 50) {
        setIsHeaderVisible(true)
      } else if (isScrollingDown) {
        setIsHeaderVisible(false)
      } else {
        setIsHeaderVisible(true)
      }
      lastScrollYRef.current = currentScrollY

      // Hero section is (roughly) one viewport tall — once scrolled past it,
      // the header gets its background and content flips from
      // background-colored (visible over the hero image) to foreground-colored.
      const heroThreshold = window.innerHeight * 0.9
      setIsPastHero(currentScrollY > heroThreshold)
    }

    handleScroll() // run once on mount
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMenuOpen])

  const navLinks = ['Work', 'About', 'Contact', 'Insight']

  const socialLinks = [
    { name: 'Instagram', link: 'https://www.instagram.com/adnaanakif' },
    { name: 'Twitter', link: 'https://x.com/adnaanakif' },
    { name: 'YouTube', link: 'https://www.youtube.com/@adnaanakif' },
  ]

  const handleNavClick = (link: string) => {
    if (link === 'Home') router.push('/')
    else if (link === 'Work') router.push('/work')
    else if (link === 'About') router.push('/about')
    else if (link === 'Contact') window.open(CONTACT_LINK, '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      {/* Fixed Navbar — the bar itself never moves anymore. Only its inner
          content (logo/nav/store icon) fades out smoothly; the hamburger
          stays put and simply morphs into an X. */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-[100] w-full text-foreground"
        initial={{ y: -80, opacity: 0, filter: 'blur(6px)' }}
        animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      >
      {/* Translucent background layer — transparent over the hero, fades in
          once we've scrolled past it so the page stays subtly visible beneath. */}
      <motion.div
        className="absolute inset-0 bg-background text-foreground border-b border-foreground/10 pointer-events-none"
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />

        <div className="relative z-10 flex items-center justify-between gap-4 h-10 px-3 lg:px-6 w-full">

          {/* Content that fades/hides together as a staggered group */}
          <motion.div
            className="flex items-center gap-6 flex-shrink-0"
            variants={contentGroupVariants}
            initial="visible"
            animate={isMenuOpen ? 'hidden' : 'visible'}
          >
            {/* Mobile brand wordmark */}
            <motion.div
              variants={contentItemVariants}
              className="lg:hidden flex-shrink-0 cursor-pointer h-4 w-24"
              onClick={() => router.push('/')}
              style={{ pointerEvents: isMenuOpen ? 'none' : 'auto' }}
            >
              <img src="/artboard-1.svg" alt="Adnan Akif" className="h-full w-full object-contain object-left brightness-0" />
            </motion.div>

            {/* Desktop Left Nav (LG and above only) */}
            <motion.div
              variants={contentItemVariants}
              className="hidden lg:flex items-center gap-0"
              style={{ pointerEvents: isMenuOpen ? 'none' : 'auto' }}
            >
              <DesktopNavItem label="Work," onClick={() => router.push('/work')} />
              <DesktopNavItem label="About," onClick={() => router.push('/about')} />
<DesktopNavItem label="Contact," onClick={() => window.open(CONTACT_LINK, '_blank', 'noopener,noreferrer')} />
            </motion.div>
          </motion.div>

          {/* Right-side template link and mobile menu control */}
          <a
            href="#"
            className="hidden lg:block absolute right-6 top-1/2 -translate-y-1/2 text-[16px] font-medium uppercase tracking-tight"
          >
            Template
          </a>

          {/* Center: Logo SVG (Desktop/LG Only) */}
          <motion.div
            className="hidden lg:block absolute left-1/2 -translate-x-1/2 flex-shrink-0 cursor-pointer z-[80]"
            onClick={() => router.push('/')}
            variants={contentItemVariants}
            initial="visible"
            animate={isMenuOpen ? 'hidden' : 'visible'}
            style={{ pointerEvents: isMenuOpen ? 'none' : 'auto' }}
          >
            <img
              src="/artboard-1.svg"
              alt="Adnan Akif"
              className="h-5 w-28 object-contain"
            />
          </motion.div>

          {/* Mobile Template control opens the full-screen menu */}
          <div className="flex items-center flex-shrink-0 ml-auto z-[80]">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-template-menu"
              className="lg:hidden text-[16px] font-medium uppercase tracking-tight"
            >
              Template
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Full Screen Menu — Slide Down */}
      <AnimatePresence>
        {isMounted && isMenuOpen && (
          <>
            {/* Menu background — single layer slide down */}
            <motion.div
              className="fixed inset-0 z-[60] bg-background"
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            />

            {/* Content layer — 3 Column Grid Layout */}
            <motion.div
              id="mobile-template-menu"
              className="fixed inset-0 z-[61] flex items-stretch"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.25 }}
            >
              {/* Mobile/Tablet Single Column — Stacked with Dividers */}
              <div className="lg:hidden flex flex-col w-full h-full">
                

                {/* Middle — Nav + Social Links */}
                <div className="flex-1 flex flex-col justify-center pt-12 pb-8 px-4">
                  {/* Navigation Items — Top, Left-Aligned. Tighter negative space on mobile. */}
                  <div className="flex flex-col items-start justify-start -space-y-13 relative">
                    {navLinks.map((link, index) => {
                      const isActive =
                        (link === 'Home'     && pathname === '/')         ||
                        (link === 'Work'     && pathname === '/work')     ||
                        (link === 'About'    && pathname === '/about')     ||
                        (link === 'Design News' && pathname === '/design-news') ||
                        (link === 'Premium Store' && pathname === '/store')
                      return (
                        <MobileNavItem
                          key={link}
                          label={link}
                          isActive={isActive}
                          enterDelay={0.28 + index * 0.09}
                          exitDelay={(navLinks.length - 1 - index) * 0.09}
                          isMenuOpen={isMenuOpen}
                          onClick={() => {
                            setIsMenuOpen(false)
                            handleNavClick(link)
                          }}
                        />
                      )
                    })}
                  </div>

                  {/* Social Links — minimum gap from nav above on mobile */}
                  <div className="flex flex-row items-center gap-3 flex-wrap mt-6">
                    {socialLinks.map((social, index) => (
                      <SocialLinkWithAnimation
                        key={social.name}
                        social={social}
                        index={index}
                        enterDelay={0.28 + navLinks.length * 0.09 + index * 0.08}
                        exitDelay={(socialLinks.length - 1 - index) * 0.08}
                        isMenuOpen={isMenuOpen}
                        onClose={() => setIsMenuOpen(false)}
                      />
                    ))}
                  </div>
                </div>

              </div>

              {/* Desktop Menu — one full-width container with left-aligned navigation and social links */}
              <div className="hidden lg:flex inset-0 w-full items-stretch">
                <div className="flex w-full flex-col justify-between pt-16 pb-8 px-6">
                  <div className="flex flex-col items-start justify-start -space-y-6 lg:scale-110 lg:origin-top-left">
                    {navLinks.map((link, index) => {
                      const isActive =
                        (link === 'Home' && pathname === '/') ||
                        (link === 'Work' && pathname === '/work') ||
                        (link === 'Design News' && pathname === '/design-news') ||
                        (link === 'Features' && pathname === '/features') ||
                        (link === 'Job' && pathname === '/job') ||
                        (link === 'Premium Store' && pathname === '/store') ||
                        (link === 'About' && pathname === '/about')
                      return (
                        <MobileNavItem
                          key={link}
                          label={link}
                          isActive={isActive}
                          enterDelay={0.28 + index * 0.09}
                          exitDelay={(navLinks.length - 1 - index) * 0.09}
                          isMenuOpen={isMenuOpen}
                          onClick={() => {
                            setIsMenuOpen(false)
                            handleNavClick(link)
                          }}
                        />
                      )
                    })}
                  </div>

                  <div className="flex flex-row items-center gap-3 flex-nowrap">
                    {socialLinks.map((social, index) => (
                      <SocialLinkWithAnimation
                        key={social.name}
                        social={social}
                        index={index}
                        enterDelay={0.28 + navLinks.length * 0.09 + index * 0.08}
                        exitDelay={(socialLinks.length - 1 - index) * 0.08}
                        isMenuOpen={isMenuOpen}
                        onClose={() => setIsMenuOpen(false)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
