import type { WorkflowStepData, WorkflowTrigger } from './types'
import { AlertTriangleIcon, ShieldIcon, ClipboardCheckIcon, UserCheckIcon } from './icons'

export const triggers: WorkflowTrigger[] = [
  { icon: ShieldIcon(), label: 'Wardens' },
  { icon: AlertTriangleIcon(), label: 'Zones' },
  { icon: UserCheckIcon(), label: 'Tenants' },
  { icon: ClipboardCheckIcon(), label: 'Compliance' },
]

export const steps: WorkflowStepData[] = [
  {
    title: 'Emergency activated',
    event: 'emergency-activated',
    stepIcon: AlertTriangleIcon(),
    triggerLabels: ['Wardens', 'Zones'],
    accentColor: 'red',
    jobs: [
      {
        icon: ShieldIcon(),
        title: 'Right warden, right alert',
        description:
          'Each warden gets a push notification with exactly what they need to do.',
      },
      {
        icon: AlertTriangleIcon(),
        title: 'Every zone, covered',
        description:
          'Wardens see only their zone: floors, stairwells, assembly points.',
      },
      {
        icon: ClipboardCheckIcon(),
        title: 'Plans loaded on every device',
        description:
          "Floor plans and procedures appear on every warden's screen instantly.",
      },
    ],
  },
  {
    title: 'Evacuation underway',
    event: 'evacuation-underway',
    stepIcon: ShieldIcon(),
    triggerLabels: ['Wardens', 'Zones', 'Tenants'],
    jobs: [
      {
        icon: ShieldIcon(),
        title: 'See every zone, live',
        description:
          'Cleared, in-progress, or blocked. The chief warden sees it all in real time.',
      },
      {
        icon: UserCheckIcon(),
        title: 'Know who\'s missing',
        description:
          'Tenants check in at assembly points. Missing persons flagged instantly.',
      },
    ],
  },
  {
    title: 'Incident closed',
    event: 'incident-closed',
    stepIcon: ClipboardCheckIcon(),
    triggerLabels: ['Compliance', 'Wardens', 'Tenants'],
    accentColor: 'green',
    jobs: [
      {
        icon: ClipboardCheckIcon(),
        title: 'Audit trail, done',
        description:
          'Timestamps, actions, and responses in one compliance-ready report.',
      },
      {
        icon: UserCheckIcon(),
        title: 'Response gaps become your next drill plan',
        description:
          'Response issues feed directly into training and scheduling.',
      },
    ],
  },
]
