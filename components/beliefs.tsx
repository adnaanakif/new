'use client'

import React from 'react'
import { motion } from 'framer-motion'

const OUR_BELIEF_TEXT = 'Our Belief'
const BELIEF_DESCRIPTION = `Great brands aren't built by decoration.
They're built through clear thinking, intentional systems, and decisions that serve the business—not trends.
That's the standard we hold ourselves to on every project.`

export default function OurBeliefSection() {
  return (
    <div className="w-full bg-background text-foreground py-20 md:py-28 px-4 lg:px-9">
      

      {/* Heading with Dividers */}
      <div className="flex flex-col gap-6 mb-12">
        <h2 className="text-foreground font-medium uppercase tracking-tighter leading-[0.9] text-[64px] md:text-[100px] lg:text-[120px]">
          {OUR_BELIEF_TEXT}
        </h2>
        <div className="w-full h-0.5 bg-foreground" />
      </div>

      {/* Grid Layout: Left Image, Right Content */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 md:gap-6 items-start">
        {/* Left Column: Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-100px' }}
          className="w-full"
        >
          <div className="w-full aspect-video overflow-hidden bg-foreground">
            <img
              src="#"
              alt="Our Belief"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Right Column: Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-100px' }}
          className="w-full flex flex-col gap-6"
        >
          <p className="text-[18px] lg:text-[22px] leading-tight tracking-tight text-foreground font-regular">
            {BELIEF_DESCRIPTION}
          </p>
        </motion.div>
      </div>
    </div>
  )
}
