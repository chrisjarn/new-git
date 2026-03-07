interface NumberTickerProps {
  value: number
  prefix?: string
  suffix?: string
  label?: string
}

export function NumberTicker({ value, prefix, suffix, label }: NumberTickerProps) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl bg-sand-1 p-5 md:p-6">
      <div className="text-[clamp(3rem,_8vw,_5rem)] font-bold leading-none">
        {prefix}{value}{suffix}
      </div>
      {label && <span className="text-sm text-tertiary">{label}</span>}
    </div>
  )
}
