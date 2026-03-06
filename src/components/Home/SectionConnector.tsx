'use client'

import { m, useReducedMotion } from 'motion/react'
import { fadeIn } from '@/lib/motion'

export function SectionConnector() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <m.div
      variants={fadeIn}
      initial={prefersReducedMotion ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="flex justify-center py-10 md:py-12"
    >
    </m.div>
  )
}
