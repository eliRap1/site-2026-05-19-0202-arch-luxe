'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  { id: '01', title: 'Volta Residences', location: 'Milan, Italy', year: '2024', type: 'Residential Complex', description: 'A hillside development that cascades with the terrain. Each unit frames a unique relationship with the landscape below — no two are the same.', palette: '#E8E3DB' },
  { id: '02', title: 'Meridian Tower', location: 'Dubai, UAE', year: '2023', type: 'Commercial High-Rise', description: 'A 72-floor structure that tracks the sun — its façade shifts throughout the day, translating solar data into architectural expression.', palette: '#EDE8E0' },
  { id: '03', title: 'The Cartwright House', location: 'Cotswolds, UK', year: '2023', type: 'Private Residence', description: 'Stone walls hold history. Glass holds light. This restoration reactivated a 17th-century manor without erasing its memory.', palette: '#F2EDE6' },
  { id: '04', title: 'Kulturforum Annex', location: 'Berlin, Germany', year: '2022', type: 'Cultural Institution', description: "A public archive and reading room embedded into the city's fabric. The building breathes — literally — through a living green skin.", palette: '#E5E0D8' },
]

export function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !sectionRef.current) return

    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      const cards = containerRef.current?.querySelectorAll('.project-card')
      if (!cards || cards.length === 0) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${cards.length * 100}%`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
        },
      })

      cards.forEach((card, i) => {
        if (i === 0) return
        tl.fromTo(card, { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, i - 1)
        if (i > 0) {
          tl.to(cards[i - 1], { opacity: 0, y: -60, duration: 0.8, ease: 'power2.in' }, i - 0.5)
        }
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <section ref={sectionRef} id="work" className="relative overflow-hidden" style={{ backgroundColor: '#F0EDE7' }}>
      <div className="relative py-32 px-8 md:px-16 min-h-screen flex flex-col justify-center">
        <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: '#C9A96E' }}>Selected Works</p>
        <h2 className="font-display text-4xl md:text-6xl font-bold mb-16" style={{ color: '#1A1A1A' }}>Projects</h2>
        <div ref={containerRef} className="relative" style={{ minHeight: '50vh' }}>
          {projects.map((p, i) => (
            <div
              key={p.id}
              className={`project-card flex flex-col md:flex-row gap-8 md:gap-16 items-start md:items-center ${i === 0 ? 'relative' : 'absolute inset-0'}`}
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <div className="md:w-1/2">
                <div className="w-full rounded-sm flex items-center justify-center" style={{ backgroundColor: p.palette, aspectRatio: '4/3' }}>
                  <span className="font-display font-bold" style={{ fontSize: '5rem', color: 'rgba(26,26,26,0.1)' }}>{p.id}</span>
                </div>
              </div>
              <div className="md:w-1/2">
                <p className="text-xs tracking-widest uppercase mb-3" style={{ color: '#C9A96E' }}>{p.type} · {p.year}</p>
                <h3 className="font-display text-3xl md:text-4xl font-bold mb-3" style={{ color: '#1A1A1A' }}>{p.title}</h3>
                <p className="text-sm mb-4 tracking-widest" style={{ color: 'rgba(26,26,26,0.5)' }}>{p.location}</p>
                <p className="text-base leading-relaxed max-w-md" style={{ color: 'rgba(26,26,26,0.7)' }}>{p.description}</p>
                <a href="#contact" className="inline-flex items-center gap-2 mt-6 text-sm pb-0.5 transition-all duration-300" style={{ color: '#1A1A1A', borderBottom: '1px solid rgba(26,26,26,0.3)' }}>View Project →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
