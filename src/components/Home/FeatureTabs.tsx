'use client'

import { useRef, useState } from 'react'
import { m, LayoutGroup, useReducedMotion } from 'motion/react'

interface FeatureTabsProps {
  items: string[]
  accentColor: string
  sectionId: string
  surfaceColor?: string
  activeIndex?: number
  onTabChange?: (index: number) => void
  size?: 'sm' | 'base'
}

export function FeatureTabs({ items, accentColor, sectionId, surfaceColor, activeIndex: controlledIndex, onTabChange, size = 'sm' }: FeatureTabsProps) {
  const [internalIndex, setInternalIndex] = useState(0)
  const activeIndex = controlledIndex ?? internalIndex
  const prefersReducedMotion = useReducedMotion()
  const scrollRef = useRef<HTMLDivElement>(null)

  function handleClick(index: number, el: HTMLButtonElement) {
    if (onTabChange) {
      onTabChange(index)
    } else {
      setInternalIndex(index)
    }
    const container = scrollRef.current
    if (!container) return
    const scrollLeft = el.offsetLeft - container.offsetWidth / 2 + el.offsetWidth / 2
    container.scrollTo({ left: scrollLeft, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-4 md:w-8"
        style={{
          background: `linear-gradient(to right, var(--color-${surfaceColor ?? 'primary-surface'}), transparent)`,
        }}
      />
      <LayoutGroup id={sectionId}>
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto px-2 py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] md:px-8"
        >
          {items.map((item, index) => {
            const isActive = index === activeIndex
            return (
              <button
                key={item}
                type="button"
                onClick={(e) => handleClick(index, e.currentTarget)}
                className={`text-secondary relative whitespace-nowrap rounded-full font-semibold transition-colors ${size === 'base' ? 'px-4 py-2.5 text-base' : 'px-3 py-2 text-sm'}`}
                style={{
                  color: isActive ? accentColor : undefined,
                }}
              >
                {isActive &&
                  (prefersReducedMotion ? (
                    <div
                      className="bg-tertiary-surface absolute inset-0 rounded-full"
                    />
                  ) : (
                    <m.div
                      layoutId={`tab-pill-${sectionId}`}
                      className="bg-tertiary-surface absolute inset-0 rounded-full"
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 35,
                      }}
                    />
                  ))}
                <span className="relative z-[1]">
                  {item}
                </span>
              </button>
            )
          })}
        </div>
      </LayoutGroup>

      {/* Right fade */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-4 md:w-8"
        style={{
          background: `linear-gradient(to left, var(--color-${surfaceColor ?? 'primary-surface'}), transparent)`,
        }}
      />
    </div>
  )
}
