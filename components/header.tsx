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
      className="text-[18px] font-medium uppercase tracking-tight h-full px-2 flex items-center overflow-hidden"
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
  const [passwordInput, setPasswordInput] = useState('')
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLocked, setIsLocked] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPastHero, setIsPastHero] = useState(false)
  const lastScrollYRef = useRef(0)

  useEffect(() => {
    setIsMounted(true)
    fetch('/api/client-auth')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) setIsPasswordCorrect(true)
      })
      .catch(() => {})
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

  const rightNavLinks = [
    { name: 'Invoice', path: '/invoice' },
    { name: 'Contract', path: '/contract' },
    { name: 'Brand Strategy', path: '/brand-strategy' },
    { name: 'Brand Questionnaire', path: '/brand-questionnaire' },
    { name: 'Brand Guidelines', path: '/brand-guidelines' },
    { name: 'Proposal', path: '/proposal' },
    { name: 'Client Portal', path: '/client-portal' },
  ]

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

  const handleRightNavClick = (path: string) => {
    router.push(path)
  }

  const handlePasswordSubmit = async () => {
    if (isLocked || isSubmitting) return

    setIsSubmitting(true)
    try {
      const res = await fetch('/api/client-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput }),
      })
      const data = await res.json()
      console.log("[v0] Password response:", { status: res.status, data })

      setPasswordInput('')

      if (data.success) {
        setIsPasswordCorrect(true)
        setPasswordError(false)
        setErrorMessage('')
        return
      }

      setPasswordError(true)
      setErrorMessage(data.message || 'Incorrect password.')

      if (data.locked) {
        setIsLocked(true)
      } else {
        setTimeout(() => setPasswordError(false), 2000)
      }
    } catch (error) {
      console.error("[v0] Password error:", error)
      setPasswordInput('')
      setPasswordError(true)
      setErrorMessage('Connection error. Try again.')
      setTimeout(() => setPasswordError(false), 2000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePasswordKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLocked) {
      handlePasswordSubmit()
    }
  }

  // Mobile logo and hamburger colors — background-colored over the hero
  // (transparent header), foreground-colored once we've scrolled past it.
  // When the menu is open, the hamburger (now an X) sits on the solid
  // full-screen menu bg, so it stays foreground-colored regardless of scroll.
  const hamburgerColor = isMenuOpen || isPastHero ? 'bg-foreground' : 'bg-background'

  return (
    <>
      {/* Fixed Navbar — the bar itself never moves anymore. Only its inner
          content (logo/nav/store icon) fades out smoothly; the hamburger
          stays put and simply morphs into an X. */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-[100] w-full transition-colors duration-300 ${isPastHero ? 'text-foreground' : 'text-background'}`}
        initial={{ y: -80, opacity: 0, filter: 'blur(6px)' }}
        animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      >
      {/* Translucent background layer — transparent over the hero, fades in
          once we've scrolled past it so the page stays subtly visible beneath. */}
      <motion.div
        className="absolute inset-0 bg-background/80 backdrop-blur-md pointer-events-none"
        initial={false}
        animate={{ opacity: isPastHero ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />

        <div className="relative z-10 flex items-center justify-between gap-4 py-3 px-3 lg:px-6 lg:py-4 w-full">

          {/* Content that fades/hides together as a staggered group */}
          <motion.div
            className="flex items-center gap-6 flex-shrink-0"
            variants={contentGroupVariants}
            initial="visible"
            animate={isMenuOpen ? 'hidden' : 'visible'}
          >
            {/* Logo SVG */}
            <motion.div
              variants={contentItemVariants}
              className="lg:hidden flex-shrink-0 cursor-pointer h-6 w-auto"
              onClick={() => router.push('/')}
              style={{ pointerEvents: isMenuOpen ? 'none' : 'auto' }}
            >
              <svg
  viewBox="0 0 515.07 507.4"
  xmlns="http://www.w3.org/2000/svg"
  className="h-full w-auto"
>
  <rect width="515.07" height="507.4" fill="#fff" />
  <g fill="#111">
    <path d="M515.07.06v257.75h-.15l-.05,133.57c-7.87,1.72-15.55,1.84-23.11,1.14-15.29-1.43-29.61-3.43-44.96-5.75-41.62-6.31-82.58-11.38-124.58-14.76-14.37-1.17-27.61-1.07-41.71-.5-13.21,1.22-25.89,3.1-38.31,7.64-13.65,4.42-24.27,12.5-35.17,22.3l64.05-143.63h-.1l92.02-215.87-35.71,25.74c-17.6,10.48-35.27,18.28-54.59,24.17-47.05,14.16-94.07,8.99-141.76-.47l-56.85-11.25c-15.96-2.97-31.25-5.41-47.38-7.15-9.18-.5-17.8-.75-26.74.83V0l515.07.06Z" />
    <path d="M515.07,433.58v73.82L.02,507.35l-.02-257.76h.15l.07-133.58c7.87-1.71,15.54-1.82,23.1-1.12,15.29,1.41,29.63,3.41,44.96,5.74,41.62,6.32,82.58,11.39,124.59,14.77,14.35,1.15,27.6,1.06,41.69.49,13.21-1.2,25.89-3.09,38.31-7.62,13.65-4.42,24.28-12.51,35.17-22.32l-64.05,143.64h.11l-92.02,215.87,35.69-25.76c17.62-10.48,35.27-18.27,54.59-24.15,47.05-14.16,94.07-9,141.76.46l56.85,11.26c15.96,2.96,31.25,5.4,47.38,7.14,9.18.5,17.8.76,26.74-.83Z" />
  </g>
</svg>
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

          {/* Right: Cart Icon + Hamburger (moved to right side with hamburger) */}

          {/* Center: Logo SVG (Desktop/LG Only) */}
          <motion.div
            className="hidden lg:block absolute left-1/2 -translate-x-1/2 flex-shrink-0 cursor-pointer z-[80]"
            onClick={() => router.push('/')}
            variants={contentItemVariants}
            initial="visible"
            animate={isMenuOpen ? 'hidden' : 'visible'}
            style={{ pointerEvents: isMenuOpen ? 'none' : 'auto' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 515.07 507.4"
              className={`h-10 w-auto transition-colors duration-300 ${isPastHero ? 'text-foreground' : 'text-background'}`}
              aria-label="Adnan Akif"
              role="img"
            >
              <path
                fill="currentColor"
                d="M515.07,257.82v175.76c-8.94,1.59-17.55,1.33-26.73.83-16.13-1.74-31.42-4.18-47.38-7.13l-56.85-11.27c-47.69-9.46-94.71-14.61-141.76-.45-19.33,5.88-36.98,13.67-54.6,24.15l-35.69,25.76,92.03-215.87h-.12l64.06-143.64c-10.89,9.8-21.52,17.89-35.18,22.31-12.41,4.53-25.09,6.42-38.3,7.62-14.09.57-27.34.67-41.69-.48-42.02-3.39-82.97-8.46-124.6-14.78-15.32-2.32-29.66-4.32-44.95-5.74-7.56-.69-15.23-.58-23.1,1.13l-.06,133.58H0V73.82c8.94-1.57,17.55-1.33,26.74-.83,16.12,1.74,31.41,4.18,47.37,7.16l56.86,11.24c47.68,9.46,94.7,14.63,141.75.47,19.33-5.88,37-13.68,54.6-24.16l35.71-25.75-92.03,215.87h.1l-64.05,143.63c10.9-9.8,21.52-17.88,35.17-22.3,12.42-4.53,25.09-6.42,38.31-7.64,14.09-.57,27.33-.66,41.7.51,42,3.38,82.96,8.45,124.58,14.75,15.34,2.33,29.66,4.33,44.96,5.76,7.55.7,15.24.58,23.11-1.14l.05-133.57h.14Z"
              />
            </svg>
          </motion.div>

          {/* Right: Hamburger */}
          <div className="flex items-center gap-4 flex-shrink-0 ml-auto z-[80]">
            {/* Hamburger — stays in place, always clickable, just morphs to X */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex flex-col gap-1 cursor-pointer w-10 h-10 justify-center items-center flex-shrink-0 z-[100]"
            >
              <motion.span
                className={`w-9 h-0.5 ${hamburgerColor} rounded-full origin-center transition-colors duration-300`}
                animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
              />
              <motion.span
                className={`w-9 h-0.5 ${hamburgerColor} rounded-full origin-center transition-colors duration-300`}
                animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
              />
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

                {/* Bottom — Password Protected Right Navigation Links */}
                <div className="flex-1 flex flex-col justify-start pt-8 px-4">
                  {isPasswordCorrect ? (
                    // Right Navigation Links (shown after password)
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex flex-col items-start justify-start -space-y-13"
                    >
                      {rightNavLinks.map((link, index) => {
                        const isActive = pathname === link.path
                        return (
                          <RightNavItem
                            key={link.name}
                            label={link.name}
                            isActive={isActive}
                            enterDelay={0.28 + (navLinks.length + socialLinks.length) * 0.09 + index * 0.09}
                            exitDelay={(rightNavLinks.length - 1 - index) * 0.09}
                            isMenuOpen={isMenuOpen}
                            onClick={() => {
                              setIsMenuOpen(false)
                              handleRightNavClick(link.path)
                            }}
                          />
                        )
                      })}
                    </motion.div>
                  ) : (
                    // Password Input
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="min-w-0 flex-shrink-0"
                    >
                      <div className={`border-1 flex items-center justify-between gap-4 px-4 py-3 transition-all ${passwordError ? 'border-red-500 bg-red-500 bg-opacity-5' : 'border-foreground'}`}>
                        <input
                          type="password"
                          placeholder="PASSWORD"
                          value={passwordInput}
                          onChange={(e) => setPasswordInput(e.target.value)}
                          onKeyDown={handlePasswordKeyDown}
                          disabled={isLocked}
                          className={`bg-transparent outline-none min-w-0 text-sm uppercase tracking-tight placeholder-foreground placeholder-opacity-50 disabled:opacity-50 ${passwordError ? 'text-red-500' : ''}`}
                        />
                        <button
                          onClick={handlePasswordSubmit}
                          disabled={isLocked}
                          className={`text-xs uppercase tracking-wide font-medium flex-shrink-0 transition-all ${isLocked ? 'opacity-30 cursor-not-allowed' : 'text-foreground opacity-60 hover:opacity-100'} ${passwordError ? 'text-red-500' : ''}`}
                        >
                          {isLocked ? 'Locked' : 'ENTER'}
                        </button>
                      </div>
                      {(isLocked || (passwordError && errorMessage)) && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-xs text-red-500 mt-2 uppercase tracking-wide"
                        >
                          {errorMessage}
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Desktop 2-Column Layout (LG and above) */}
              <div className="hidden lg:flex inset-0 w-full items-stretch">
                {/* Left Column — Navigation */}
                <div className="flex-1 flex flex-col justify-between pt-16 pb-8 px-6">
                  {/* Navigation Items — Top, Left-Aligned */}
                  <div className="flex flex-col items-start justify-start -space-y-6">
                    {navLinks.map((link, index) => {
                      const isActive =
                        (link === 'Home'     && pathname === '/')         ||
                        (link === 'Work'     && pathname === '/work')     ||
                        (link === 'Design News' && pathname === '/design-news') ||
                        (link === 'Features' && pathname === '/features') ||
                        (link === 'Job'      && pathname === '/job')      ||
                        (link === 'Premium Store' && pathname === '/store') ||
                        (link === 'About'    && pathname === '/about')
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

                  {/* Social Links — Bottom, Single Row */}
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

                {/* Right Column — Password Protected Right Navigation */}
                <div className="flex-1 flex flex-col justify-between pt-16 pb-8 px-6">
                  {isPasswordCorrect ? (
                    // Right Navigation Items (shown after password)
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex flex-col items-start justify-start -space-y-6"
                    >
                      {rightNavLinks.map((link, index) => {
                        const isActive = pathname === link.path
                        return (
                          <RightNavItem
                            key={link.name}
                            label={link.name}
                            isActive={isActive}
                            enterDelay={0.28 + index * 0.09}
                            exitDelay={(rightNavLinks.length - 1 - index) * 0.09}
                            isMenuOpen={isMenuOpen}
                            onClick={() => {
                              setIsMenuOpen(false)
                              handleRightNavClick(link.path)
                            }}
                          />
                        )
                      })}
                    </motion.div>
                  ) : (
                    // Empty Space
                    <div />
                  )}

                  {/* Password Input for Desktop — At Bottom */}
                  {!isPasswordCorrect && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="min-w-0 flex-shrink-0"
                    >
                      <div className={`border-1 flex items-center justify-between gap-4 px-4 py-3 transition-all ${passwordError ? 'border-red-500 bg-red-500 bg-opacity-5' : 'border-foreground'}`}>
                        <input
                          type="password"
                          placeholder="PASSWORD"
                          value={passwordInput}
                          onChange={(e) => setPasswordInput(e.target.value)}
                          onKeyDown={handlePasswordKeyDown}
                          disabled={isLocked}
                          className={`bg-transparent outline-none min-w-0 text-sm uppercase tracking-tight placeholder-foreground placeholder-opacity-50 disabled:opacity-50 ${passwordError ? 'text-red-500' : ''}`}
                        />
                        <button
                          onClick={handlePasswordSubmit}
                          disabled={isLocked}
                          className={`text-xs uppercase tracking-wide font-medium flex-shrink-0 transition-all ${isLocked ? 'opacity-30 cursor-not-allowed' : 'text-foreground opacity-60 hover:opacity-100'} ${passwordError ? 'text-red-500' : ''}`}
                        >
                          {isLocked ? 'Locked' : 'ENTER'}
                        </button>
                      </div>
                      {(isLocked || (passwordError && errorMessage)) && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-xs text-red-500 mt-2 uppercase tracking-wide"
                        >
                          {errorMessage}
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
