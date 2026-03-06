'use client'

import { useRef } from 'react'
import { m, useInView, useReducedMotion } from 'motion/react'
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion'
import { NumberTicker } from './NumberTicker'
import { Button } from '@/components/ui/Button'
import { ArrowRightCircleIcon } from '@/components/ui/Icons'

const stats = [
  { value: 20, suffix: '+', label: 'Years of fire safety expertise' },
  { value: 15, suffix: '+', label: 'Million sqm under management' },
  { value: 10, label: 'Major compliance standards covered' },
  { value: 8, label: 'Industry sectors supported' },
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
      className="flex flex-col items-center gap-6 md:gap-10"
    >
      <m.div variants={fadeUp} className="flex flex-col items-center gap-3 text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-brand-primary">
          Trusted at Scale
        </span>
        <h2 className="max-w-2xl text-balance text-[clamp(2.2rem,_5vw,_3.75rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
          Proof in numbers
        </h2>
      </m.div>

      <m.div variants={fadeUp} className="grid w-full grid-cols-2 gap-8 md:grid-cols-4">
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
          variant="brand"
          size="large"
          href="/demo"
          rightSlot={<ArrowRightCircleIcon size={24} />}
        >
          Request a Demo
        </Button>
      </m.div>
    </m.section>
  )
}
