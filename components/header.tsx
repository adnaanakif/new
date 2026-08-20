'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

const CONTACT_LINK = 'https://cal.com/adnanakif/30-min-meeting'
const TEMPLATE_LINK = '#'

// Nav item (Work, About, Contact) — hover: text slides up and out while a
// letter-by-letter staggered duplicate slides up into view underneath.
// Fixed 16px across all breakpoints.
function NavTextItem({
  label,
  onClick,
  href,
  external = false,
}: {
  label: string
  onClick?: () => void
  href?: string
  external?: boolean
}) {
  const [isHovered, setIsHovered] = useState(false)

  const content = (
    <div className="overflow-hidden h-5 relative">
      <motion.div
        animate={{ y: isHovered ? -20 : 0 }}
        transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Primary text */}
        <div className="h-5 flex items-center whitespace-nowrap">
          {label}
        </div>

        {/* Secondary text — letters stagger in on hover */}
        <div className="h-5 flex items-center whitespace-nowrap">
          {label.split('').map((char, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0, y: 8 }}
              animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ delay: isHovered ? i * 0.025 : 0, duration: 0.4, ease: 'easeOut' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  )

  const sharedProps = {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    className: 'text-[16px] font-medium uppercase tracking-tight px-2 flex items-center overflow-hidden',
  }

  if (href) {
    return (
      <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} {...sharedProps}>
        {content}
      </a>
    )
  }

  return (
    <button onClick={onClick} {...sharedProps}>
      {content}
    </button>
  )
}

// Simple mobile nav link (stacked in dropdown) — no letter-stagger, just clean fade/slide.
function MobileNavLink({
  label,
  onClick,
  href,
  external = false,
}: {
  label: string
  onClick?: () => void
  href?: string
  external?: boolean
}) {
  const className =
    'text-[16px] font-medium uppercase tracking-tight py-3 border-b border-foreground/10 last:border-b-0 block w-full text-left'

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={className}
        onClick={onClick}
      >
        {label}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={className}>
      {label}
    </button>
  )
}

const LogoSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 515.07 507.4" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="515.07" height="507.4" fill="#fff" />
    <g fill="#111">
      <path d="M515.07.06v257.75h-.15l-.05,133.57c-7.87,1.72-15.55,1.84-23.11,1.14-15.29-1.43-29.61-3.43-44.96-5.75-41.62-6.31-82.58-11.38-124.58-14.76-14.37-1.17-27.61-1.07-41.71-.5-13.21,1.22-25.89,3.1-38.31,7.64-13.65,4.42-24.27,12.5-35.17,22.3l64.05-143.63h-.1l92.02-215.87-35.71,25.74c-17.6,10.48-35.27,18.28-54.59,24.17-47.05,14.16-94.07,8.99-141.76-.47l-56.85-11.25c-15.96-2.97-31.25-5.41-47.38-7.15-9.18-.5-17.8-.75-26.74.83V0l515.07.06Z" />
      <path d="M515.07,433.58v73.82L.02,507.35l-.02-257.76h.15l.07-133.58c7.87-1.71,15.54-1.82,23.1-1.12,15.29,1.41,29.63,3.41,44.96,5.74,41.62,6.32,82.58,11.39,124.59,14.77,14.35,1.15,27.6,1.06,41.69.49,13.21-1.2,25.89-3.09,38.31-7.62,13.65-4.42,24.28-12.51,35.17-22.32l-64.05,143.64h.11l-92.02,215.87,35.69-25.76c17.62-10.48,35.27-18.27,54.59-24.15,47.05-14.16,94.07-9,141.76.46l56.85,11.26c15.96,2.96,31.25,5.4,47.38,7.14,9.18.5,17.8.76,26.74-.83Z" />
    </g>
  </svg>
)

export default function Header({ preloaderDone }: { preloaderDone?: boolean } = {}) {
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const handleNavClick = (link: string) => {
    setIsMenuOpen(false)
    if (link === 'Work') router.push('/work')
    else if (link === 'About') router.push('/about')
    else if (link === 'Contact') window.open(CONTACT_LINK, '_blank', 'noopener,noreferrer')
  }

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-[100] w-full text-foreground"
      initial={{ y: -80, opacity: 0, filter: 'blur(6px)' }}
      animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
    >
      {/* Background — always visible, translucent + blurred, no scroll-trigger */}
      <div className="absolute inset-0 bg-background/90 backdrop-blur-md border-b border-foreground/10" />

      <div className="relative z-10 flex items-center justify-between h-12 lg:h-14 px-3 lg:px-6 w-full">

        {/* Mobile: logo left */}
        <div
          className="lg:hidden flex-shrink-0 cursor-pointer h-4 w-auto"
          onClick={() => {
            setIsMenuOpen(false)
            router.push('/')
          }}
        >
          <LogoSvg className="h-full w-auto" />
        </div>

        {/* Desktop: nav left */}
        <div className="hidden lg:flex items-center gap-0 flex-1">
          <NavTextItem label="Work," onClick={() => handleNavClick('Work')} />
          <NavTextItem label="About," onClick={() => handleNavClick('About')} />
          <NavTextItem label="Contact," onClick={() => handleNavClick('Contact')} />
        </div>

        {/* Desktop: logo centered absolute */}
        <div
          className="hidden lg:flex absolute left-1/2 -translate-x-1/2 cursor-pointer h-4 w-auto"
          onClick={() => router.push('/')}
        >
          <LogoSvg className="h-full w-auto" />
        </div>

        {/* Desktop: Template link right */}
        <div className="hidden lg:flex items-center justify-end flex-1">
          <NavTextItem label="Template" href={TEMPLATE_LINK} external />
        </div>

        {/* Mobile: Template link + hamburger */}
        <div className="flex lg:hidden items-center gap-3 flex-shrink-0">
          <NavTextItem label="Template" href={TEMPLATE_LINK} external />

          <button
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="relative w-6 h-5 flex flex-col justify-between items-end"
          >
            <motion.span
              className="block h-[1.5px] bg-foreground rounded-full"
              animate={{
                width: isMenuOpen ? '20px' : '24px',
                rotate: isMenuOpen ? 45 : 0,
                y: isMenuOpen ? 8.5 : 0,
              }}
              transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
            />
            <motion.span
              className="block h-[1.5px] bg-foreground rounded-full"
              animate={{
                width: '24px',
                opacity: isMenuOpen ? 0 : 1,
              }}
              transition={{ duration: 0.25 }}
            />
            <motion.span
              className="block h-[1.5px] bg-foreground rounded-full"
              animate={{
                width: isMenuOpen ? '20px' : '16px',
                rotate: isMenuOpen ? -45 : 0,
                y: isMenuOpen ? -8.5 : 0,
              }}
              transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
            />
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu — Work / About / Contact */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="lg:hidden relative z-10 overflow-hidden bg-background/95 backdrop-blur-md border-b border-foreground/10"
          >
            <div className="px-3 py-1">
              <MobileNavLink label="Work" onClick={() => handleNavClick('Work')} />
              <MobileNavLink label="About" onClick={() => handleNavClick('About')} />
              <MobileNavLink label="Contact" onClick={() => handleNavClick('Contact')} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}