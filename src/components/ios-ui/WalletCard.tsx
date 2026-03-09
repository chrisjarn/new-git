'use client'

import { m } from 'motion/react'
import { cn } from '@/lib/utils'

type Status = 'compliant' | 'action' | 'overdue'

const STATUS_CONFIG: Record<Status, { label: string; dot: string; text: string }> = {
  compliant: { label: 'Compliant', dot: 'bg-emerald-500', text: 'text-emerald-600' },
  action: { label: 'Action required', dot: 'bg-red-500', text: 'text-red-600' },
  overdue: { label: 'Overdue', dot: 'bg-orange-500', text: 'text-orange-600' },
}

const SPRING = { type: 'spring' as const, bounce: 0, duration: 0.35 }

interface WalletCardProps {
  icon: React.ReactNode
  name: string
  status: Status
  selected?: boolean
  cardLayoutId?: string
}

export function WalletCard({ icon, name, status, selected, cardLayoutId }: WalletCardProps) {
  const { label, dot, text } = STATUS_CONFIG[status]
  const Tag = cardLayoutId ? m.div : 'div'

  return (
    <Tag
      {...(cardLayoutId && { layoutId: cardLayoutId, layout: true, transition: SPRING })}
      className={cn(
        'relative flex flex-col justify-between rounded-xl p-2.5 aspect-[4/3] bg-gradient-to-br from-sand-1 to-sand-2',
        selected && 'z-10 ring-2 ring-brand-primary ring-offset-2 ring-offset-black'
      )}
    >
      <div className="flex items-start justify-between">
        <span className="flex size-7 items-center justify-center rounded-full bg-sand-3">{icon}</span>
        <button
          type="button"
          className="flex size-5 items-center justify-center rounded-full bg-black/15"
          aria-label={`${name} options`}
        >
          <svg viewBox="0 0 16 4" fill="currentColor" className="size-3 text-sand-11" aria-hidden>
            <circle cx="2" cy="2" r="1.5" />
            <circle cx="8" cy="2" r="1.5" />
            <circle cx="14" cy="2" r="1.5" />
          </svg>
        </button>
      </div>
      <div>
        <p className="text-xs font-semibold text-sand-12">{name}</p>
        <p className={cn('flex items-center gap-1 text-[11px]', text)}>
          <span className={cn('size-1.5 shrink-0 rounded-full', dot)} />
          {label}
        </p>
      </div>
    </Tag>
  )
}
