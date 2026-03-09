'use client'

import { m, AnimatePresence, LayoutGroup, useReducedMotion } from 'motion/react'
import { TextMorph } from 'torph/react'
import useMeasure from 'react-use-measure'
import { StatusBar, WalletsScreen, ComplianceScreen, HazardLogScreen } from '@/components/ios-ui'

const SCREENS = [WalletsScreen, ComplianceScreen, HazardLogScreen]
const NAV_TITLES = ['Sites', 'Improve'] as const
const STATUS_TIMES = ['9:27', '10:01', '10:14'] as const

const SPRING = { type: 'spring' as const, bounce: 0, duration: 0.35 }

export const MobileAiAssistantIllustration = ({ activeIndex = 0 }: { activeIndex?: number }) => {
    const prefersReducedMotion = useReducedMotion()
    const [ref, bounds] = useMeasure()
    const Screen = SCREENS[activeIndex] ?? WalletsScreen
    const showSharedNav = activeIndex != null && activeIndex < 2

    return (
        <div
            aria-hidden
            className="mask-b-from-75% min-w-92 max-w-92 translate-y-44 relative px-4 pt-2">
            <div className="bg-background/75 ring-border shadow-black/6.5 mx-auto items-end overflow-hidden rounded-t-[2.5rem] border border-transparent px-2 pt-2 shadow-md ring-1">
                <m.div
                    animate={{ height: bounds.height || 'auto' }}
                    transition={prefersReducedMotion ? { duration: 0 } : SPRING}
                    className="ring-border shadow-black/6.5 overflow-hidden rounded-t-[2rem] shadow ring-1"
                >
                    <div ref={ref}>
                        {/* Persistent nav bar for screens 0-1 */}
                        {showSharedNav && (
                            <div className="bg-black">
                                <StatusBar time={STATUS_TIMES[activeIndex]} />
                                <div className="flex items-center justify-center px-4 pb-2 pt-6">
                                    <TextMorph className="text-lg font-semibold text-sand-12">
                                        {NAV_TITLES[activeIndex]}
                                    </TextMorph>
                                </div>
                            </div>
                        )}

                        <LayoutGroup>
                            <AnimatePresence mode="popLayout" initial={false}>
                                <m.div
                                    key={activeIndex}
                                    initial={prefersReducedMotion ? false : { opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{
                                        duration: prefersReducedMotion ? 0 : 0.2,
                                        ease: [0.32, 0.72, 0, 1],
                                    }}
                                >
                                    <Screen />
                                </m.div>
                            </AnimatePresence>
                        </LayoutGroup>
                    </div>
                </m.div>
            </div>
        </div>
    )
}

export default MobileAiAssistantIllustration
