'use client'

import { useRef } from 'react'
import { m, useInView, useReducedMotion } from 'motion/react'
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion'
import { BentoCard } from './BentoCard'

const standards = [
  {
    code: 'AS 3745-2010',
    title: 'Planning for Emergencies in Facilities',
    items: [
      'Emergency planning committee formation',
      'Emergency plan development and maintenance',
      'Warden training and appointment',
      'Evacuation exercises and drills',
    ],
  },
  {
    code: 'AS 4083-2010',
    title: 'Planning for Emergencies — Health Care Facilities',
    items: [
      'Healthcare-specific evacuation procedures',
      'Patient movement and triage protocols',
      'Staff competency requirements',
      'Facility-specific emergency plans',
    ],
  },
  {
    code: 'WHS Regulations',
    title: 'Work Health & Safety Regulations',
    items: [
      'Emergency plan obligations under WHS Act',
      'First aid and evacuation requirements',
      'Worker consultation and representation',
      'Incident notification and record-keeping',
    ],
  },
  {
    code: 'ISO 45001',
    title: 'Occupational Health & Safety Management',
    items: [
      'Emergency preparedness and response (8.2)',
      'Risk assessment and hazard identification',
      'Competence, training, and awareness',
      'Performance evaluation and continual improvement',
    ],
  },
]

export function ComplianceSection() {
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
      <m.div variants={fadeUp} className="flex flex-col items-start gap-3 text-start">
        <span className="text-xs font-semibold uppercase tracking-wider text-brand-primary">
          Compliance
        </span>
        <h2 className="max-w-xl  text-balance text-[clamp(2.2rem,_5vw,_3.75rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
          Your obligations, covered.
        </h2>
      </m.div>

      <div className="grid w-full gap-4 md:grid-cols-2">
        {standards.map((standard) => (
          <m.div key={standard.code} variants={fadeUp}>
            <BentoCard className="flex h-full flex-col gap-4 p-6">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">
                  {standard.code}
                </span>
                <h3 className="text-base font-semibold">{standard.title}</h3>
              </div>
              <ul className="flex flex-col gap-2">
                {standard.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-secondary">
                    <svg
                      className="mt-0.5 size-4 flex-none text-brand-primary"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <path d="m9 11 3 3L22 4" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </BentoCard>
          </m.div>
        ))}
      </div>
    </m.section>
  )
}
