'use client'

import { useRef } from 'react'
import { useScroll } from 'motion/react'
import type { WorkflowStepData } from './types'
import { WorkflowProgressLine } from './WorkflowProgressLine'
import { WorkflowStep } from './WorkflowStep'

interface WorkflowStepsProps {
  steps: WorkflowStepData[]
  onStepActivate: (index: number) => void
  reducedMotion: boolean
}

export function WorkflowSteps({ steps, onStepActivate, reducedMotion }: WorkflowStepsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })

  return (
    <div ref={containerRef} className="relative ml-0 space-y-8 pr-0 md:mx-auto md:max-w-4xl md:pr-0">
      <WorkflowProgressLine scrollYProgress={scrollYProgress} />

      {steps.map((step, index) => (
        <WorkflowStep
          key={step.title}
          index={index}
          onActivate={onStepActivate}
          reducedMotion={reducedMotion}
          containerRef={containerRef}
          scrollYProgress={scrollYProgress}
          {...step}
        />
      ))}
    </div>
  )
}
