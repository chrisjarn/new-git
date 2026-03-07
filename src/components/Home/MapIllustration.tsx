'use client'

import DottedMap from 'dotted-map'

const pins = [
  { lat: -33.8688, lng: 151.2093 },
  { lat: -37.8136, lng: 144.9631 },
  { lat: -27.4698, lng: 153.0251 },
  { lat: -31.9505, lng: 115.8605 },
  { lat: -34.9285, lng: 138.6007 },
  { lat: -41.2865, lng: 174.7762 },
  { lat: -36.8485, lng: 174.7633 },
  { lat: -43.5321, lng: 172.6362 },
]

export function MapIllustration() {
  const map = new DottedMap({ height: 55, grid: 'diagonal' })

  pins.forEach((pin) => {
    map.addPin({
      ...pin,
      svgOptions: { color: 'oklch(0.66 0.122 221.744)', radius: 0.4 },
    })
  })

  const svgMap = map.getSVG({
    radius: 0.15,
    color: 'oklch(0.37 0.013 285.805)',
    shape: 'circle',
    backgroundColor: 'transparent',
  })

  return (
    <img
      src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
      alt=""
      className="h-full w-full object-contain object-right-bottom"
    />
  )
}

export default MapIllustration
