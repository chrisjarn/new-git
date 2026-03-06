import { Arrows, Buffer, Cal, Clad, Luma, Plaid, Retro } from '@/components/Home/LogoSvgs'

const logos = [
  { alt: 'Plaid logo', svg: <Plaid /> },
  { alt: 'Cal.com logo', svg: <Cal /> },
  { alt: 'Luma logo', svg: <Luma /> },
  { alt: 'Clad logo', svg: <Clad /> },
  { alt: 'Arrows logo', svg: <Arrows /> },
  { alt: 'Buffer logo', svg: <Buffer /> },
  { alt: 'Retro logo', svg: <Retro /> },
]

export function CustomerLogos() {
  return (
    <div className="flex flex-col items-start justify-center gap-2 pb-4 pt-8">
      <p className="text-quaternary text-xs font-semibold uppercase tracking-wider">Trusted by fast-growing companies</p>
      <div className="flex flex-wrap items-center justify-center gap-x-4">
        {logos.map((logo) => (
          <div
            key={logo.alt}
            className="text-quaternary hover:text-primary max-h-11 scale-[85%] transition-colors duration-200"
          >
            {logo.svg}
          </div>
        ))}
      </div>
    </div>
  )
}
