'use client'

import { CircleExclamation } from '@gravity-ui/icons'
import { InvoiceIllustration } from './InvoiceIllustration'
import { FeatureSection } from './FeatureSection'

export function CriticalSection() {
  return (
    <FeatureSection
      badge={{ icon: CircleExclamation, label: 'Coordinate' }}
      title="Real-time response when every second counts"
      description="One tap activates your plan. Wardens are notified, zones assigned, and every action logged — before the dust settles."
      bullets={[
        'Role-based incident alerts',
        'Live zone status tracking',
        'Headcount reconciliation',
        'Drill simulation mode',
      ]}
      illustration={<InvoiceIllustration />}
    />
  )
}
