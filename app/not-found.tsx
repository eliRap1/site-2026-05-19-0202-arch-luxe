import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-8" style={{ backgroundColor: '#FAF8F4' }}>
      <div className="text-center">
        <p
          className="font-display font-bold leading-none select-none"
          style={{ fontSize: 'clamp(5rem, 14vw, 14rem)', color: 'rgba(26,26,26,0.1)' }}
        >
          404
        </p>
        <p className="font-display text-3xl md:text-4xl font-bold mt-4 mb-4" style={{ color: '#1A1A1A' }}>
          This space doesn&apos;t exist.
        </p>
        <p className="mb-10 max-w-md mx-auto" style={{ color: 'rgba(26,26,26,0.5)' }}>
          Unlike our buildings, this page was never constructed. But the one you&apos;re looking for might still be found.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-3 text-sm tracking-widest uppercase px-8 py-4 transition-colors duration-300"
          style={{ backgroundColor: '#1A1A1A', color: '#FAF8F4' }}
        >
          Return to Studio
        </Link>
      </div>
    </div>
  )
}
