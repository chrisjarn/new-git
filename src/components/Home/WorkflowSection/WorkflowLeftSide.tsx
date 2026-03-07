'use client'

import type { WorkflowTrigger } from './types'
import { TriggerTag } from './TriggerTag'

interface WorkflowLeftSideProps {
  triggers: WorkflowTrigger[]
  highlightedTriggers: string[]
}

export function WorkflowLeftSide({ triggers, highlightedTriggers }: WorkflowLeftSideProps) {
  return (
    <div className="relative pb-8 pt-4 md:pl-12 md:pr-24 md:pt-12">
      <div className="md:sticky md:top-1/3 md:pb-16">
        <div className="space-y-4">
          <span className="inline-block rounded-full bg-brand-primary/10 px-3 py-1 text-sm font-semibold text-brand-primary">
            ERA Workflow
          </span>
          <h3 className="text-2xl font-semibold leading-tight md:text-3xl">
            Every piece connected, automatically
          </h3>
          <p className="text-base leading-relaxed text-secondary md:text-lg">
            When an event fires, ERA orchestrates tasks across buildings, wardens, and tenants so
            nothing falls through the cracks.
          </p>
        </div>

        <div className="mt-8 hidden flex-wrap gap-2 md:flex">
          {triggers.map((trigger) => (
            <TriggerTag
              key={trigger.label}
              icon={trigger.icon}
              label={trigger.label}
              isHighlighted={highlightedTriggers.includes(trigger.label)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
