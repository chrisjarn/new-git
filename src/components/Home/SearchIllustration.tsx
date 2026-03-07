import { Magnifier, File, FileCheck } from '@gravity-ui/icons'

type Result = {
  title: string
  content: string
  filename: string
  fileIcon: React.ReactNode
}

const results: Result[] = [
  {
    title: 'Hazard Register, Tower B',
    content: 'Complete register of 14 open hazards across Level 1-12, including corrective actions and deadlines...',
    filename: 'hazard-register.pdf',
    fileIcon: <FileCheck className="size-3" />,
  },
  {
    title: 'Emergency Plan v4.2',
    content: 'Updated evacuation procedures, warden assignments, and assembly points for all zones...',
    filename: 'emergency-plan.pdf',
    fileIcon: <File className="size-3" />,
  },
  {
    title: 'Drill Report, March 2026',
    content: 'Post-drill debrief findings, evacuation times, and improvement actions across 3 sites...',
    filename: 'drill-report.pdf',
    fileIcon: <File className="size-3" />,
  },
]

export function SearchIllustration() {
  return (
    <div aria-hidden className="relative w-full translate-x-[5%] translate-y-18 rounded-2xl p-4 md:min-w-md md:translate-x-[30%] md:translate-y-20">
      <div className="perspective-dramatic flex flex-col gap-4">
        <div className="mask-radial-[100%_100%]  mask-radial-from-75% mask-radial-at-top-left rotate-x-3 -rotate-4 rotate-z-6 space-y-3 pl-6 pt-1">
          <div className="bg-black rounded-2xl p-2  shadow-lg ring-1 ring-border-secondary">
            <div className="flex items-center gap-2 p-4">
              <Magnifier className="size-4" />
              <span>Search hazards, plans, and reports</span>
            </div>
            <div className="divide-y divide-border-primary rounded-2xl bg-sand-1/80 shadow ring-1 ring-border-secondary">
              {results.map((result) => (
                <div
                  key={result.title}
                  className="flex cursor-pointer select-none gap-4 rounded-lg p-4 hover:bg-primary/[0.03]"
                >
                  <div className="relative h-fit">
                    <div className="flex size-10 items-center justify-center overflow-hidden rounded-xl bg-sand-2">
                      <File className="size-5 text-tertiary" />
                    </div>
           
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="font-medium">{result.title}</div>
                    <span className="block text-sm text-secondary">
                      From <span className="text-tertiary">{result.filename}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
