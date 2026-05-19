'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !barRef.current) return

    const st = ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        if (barRef.current) {
          gsap.set(barRef.current, { scaleX: self.progress, transformOrigin: 'left center' })
        }
      },
    })

    return () => st.kill()
  }, [])

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 z-50 origin-left"
      style={{ height: '2px', backgroundColor: '#C9A96E', transform: 'scaleX(0)' }}
      aria-hidden="true"
    />
  )
}
