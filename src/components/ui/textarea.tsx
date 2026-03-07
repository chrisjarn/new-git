import * as React from 'react'
import { cn } from '@/lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
    return (
        <textarea
            data-slot="textarea"
            className={cn(
                'bg-sand-2 placeholder:text-muted-foreground field-sizing-content flex min-h-16 w-full rounded-md border-none px-3 py-2 text-base shadow-sm outline-none ring-0 ring-sand-5 transition-[color,box-shadow] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                'focus-visible:ring-[3px]',
                'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
                className
            )}
            {...props}
        />
    )
}

export { Textarea }