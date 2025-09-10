"use client"

import { useEffect, useState } from 'react'

// A single dot in the trail
const TrailDot = ({ x, y, isLast }: { x: number; y: number; isLast: boolean }) => (
  <div
    className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-gold/60 to-transparent"
    style={{
      left: x,
      top: y,
      width: isLast ? '6px' : '2px',
      height: isLast ? '6px' : '2px',
      transition: 'transform 0.2s ease-out, opacity 0.4s ease-out',
      transform: isLast ? 'scale(1)' : 'scale(0.2)',
      opacity: isLast ? 1 : 0,
    }}
  />
)

// The component that renders the trail
export default function CursorTrail() {
  const [trail, setTrail] = useState<{ x: number; y: number }[]>([])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setTrail(prev => [...prev, { x: e.clientX, y: e.clientY }].slice(-20))
    }

    // Only run on non-touch devices
    if (!('ontouchstart' in window)) {
      window.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      if (!('ontouchstart' in window)) {
        window.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [])

  return (
    <>
      {trail.map((pos, i) => (
        <TrailDot key={i} x={pos.x} y={pos.y} isLast={i === trail.length - 1} />
      ))}
    </>
  )
}
