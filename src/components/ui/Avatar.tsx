import Image from 'next/image'
import { cn } from '@/lib/utils'

const sizeMap: Record<string, string> = {
  xs: 'h-5 w-5',
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-10 w-10',
  xl: 'h-12 w-12',
}

interface AvatarProps {
  src: string
  name: string
  size?: string
  className?: string
}

export function Avatar({ src, name, size = 'md', className }: AvatarProps) {
  return (
    <Image
      src={src}
      alt={name}
      width={80}
      height={80}
      className={cn('rounded-full object-cover', sizeMap[size] || sizeMap.md, className)}
    />
  )
}
