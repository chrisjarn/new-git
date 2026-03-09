import { House } from '@gravity-ui/icons'
import { WalletCard } from './WalletCard'
import { WatchCard } from './WatchCard'

type Status = 'compliant' | 'action' | 'overdue'

const WALLETS: { name: string; status: Status; selected?: boolean }[] = [
  { name: 'East Perth Tower', status: 'compliant', selected: true },
  { name: 'Kings Square', status: 'compliant' },
  { name: 'Tower B — Perth CBD', status: 'action' },
  { name: 'Vic Park Centre', status: 'overdue' },
]

export function WalletsScreen() {
  return (
    <div className="flex h-full flex-col bg-black text-sand-12">
      {/* Scrollable content */}
      <div className="flex-1 overflow-hidden bg-black px-3 pb-4">
        {/* Your Wallets header */}
        <div className="flex items-center justify-between pb-4 pt-1">
          <span className="text-sm font-bold text-sand-12">Tenants</span>
        </div>


        {/* Wallet grid */}
        <div className="grid grid-cols-2 gap-2">
          {WALLETS.map((wallet) => (
            <WalletCard
              key={wallet.name}
              icon={<House className="size-4 text-sand-10" />}
              name={wallet.name}
              status={wallet.status}
              selected={wallet.selected}
              cardLayoutId={wallet.selected ? 'hero-card' : undefined}
            />
          ))}
        </div>

        {/* Watching section */}
        <div className="mt-3 flex items-center gap-1.5 pb-2">
          <span className="text-xs font-bold text-sand-12">Watching</span>
          <svg viewBox="0 0 16 16" fill="none" className="size-3 text-neutral-500" aria-hidden>
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 5v3M8 10.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        <WatchCard />
      </div>
    </div>
  )
}
