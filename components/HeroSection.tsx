'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LiquidHero } from './LiquidHero'

gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !sectionRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.8 })

      const lines = headlineRef.current?.querySelectorAll('.reveal-line')
      if (lines && lines.length > 0) {
        tl.fromTo(lines,
          { y: '100%', opacity: 0 },
          { y: '0%', opacity: 1, duration: 1.1, stagger: 0.12, ease: 'expo.out' }
        )
      }

      tl.fromTo(subRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
        '-=0.5'
      )

      tl.fromTo(ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      )

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=150%',
        pin: true,
        pinSpacing: true,
        scrub: true,
        onUpdate: (self) => {
          if (contentRef.current) {
            gsap.set(contentRef.current, {
              opacity: 1 - self.progress * 1.5,
              y: self.progress * -80,
            })
          }
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ backgroundColor: '#FAF8F4' }}
    >
      <LiquidHero />
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-start justify-end h-full px-8 md:px-16 pb-20 md:pb-28"
      >
        <p className="text-xs tracking-[0.3em] uppercase mb-6" style={{ color: '#C9A96E' }}>
          Milan · London · Dubai · Est. 1998
        </p>
        <h1
          ref={headlineRef}
          className="font-display text-5xl md:text-7xl lg:text-[6.5rem] font-bold leading-[0.95] mb-8"
          style={{ color: '#1A1A1A' }}
        >
          <span className="block overflow-hidden">
            <span className="reveal-line block">We design</span>
          </span>
          <span className="block overflow-hidden">
            <span className="reveal-line block italic" style={{ color: '#C9A96E' }}>spaces that</span>
          </span>
          <span className="block overflow-hidden">
            <span className="reveal-line block">remember you.</span>
          </span>
        </h1>
        <p
          ref={subRef}
          className="text-base md:text-lg max-w-md leading-relaxed mb-10"
          style={{ color: 'rgba(26,26,26,0.7)' }}
        >
          Architecture that honours the dialogue between structure and sensation. We build for the next century, guided by the wisdom of the last.
        </p>
        <div ref={ctaRef} className="flex items-center gap-6">
          <a
            href="#work"
            className="inline-flex items-center gap-3 text-sm tracking-widest uppercase px-7 py-4 transition-colors duration-300"
            style={{ backgroundColor: '#1A1A1A', color: '#FAF8F4' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#C9A96E' }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#1A1A1A' }}
          >
            View Our Work
          </a>
          <a
            href="#about"
            className="text-sm tracking-widest uppercase pb-0.5 transition-colors duration-300"
            style={{ color: 'rgba(26,26,26,0.6)', borderBottom: '1px solid rgba(26,26,26,0.2)' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#C9A96E' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(26,26,26,0.6)' }}
          >
            Our Philosophy →
          </a>
        </div>
      </div>
      <div className="absolute bottom-10 right-8 md:right-16 z-10 hidden md:block">
        <div className="flex flex-col items-center gap-3">
          <div className="w-px h-16" style={{ backgroundColor: 'rgba(26,26,26,0.2)' }} />
          <span
            className="text-xs tracking-[0.2em] uppercase"
            style={{ color: 'rgba(26,26,26,0.4)', transform: 'rotate(90deg) translateY(2rem)', display: 'block' }}
          >
            Scroll
          </span>
        </div>
      </div>
    </section>
  )
}
