'use client'

import { useRef } from 'react'
import { m, useInView, useReducedMotion } from 'motion/react'
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion'
import { AnimatedTitle } from '@/components/ui/AnimatedTitle'
import { BentoCard } from './BentoCard'
import { ChatBubbles } from './ChatBubbles'
import { WorkflowSection } from './WorkflowSection'

const gaps = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 9v4" /><path d="M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636-2.87L13.637 3.59a1.914 1.914 0 0 0-3.274 0z" /><path d="M12 17h.01" /></svg>
    ),
    title: 'Fragmented Systems',
    description:
      'Wardens use paper checklists, tenants get email PDFs, and compliance lives in a shared drive no one checks.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
    ),
    title: 'Found out too late',
    description:
      'Most teams discover compliance gaps after an incident or failed audit, when the damage is already done.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="17" x2="22" y1="11" y2="11" /></svg>
    ),
    title: 'No Single Source of Truth',
    description:
      'Responsibility is split across building managers, contractors, and tenants with no shared view of who\u2019s done what.',
  },
]

export function ComplianceGapsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, viewportOnce)
  const prefersReducedMotion = useReducedMotion()
  const animate = prefersReducedMotion || isInView ? 'visible' : 'hidden'

  return (
    <m.section
      ref={ref}
      variants={staggerContainer(0.1)}
      initial={prefersReducedMotion ? 'visible' : 'hidden'}
      animate={animate}
      className="flex flex-col items-center gap-10 md:gap-12"
    >
      <m.div variants={fadeUp} className="relative w-full lg:pt-20">
        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-primary">
            The Problem
          </span>
          <AnimatedTitle className="max-w-2xl">The gaps you don&apos;t see are the ones that cost you</AnimatedTitle>
        </div>
        <div className="pointer-events-none absolute right-0 -top-16 hidden md:block">
          <ChatBubbles />
        </div>
      </m.div>

      <div className="grid w-full gap-4 md:grid-cols-3">
        {gaps.map((gap) => (
          <m.div key={gap.title} variants={fadeUp}>
            <BentoCard className="flex h-full flex-col gap-4 p-6">
              <div className="flex size-10 items-center justify-center rounded-lg">
                {gap.icon}
              </div>
              <h3 className="text-base font-semibold">{gap.title}</h3>
              <p className="font-jakarta text-sm leading-relaxed text-secondary">{gap.description}</p>
            </BentoCard>
          </m.div>
        ))}
      </div>


      <WorkflowSection />
    </m.section>
  )
}
