'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

// Footer nav/social link — same hover behaviour as the header's desktop nav:
// current text slides up and out while a letter-by-letter staggered
// duplicate slides up into view underneath.
function FooterNavItem({ label, href = '#', external = false }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="font-medium text-[14px] md:text-[16px] lg:text-[20px] leading-tight overflow-hidden h-[18px] md:h-[20px] lg:h-[24px] relative block w-fit"
    >
      <motion.div
        animate={{ y: isHovered ? '-50%' : '0%' }}
        transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Primary text */}
        <div className="h-[18px] md:h-[20px] lg:h-[24px] flex items-center whitespace-nowrap">
          {label}
        </div>

        {/* Secondary text — letters stagger in on hover */}
        <div className="h-[18px] md:h-[20px] lg:h-[24px] flex items-center whitespace-nowrap">
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
    </a>
  )
}

export default function FooterSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isValidEmail || loading) return

    setLoading(true)
    setError(false)

    try {
      const res = await fetch('https://formspree.io/f/xnpanjna', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setSubmitted(true)
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer className="relative w-full bg-background overflow-hidden">
      {/* Heading */}
      <div className="hidden md:block px-4 lg:px-8 pt-10 md:pt-14 lg:py-8">
        <h2 className="text-foreground font-medium uppercase tracking-tighter leading-[0.9] text-[64px] md:text-[100px] lg:text-[120px]">
          Let&rsquo;s start
        </h2>
      </div>

      {/* Grid Section — Nav / Social / Address / Newsletter, 50/50 split, no gap */}
      <div className="px-4 lg:px-8 pt-6 md:pt-10 lg:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Left: Nav / Social / Address / Newsletter with top & bottom dividers */}
          <div className="hidden md:flex flex-col border-t-2 border-b-2 border-solid border-foreground min-h-[420px] md:min-h-[560px]">
            <div className="flex-1 flex items-center border-b-2 border-solid border-foreground px-1">
              <span className="font-medium text-[14px] md:text-[16px] lg:text-[20px] text-foreground">Nav</span>
            </div>
            <div className="flex-1 flex items-center border-b-2 border-solid border-foreground px-1">
              <span className="font-medium text-[14px] md:text-[16px] lg:text-[20px] text-foreground">Social</span>
            </div>
            <div className="flex-1 flex items-center border-b-2 border-solid border-foreground px-1">
              <span className="font-medium text-[14px] md:text-[16px] lg:text-[20px] text-foreground">Address</span>
            </div>
            <div className="flex-1 flex items-center px-1">
              <span className="font-medium text-[14px] md:text-[16px] lg:text-[20px] text-foreground">Newsletter</span>
            </div>
          </div>

          {/* Right: same 4-row divider structure as left, content instead of labels */}
          <div className="flex flex-col border-t-2 border-b-2 border-solid border-foreground min-h-[420px] md:min-h-[560px]">
            <div className="flex-1 flex flex-col justify-center gap-1 border-b-2 border-solid border-foreground px-1 py-2">
              <FooterNavItem label="Work" href="/work" />
              <FooterNavItem label="Contact" href="https://cal.com/adnanakif/30-min-meeting" />
            </div>

            <div className="flex-1 flex flex-col justify-center gap-1 border-b-2 border-solid border-foreground px-1 py-2">
              <FooterNavItem label="Twitter" href="https://x.com/adnaanakif" external />
              <FooterNavItem label="Instagram" href="https://www.instagram.com/adnaanakif/" external />
            </div>

            <div className="flex-1 flex flex-col justify-center border-b-2 border-solid border-foreground px-1 py-2">
              <span className="font-medium text-[14px] md:text-[16px] lg:text-[20px] leading-tight text-foreground">Based in Bangladesh</span>
              <span className="font-medium text-[14px] md:text-[16px] lg:text-[20px] leading-tight text-foreground">Working World-Wide</span>
            </div>

            <div className="flex-1 flex flex-col justify-center px-1 py-2">
              {!submitted ? (
                <form onSubmit={handleSubmit}>
                  <div className="flex items-center justify-between border border-foreground px-4 md:px-5 py-3 md:py-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      disabled={loading}
                      className="bg-transparent text-foreground placeholder-foreground font-medium text-[14px] md:text-[16px] lg:text-[20px] outline-none flex-1 disabled:opacity-60"
                    />
                    <button
                      type="submit"
                      disabled={!isValidEmail || loading}
                      className={`font-medium text-[14px] md:text-[16px] lg:text-[20px] transition-opacity ${
                        isValidEmail && !loading
                          ? 'text-foreground hover:opacity-70 cursor-pointer'
                          : 'text-foreground/40 cursor-not-allowed'
                      }`}
                    >
                      {loading ? '...' : 'enter'}
                    </button>
                  </div>
                  {error && (
                    <span className="text-foreground/70 text-[12px] md:text-[13px] mt-1 block">
                      Something went wrong. Please try again.
                    </span>
                  )}
                </form>
              ) : (
                <div className="border border-foreground px-4 md:px-5 py-3 md:py-3">
                  <span className="text-foreground font-medium text-[14px] md:text-[16px] lg:text-[20px]">
                    Thanks — you're subscribed.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SVG Logo Section */}
      <div className="px-4 lg:px-8 py-10 md:py-14 lg:py-8">
        <svg
          viewBox="0 0 2034 394"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto text-foreground"
          role="img"
          aria-label="Lozinr"
        >
          <path fill="currentColor" d="M1090.1 0.000976562V394H1176.74V0.000976562H1090.1Z" />
          <path fill="currentColor" d="M476.614 0.000976562C374.365 0.000976562 291.47 88.1925 291.47 197C291.47 305.794 374.365 394 476.614 394C578.848 394 661.743 305.794 661.743 197C661.743 88.1925 578.848 0.000976562 476.614 0.000976562ZM476.614 317.593C414.016 317.593 363.287 263.605 363.287 197C363.287 130.396 414.016 76.4077 476.614 76.4077C539.197 76.4077 589.94 130.396 589.94 197C589.94 263.605 539.197 317.593 476.614 317.593Z" />
          <path fill="currentColor" d="M1285.71 105.016L1330.09 394H1232.17V0.000976562H1325.85L1526.54 289.235L1482.19 0.000976562H1580.11V394H1486.42L1285.71 105.016Z" />
          <path fill="currentColor" d="M910.093 39.0501L688.347 90.3292V0.000976562H1034.67L808.778 354.743L1034.67 303.671V394H688.347L910.093 39.0501Z" />
          <path fill="currentColor" d="M0 0.000976562H90.3271L76.3998 354.95L278.67 303.671V394H0V0.000976562Z" />
          <path fill="currentColor" d="M1875.43 235.37H1883.28C1915.78 235.37 1945.2 222.203 1966.51 200.896C1987.8 179.603 2000.97 150.186 2000.97 117.685C2000.97 52.6841 1948.28 0 1883.28 0H1635.54V394H1725.51V209.643L1751.05 235.37L1908.49 393.939H2034L1875.43 235.37ZM1725.51 174.561V69.5268H1855.2C1884.21 69.5268 1907.72 93.0365 1907.72 122.044C1907.72 136.548 1901.84 149.669 1892.34 159.177C1882.83 168.684 1869.71 174.561 1855.2 174.561H1725.51Z" />
        </svg>
      </div>
    </footer>
  )
}
