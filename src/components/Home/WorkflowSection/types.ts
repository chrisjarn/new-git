import type { ReactNode } from 'react'

export type WorkflowTrigger = { icon: ReactNode; label: string }

export type WorkflowJob = { icon: ReactNode; title: string; description: string }

export type AccentColor = 'red' | 'green' | 'brand'

export type WorkflowStepData = {
  title: string
  event: string
  stepIcon: ReactNode
  jobs: WorkflowJob[]
  triggerLabels: string[]
  accentColor?: AccentColor
}
