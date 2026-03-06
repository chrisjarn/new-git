'use client'

import { useRef } from 'react'
import { m, useInView, useReducedMotion } from 'motion/react'
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion'
import { BentoCard } from './BentoCard'
import { ChatBubbles } from './ChatBubbles'
import { Button } from '@/components/ui/Button'
import { ArrowRightCircleIcon } from '@/components/ui/Icons'

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
    title: 'Reactive, Not Proactive',
    description:
      'Most teams only discover gaps after an incident or audit — when it is already too late to fix them.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="17" x2="22" y1="11" y2="11" /></svg>
    ),
    title: 'No Single Source of Truth',
    description:
      'Responsibility is scattered across building managers, contractors, and tenants with no shared visibility.',
  },
]

const solution = {
  title: 'ERA connects every piece',
  description:
    'One platform links your buildings, tenants, wardens, and compliance obligations into a single, always-current workflow — so nothing falls through the cracks.',
}

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
      className="flex flex-col items-center gap-6 md:gap-10"
    >
      <m.div variants={fadeUp} className="relative w-full">
        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-primary">
            The Problem
          </span>
          <h2 className="max-w-2xl text-balance text-[clamp(2.2rem,_5vw,_3.75rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
            Compliance Gaps Hide in Plain Sight
          </h2>
        </div>
        <div className="pointer-events-none absolute right-0 bottom-0 hidden md:block">
          {/* <ChatBubbles /> */}
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
              <p className="text-sm leading-relaxed text-secondary">{gap.description}</p>
            </BentoCard>
          </m.div>
        ))}
      </div>

      <m.div variants={fadeUp} className="flex w-full  py-20 justify-center">
        <ChatBubbles />
      </m.div>

      <m.div variants={fadeUp} className="w-full">
        <BentoCard className="flex flex-col items-center gap-4 border border-brand-primary/20  p-8 text-center dark:bg-brand-primary/10">
          <div className="flex size-10 items-center justify-center rounded-lg  text-brand-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></svg>
          </div>
          <h3 className="text-lg font-semibold">{solution.title}</h3>
          <p className="max-w-lg text-sm leading-relaxed text-secondary">
            {solution.description}
          </p>
          <Button
            variant="brand"
            href="/how-it-works"
            rightSlot={<ArrowRightCircleIcon size={20} />}
          >
            See How ERA Works
          </Button>
        </BentoCard>
      </m.div>
    </m.section>
  )
}
