'use client'

import Image from 'next/image'
import { m, useReducedMotion } from 'motion/react'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import { fadeUp, staggerContainer } from '@/lib/motion'

const talkingPoints = [
  'All-in-one incident management',
  'Our unmatched speed of deployment',
  "Why we're loved by users and easily adopted",
  'How we work for the whole organization',
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
      className="flex flex-col items-center gap-6 md:gap-10"
    >
      {/* Header */}
      <m.div variants={fadeUp} className="flex flex-col items-center gap-3 text-center">
        <h2 className="text-balance text-[clamp(2.2rem,_5vw,_3.75rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
          So good, you&apos;ll break things on purpose
        </h2>
        <p className="font-jakarta text-secondary max-w-xl text-pretty text-[clamp(0.95rem,_1.5vw,_1.1rem)] leading-snug">
          Ready for modern incident management? Book a call with one of our experts today.
        </p>
      </m.div>

      {/* Two-column card row */}
      <m.div variants={fadeUp} className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Left — Image */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-sand-3 lg:aspect-auto">
          <Image
            src="https://incident.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsignup-image.81d38d52.png&w=3840&q=75&dpl=dpl_3PH8RWrQkD6ohNBAhiMEa33mQWwE"
            alt="ERA platform dashboard showing incident trends and active incidents"
            fill
            className="object-cover object-left-top"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Right — Info card */}
        <div className="flex flex-col justify-between gap-6 rounded-2xl bg-sand-3 p-6 lg:p-8">
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">We&apos;d love to talk to you about</h3>
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
              Get a demo
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
