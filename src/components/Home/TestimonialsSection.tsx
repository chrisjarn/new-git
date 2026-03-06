'use client'

import { useRef } from 'react'
import { m, useInView, useReducedMotion } from 'motion/react'
import dynamic from 'next/dynamic'
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion'

const Globe = dynamic(() => import('./Globe').then(m => m.Globe), { ssr: false })

const testimonials = [
  {
    quote:
      'I manage up to 70 sites across the metro area, covering businesses of all sizes. ERA gives me complete oversight across my portfolio. Its ease of use allows tenants to meet their WHS obligations\u00A0- while reducing our collective liability as a PCBU.',
    name: 'Toby Bridges',
    role: 'Senior Asset Manager (MLV / McGees)',
    detail: 'Ex Senior Associate Director (CBRE)',
  },
  {
    quote:
      'As an ISO-accredited company operating 20 locations across Australia and New Zealand, our compliance obligations are extensive and resource-intensive. With ERA, every drill, training certificate and incident report is centralised\u00A0- significantly reducing audit preparation time. Over the past three years, the platform has delivered substantial savings in training delivery through remote simulation and reduced administrative overhead across our 300+ regional workforce. The ERA team continues to seek our feedback and refine the system to meet our evolving operational needs.',
    name: 'Ryan Kinners',
    role: 'HSE Manager (CSE Global)',
  },
  {
    quote:
      'As a small business owner, I simply do not have the time or resources to keep up with growing WHS requirements. ERA makes it manageable. It ensures I meet my obligations as a PCBU through a simple, mobile-first system that keeps everything in one place. We even use it to track hours onsite, reducing unverified labour and streamlining payroll. I can manage my business from anywhere.',
    name: 'Steven Middleton',
    role: 'Business Owner (Easy Scaffolding)',
  },
]

export function TestimonialsSection() {
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
      className="relative flex flex-col items-center"
    >
      {/* Globe — centered behind the title */}
      <div className="relative flex w-full items-center justify-center">
        <div className="relative h-[320px] w-[320px] sm:h-[400px] sm:w-[400px] md:h-[500px] md:w-[500px] lg:h-[650px] lg:w-[650px]">
          {/* Gradient overlay: black at top fading to transparent at bottom */}
          <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-b from-background to-transparent" />
          <Globe />
        </div>
      </div>

      {/* Title — overlays the top half of the globe */}
      <m.div
        variants={fadeUp}
        className="absolute left-0 right-0 top-0 z-20 flex flex-col items-center gap-3 pt-8 text-center md:pt-12"
      >
        <span className="text-xs font-semibold uppercase tracking-wider text-brand-primary">
          Social Proof
        </span>
        <h2 className="max-w-3xl text-balance text-[clamp(2.2rem,_5vw,_3.75rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
          Trusted across <br />Australia and New Zealand
        </h2>
      </m.div>

      {/* Testimonials */}
      <div className="mt-4 grid w-full grid-cols-1 gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <m.blockquote
            key={t.name}
            variants={fadeUp}
            className="flex flex-col gap-4 rounded-2xl border border-border-primary bg-secondary-surface p-6"
          >
            <p className="text-pretty text-sm leading-relaxed text-secondary">
              &ldquo;{t.quote}&rdquo;
            </p>
            <footer className="mt-auto flex flex-col gap-0.5">
              <span className="text-sm font-semibold text-primary">{t.name}</span>
              <span className="text-xs text-tertiary">{t.role}</span>
              {t.detail && (
                <span className="text-xs text-quaternary">{t.detail}</span>
              )}
            </footer>
          </m.blockquote>
        ))}
      </div>
    </m.section>
  )
}
