'use client'

import { useRef } from 'react'
import { m, useInView, useReducedMotion } from 'motion/react'
import { scaleIn, staggerContainer, viewportOnce, fadeIn } from '@/lib/motion'
import { CircleExclamation, Camera, GraduationCap, House } from '@gravity-ui/icons'
import { BentoCard } from './BentoCard'

const previews = [
  {
    label: 'Critical',
    description: 'Incident coordination',
    icon: CircleExclamation,
    color: 'text-red-500',
    bg: 'bg-sand-3',
  },
  {
    label: 'Capture',
    description: 'Hazard & inspection logging',
    icon: Camera,
    color: 'text-amber-500',
    bg: 'bg-sand-3',
  },
  {
    label: 'Improve',
    description: 'Training & competency',
    icon: GraduationCap,
    color: 'text-blue-500',
    bg: 'bg-sand-3',
  },
  {
    label: 'My Site',
    description: 'Site structure & docs',
    icon: House,
    color: 'text-brand-primary',
    bg: 'bg-sand-3',
  },
]

export function HeroPreview() {
  const ref = useRef(null)
  const isInView = useInView(ref, viewportOnce)
  const prefersReducedMotion = useReducedMotion()
  const animate = prefersReducedMotion || isInView ? 'visible' : 'hidden'

  return (
    <m.div
      ref={ref}
      variants={staggerContainer(0.1)}
      initial={prefersReducedMotion ? 'visible' : 'hidden'}
      animate={animate}
      className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
    >
      {previews.map((item) => (
        <m.div key={item.label} variants={scaleIn}>
          <BentoCard className="flex flex-col gap-3 p-4">
            <div className={`flex size-10 items-center justify-center rounded-xl ${item.bg}`}>
              <item.icon className={`size-5 ${item.color}`} />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold">{item.label}</span>
              <span className="text-tertiary text-xs">{item.description}</span>
            </div>
          </BentoCard>
        </m.div>
      ))}
  
    </m.div>
  )
}
