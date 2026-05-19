'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const words = ['Architecture', '·', 'Interiors', '·', 'Urban Planning', '·', 'Restoration', '·', 'Landscape', '·']
const allWords = [...words, ...words, ...words, ...words]

export function MarqueeSection() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !wrapperRef.current) return

    tweenRef.current = gsap.to(wrapperRef.current, { xPercent: -50, repeat: -1, duration: 20, ease: 'none' })

    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const vel = self.getVelocity()
        const newSpeed = 1 + Math.abs(vel) / 3000
        if (tweenRef.current) {
          gsap.to(tweenRef.current, { timeScale: Math.min(newSpeed, 5), duration: 0.5, ease: 'power2.out', overwrite: 'auto' })
        }
      },
    })

    return () => { tweenRef.current?.kill(); st.kill() }
  }, [])

  return (
    <div className="py-12 overflow-hidden" style={{ backgroundColor: '#1A1A1A' }}>
      <div ref={wrapperRef} className="flex gap-8 whitespace-nowrap" style={{ willChange: 'transform', width: 'max-content' }}>
        {allWords.map((w, i) => (
          <span key={i} className="marquee-item font-display text-5xl md:text-7xl font-bold flex-shrink-0" style={{ color: w === '·' ? '#C9A96E' : 'rgba(250,248,244,0.8)' }}>{w}</span>
        ))}
      </div>
    </div>
  )
}
