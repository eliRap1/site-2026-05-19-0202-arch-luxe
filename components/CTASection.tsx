'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !sectionRef.current) return

    const ctx = gsap.context(() => {
      const lines = textRef.current?.querySelectorAll('.cta-line')
      if (lines && lines.length > 0) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 70%',
          onEnter: () => {
            gsap.fromTo(lines, { y: '100%', opacity: 0 }, { y: '0%', opacity: 1, duration: 1.2, stagger: 0.15, ease: 'expo.out' })
          },
          once: true,
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="contact" className="py-32 md:py-48 px-8 md:px-16" style={{ backgroundColor: '#F0EDE7' }}>
      <div className="max-w-5xl mx-auto">
        <div ref={textRef}>
          <div className="overflow-hidden mb-2"><h2 className="cta-line font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight" style={{ color: '#1A1A1A' }}>Have a project</h2></div>
          <div className="overflow-hidden mb-2"><h2 className="cta-line font-display text-4xl md:text-6xl lg:text-7xl font-bold italic leading-tight" style={{ color: '#C9A96E' }}>in mind?</h2></div>
          <div className="overflow-hidden"><h2 className="cta-line font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight" style={{ color: '#1A1A1A' }}>Let&apos;s talk.</h2></div>
        </div>
        <div className="mt-20 max-w-2xl">
          <form id="contact-form" action="/api/contact" method="POST" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: 'rgba(26,26,26,0.5)' }}>Name</label>
                <input type="text" name="name" required className="w-full bg-transparent py-3 focus:outline-none transition-colors duration-300" style={{ borderBottom: '1px solid rgba(26,26,26,0.2)', color: '#1A1A1A' }} placeholder="Your name" />
              </div>
              <div>
                <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: 'rgba(26,26,26,0.5)' }}>Email</label>
                <input type="email" name="email" required className="w-full bg-transparent py-3 focus:outline-none transition-colors duration-300" style={{ borderBottom: '1px solid rgba(26,26,26,0.2)', color: '#1A1A1A' }} placeholder="you@studio.com" />
              </div>
            </div>
            <div>
              <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: 'rgba(26,26,26,0.5)' }}>Message</label>
              <textarea name="message" rows={4} required className="w-full bg-transparent py-3 focus:outline-none transition-colors duration-300 resize-none" style={{ borderBottom: '1px solid rgba(26,26,26,0.2)', color: '#1A1A1A' }} placeholder="Tell us about your project..." />
            </div>
            <button type="submit" className="inline-flex items-center gap-3 text-sm tracking-widest uppercase px-8 py-4 transition-colors duration-300" style={{ backgroundColor: '#1A1A1A', color: '#FAF8F4' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#C9A96E' }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#1A1A1A' }}>Send Message →</button>
          </form>
        </div>
      </div>
    </section>
  )
}
