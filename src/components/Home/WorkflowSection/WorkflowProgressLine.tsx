'use client'

import { m, type MotionValue, useTransform } from 'motion/react'

interface WorkflowProgressLineProps {
  scrollYProgress: MotionValue<number>
}

// Step thresholds — line changes color after crossing each step's midpoint
const RED = 'rgb(239 68 68)' // red-500
const BRAND = 'rgb(229 77 46)' // brand-primary (tomato-9 approx)
const GREEN = 'rgb(16 185 129)' // emerald-500

export function WorkflowProgressLine({ scrollYProgress }: WorkflowProgressLineProps) {
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  // Color changes after the line has passed through each step's circle
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.44, 0.45, 0.77, 0.78, 1],
    [RED, RED, BRAND, BRAND, GREEN, GREEN]
  )

  return (
    <div
      aria-hidden="true"
      className="absolute -left-[0.825rem] top-0 flex h-[calc(100%-2rem)] w-0.5 flex-col overflow-hidden bg-tertiary-surface md:left-1/2 md:-translate-x-1/2"
    >
      <m.div
        style={{ height, backgroundColor }}
        className="absolute left-0 top-0 w-full rounded-full"
      />
      <div className="absolute top-0 h-24 w-full bg-gradient-to-b from-primary-surface" />
      <div className="absolute bottom-0 h-24 w-full bg-gradient-to-t from-primary-surface" />
    </div>
  )
}
