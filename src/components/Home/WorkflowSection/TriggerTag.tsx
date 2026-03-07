'use client'

import type { ReactNode } from 'react'
import { Badge } from '@/components/ui/Badge'

interface TriggerTagProps {
  icon: ReactNode
  label: string
  isHighlighted: boolean
}

export function TriggerTag({ icon, label, isHighlighted }: TriggerTagProps) {
  return (
    <Badge
      variant="icon"
      className="font-jakarta text-sm bg-sand-3 px-3 py-2 font-semibold transition-colors duration-300"
      style={{ color: isHighlighted ? 'var(--color-brand-primary)' : undefined }}
    >
      {icon}
      {label}
    </Badge>
  )
}
