'use client'

import React from 'react'
import { motion } from 'framer-motion'

const WHO_WE_ARE_TEXT = 'Who We Are'
const WHO_WE_ARE_DESCRIPTION = `Branding isn't decoration.
It's business strategy made visible. 
Lozinr is a Branding Studio helping ambitious businesses build brands with clarity, direction, and long-term 
consistency.`

export default function WhoWeAreSection() {
  return (
    <div className="w-full bg-background text-foreground py-20 md:py-28 px-4 lg:px-9">
      
      {/* Heading with Dividers */}
      <div className="flex flex-col gap-6 mb-12">
        <h2 className="text-foreground font-medium uppercase tracking-tighter leading-[0.9] text-[64px] md:text-[100px] lg:text-[120px]">
          {WHO_WE_ARE_TEXT}
        </h2>
        <div className="w-full h-0.5 bg-foreground" />
      </div>

      {/* Full-width content */}
      <div className="w-full">
        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-100px' }}
          className="w-full flex flex-col gap-6"
        >
          <p className="text-[18px] lg:text-[36px] leading-tight tracking-tight text-foreground font-regular whitespace-pre-line">
            {WHO_WE_ARE_DESCRIPTION}
          </p>
        </motion.div>
      </div>
    </div>
  )
}
