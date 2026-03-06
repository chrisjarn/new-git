import { cn } from '@/lib/utils'
import { Pencil } from '@gravity-ui/icons'

export function InvoiceIllustration({ className }: { className?: string }) {
  return (
    <div aria-hidden className="relative translate-y-6 md:translate-y-20">
      <div
        className={cn(
          'mask-b-from-65% group relative -mx-4 px-4 pt-6',
          'before:bg-black before:border-border-primary before:absolute before:inset-x-6 before:bottom-0 before:top-4 before:z-[1] before:rounded-2xl before:ring-1 before:ring-border-secondary',
          'after:bg-black after:absolute after:inset-x-9 after:bottom-0 after:top-2 after:rounded-2xl after:ring-1 after:ring-border-secondary',
          className
        )}
      >
        <div className="relative z-10 overflow-hidden rounded-2xl border border-border-primary bg-black p-5 text-sm shadow-xl ring-1 ring-border-secondary md:p-8">
          <div className="mb-6 flex items-start justify-between gap-8">
            <div className="space-y-0.5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-white">E</span>
              </div>
              <div className="mt-4 font-mono text-xs text-tertiary">INC-456789</div>
              <div className="mt-1 -translate-x-1 font-mono text-2xl font-semibold">Active</div>
              <div className="text-xs font-medium text-secondary">Fire alarm — Level 3</div>
            </div>

            <DocumentIllustration />
          </div>

          <div className="space-y-1.5">
            <div className="grid grid-cols-[auto_1fr] items-center">
              <span className="block w-18 text-tertiary">Zone</span>
              <span className="h-2 w-1/4 rounded-full bg-border-secondary px-2" />
            </div>

            <div className="grid grid-cols-[auto_1fr] items-center">
              <span className="block w-18 text-tertiary">Warden</span>
              <span className="h-2 w-1/2 rounded-full bg-border-secondary px-2" />
            </div>

            <div className="grid grid-cols-[auto_1fr] items-center">
              <span className="block w-18 text-tertiary">Status</span>
              <span className="h-2 w-2/3 rounded-full bg-border-secondary px-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function DocumentIllustration() {
  return (
    <div
      aria-hidden
      className="w-16 space-y-2 rounded-md bg-secondary-surface p-2 shadow-md ring-1 ring-border-secondary"
    >
      <div className="flex items-center gap-1">
        <div className="size-2.5 rounded-full bg-border-secondary" />
        <div className="h-[3px] w-4 rounded-full bg-border-secondary" />
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center gap-1">
          <div className="h-[3px] w-2.5 rounded-full bg-border-secondary" />
          <div className="h-[3px] w-6 rounded-full bg-border-secondary" />
        </div>
        <div className="flex items-center gap-1">
          <div className="h-[3px] w-2.5 rounded-full bg-border-secondary" />
          <div className="h-[3px] w-6 rounded-full bg-border-secondary" />
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="h-0.75 w-full rounded-full bg-border-secondary" />
        <div className="flex items-center gap-1">
          <div className="h-0.75 w-2/3 rounded-full bg-border-secondary" />
          <div className="h-0.75 w-1/3 rounded-full bg-border-secondary" />
        </div>
      </div>

      <Pencil className="ml-auto size-3" />
    </div>
  )
}
