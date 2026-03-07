'use client'

import { GraduationCap } from '@gravity-ui/icons'
import { KanbanIllustration } from './KanbanIllustration'
import { FeatureSection } from './FeatureSection'

export function ImproveSection() {
  return (
    <FeatureSection
      badge={{ icon: GraduationCap, label: 'Improve', color: 'var(--color-accent-green)' }}
      title="Close the gap between drills and readiness"
      description="ERA maps every warden to compliance requirements and tracks completion live. After every drill, findings feed directly into your next training plan so gaps close themselves."
      bullets={[
        'Competency tracking (AS 3745 aligned)',
        'Role-based training dashboards',
        'Drill debriefs auto-update training plans',
        'Overdue certification alerts',
      ]}
      illustration={<KanbanIllustration />}
    />
  )
}
