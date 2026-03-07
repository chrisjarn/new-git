'use client'

import { Camera } from '@gravity-ui/icons'
import { SearchIllustration } from './SearchIllustration'
import { FeatureSection } from './FeatureSection'

export function CaptureSection() {
  return (
    <FeatureSection
      reversed
      badge={{ icon: Camera, label: 'Capture', color: 'var(--color-accent-cyan)' }}
      title="Log hazards before you leave the area"
      description="Spot it, log it, assign it. Photo evidence, severity, and ownership captured on the spot. No chasing up later."
      bullets={[
        'Mobile hazard and inspection logging',
        'Photo evidence register',
        'Auto ownership and deadlines',
        'Full audit trail',
      ]}
      illustration={<SearchIllustration />}
    />
  )
}
