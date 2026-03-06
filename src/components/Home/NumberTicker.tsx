interface NumberTickerProps {
  value: number
  prefix?: string
  suffix?: string
  label?: string
}

export function NumberTicker({ value, prefix, suffix, label }: NumberTickerProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="text-[clamp(3rem,_8vw,_5rem)] font-bold leading-none">
        {prefix}{value}{suffix}
      </div>
      {label && <span className="text-sm text-tertiary">{label}</span>}
    </div>
  )
}
