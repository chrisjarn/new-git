'use client'

import { m, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { ArrowRightCircleIcon } from '@/components/ui/Icons'
import { CustomerLogos } from '@/components/Home/CustomerLogos'
import { PageSubtitle, PageTitle } from '@/components/Layouts/PageHead'
import { WidthContainer } from '@/components/Layouts/WidthContainer'
import { FAQ } from './HomeFAQ'
import { HeroPreview } from './HeroPreview'
import { SectionConnector } from './SectionConnector'
import { CriticalSection } from './CriticalSection'
import { CaptureSection } from './CaptureSection'
import { ImproveSection } from './ImproveSection'
import { MySiteSection } from './MySiteSection'
import { ComplianceGapsSection } from './ComplianceGapsSection'
import { TestimonialsSection } from './TestimonialsSection'
import { StatsSection } from './StatsSection'
import { SectorsSection } from './SectorsSection'
import { ComplianceSection } from './ComplianceSection'
import { DemoSection } from './DemoSection'
import { PhoneMockup } from './PhoneMockup'
import FooterLines from './FooterLines'
import { fadeUp, staggerContainer } from '@/lib/motion'

export function Manifesto() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="w-full overflow-hidden">
      {/* Hero */}
      <div id="hero" className="scroll-mt-16" />
      <WidthContainer className="gap-4 pt-40 md:pt-16 lg:pt-20 lg:text-start xl:pt-24 2xl:pt-28">
        <m.div
          variants={staggerContainer()}
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          animate="visible"
          className="flex flex-col gap-4"
        >
          <m.div variants={fadeUp}>
            <PageTitle className="leading-[1] font-semibold">
              One platform. 
              <br />
              One workflow.
              <br />
              <span className="whitespace-nowrap">Complete Readiness.</span>
            </PageTitle>
          </m.div>

          <m.div variants={fadeUp}>
            <PageSubtitle className="text-secondary text-balance  font-normal max-w-[50ch] leading-snug">
              ERA replaces fragmented safety systems with a single platform that connects buildings, tenants, and compliance obligations into one coordinated workflow.
            </PageSubtitle>
          </m.div>

          <m.div variants={fadeUp} className="mt-2">
            <CTA />
          </m.div>

          <m.div variants={fadeUp}>
            <CustomerLogos />
          </m.div>
        </m.div>
      </WidthContainer>

      {/* Hero Preview — bento grid */}
      <WidthContainer className="py-8 md:py-12 lg:py-16">
        <HeroPreview />
      </WidthContainer>

      {/* Feature sections */}
      <div id="features" className="scroll-mt-16" />
      <WidthContainer className="gap-0 py-8 md:py-16 lg:py-20 xl:py-24">
        <CriticalSection />

        <SectionConnector />

        <CaptureSection />

        <SectionConnector />

        <ImproveSection />

        <SectionConnector />

        <MySiteSection />
      </WidthContainer>

      {/* Phone Mockup + Footer Lines — phone sits on the green line */}
      <WidthContainer className="pb-0 ">
        <PhoneMockup />
      </WidthContainer>
      <div className="mx-auto w-full max-w-7xl py-0">
        <FooterLines />
      </div>

      {/* Compliance Gaps — The Problem */}
      <WidthContainer className="gap-0 py-20 md:py-16 lg:py-30 xl:py-30">
        <ComplianceGapsSection />
      </WidthContainer>

      {/* Testimonials — Social Proof */}
      <WidthContainer className="gap-0 py-8 md:py-16 lg:py-20 xl:py-24">
        <TestimonialsSection />
      </WidthContainer>

      {/* Stats — Proof in Numbers */}
      <WidthContainer className="gap-0 py-8 md:py-16 lg:py-20 xl:py-24">
        <StatsSection />
      </WidthContainer>

      {/* Sectors — Industries */}
      <div id="sectors" className="scroll-mt-16" />
      <SectorsSection />

      {/* Compliance Standards */}
      <div id="compliance" className="scroll-mt-16" />
      <WidthContainer className="gap-0 py-8 md:py-16 lg:py-20 xl:py-24">
        <ComplianceSection />
      </WidthContainer>

      {/* Demo CTA */}
      <WidthContainer className="gap-0 py-8 md:py-16 lg:py-20 xl:py-24">
        <DemoSection />
      </WidthContainer>

      {/* Founder note + CTA + FAQ */}
      <WidthContainer className="gap-12 py-8 md:gap-24 md:py-16 lg:gap-28 lg:py-20 xl:gap-32 xl:py-24">
        <AnimatedSection className='flex '>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_2fr] md:gap-x-[4.5rem]">
            <SectionHeading>Common questions</SectionHeading>
            <FAQ />
          </div>
        </AnimatedSection>
      </WidthContainer>
    </div>
  )
}

function SectionHeading({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <m.h3
      variants={fadeUp}
      className={cn(
        'scroll-mt-20 text-balance text-[clamp(2.2rem,_5vw,_3.75rem)] font-semibold leading-[1.05] tracking-[-0.02em]',
        className
      )}
    >
      {children}
    </m.h3>
  )
}

function AnimatedSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const prefersReducedMotion = useReducedMotion()
  return (
    <m.section
      variants={staggerContainer(0.1)}
      initial={prefersReducedMotion ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className={cn('flex flex-col gap-4', className)}
    >
      {children}
    </m.section>
  )
}

function CTA() {
  return (
    <div className="flex flex-row gap-3 lg:w-max">
      <Button
        variant="flat"
        size='large'
        href="/how-it-works"
    
      >
        See How It Works
      </Button>
      <Button
        variant="brand"
        size='large'
        href="/demo"
        rightSlot={<ArrowRightCircleIcon />}
 
      >
        Request a Demo
      </Button>
    </div>
  )
}
