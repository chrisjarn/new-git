import { cn } from '@/lib/utils'

type Message = {
  text: string
  side: 'left' | 'right'
}

const messages: Message[] = [
  { text: 'Do we have the latest evacuation plan?', side: 'left' },
  { text: 'Check the shared drive.', side: 'right' },
  { text: 'Which folder?', side: 'left' },
  { text: 'Not sure...', side: 'right' },
]

const rotations = {
  left: '-0.9deg',
  right: '1.25deg',
}

export function ChatBubbles() {
  return (
    <div className="flex w-full max-w-[440px] flex-col">
      <div className="flex flex-col justify-end gap-4">
        {messages.map((message, i) => (
          <Bubble key={i} message={message} />
        ))}
      </div>
    </div>
  )
}

function Bubble({ message }: { message: Message }) {
  const isLeft = message.side === 'left'
  return (
    <div
      className={cn('relative w-fit', isLeft ? 'self-start' : 'self-end')}
      style={{ rotate: rotations[message.side] }}
    >
      <div className="w-fit rounded-2xl bg-white/5 px-5 py-3 text-base leading-snug tracking-[-0.01em] text-muted-foreground">
        {message.text}
      </div>
      <span
        className={cn(
          'absolute -bottom-2.5 text-[10px] leading-none text-white/5',
          isLeft ? 'left-3' : 'right-3'
        )}
        aria-hidden
      >
        {isLeft ? '\u25E4' : '\u25E5'}
      </span>
    </div>
  )
}
