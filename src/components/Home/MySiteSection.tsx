import { House } from '@gravity-ui/icons'
import { FeatureSection } from './FeatureSection'
import { MySiteIllustration } from './MySiteIllustration'

export function MySiteSection() {
  return (
    <FeatureSection
      reversed
      badge={{ icon: House, label: 'My Site', color: 'var(--color-accent-violet)' }}
      title="One source of truth for every site"
      description="Buildings, wardens, floor hierarchies, evacuation plans. All in one place, always current."
      bullets={[
        'Visual floor and area hierarchy',
        'Warden role management',
        'Evacuation plan storage',
        'Portfolio-wide visibility',
      ]}
      illustration={<MySiteIllustration />}
    />
  )
}
