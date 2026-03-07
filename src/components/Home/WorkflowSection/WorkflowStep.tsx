'use client'

import { useRef, useState, type RefObject } from 'react'
import { m, useMotionValueEvent, type MotionValue } from 'motion/react'
import { cn } from '@/lib/utils'
import type { WorkflowStepData } from './types'
import { ProgressCircle } from './ProgressCircle'
import { WorkflowJobCard } from './WorkflowJobCard'

interface WorkflowStepProps extends WorkflowStepData {
  index: number
  onActivate: (index: number) => void
  reducedMotion: boolean
  containerRef: RefObject<HTMLDivElement | null>
  scrollYProgress: MotionValue<number>
}

export function WorkflowStep({
  title,
  event,
  stepIcon,
  jobs,
  index,
  onActivate,
  reducedMotion,
  containerRef,
  scrollYProgress,
  accentColor,
}: WorkflowStepProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(reducedMotion)

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    if (reducedMotion) return
    if (!ref.current || !containerRef.current) return

    const containerHeight = containerRef.current.scrollHeight
    if (containerHeight === 0) return

    // Circle is positioned at top of step + ~4rem (pt-16) offset
    const stepTop = ref.current.offsetTop + 64
    const threshold = stepTop / containerHeight

    const shouldBeActive = progress >= threshold
    const wasActive = isActive
    setIsActive(shouldBeActive)

    if (shouldBeActive && !wasActive) {
      onActivate(index)
    }
  })

  const isRight = index % 2 === 0

  return (
    <div
      ref={ref}
      className={cn(
        'group relative h-fit pb-16 pl-0 pr-4 pt-16',
        isRight ? 'md:ml-[50%] md:pl-10 md:pr-0' : 'md:mr-[50%] md:pl-0 md:pr-10'
      )}
    >
      <ProgressCircle isActive={isActive} accentColor={accentColor} isRight={isRight}>{stepIcon}</ProgressCircle>

      <div className={cn('ml-6 space-y-8 overflow-hidden md:ml-0 md:pr-0')}>
        <div className="space-y-4">
          <m.h4
            animate={{ opacity: isActive ? 1 : 0.2 }}
            transition={{ duration: 0.3 }}
            className="text-xl font-semibold md:text-2xl"
          >
            {title}
          </m.h4>
          <m.p
            animate={{ opacity: isActive ? 1 : 0.2 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="inline-flex flex-wrap items-baseline gap-1.5 text-sm text-secondary"
          >
            <code className="rounded-lg border border-white/10 bg-secondary-surface px-2 py-1 font-mono text-sm">
              {event}
            </code>
            <span className="font-light">event fires</span>
          </m.p>
        </div>
        <div className="-m-2 mr-0 space-y-4 p-2">
          {jobs.map((job, jobIndex) => (
            <WorkflowJobCard key={job.title} index={jobIndex} isActive={isActive} accentColor={accentColor} {...job} />
          ))}
        </div>
      </div>
    </div>
  )
}
