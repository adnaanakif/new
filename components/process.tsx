'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const processSteps = [
  {
    id: 1,
    number: '01',
    title: 'Discover',
    description:
      'Every strong brand begins with understanding. We uncover your business, audience, market, goals, and perception gaps before making a single creative decision.',
  },
  {
    id: 2,
    number: '02',
    title: 'Define',
    description:
      'Strategy before creativity. We define your positioning, purpose, messaging, audience, and brand foundation to create a clear strategic direction.',
  },
  {
    id: 3,
    number: '03',
    title: 'Direct',
    description:
      'Before we design, we establish the creative direction. This phase aligns visual thinking with strategy through moodboards, creative territories, and visual exploration.',
  },
  {
    id: 4,
    number: '04',
    title: 'Design',
    description:
      'With strategy and direction approved, we craft a complete visual identity system designed to communicate your brand consistently and confidently.',
  },
  {
    id: 5,
    number: '05',
    title: 'Deploy',
    description:
      "A brand only creates value when it's used consistently. We prepare your brand for launch with guidelines, assets, and everything your team needs to implement it with confidence.",
  },
]

const DESC_TEXT_CLASS =
  'text-[18px] lg:text-[22px] leading-tight lg:leading-snug font-regular tracking-tight text-foreground'

// ─── True line-by-line reveal ─────────────────────────────────────
function LineReveal({ text }: { text: string }) {
  const measureRef = useRef<HTMLDivElement>(null)
  const [lines, setLines] = useState<string[]>([])

  useLayoutEffect(() => {
    const el = measureRef.current
    if (!el) return

    const measure = () => {
      const words = text.split(' ')
      el.innerHTML = ''

      const spans = words.map((word, i) => {
        const span = document.createElement('span')
        span.textContent = word
        el.appendChild(span)
        if (i < words.length - 1) el.appendChild(document.createTextNode(' '))
        return span
      })

      const groups: string[][] = []
      let lastTop = Number.NEGATIVE_INFINITY

      spans.forEach((span, i) => {
        const top = span.offsetTop
        if (Math.abs(top - lastTop) > 1) {
          groups.push([])
          lastTop = top
        }
        groups[groups.length - 1].push(words[i])
      })

      setLines(groups.map((g) => g.join(' ')))
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [text])

  return (
    <div className="relative">
      <div
        ref={measureRef}
        aria-hidden
        className={`invisible absolute inset-0 ${DESC_TEXT_CLASS}`}
      />
      <div className="flex flex-col">
        {lines.map((line, i) => (
          <div key={i} className="overflow-hidden">
            <motion.span
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              exit={{ y: '-110%', opacity: 0 }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className={`block ${DESC_TEXT_CLASS}`}
            >
              {line}
            </motion.span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── List item — title + inline description below it on hover ────
function ProcessListItem({
  step,
  isActive,
  onSelect,
}: {
  step: (typeof processSteps)[0]
  isActive: boolean
  onSelect: () => void
}) {
  return (
    <div
      onMouseEnter={onSelect}
      onFocus={onSelect}
      className="relative border-b border-foreground last:border-none"
    >
      <button
        type="button"
        onClick={onSelect}
        className="relative w-full text-left py-3 md:py-4 focus:outline-none"
      >
        {isActive && (
          <motion.span
            layoutId="process-active-indicator"
            className="absolute -left-3 top-1/2 -translate-y-1/2 w-[10px] h-[10px] rounded-full bg-foreground"
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          />
        )}
        <motion.span
          animate={{ opacity: isActive ? 1 : 0.25, x: isActive ? 6 : 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="block text-[22px] lg:text-[48px] font-regular tracking-tight leading-[1.05] text-foreground"
        >
          {step.title}
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-4 pl-1 md:pl-2">
              <LineReveal text={step.description} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Main ────────────────────────────────────────────────────────
export default function Process() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="w-full bg-background text-foreground py-20 md:py-24 px-5 lg:px-6">
      <div className="w-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-8 md:gap-x-0">
        {/* Left — label */}
        <div className="w-full flex items-center gap-2 self-start">
          <span className="text-[20px] lg:text-[82px] font-regular text-foreground tracking-tight uppercase">
            NORTH™
          </span>
        </div>

        {/* Right — list, description reveals below hovered item */}
        <div className="w-full flex flex-col">
          {processSteps.map((step, i) => (
            <ProcessListItem
              key={step.id}
              step={step}
              isActive={i === activeIndex}
              onSelect={() => setActiveIndex(i)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
