import { cn } from '@/lib/utils'

type Message = {
  text: string
  side: 'left' | 'right'
}

const messages: Message[] = [
  { text: 'Emergency reported on Level 3', side: 'left' },
  { text: 'All wardens notified — response underway', side: 'right' },
]

const rotations = {
  left: '-0.9deg',
  right: '1.25deg',
}

export function ChatBubbles() {
  return (
    <div className="flex w-full max-w-[440px] flex-col gap-4">
      {messages.map((msg) => (
        <Bubble key={msg.text} message={msg} />
      ))}
    </div>
  )
}

function Bubble({ message }: { message: Message }) {
  const isLeft = message.side === 'left'
  const isRight = message.side === 'right'
  return (
    <div
      className={cn('relative w-fit', isLeft ? 'self-start' : 'self-end')}
      style={{ rotate: rotations[message.side] }}
    >
      <div
        className={cn(
          'w-fit rounded-2xl px-5 py-3 text-base leading-snug tracking-[-0.01em]',
          isRight
            ? 'bg-[#3e63dd] text-white'
            : 'bg-[#f0f0f3] text-[#1c2024] dark:bg-[#2a2a2f] dark:text-[#edeef0]'
        )}
      >
        {message.text}
      </div>
      <span
        className={cn(
          'absolute -bottom-2.5 text-[10px] leading-none',
          isRight
            ? 'right-3 text-[#3e63dd]'
            : 'left-3 text-[#f0f0f3] dark:text-[#2a2a2f]'
        )}
        aria-hidden
      >
        {isLeft ? '\u25E4' : '\u25E5'}
      </span>
    </div>
  )
}
