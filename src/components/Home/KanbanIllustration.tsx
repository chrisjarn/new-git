import { CirclePlus } from '@gravity-ui/icons'

export function KanbanIllustration() {
  return (
    <div
      className="w-full mask-b-from-65% translate-x-[10%] border bg-black rounded-2xl p-4 md:min-w-md md:translate-x-[15%] translate-y-25 "
      aria-hidden
    >
      <div className="grid grid-cols-2 gap-2 *:rounded-xl *:border *:border-border-primary/40 *:p-1">
        <div>
          <div className="px-2 pb-2 pt-1 text-sm font-semibold text-secondary">In Progress</div>
          <div className="space-y-3">
            <div className="relative h-32 rounded-xl ring-1 ring-border-secondary">
              <div
                className="absolute inset-2 z-0 opacity-25"
                style={{
                  backgroundImage: 'radial-gradient(circle at 1px 1px, var(--color-sand-9) 1px, transparent 0)',
                  backgroundSize: '12px 12px',
                }}
              />
              <div className="absolute inset-0 z-[1] flex h-32 translate-x-4 translate-y-4 rotate-[4deg] flex-col justify-between rounded-xl bg-secondary-surface p-4 shadow-2xl shadow-brand-primary/20 ring-1 ring-border-secondary dark:shadow-black/50">
                <div className="text-sm font-semibold">Schedule fire drill, Tower B</div>
                <div className="flex items-center gap-1.5">
                  <div className="size-4 rounded-full bg-quaternary-surface" />
                  <span className="text-sm text-white font-medium">S. Park</span>
                </div>
              </div>
            </div>
            <div className="flex h-32 flex-col justify-between rounded-xl bg-elevated-surface p-4 ring-1 ring-border-secondary">
              <div className="text-sm font-semibold">Update evacuation signage L2</div>
              <div className="flex items-center gap-1.5">
                <div className="size-4 rounded-full bg-quaternary-surface" />
                <span className="text-sm text-white font-medium">K. Liu</span>
              </div>
            </div>
            <div className="flex cursor-pointer gap-2 rounded-xl bg-primary/5 p-2">
              <CirclePlus className="size-4 opacity-50" />
              <span className="text-sm font-medium">Add action</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="px-2 pb-2 pt-1 text-sm font-semibold text-secondary">Ready for Review</div>
          <div className="space-y-3">
            <div className="relative flex h-32 items-center justify-center rounded-xl ring-1 ring-muted">
              <div className="text-sm font-semibold text-muted-foreground">Drop here</div>
              <div
                className="absolute bg-muted inset-2 z-0 opacity-15"
                style={{
                  backgroundImage: 'radial-gradient(circle at 1px 1px, var(--color-brand-primary) 1px, transparent 0)',
                  backgroundSize: '12px 12px',
                }}
              />
            </div>
          </div>
          <div className="mt-auto flex cursor-pointer gap-2 rounded-xl bg-primary/5 p-2">
            <CirclePlus className="size-4 opacity-50" />
            <span className="text-sm font-medium">Add action</span>
          </div>
        </div>
      </div>
    </div>
  )
}
