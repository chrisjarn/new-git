'use client'

import { m, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { ArrowRightCircleIcon } from '@/components/ui/Icons'
import { CustomerLogos } from '@/components/Home/CustomerLogos'
import { PageSubtitle, PageTitle } from '@/components/Layouts/PageHead'
import { WidthContainer } from '@/components/Layouts/WidthContainer'
import { AnimatedTitle } from '@/components/ui/AnimatedTitle'
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
import IsometricCity from '@/components/illustrations/IsometricCity'
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
              ERA connects buildings, tenants, and wardens into one platform so when the alarm sounds, everyone knows exactly what to do.
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
      <WidthContainer className="py-16 md:py-12 lg:py-16">
        <HeroPreview />
      </WidthContainer>

      {/* Feature sections */}
      <div id="features" className="scroll-mt-16" />
      <WidthContainer className="gap-0 py-16 md:py-16 lg:py-20 xl:py-24">
        <CriticalSection />

        <SectionConnector />

        <CaptureSection />

        <SectionConnector />

        <ImproveSection />

        <SectionConnector />

        <MySiteSection />
      </WidthContainer>

      {/* Phone Mockup + Footer Lines — phone sits on the green line */}
      <WidthContainer className="relative z-10 overflow-visible pb-0">
        <PhoneMockup />
      </WidthContainer>
      <div className="relative z-10 mx-auto w-full max-w-7xl py-0">
        <FooterLines alwaysLit />
      </div>

      {/* Compliance Gaps — The Problem */}
      <WidthContainer className="relative z-0 gap-0 pt-20 pb-0 md:pt-16 md:pb-0 lg:pt-30 lg:pb-0 xl:pt-30 xl:pb-0">
        <ComplianceGapsSection />
        <IsometricCity />
      </WidthContainer>

      {/* Testimonials — Social Proof */}
      <TestimonialsSection />

      {/* Stats — Proof in Numbers */}
      <WidthContainer className="gap-0 py-16 md:py-16 lg:py-20 xl:py-24">
        <StatsSection />
      </WidthContainer>

      {/* Sectors — Industries */}
      <div id="sectors" className="scroll-mt-16" />
      <SectorsSection />

      {/* Compliance Standards */}
      <div id="compliance" className="scroll-mt-16" />
      <ComplianceSection />

      {/* Demo CTA */}
      <WidthContainer className="gap-0 py-16 md:py-16 lg:py-20 xl:py-24">
        <DemoSection />
      </WidthContainer>

      {/* Founder note + CTA + FAQ */}
      <WidthContainer className="gap-12 py-16 md:gap-24 md:py-16 lg:gap-28 lg:py-20 xl:gap-32 xl:py-24">
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

function SectionHeading({ children, className }: { children: string; className?: string }) {
  return <AnimatedTitle as="h3" className={cn('scroll-mt-20', className)}>{children}</AnimatedTitle>
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
        href="#features"
        className="md:hidden"
        onClick={() => {
          document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
        }}
      >
        See Features
      </Button>
      <Button
        variant="flat"
        size='large'
        href="/how-it-works"
        className="hidden md:inline-flex"
      >
        Watch a 2-Min Overview
      </Button>
      <Button
        variant="brand"
        size='large'
        href="/contact"
        rightSlot={<ArrowRightCircleIcon />}

      >
        Book a Demo
      </Button>
    </div>
  )
}
