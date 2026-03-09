import { AntennaSignal } from '@gravity-ui/icons'

export function StatusBar({ time = '9:27' }: { time?: string }) {
  return (
    <div className="flex items-center justify-between bg-black px-5 py-1.5 text-[10px] text-sand-12">
      <span className="font-semibold">{time}</span>
      <div className="flex items-center gap-1">
        <AntennaSignal className="size-3" />
        {/* WiFi */}
        <svg
          viewBox="0 0 16 12"
          fill="currentColor"
          className="size-3"
          aria-hidden
        >
          <path d="M8 9.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM4.46 7.12a5 5 0 0 1 7.08 0 .75.75 0 1 1-1.06 1.06 3.5 3.5 0 0 0-4.96 0 .75.75 0 0 1-1.06-1.06ZM1.93 4.59a8.5 8.5 0 0 1 12.14 0 .75.75 0 1 1-1.07 1.06 7 7 0 0 0-10 0 .75.75 0 0 1-1.07-1.06Z" />
        </svg>
        {/* Battery */}
        <svg
          viewBox="0 0 28 14"
          fill="currentColor"
          className="size-4"
          aria-hidden
        >
          <rect x="0.5" y="1" width="23" height="12" rx="3" stroke="currentColor" strokeWidth="1" fill="none" opacity={0.4} />
          <rect x="25" y="4.5" width="2" height="5" rx="1" opacity={0.4} />
          <rect x="2" y="2.5" width="14" height="9" rx="1.5" fill="currentColor" />
        </svg>
      </div>
    </div>
  )
}
