'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

export function Navbar() {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !navRef.current) return

    gsap.fromTo(navRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out', delay: 0.5 }
    )
  }, [])

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-6"
      style={{ mixBlendMode: 'multiply' }}
    >
      <Link href="/" className="font-display text-xl font-bold tracking-tight" style={{ color: '#1A1A1A' }}>
        Forma<span style={{ color: '#C9A96E' }}>.</span>
      </Link>
      <ul className="hidden md:flex gap-10 text-sm tracking-widest uppercase" style={{ color: '#3A3A3A' }}>
        <li><a href="#about" className="hover:text-[#C9A96E] transition-colors duration-300" style={{ color: 'inherit' }}>Studio</a></li>
        <li><a href="#work" className="hover:text-[#C9A96E] transition-colors duration-300" style={{ color: 'inherit' }}>Work</a></li>
        <li><a href="#process" className="hover:text-[#C9A96E] transition-colors duration-300" style={{ color: 'inherit' }}>Process</a></li>
        <li><a href="#contact" className="hover:text-[#C9A96E] transition-colors duration-300" style={{ color: 'inherit' }}>Contact</a></li>
      </ul>
      <a
        href="#contact"
        className="hidden md:block text-xs tracking-widest uppercase px-5 py-2.5 transition-all duration-300 hover:text-[#FAF8F4]"
        style={{ border: '1px solid #1A1A1A', color: '#1A1A1A' }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1A1A1A'; e.currentTarget.style.color = '#FAF8F4' }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#1A1A1A' }}
      >
        Start a Project
      </a>
    </nav>
  )
}
