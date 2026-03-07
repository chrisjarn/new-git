import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import type { AccentColor } from './types'

const bgColorMap: Record<AccentColor, string> = {
  red: 'bg-red-500',
  green: 'bg-emerald-500',
  brand: 'bg-brand-primary',
}

const strokeColorMap: Record<AccentColor, string> = {
  red: 'stroke-red-500',
  green: 'stroke-emerald-500',
  brand: 'stroke-brand-primary',
}

interface ProgressCircleProps {
  isActive: boolean
  children: ReactNode
  accentColor?: AccentColor
  isRight?: boolean
}

export function ProgressCircle({ isActive, children, accentColor = 'brand', isRight = true }: ProgressCircleProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'absolute top-[3.9rem] z-[9] flex size-12 items-center justify-center',
        'left-[-2.25rem]',
        isRight ? 'md:left-[-1.5rem]' : 'md:left-auto md:right-[-1.5rem]'
      )}
    >
      {/* Background fill circle */}
      <div
        className={cn(
          'absolute inset-0 rounded-full transition-all duration-500 ease-in-out',
          isActive ? cn(bgColorMap[accentColor], 'scale-100') : 'scale-100 bg-primary-surface'
        )}
      />

      {/* Stroke ring */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        className="absolute left-0 top-0 size-12 -rotate-90 fill-background stroke-tertiary-surface stroke-2"
      >
        <circle cx="24" cy="24" r="23" className={cn(isActive && 'stroke-transparent')} />
        <circle
          cx="24"
          cy="24"
          r="23"
          data-active={isActive}
          className={cn(
            'fill-transparent transition-all duration-500 ease-in-out',
            '[stroke-dasharray:145px] [stroke-dashoffset:145px]',
            'data-[active=true]:[stroke-dashoffset:0px]',
            strokeColorMap[accentColor]
          )}
        />
      </svg>

      {/* Icon */}
      <div
        className={cn(
          'relative transition duration-300',
          isActive ? 'opacity-100 grayscale-0 text-white' : 'opacity-20 grayscale'
        )}
      >
        {children}
      </div>
    </div>
  )
}
