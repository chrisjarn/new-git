'use client'

import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { cubicBezier, m } from 'motion/react'

import { cn } from '@/lib/utils'

const easeSwift = cubicBezier(0.19, 1, 0.22, 1)

const containerVariants = {
  inactive: { height: 0 },
  active: {
    height: 'auto',
    transition: { ease: easeSwift, duration: 0.35 },
  },
}

const answerVariants = {
  inactive: { opacity: 0 },
  active: { opacity: 1, transition: { delay: 0.15, duration: 0.2 } },
}

function SvgPlus() {
  return (
    <svg
      viewBox="0 0 52 52"
      className="size-10 shrink-0 stroke-primary md:size-13"
      xmlns="http://www.w3.org/2000/svg"
    >
      <m.path
        variants={{
          inactive: { rotateZ: 0 },
          active: { rotateZ: 180 },
        }}
        transition={{ ease: 'linear', duration: 0.2 }}
        d="M19 25.5H26L33 25.5"
        strokeWidth="2"
        strokeLinecap="round"
        style={{ transformOrigin: '26px 25.5px 0px' }}
      />
      <m.path
        variants={{
          inactive: { rotateZ: 0, scale: 1 },
          active: { rotateZ: 80, scale: 0 },
        }}
        transition={{ ease: 'linear', duration: 0.2 }}
        d="M26 18.5L26 25.5L26 32.5"
        strokeWidth="2"
        strokeLinecap="round"
        style={{ transformOrigin: '26px 25.5px 0px' }}
      />
    </svg>
  )
}

const AccordionOpenContext = React.createContext<Set<string>>(new Set())
const AccordionItemContext = React.createContext<string>('')

function Accordion(
  props: React.ComponentProps<typeof AccordionPrimitive.Root>,
) {
  const [openItems, setOpenItems] = React.useState<Set<string>>(new Set())

  if (props.type === 'multiple') {
    const { onValueChange, children, ...rest } = props
    return (
      <AccordionOpenContext.Provider value={openItems}>
        <AccordionPrimitive.Root
          {...rest}
          type="multiple"
          onValueChange={(value) => {
            setOpenItems(new Set(value))
            onValueChange?.(value)
          }}
        >
          {children}
        </AccordionPrimitive.Root>
      </AccordionOpenContext.Provider>
    )
  }

  const {
    onValueChange,
    children,
    ...rest
  } = props as AccordionPrimitive.AccordionSingleProps &
    React.RefAttributes<HTMLDivElement>
  return (
    <AccordionOpenContext.Provider value={openItems}>
      <AccordionPrimitive.Root
        {...rest}
        type="single"
        onValueChange={(value: string) => {
          setOpenItems(value ? new Set([value]) : new Set())
          onValueChange?.(value)
        }}
      >
        {children}
      </AccordionPrimitive.Root>
    </AccordionOpenContext.Provider>
  )
}

function AccordionItem({
  className,
  value,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionItemContext.Provider value={value}>
      <AccordionPrimitive.Item
        data-slot="accordion-item"
        value={value}
        className={cn(
          'mb-2 rounded-xl pb-1.5 last:mb-0 dark:bg-sand-2 ',
          className,
        )}
        {...props}
      />
    </AccordionItemContext.Provider>
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  const openItems = React.useContext(AccordionOpenContext)
  const itemValue = React.useContext(AccordionItemContext)
  const isOpen = openItems.has(itemValue)

  return (
    <AccordionPrimitive.Header asChild>
      <m.div
        variants={{ inactive: {}, active: {} }}
        initial="inactive"
        animate={isOpen ? 'active' : 'inactive'}
      >
        <AccordionPrimitive.Trigger
          data-slot="accordion-trigger"
          className={cn(
            'flex w-full cursor-pointer appearance-none items-center justify-between gap-2 bg-none p-[10px_8px_4px_24px]',
            className,
          )}
          {...props}
        >
          <h3 className="text-left text-lg font-medium leading-[135%] tracking-[-0.33px]">
            {children}
          </h3>
          <SvgPlus />
        </AccordionPrimitive.Trigger>
      </m.div>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  const openItems = React.useContext(AccordionOpenContext)
  const itemValue = React.useContext(AccordionItemContext)
  const isOpen = openItems.has(itemValue)

  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      forceMount
      {...props}
    >
      <m.div
        variants={containerVariants}
        initial="inactive"
        animate={isOpen ? 'active' : 'inactive'}
        className="overflow-hidden"
      >
        <m.div
          variants={answerVariants}
          className={cn(
            'w-[calc(100%-60px)] pb-4 pl-6 pr-2 leading-[150%] tracking-[-0.18px] dark:text-muted-foreground',
            className,
          )}
        >
          {children}
        </m.div>
      </m.div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
