'use client'

import { useState } from 'react'
import { m, AnimatePresence, useReducedMotion } from 'motion/react'
import { Check } from '@gravity-ui/icons'
import { FeatureTabs } from './FeatureTabs'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'
import { MobileAiAssistantIllustration } from '@/components/illustrations/mobile-ai-assistant'

const TABS = ['Property Manager', 'HSE Manager', 'Owner / Operator']

const PERSONAS = [
  {
    tag: 'Portfolio Oversight',
    headline: "You\u2019re accountable for buildings you can\u2019t visit every day.",
    points: [
      'One view across every tenancy, drill, and compliance gap',
      'Tenants self-serve their obligations - no chasing required',
      'No disconnected providers. No blind spots.',
      'Per-building pricing that scales with your portfolio',
    ],
    closer: 'Structured readiness. Shared protection. Proven accountability.',
  },
  {
    tag: 'Compliance Control',
    headline: "You need to prove compliance, not assume it.",
    points: [
      'Every drill, certificate, and incident centralised and timestamped',
      'Clause-level alignment to AS 3745, WHS Regs, and ISO 45001',
      'Integrated LMS tracks competency across multi-state teams',
      'Remote simulation cuts travel costs - audit-ready any time',
    ],
    closer: 'Less administration. Stronger oversight. Audit-ready by design.',
  },
  {
    tag: 'Built for Busy',
    headline: "You\u2019re running the business. Compliance can\u2019t slow you down.",
    points: [
      'Hazard logging, incidents, and warden training on your phone',
      'Track who\u2019s onsite, verify hours, and manage payroll in one place',
      'Built-in LMS - no external providers, no extra invoices',
      'PCBU responsibility, handled - ERA makes it manageable',
    ],
    closer: 'Simple. Practical. Covered.',
  },
]

export function PersonaSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const prefersReducedMotion = useReducedMotion()
  const persona = PERSONAS[activeIndex]

  return (
    <m.section
      variants={staggerContainer(0.1)}
      initial={prefersReducedMotion ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={viewportOnce}
      className="flex flex-col  gap-6"
    >
      <m.h2
        variants={fadeUp}
        className="mx-auto text-primary text-[clamp(2rem,_4vw,_3.5rem)] font-semibold leading-[1.1]"
      >
        Your role.
        <br />
        Your reality.
      </m.h2>

      <m.div variants={fadeUp} className="flex md:justify-center">
        <FeatureTabs
          items={TABS}
          accentColor="var(--color-primary)"
          sectionId="persona"
          activeIndex={activeIndex}
          onTabChange={setActiveIndex}
          size="sm"
        />
      </m.div>

      <m.div variants={fadeUp} className="grid grid-cols-1 gap-8 border-b-2 border-border md:grid-cols-12 md:gap-0 max-h-140 h-100">
        {/* Left column — tab content */}
        <div className="relative flex flex-col justify-end min-h-[280px] pt-4 pb-12 md:col-span-7 md:min-h-[300px] md:order-1">
          <AnimatePresence mode="wait">
            <m.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
              className="flex flex-col gap-4"
            >
              <span className="text-xs font-semibold capitalize tracking-wider text-brand-primary">
                {persona.tag}
              </span>
              <h3 className="text-[clamp(1.5rem,_2.5vw,_2rem)] font-semibold leading-tight text-balance">
                {persona.headline}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {persona.points.map((point) => (
                  <li key={point} className="flex gap-2.5">
                    <Check className="mt-0.5 size-4 shrink-0 text-brand-primary" />
                    <span className="font-jakarta text-base font-medium leading-relaxed text-secondary text-balance">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </m.div>
          </AnimatePresence>
        </div>

        {/* Right column — mobile phone illustration */}
        <div className="relative hidden overflow-hidden rounded-2xl bg-background md:col-span-5 md:block md:h-full md:order-2">
          <div className="absolute bottom-0 left-0 right-0 flex justify-center">
            <MobileAiAssistantIllustration activeIndex={activeIndex} />
          </div>
        </div>
      </m.div>

      <AnimatePresence mode="wait">
        <m.p
          key={activeIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
          className="font-jakarta text-xl font-semibold text-foreground pt-2 text-center"
        >
          {persona.closer}
        </m.p>
      </AnimatePresence>
    </m.section>
  )
}
