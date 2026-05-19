'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  { quote: "Forma Studio didn't design our office — they designed the company we wanted to become. Every room tells the story we couldn't yet articulate.", author: 'Elena Marchetti', role: 'CEO, Venti Ventures' },
  { quote: "I've lived in the Cartwright House for two years and still discover something new each morning. That's the miracle they performed.", author: 'James Cartwright', role: 'Private Client' },
  { quote: "The Kulturforum Annex has become the social anchor of our neighbourhood. Forma understood that public buildings are political acts.", author: 'Dr. Kirsten Haas', role: 'Director, Kulturforum Berlin' },
]

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !sectionRef.current) return

    const ctx = gsap.context(() => {
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: -20,
          ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      }

      const cards = sectionRef.current?.querySelectorAll('.testimonial-card')
      if (cards) {
        cards.forEach((card) => {
          gsap.fromTo(card,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 80%', once: true } }
          )
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 md:py-48 px-8 md:px-16 overflow-hidden" style={{ backgroundColor: '#FAF8F4' }}>
      <div ref={bgRef} className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ willChange: 'transform' }}>
        <span className="font-display font-bold select-none whitespace-nowrap" style={{ fontSize: 'clamp(8rem, 20vw, 20rem)', color: 'rgba(26,26,26,0.025)' }}>Clients</span>
      </div>
      <div className="relative max-w-6xl mx-auto">
        <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: '#C9A96E' }}>What They Say</p>
        <h2 className="font-display text-4xl md:text-6xl font-bold mb-20" style={{ color: '#1A1A1A' }}>Voices</h2>
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card pt-8" style={{ borderTop: '1px solid rgba(26,26,26,0.1)' }}>
              <p className="font-display text-4xl mb-6" style={{ color: '#C9A96E' }}>&ldquo;</p>
              <p className="text-base md:text-lg leading-relaxed mb-8 font-display italic" style={{ color: 'rgba(26,26,26,0.8)' }}>{t.quote}</p>
              <p className="text-sm font-semibold tracking-wide" style={{ color: '#1A1A1A' }}>{t.author}</p>
              <p className="text-xs tracking-widest uppercase mt-1" style={{ color: 'rgba(26,26,26,0.4)' }}>{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
