'use client'

import { GraduationCap } from '@gravity-ui/icons'
import { KanbanIllustration } from './KanbanIllustration'
import { FeatureSection } from './FeatureSection'

export function ImproveSection() {
  return (
    <FeatureSection
      badge={{ icon: GraduationCap, label: 'Improve', color: 'var(--color-accent-green)' }}
      title="Close the gap between drills and readiness"
      description="ERA maps every warden to AS3745 requirements and tracks completion live. Debrief findings feed straight back into your training plan."
      bullets={[
        'AS3745 competency tracking',
        'Role-based training dashboards',
        'Debrief-to-plan feedback loop',
        'Overdue certification alerts',
      ]}
      illustration={<KanbanIllustration />}
    />
  )
}
