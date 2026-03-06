import { Signature } from 'lucide-react'

export const DocumentIllustration = () => {
    return (
        <div
            aria-hidden
            className="bg-black w-16 space-y-2 rounded-md border border-border-primary p-2 shadow-md shadow-black/5">
            <div className="flex items-center gap-1">
                <div className="bg-border size-2.5 rounded-full" />
                <div className="bg-border h-[3px] w-4 rounded-full" />
            </div>
            <div className="space-y-1.5">
                <div className="flex items-center gap-1">
                    <div className="bg-border h-[3px] w-2.5 rounded-full" />
                    <div className="bg-border h-[3px] w-6 rounded-full" />
                </div>
                <div className="flex items-center gap-1">
                    <div className="bg-border h-[3px] w-2.5 rounded-full" />
                    <div className="bg-border h-[3px] w-6 rounded-full" />
                </div>
            </div>

            <div className="space-y-1.5">
                <div className="bg-border h-[3px] w-full rounded-full" />
                <div className="flex items-center gap-1">
                    <div className="bg-border h-[3px] w-2/3 rounded-full" />
                    <div className="bg-border h-[3px] w-1/3 rounded-full" />
                </div>
            </div>

            <Signature className="ml-auto size-3" />
        </div>
    )
}