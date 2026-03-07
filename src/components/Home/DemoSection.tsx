'use client'

import Image from 'next/image'
import { m, useReducedMotion } from 'motion/react'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { AnimatedTitle } from '@/components/ui/AnimatedTitle'

const talkingPoints = [
  'Coordinate incidents in real time',
  'Log hazards before they become risks',
  'Track warden roles and competency',
  'Manage buildings, zones, and plans in one place',
]

const teamMembers = [
  { name: 'Lucy Jennings', src: 'https://i.pravatar.cc/80?img=1' },
  { name: 'Rory Malcolm', src: 'https://i.pravatar.cc/80?img=3' },
  { name: 'Eryn Carman', src: 'https://i.pravatar.cc/80?img=5' },
  { name: 'Ed Dean', src: 'https://i.pravatar.cc/80?img=8' },
]

export function DemoSection() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <m.section
      variants={staggerContainer(0.1)}
      initial={prefersReducedMotion ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="flex flex-col items-center gap-10 md:gap-12"
    >
      {/* Header */}
      <m.div variants={fadeUp} className="flex flex-col items-center gap-3 text-center">
        <AnimatedTitle>See ERA in action</AnimatedTitle>
        <p className="font-jakarta text-secondary max-w-xl text-pretty text-[clamp(0.95rem,_1.5vw,_1.1rem)] leading-snug">
          Incidents, hazards, training, and compliance. One system, always current, everyone connected.
        </p>
      </m.div>

      {/* Mobile: single card with image on top */}
      <m.div variants={fadeUp} className="w-full lg:hidden">
        <div className="overflow-hidden rounded-2xl bg-sand-3">
          <div className="relative m-1 aspect-[4/3] overflow-hidden rounded-xl">
            <Image
              src="https://incident.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsignup-image.81d38d52.png&w=3840&q=75&dpl=dpl_3PH8RWrQkD6ohNBAhiMEa33mQWwE"
              alt="ERA platform dashboard showing incident trends and active incidents"
              fill
              className="object-cover object-left-top"
              sizes="100vw"
            />
          </div>
          <div className="flex flex-col gap-6 p-6">
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold">What we&apos;ll show you</h3>
              <ul className="flex flex-col gap-3">
                {talkingPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-primary" strokeWidth={2.5} />
                    <span className="font-jakarta text-[0.95rem] leading-snug">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-between gap-4">
              <Button variant="brand" size="large" href="/demo">
                Book a Demo
              </Button>
              <div className="flex -space-x-2">
                {teamMembers.map((member) => (
                  <Avatar
                    key={member.name}
                    src={member.src}
                    name={member.name}
                    size="lg"
                    className="ring-2 ring-sand-2"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </m.div>

      {/* Desktop: two-column layout */}
      <m.div variants={fadeUp} className="hidden w-full gap-4 lg:grid lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-2xl bg-sand-3">
          <Image
            src="https://incident.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsignup-image.81d38d52.png&w=3840&q=75&dpl=dpl_3PH8RWrQkD6ohNBAhiMEa33mQWwE"
            alt="ERA platform dashboard showing incident trends and active incidents"
            fill
            className="object-cover object-left-top"
            sizes="50vw"
          />
        </div>
        <div className="flex flex-col justify-between gap-6 rounded-2xl bg-sand-3 p-8">
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">What we&apos;ll show you</h3>
            <ul className="flex flex-col gap-3">
              {talkingPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-primary" strokeWidth={2.5} />
                  <span className="font-jakarta text-[0.95rem] leading-snug">{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-between gap-4">
            <Button variant="brand" size="large" href="/demo">
              Book a Demo
            </Button>
            <div className="flex -space-x-2">
              {teamMembers.map((member) => (
                <Avatar
                  key={member.name}
                  src={member.src}
                  name={member.name}
                  size="lg"
                  className="ring-2 ring-sand-2"
                />
              ))}
            </div>
          </div>
        </div>
      </m.div>
    </m.section>
  )
}
