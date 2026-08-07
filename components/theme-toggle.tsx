'use client'

import { useEffect, useState, useRef } from 'react'
import { Sun } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [mounted, setMounted] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('lozinr-theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const shouldBeDark = savedTheme ? savedTheme === 'dark' : prefersDark
    setIsDark(shouldBeDark)
    applyTheme(shouldBeDark)
  }, [])

  const applyTheme = (dark: boolean) => {
    const html = document.documentElement
    if (dark) {
      html.classList.add('dark')
      localStorage.setItem('lozinr-theme', 'dark')
    } else {
      html.classList.remove('dark')
      localStorage.setItem('lozinr-theme', 'light')
    }
  }

  const handleToggle = () => {
    if (isAnimating || !buttonRef.current) return

    setIsAnimating(true)
    const newIsDark = !isDark
    const button = buttonRef.current
    const rect = button.getBoundingClientRect()

    const canvas = document.createElement('canvas')
    const W = window.innerWidth
    const H = window.innerHeight
    canvas.width  = W
    canvas.height = H
    canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: ${W}px;
      height: ${H}px;
      z-index: 9999;
      pointer-events: none;
    `
    document.body.appendChild(canvas)

    const ctx = canvas.getContext('2d')!

    const ox = rect.left + rect.width  / 2
    const oy = rect.top  + rect.height / 2

    // Distance to farthest corner — guarantees full coverage
    const maxR = Math.max(
      Math.hypot(ox,     oy),
      Math.hypot(W - ox, oy),
      Math.hypot(ox,     H - oy),
      Math.hypot(W - ox, H - oy),
    ) * 1.04

    const color = newIsDark ? '#0e0c0a' : '#edefee'

    // Gentle organic waves — low amplitude, slow frequency
    const NUM_WAVES = 18
    const waves = Array.from({ length: NUM_WAVES }, (_, i) => ({
      angle: (Math.PI * 2 * i) / NUM_WAVES + (Math.random() - 0.5) * 0.18,
      amp:   5 + Math.random() * 10,
      freq:  0.8 + Math.random() * 1.4,
      phase: Math.random() * Math.PI * 2,
    }))

    // Slow & lazy timings
    const EXPAND_MS = 950
    const FADE_MS   = 500
    const TOTAL_MS  = EXPAND_MS + FADE_MS

    // Starts sluggish, breathes outward — the lazy feel
    const easeInOutSine  = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2
    const easeInOutQuart = (t: number) =>
      t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2

    let themeApplied = false
    const t0 = performance.now()

    const drawFrame = (now: number) => {
      const elapsed    = now - t0
      const totalProg  = Math.min(elapsed / TOTAL_MS, 1)
      const expandProg = Math.min(elapsed / EXPAND_MS, 1)
      const ee         = easeInOutSine(expandProg)

      ctx.clearRect(0, 0, W, H)

      // Slow gentle fade after full coverage
      let alpha = 1
      if (elapsed > EXPAND_MS) {
        alpha = 1 - easeInOutQuart(Math.min((elapsed - EXPAND_MS) / FADE_MS, 1))
      }

      ctx.globalAlpha = alpha
      ctx.fillStyle   = color

      const baseR = ee * maxR
      const PTS   = 128

      ctx.beginPath()
      for (let i = 0; i <= PTS; i++) {
        const a = (i / PTS) * Math.PI * 2
        let r   = baseR

        for (const w of waves) {
          const diff = Math.abs(((a - w.angle + Math.PI * 3) % (Math.PI * 2)) - Math.PI)
          if (diff < 0.7) {
            const influence = Math.pow(Math.max(0, 1 - diff / 0.7), 2)
            const decay     = Math.max(0, 1 - expandProg * 1.6)
            r += influence * w.amp * Math.sin(elapsed * 0.003 * w.freq + w.phase) * decay
          }
        }

        const px = ox + r * Math.cos(a)
        const py = oy + r * Math.sin(a)
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
      }
      ctx.closePath()
      ctx.fill()
      ctx.globalAlpha = 1

      if (!themeApplied && expandProg >= 1) {
        themeApplied = true
        setIsDark(newIsDark)
        applyTheme(newIsDark)
      }

      if (totalProg < 1) {
        requestAnimationFrame(drawFrame)
      } else {
        canvas.remove()
        setIsAnimating(false)
      }
    }

    requestAnimationFrame(drawFrame)
  }

  if (!mounted) {
    return <div className="fixed bottom-4 right-4 w-8 h-8 z-[200]" />
  }

  return (
    <div className="fixed bottom-4 right-4 z-[200]">
      <button
        ref={buttonRef}
        onClick={handleToggle}
        disabled={isAnimating}
        className="relative w-9 h-9 rounded-full border border-background bg-black/30 dark:bg-white/30 flex items-center justify-center transition-colors duration-300 hover:bg-black/40 dark:hover:bg-white/40 disabled:cursor-not-allowed"
        aria-label="Toggle theme"
      >
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              exit={{ rotate: 180, scale: 0 }}
              transition={{ duration: 0.4 }}
            >
              <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              exit={{ rotate: 180, scale: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Sun className="w-5 h-5 text-white fill-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  )
}