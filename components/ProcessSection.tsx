'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  { num: '01', title: 'Listen', desc: 'Every project begins with silence. We spend the first weeks listening — to the client, the site, the community that will inhabit the space.' },
  { num: '02', title: 'Translate', desc: 'Brief becomes concept. We work across scales — from the city-wide plan to the texture of a single wall — ensuring coherence at every level.' },
  { num: '03', title: 'Construct', desc: 'We remain on site. Our principals attend every major pour. The building must match its promise, and that requires presence.' },
  { num: '04', title: 'Inhabit', desc: 'We visit our buildings five years after completion. How a space ages tells you everything about whether it was truly built for people.' },
  { num: '05', title: 'Refine', desc: 'The relationship does not end at handover. We offer a lifelong dialogue with every client — architecture is a living commitment.' },
]

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !sectionRef.current || !trackRef.current) return

    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      const track = trackRef.current!
      const totalWidth = track.scrollWidth - track.offsetWidth

      gsap.to(track, {
        x: () => -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <section ref={sectionRef} id="process" className="overflow-hidden" style={{ backgroundColor: '#1A1A1A', color: '#FAF8F4' }}>
      <div className="py-20 px-8 md:px-16">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: '#C9A96E' }}>How We Work</p>
            <h2 className="font-display text-4xl md:text-6xl font-bold" style={{ color: '#FAF8F4' }}>Our Process</h2>
          </div>
          <p className="hidden md:block text-sm tracking-widest" style={{ color: 'rgba(250,248,244,0.3)' }}>← Scroll to explore</p>
        </div>
        <div ref={trackRef} className="flex gap-8 md:gap-12" style={{ willChange: 'transform' }}>
          {steps.map((s) => (
            <div key={s.num} className="flex-shrink-0 w-72 md:w-96 pt-8" style={{ borderTop: '1px solid rgba(250,248,244,0.1)' }}>
              <p className="font-display text-6xl font-bold mb-6" style={{ color: 'rgba(250,248,244,0.1)' }}>{s.num}</p>
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-4" style={{ color: '#FAF8F4' }}>{s.title}</h3>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: 'rgba(250,248,244,0.6)' }}>{s.desc}</p>
            </div>
          ))}
          <div className="flex-shrink-0 w-32" />
        </div>
      </div>
    </section>
  )
}
