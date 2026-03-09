'use client'

import { Medal, Cup } from '@gravity-ui/icons'
import { m } from 'motion/react'

const SPRING = { type: 'spring' as const, bounce: 0, duration: 0.35 }

const TRAINING_MODULES = [
  {
    icon: Medal,
    name: 'Fire Safety Theory',
    status: 'Completed',
    dotColor: 'bg-emerald-500',
    textColor: 'text-emerald-600',
  },
  {
    icon: Cup,
    name: 'First Aid Basics',
    status: 'Not Started',
    dotColor: 'bg-neutral-500',
    textColor: 'text-neutral-500',
  },
] as const

export function ComplianceScreen() {
  return (
    <div className="flex h-full flex-col bg-black text-sand-12">
      {/* Scrollable content */}
      <div className="flex-1 overflow-hidden bg-black px-3 pb-4">
        {/* Learning progress */}
        <div className="pb-4 pt-1">
          <p className="text-sm font-bold text-sand-12">Your Learning Progress</p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-neutral-800">
            <div className="h-full w-1/4 rounded-full bg-emerald-500" />
          </div>
          <p className="mt-1.5 text-[11px] text-sand-9">1 of 4 completed</p>
        </div>

        {/* Section header */}
        <div className="relative z-0 flex items-center justify-between pb-3">
          <span className="text-sm font-bold text-sand-12">Required Training</span>
        </div>

        {/* Horizontal scrolling cards — 1.5 visible */}
        <div className="relative z-10 -mx-1 flex gap-2 overflow-hidden px-1 py-1">
          {TRAINING_MODULES.map((mod, i) => {
            const Icon = mod.icon
            const isFirst = i === 0

            return (
              <m.div
                key={mod.name}
                {...(isFirst && { layoutId: 'hero-card', layout: true, transition: SPRING })}
                className={`relative flex min-w-[13rem] flex-col justify-between rounded-xl bg-gradient-to-br p-3 aspect-[3/2] ${
                  isFirst ? 'from-sand-3 to-sand-4 ring-2 ring-emerald-500 ring-offset-2 ring-offset-black' : 'from-sand-1 to-sand-2'
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="flex items-center justify-center">
                    <Icon className="size-16 text-white/5" />
                  </span>
                  <button
                    type="button"
                    className="flex size-5 items-center justify-center rounded-full bg-black/15"
                    aria-label={`${mod.name} options`}
                  >
                    <svg viewBox="0 0 16 4" fill="currentColor" className="size-3 text-sand-11" aria-hidden>
                      <circle cx="2" cy="2" r="1.5" />
                      <circle cx="8" cy="2" r="1.5" />
                      <circle cx="14" cy="2" r="1.5" />
                    </svg>
                  </button>
                </div>
                <div>
                  <m.p
                    {...(isFirst && { layoutId: 'hero-title', layout: true, transition: SPRING })}
                    className="text-xs font-semibold text-sand-12"
                  >
                    {mod.name}
                  </m.p>
                  <m.p
                    {...(isFirst && { layoutId: 'hero-stat', layout: true, transition: SPRING })}
                    className={`flex items-center gap-1 text-[11px] ${mod.textColor}`}
                  >
                    <span className={`size-1.5 shrink-0 rounded-full ${mod.dotColor}`} />
                    {mod.status}
                  </m.p>
                </div>
              </m.div>
            )
          })}
        </div>

        {/* Progress section */}
        <div className="mt-3 flex items-center gap-1.5 pb-2">
          <span className="text-xs font-bold text-sand-12">Progress</span>
          <svg viewBox="0 0 16 16" fill="none" className="size-3 text-neutral-500" aria-hidden>
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 5v3M8 10.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        {/* Progress card */}
        <div className="rounded-xl bg-neutral-900 p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-sand-12">Overall completion</span>
            <span className="text-xs font-bold text-emerald-500">1 / 4</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-neutral-800">
            <div className="h-full w-1/4 rounded-full bg-emerald-500" />
          </div>
          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              <span className="flex-1 text-[11px] text-sand-11">Fire Safety Theory</span>
              <span className="text-[11px] font-semibold text-emerald-500">Done</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="size-1.5 rounded-full bg-neutral-600" />
              <span className="flex-1 text-[11px] text-sand-11">First Aid Basics</span>
              <span className="text-[11px] text-sand-9">Not started</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="size-1.5 rounded-full bg-amber-500" />
              <span className="flex-1 text-[11px] text-sand-11">Warden Duties</span>
              <span className="text-[11px] text-amber-500">In progress</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="size-1.5 rounded-full bg-neutral-600" />
              <span className="flex-1 text-[11px] text-sand-11">Emergency Evacuation</span>
              <span className="text-[11px] text-sand-9">Not started</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
