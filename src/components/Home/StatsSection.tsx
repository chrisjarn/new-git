'use client'

import { useRef } from 'react'
import { m, useInView, useReducedMotion } from 'motion/react'
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion'
import { AnimatedTitle } from '@/components/ui/AnimatedTitle'
import { NumberTicker } from './NumberTicker'
import { Button } from '@/components/ui/Button'
import { ArrowRightCircleIcon } from '@/components/ui/Icons'

const stats = [
  { value: 20, suffix: '+', label: 'Years of fire safety expertise' },
  { value: 15, suffix: '+', label: 'Million sqm under management' },
  { value: 10, label: 'Major compliance standards covered' },
  { value: 6, label: 'Sectors, from hospitals to high-rises' },
]

export function StatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, viewportOnce)
  const prefersReducedMotion = useReducedMotion()
  const animate = prefersReducedMotion || isInView ? 'visible' : 'hidden'

  return (
    <m.section
      ref={ref}
      variants={staggerContainer(0.1)}
      initial={prefersReducedMotion ? 'visible' : 'hidden'}
      animate={animate}
      className="flex flex-col items-center gap-10 md:gap-12"
    >
      <m.div variants={fadeUp} className="flex flex-col items-center gap-3 text-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-brand-primary">
          Trusted at Scale
        </span>
        <AnimatedTitle className="">Two decades of safety expertise, one modern platform</AnimatedTitle>
      </m.div>

      <m.div variants={fadeUp} className="grid w-full grid-cols-2 gap-3 md:gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <NumberTicker
            key={stat.label}
            value={stat.value}
            suffix={stat.suffix}
            label={stat.label}
          />
        ))}
      </m.div>

      <m.div variants={fadeUp}>
        <Button
          variant="base"
          size="large"
          href="/contact"
          rightSlot={<ArrowRightCircleIcon size={24} />}
        >
          Book a Demo
        </Button>
      </m.div>
    </m.section>
  )
}
