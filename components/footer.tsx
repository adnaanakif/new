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
      <div className="px-4 lg:px-8 pt-10 md:pt-14 lg:py-8">
        <h2 className="text-foreground font-medium uppercase tracking-tighter leading-[0.9] text-[64px] md:text-[100px] lg:text-[120px]">
          Let&rsquo;s start
        </h2>
      </div>

      {/* Grid Section — Nav / Social / Address / Newsletter, 50/50 split, no gap */}
      <div className="px-4 lg:px-8 pt-6 md:pt-10 lg:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Left: Nav / Social / Address / Newsletter with top & bottom dividers */}
          <div className="flex flex-col border-t-2 border-b-2 border-solid border-foreground min-h-[420px] md:min-h-[560px]">
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

          {/* Right: single tall image with all overlay content stacked */}
          <div className="relative min-h-[420px] md:min-h-[560px] overflow-hidden bg-neutral-800">
            <img
              src="#"
              alt="Working"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black" />

            {/* Overlay content — stacked to align with the 4 left rows */}
            <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-6 text-background">
              <div className="flex flex-col gap-1">
                <FooterNavItem label="Work" href="/work" />
                <FooterNavItem label="Contact" href="https://cal.com/adnanakif/30-min-meeting" />
              </div>

              <div className="flex flex-col gap-1">
                <FooterNavItem label="Linkedin" href="#" external />
                <FooterNavItem label="Instagram" href="https://www.instagram.com/adnaanakif/" external />
              </div>

              <div className="flex flex-col">
                <span className="font-medium text-[14px] md:text-[16px] lg:text-[20px] leading-tight">Based in Bangladesh</span>
                <span className="font-medium text-[14px] md:text-[16px] lg:text-[20px] leading-tight">Working World-Wide</span>
              </div>

              <div className="flex flex-col gap-1">
                {!submitted ? (
                  <form onSubmit={handleSubmit}>
                    <div className="flex items-center justify-between border border-background px-4 md:px-5 py-3 md:py-3">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        disabled={loading}
                        className="bg-transparent text-background placeholder-background font-medium text-[14px] md:text-[16px] lg:text-[20px] outline-none flex-1 disabled:opacity-60"
                      />
                      <button
                        type="submit"
                        disabled={!isValidEmail || loading}
                        className={`font-medium text-[14px] md:text-[16px] lg:text-[20px] transition-opacity ${
                          isValidEmail && !loading
                            ? 'text-background hover:opacity-70 cursor-pointer'
                            : 'text-background/40 cursor-not-allowed'
                        }`}
                      >
                        {loading ? '...' : 'enter'}
                      </button>
                    </div>
                    {error && (
                      <span className="text-background/70 text-[12px] md:text-[13px] mt-1 block">
                        Something went wrong. Please try again.
                      </span>
                    )}
                  </form>
                ) : (
                  <div className="border border-background px-4 md:px-5 py-3 md:py-3">
                    <span className="text-accent font-medium text-[14px] md:text-[16px] lg:text-[20px]">
                      Thanks — you're subscribed.
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SVG Logo Section */}
      <div className="px-4 lg:px-8 py-10 md:py-14 lg:py-8">
        <svg
          viewBox="0 0 857.41 179"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto text-foreground"
        >
          <path
            fill="currentColor"
            d="M41.8,1.84v142.91h85.45v32.41H3.25V1.84h38.55Z"
          />
          <path
            fill="currentColor"
            d="M135.8,55.78c3.74-10.67,9.11-19.98,16.12-27.92,7.01-7.95,15.62-14.17,25.82-18.69,10.2-4.52,21.69-6.78,34.47-6.78s24.46,2.26,34.58,6.78c10.12,4.52,18.69,10.75,25.7,18.69,7.01,7.94,12.38,17.25,16.12,27.92,3.74,10.67,5.61,22.24,5.61,34.7s-1.87,23.48-5.61,34c-3.74,10.52-9.11,19.67-16.12,27.46-7.01,7.79-15.58,13.9-25.7,18.34-10.13,4.44-21.65,6.66-34.58,6.66s-24.27-2.22-34.47-6.66c-10.2-4.44-18.81-10.55-25.82-18.34-7.01-7.79-12.38-16.94-16.12-27.46-3.74-10.52-5.61-21.85-5.61-34s1.87-24.03,5.61-34.7ZM169.33,110.93c1.64,6.62,4.24,12.58,7.83,17.88,3.58,5.3,8.26,9.54,14.02,12.73,5.76,3.19,12.77,4.79,21.03,4.79s15.27-1.6,21.03-4.79c5.76-3.19,10.43-7.44,14.02-12.73,3.58-5.29,6.19-11.25,7.83-17.88,1.64-6.62,2.45-13.44,2.45-20.45s-.82-14.41-2.45-21.26c-1.64-6.85-4.25-12.97-7.83-18.34-3.59-5.37-8.26-9.66-14.02-12.85-5.77-3.19-12.78-4.79-21.03-4.79s-15.27,1.6-21.03,4.79c-5.77,3.19-10.44,7.48-14.02,12.85-3.59,5.37-6.19,11.49-7.83,18.34-1.64,6.86-2.45,13.94-2.45,21.26s.82,13.83,2.45,20.45Z"
          />
          <path
            fill="currentColor"
            d="M392.2,34.25h-86.68V1.84h138v30.45l-94.05,112.46h96.5v32.41h-147.82v-30.45l94.04-112.46Z"
          />
          <path
            fill="currentColor"
            d="M508.63,1.84v175.32h-38.55V1.84h38.55Z"
          />
          <path
            fill="currentColor"
            d="M571.05,1.84l73.17,117.62h.49V1.84h36.1v175.32h-38.55l-72.93-117.37h-.49v117.37h-36.1V1.84h38.31Z"
          />
          <path
            fill="currentColor"
            d="M799.46,1.84c7.86,0,14.94,1.27,21.24,3.81,6.3,2.54,11.7,6.02,16.21,10.44,4.5,4.42,7.94,9.54,10.31,15.35,2.37,5.81,3.56,12.07,3.56,18.78,0,10.31-2.17,19.24-6.51,26.76-4.34,7.53-11.42,13.26-21.24,17.19v.49c4.75,1.31,8.67,3.31,11.79,6.02,3.11,2.7,5.65,5.89,7.61,9.58,1.96,3.68,3.4,7.73,4.3,12.15.9,4.42,1.51,8.84,1.84,13.26.16,2.79.33,6.06.49,9.82.16,3.77.45,7.61.86,11.54.41,3.93,1.06,7.65,1.96,11.17.9,3.52,2.25,6.51,4.05,8.96h-38.55c-2.13-5.56-3.44-12.19-3.93-19.89-.49-7.69-1.23-15.06-2.21-22.1-1.31-9.17-4.09-15.88-8.35-20.13-4.26-4.26-11.22-6.38-20.87-6.38h-38.55v68.51h-38.55V1.84h94.54ZM785.71,81.15c8.84,0,15.47-1.96,19.89-5.89,4.42-3.93,6.63-10.31,6.63-19.15s-2.21-14.69-6.63-18.54c-4.42-3.84-11.05-5.77-19.89-5.77h-42.23v49.36h42.23Z"
          />
        </svg>
      </div>
    </footer>
  )
}
