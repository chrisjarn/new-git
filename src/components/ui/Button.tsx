'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ButtonProps {
  children?: React.ReactNode
  className?: string
  variant?: 'base' | 'primary' | 'flat' | 'plain' | 'brand' | 'text' | 'none'
  size?: 'sm' | 'base' | 'large'
  href?: string
  onClick?: () => void
  fullWidth?: boolean
  round?: boolean
  iconOnly?: React.ReactNode | boolean
  icon?: React.ComponentType<{ className?: string }>
  iconPosition?: 'left' | 'right'
  accessibilityLabel?: string
  rightSlot?: React.ReactNode
  target?: string
  rel?: string
}

const variantClasses: Record<string, string> = {
  base: 'bg-elevated-surface border border-border-primary text-primary active:scale-[0.97] hover:bg-sand-3 shadow-sm',
  primary: 'bg-sand-12 text-sand-1 hover:bg-sand-11 active:scale-[0.97]',
  flat: 'bg-sand-3 text-primary hover:bg-sand-4 active:scale-[0.97]',
  plain: 'text-secondary hover:bg-sand-3 hover:text-primary',
  brand: 'bg-brand-primary text-white hover:bg-brand-secondary shadow-sm active:scale-[0.97]',
  text: 'text-secondary hover:text-primary underline-offset-2 active:scale-[0.97]',
  none: '',
}

const sizeClasses: Record<string, string> = {
  sm: 'px-2.5 py-1 text-sm',
  base: 'px-3 py-1.5 text-sm',
  large: 'px-4 py-2.5 text-base',
}

export function Button({
  children,
  className,
  variant = 'base',
  size = 'base',
  href,
  onClick,
  fullWidth,
  round: _round, // eslint-disable-line @typescript-eslint/no-unused-vars
  iconOnly,
  icon: Icon,
  iconPosition = 'right',
  accessibilityLabel,
  rightSlot,
  target,
  rel,
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 font-medium transition-all duration-100 select-none rounded-full',
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && 'w-full',
    iconOnly && 'p-2',
    Icon && 'gap-1.5',
    Icon && size === 'large' && (iconPosition === 'left' ? 'pl-3.5 pr-4' : 'pl-4 pr-3.5'),
    className
  )

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="size-4.5" />}
      {typeof iconOnly === 'object' ? iconOnly : children}
      {Icon && iconPosition !== 'left' && <Icon className="size-4.5" />}
      {rightSlot && <span className="flex items-center">{rightSlot}</span>}
    </>
  )

  if (href) {
    return (
      <Link href={href} className={classes} target={target} rel={rel} aria-label={accessibilityLabel}>
        {content}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={classes} aria-label={accessibilityLabel}>
      {content}
    </button>
  )
}
