'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 47, suffix: '', label: 'Projects Completed' },
  { value: 26, suffix: '+', label: 'Years of Practice' },
  { value: 18, suffix: '', label: 'International Awards' },
  { value: 3, suffix: 'B+', label: 'Square Feet Designed' },
]

export function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const linesRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const countersRef = useRef<Array<HTMLSpanElement | null>>([])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !sectionRef.current) return

    const ctx = gsap.context(() => {
      const lines = linesRef.current?.querySelectorAll('.text-line')
      if (lines && lines.length > 0) {
        ScrollTrigger.create({
          trigger: linesRef.current,
          start: 'top 80%',
          onEnter: () => {
            gsap.fromTo(lines,
              { y: '110%', opacity: 0 },
              { y: '0%', opacity: 1, duration: 1.1, stagger: 0.1, ease: 'expo.out' }
            )
          },
          once: true,
        })
      }

      const sideLabel = sectionRef.current?.querySelector('.side-label')
      if (sideLabel) {
        gsap.to(sideLabel, {
          yPercent: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      countersRef.current.forEach((el, i) => {
        if (!el) return
        const obj = { val: 0 }
        ScrollTrigger.create({
          trigger: statsRef.current,
          start: 'top 75%',
          onEnter: () => {
            gsap.to(obj, {
              val: stats[i].value,
              duration: 2,
              ease: 'power3.out',
              onUpdate: () => {
                if (el) el.textContent = Math.floor(obj.val).toString()
              },
            })
          },
          once: true,
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 md:py-48 px-8 md:px-16 overflow-hidden"
      style={{ backgroundColor: '#FAF8F4' }}
    >
      <div
        className="side-label absolute right-8 top-1/3 font-display font-bold pointer-events-none select-none leading-none"
        style={{ fontSize: 'clamp(5rem, 14vw, 14rem)', color: 'rgba(26,26,26,0.04)', willChange: 'transform' }}
      >
        Forma
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-16 md:gap-24">
          <div className="md:w-1/3">
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: '#C9A96E' }}>Our Philosophy</p>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(26,26,26,0.5)' }}>
              Founded in Milan. Practiced across continents. Rooted in the belief that architecture is the most honest expression of civilisation&apos;s values.
            </p>
          </div>
          <div ref={linesRef} className="md:w-2/3">
            <div className="overflow-hidden mb-2"><p className="text-line text-3xl md:text-4xl lg:text-5xl font-display font-semibold leading-tight" style={{ color: '#1A1A1A' }}>Architecture is not</p></div>
            <div className="overflow-hidden mb-2"><p className="text-line text-3xl md:text-4xl lg:text-5xl font-display font-semibold leading-tight italic" style={{ color: '#C9A96E' }}>constructed space</p></div>
            <div className="overflow-hidden mb-2"><p className="text-line text-3xl md:text-4xl lg:text-5xl font-display font-semibold leading-tight" style={{ color: '#1A1A1A' }}>— it is constructed</p></div>
            <div className="overflow-hidden"><p className="text-line text-3xl md:text-4xl lg:text-5xl font-display font-semibold leading-tight italic" style={{ color: '#1A1A1A' }}>experience.</p></div>
          </div>
        </div>

        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-16"
          style={{ borderTop: '1px solid rgba(26,26,26,0.1)' }}
        >
          {stats.map((s, i) => (
            <div key={i}>
              <p className="font-display text-4xl md:text-5xl font-bold mb-2" style={{ color: '#1A1A1A' }}>
                <span ref={(el) => { countersRef.current[i] = el }}>0</span>
                <span style={{ color: '#C9A96E' }}>{s.suffix}</span>
              </p>
              <p className="text-xs tracking-widest uppercase" style={{ color: 'rgba(26,26,26,0.5)' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
