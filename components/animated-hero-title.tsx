'use client'

import { motion } from 'framer-motion'

// ─── Animated Hero Title ─────────────────────────────────────────
// Looping slide/scale title animation. Extracted from the /work page
// hero so it can be reused identically on case study detail pages.
export default function AnimatedHeroTitle({ text, color = 'text-foreground' }: { text: string; color?: string }) {
  return (
    <div className="overflow-hidden h-[58px] md:h-[126px] lg:h-[187px]">
      <motion.div
        className="flex flex-col"
        animate={{ y: ['0%', '0%', '-50%', '-50%'] }}
        transition={{
          duration: 5.5,
          times: [0, 0.42, 0.58, 1],
          repeat: Infinity,
          ease: [0.76, 0, 0.24, 1],
        }}
      >
        <motion.h1
          animate={{ scale: [1, 1, 0.985, 1, 1] }}
          transition={{ duration: 5.5, times: [0, 0.4, 0.5, 0.6, 1], repeat: Infinity, ease: 'easeInOut' }}
          className={`text-[64px] md:text-[140px] lg:text-[208px] font-medium tracking-tighter leading-[0.9] ${color} text-center`}
        >
          {text}
        </motion.h1>
        <h1 className={`text-[64px] md:text-[140px] lg:text-[208px] font-medium tracking-tighter leading-[0.9] ${color} text-center`}>
          {text}
        </h1>
      </motion.div>
    </div>
  )
}
