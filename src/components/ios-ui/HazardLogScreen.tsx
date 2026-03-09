'use client'

import { House } from '@gravity-ui/icons'
import { m } from 'motion/react'
import { StatusBar } from './StatusBar'

const SPRING = { type: 'spring' as const, bounce: 0, duration: 0.35 }

const SEVERITY_LEVELS = ['Low', 'Medium', 'High', 'Critical'] as const

export function HazardLogScreen() {
  return (
    <div className="flex h-full flex-col bg-black text-sand-12">
      <StatusBar time="10:14" />

      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5 text-sand-11" aria-hidden>
          <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-full bg-neutral-800">
            <House className="size-3.5 text-sand-11" />
          </div>
          <m.span layoutId="hero-title" layout transition={SPRING} className="text-sm font-semibold">
            Vic Park Centre
          </m.span>
        </div>
      </div>

      {/* Title */}
      <div className="px-4 pb-3">
        <m.h2 layoutId="hero-stat" layout transition={SPRING} className="text-lg font-bold">
          Log Hazard
        </m.h2>
        <p className="text-xs text-sand-9">Report a workplace hazard or near-miss</p>
      </div>

      {/* Photo upload area */}
      <div className="px-4 pb-3">
        <div className="flex h-24 flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-neutral-700 bg-neutral-900">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6 text-sand-9" aria-hidden>
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="13" r="4" />
          </svg>
          <span className="text-[11px] text-sand-9">Tap to add photo</span>
        </div>
      </div>

      {/* Severity selector */}
      <div className="px-4 pb-3">
        <label className="mb-1.5 block text-xs font-semibold text-sand-11">Severity</label>
        <div className="flex gap-1.5">
          {SEVERITY_LEVELS.map((level) => (
            <span
              key={level}
              className={`flex-1 rounded-full py-1.5 text-center text-[11px] font-semibold ${
                level === 'High'
                  ? 'bg-orange-500/20 text-orange-400 ring-1 ring-orange-500/40'
                  : 'bg-neutral-800 text-sand-9'
              }`}
            >
              {level}
            </span>
          ))}
        </div>
      </div>

      {/* Assignee field */}
      <div className="px-4 pb-3">
        <label className="mb-1.5 block text-xs font-semibold text-sand-11">Assign to</label>
        <div className="flex items-center justify-between rounded-xl bg-neutral-900 px-3 py-2.5">
          <div className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded-full bg-brand-primary text-[10px] font-bold text-white">
              JK
            </div>
            <span className="text-sm text-sand-12">Jamie K.</span>
          </div>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4 text-sand-9" aria-hidden>
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Submit button */}
      <div className="px-4 pb-4">
        <div className="w-full rounded-xl bg-brand-primary py-3 text-center text-sm font-semibold text-white">
          Submit Hazard Report
        </div>
      </div>
    </div>
  )
}
