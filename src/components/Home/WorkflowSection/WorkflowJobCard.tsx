'use client'

import type { ReactNode } from 'react'
import { m, type Variants } from 'motion/react'
import { cn } from '@/lib/utils'
import type { AccentColor } from './types'

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1], delay: 0.15 + i * 0.1 },
  }),
}

const iconColorMap: Record<AccentColor, string> = {
  red: 'text-red-500',
  green: 'text-emerald-500',
  brand: 'text-brand-primary',
}

interface WorkflowJobCardProps {
  icon: ReactNode
  title: string
  description: string
  index: number
  isActive: boolean
  accentColor?: AccentColor
}

export function WorkflowJobCard({ icon, title, description, index, isActive, accentColor = 'brand' }: WorkflowJobCardProps) {
  return (
    <m.div
      custom={index}
      variants={slideInRight}
      animate={isActive ? 'visible' : 'hidden'}
      className="md:max-w-md rounded-2xl outline-offset-4 outline-white focus-visible:outline focus-visible:!delay-0"
    >
      <div className="flex flex-col gap-3 rounded-2xl bg-secondary-surface p-4 text-base transition-colors duration-150 hover:bg-white/5 md:flex-row md:gap-4">
        <span className={cn('flex size-10 flex-none items-center justify-center rounded-lg', iconColorMap[accentColor])}>
          {icon}
        </span>
        <div>
          <h5 className="font-semibold">{title}</h5>
          <p className="font-jakarta text-sm text-secondary">{description}</p>
        </div>
      </div>
    </m.div>
  )
}
