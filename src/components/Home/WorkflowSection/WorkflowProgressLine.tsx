'use client'

import { m, type MotionValue, useTransform } from 'motion/react'

interface WorkflowProgressLineProps {
  scrollYProgress: MotionValue<number>
}

// Step thresholds — line changes color after crossing each step's midpoint
const RED = 'rgb(239 68 68)' // red-500
const BRAND = 'rgb(229 77 46)' // brand-primary (tomato-9 approx)
const GREEN = 'rgb(74 222 128)' // green-400, matches IsometricCity

export function WorkflowProgressLine({ scrollYProgress }: WorkflowProgressLineProps) {
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  // Color changes after the line has passed through each step's circle
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.44, 0.45, 0.76, 0.77, 1],
    [RED, RED, BRAND, BRAND, GREEN, GREEN]
  )

  return (
    <div
      aria-hidden="true"
      className="absolute -left-[0.825rem] top-0 flex h-[calc(100%+3.5rem)] w-0.5 flex-col overflow-hidden bg-tertiary-surface md:left-1/2 md:-translate-x-1/2"
    >
      {/* Inner wrapper constrains fill to step-circle range; grey track extends beyond */}
      <div className="absolute left-0 top-0 h-[calc(100%-0rem)] w-full">
        <m.div
          style={{ height, backgroundColor }}
          className="absolute left-0 top-0 w-full rounded-full"
        />
      </div>
      <div className="absolute top-0 h-24 w-full bg-gradient-to-b z-100 from-green-2" />
      <div className="absolute bottom-0 h-40 w-full bg-gradient-to-t z-100 from-background" />
    </div>
  )
}
