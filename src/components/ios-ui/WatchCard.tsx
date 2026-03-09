export function WatchCard() {
  return (
    <div className="flex flex-col items-center gap-1.5 rounded-2xl bg-sand-2 px-4 py-4">
      <div className="relative">
        <svg viewBox="0 0 24 24" fill="none" className="size-6 text-sand-9" aria-hidden>
          <path
            d="M21 21l-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute -bottom-0.5 -left-1 flex size-3.5 items-center justify-center rounded-full bg-sky-500">
          <svg viewBox="0 0 10 10" fill="white" className="size-2" aria-hidden>
            <path d="M5 1v8M1 5h8" strokeWidth="2" />
            <rect x="4" y="1" width="2" height="8" rx="1" />
            <rect x="1" y="4" width="8" height="2" rx="1" />
          </svg>
        </div>
      </div>
      <p className="text-[10px] font-semibold text-sand-12">Watch an Address</p>
      <p className="text-center text-[8px] leading-tight text-sand-9">
        Add a view-only wallet address to easily keep up with its activity
      </p>
    </div>
  )
}
