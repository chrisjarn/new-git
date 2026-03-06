'use client'

import { useRef } from 'react'
import { m, useInView, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion'
import { BentoCard } from './BentoCard'
import { FeatureTabs } from './FeatureTabs'
import { Badge } from '../ui/Badge'

interface FeatureSectionProps {
  reversed?: boolean
  badge: { label: string; color?: string; icon: React.ComponentType<{ className?: string }> }
  title: string
  description: string
  bullets?: string[]
  illustration: React.ReactNode
}

export function FeatureSection({
  reversed = false,
  badge,
  title,
  description,
  bullets,
  illustration,
}: FeatureSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, viewportOnce)
  const prefersReducedMotion = useReducedMotion()
  const animate = prefersReducedMotion || isInView ? 'visible' : 'hidden'
  const Icon = badge.icon
  const accentColor = badge.color ?? 'var(--color-brand-primary)'
  const sectionId = badge.label.toLowerCase().replace(/\s+/g, '-')

  return (
    <m.section
      ref={ref}
      variants={staggerContainer(0.1)}
      initial={prefersReducedMotion ? 'visible' : 'hidden'}
      animate={animate}
      className="grid items-center gap-6 md:grid-cols-2 md:gap-12 lg:gap-12"
    >
      {/* Mobile: single card with illustration + footer text */}
      <m.div variants={fadeUp} className="flex min-w-0 flex-col md:hidden">
        <BentoCard className="relative overflow-hidden">
          <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden p-3">
            {illustration}
          </div>
          <div className="flex flex-col gap-3 border-t-2 border-background p-4 pt-4">
            <Badge variant="icon" className="font-jakarta text-sm font-semibold" style={{ color: accentColor }}>
              <Icon />
              {badge.label}
            </Badge>
            <h3 className="text-balance text-[clamp(1.7rem,_3.5vw,_3rem)] font-semibold leading-tight">
              {title}
            </h3>
            <p className="font-jakarta text-secondary text-pretty text-base font-medium leading-snug">
              {description}
            </p>
          </div>
          {bullets && bullets.length > 0 && (
            <div className="pb-2">
              <FeatureTabs items={bullets} accentColor={accentColor} sectionId={sectionId} surfaceColor="secondary-surface" />
            </div>
          )}
        </BentoCard>
      </m.div>

      {/* Desktop: illustration card + separate text column */}
      <m.div variants={fadeUp} className={cn("hidden min-w-0 flex-col md:flex", reversed && "md:order-2")}>
        <BentoCard className="relative flex min-h-72 items-center justify-center overflow-hidden p-6">
          {illustration}
        </BentoCard>
        {bullets && bullets.length > 0 && (
          <div className="mt-2">
            <FeatureTabs items={bullets} accentColor={accentColor} sectionId={`${sectionId}-desktop`} />
          </div>
        )}
      </m.div>

      <m.div variants={fadeUp} className="hidden min-w-0 flex-col gap-4 md:flex">
        <Badge variant="icon" className="font-jakarta text-sm font-semibold" style={{ color: accentColor }}>
          <Icon />
          {badge.label}
        </Badge>
        <h3 className="text-balance text-[clamp(1.7rem,_3.5vw,_3rem)] font-semibold leading-12">
          {title}
        </h3>
        <p className="font-jakarta text-secondary text-pretty text-base font-medium leading-snug">
          {description}
        </p>
      </m.div>
    </m.section>
  )
}
