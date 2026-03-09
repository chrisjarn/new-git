'use client'

import { useCallback, useRef, useState } from 'react'
import { m, useInView, useReducedMotion } from 'motion/react'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'
import { triggers, steps } from './data'
import { AnimatedTitle } from '@/components/ui/AnimatedTitle'
import { TriggerTag } from './TriggerTag'
import { WorkflowSteps } from './WorkflowSteps'

export function WorkflowSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, viewportOnce)
  const prefersReducedMotion = useReducedMotion() ?? false
  const animate = prefersReducedMotion || isInView ? 'visible' : 'hidden'

  const [highlightedTriggers, setHighlightedTriggers] = useState<string[]>([])
  const clearTimerRef = useRef<ReturnType<typeof setTimeout>>(null)

  const onStepActivate = useCallback(
    (index: number) => {
      const step = steps[index]
      if (!step) return

      if (clearTimerRef.current) clearTimeout(clearTimerRef.current)
      setHighlightedTriggers(step.triggerLabels)
      clearTimerRef.current = setTimeout(() => setHighlightedTriggers([]), 800)
    },
    []
  )

  return (
    <m.div
      ref={ref}
      variants={staggerContainer(0.1)}
      initial={prefersReducedMotion ? 'visible' : 'hidden'}
      animate={animate}
      className="mt-16 mb-0 w-full md:mt-24 md:mb-0"
    >
      <m.div variants={fadeUp} className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-12">
        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-primary">
            ERA Workflow
          </span>
          <AnimatedTitle className="max-w-2xl">One trigger. Every step, handled.</AnimatedTitle>
        </div>
        <p className="font-jakarta max-w-xl font-medium text-base leading-snug text-secondary md:max-w-sm md:text-lg">
          A single trigger sets the chain in motion. Wardens notified. Zones assigned. Headcounts tracked. Every action timestamped.
        </p>
      </m.div>

      <m.div variants={fadeUp} className="mt-6 hidden flex-wrap justify-center gap-2 md:flex">
        {triggers.map((trigger) => (
          <TriggerTag
            key={trigger.label}
            icon={trigger.icon}
            label={trigger.label}
            isHighlighted={highlightedTriggers.includes(trigger.label)}
          />
        ))}
      </m.div>

      <m.div variants={fadeUp} className="mt-10 pl-8 md:pl-0">
        <WorkflowSteps
          steps={steps}
          onStepActivate={onStepActivate}
          reducedMotion={prefersReducedMotion}
        />
      </m.div>
    </m.div>
  )
}
