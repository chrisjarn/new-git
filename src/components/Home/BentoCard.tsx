import { cn } from '@/lib/utils'

interface BentoCardProps {
  children: React.ReactNode
  className?: string
}

export function BentoCard({ children, className }: BentoCardProps) {
  return (
    <div
      className={cn(
        'bg-secondary-surface overflow-hidden rounded-2xl shadow-sm transition-shadow hover:shadow-md',
        className
      )}
    >
      {children}
    </div>
  )
}
