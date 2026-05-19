export function Footer() {
  return (
    <footer className="py-16 px-8 md:px-16" style={{ backgroundColor: '#1A1A1A', color: '#FAF8F4' }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          <div>
            <p className="font-display text-3xl font-bold mb-4">
              Forma<span style={{ color: '#C9A96E' }}>.</span>
            </p>
            <p className="text-sm max-w-xs leading-relaxed" style={{ color: 'rgba(250,248,244,0.4)' }}>
              Architecture &amp; Spatial Design.<br />
              Milan · London · Dubai
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <p className="text-xs tracking-widest uppercase mb-4" style={{ color: '#C9A96E' }}>Studio</p>
              <ul className="space-y-2 text-sm" style={{ color: 'rgba(250,248,244,0.5)' }}>
                <li><a href="#about" className="hover:text-[#FAF8F4] transition-colors" style={{ color: 'inherit' }}>Philosophy</a></li>
                <li><a href="#work" className="hover:text-[#FAF8F4] transition-colors" style={{ color: 'inherit' }}>Projects</a></li>
                <li><a href="#process" className="hover:text-[#FAF8F4] transition-colors" style={{ color: 'inherit' }}>Process</a></li>
              </ul>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase mb-4" style={{ color: '#C9A96E' }}>Connect</p>
              <ul className="space-y-2 text-sm" style={{ color: 'rgba(250,248,244,0.5)' }}>
                <li><a href="#contact" className="hover:text-[#FAF8F4] transition-colors" style={{ color: 'inherit' }}>Contact</a></li>
                <li><span className="cursor-default">Instagram</span></li>
                <li><span className="cursor-default">LinkedIn</span></li>
              </ul>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase mb-4" style={{ color: '#C9A96E' }}>Offices</p>
              <ul className="space-y-2 text-sm" style={{ color: 'rgba(250,248,244,0.5)' }}>
                <li>Via Brera 12, Milan</li>
                <li>Shoreditch, London</li>
                <li>DIFC, Dubai</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="pt-8 flex flex-col md:flex-row justify-between gap-4" style={{ borderTop: '1px solid rgba(250,248,244,0.1)' }}>
          <p className="text-xs" style={{ color: 'rgba(250,248,244,0.3)' }}>© 2024 Forma Studio. All rights reserved.</p>
          <p className="text-xs" style={{ color: 'rgba(250,248,244,0.2)' }}>Architecture that honours the dialogue between structure and sensation.</p>
        </div>
      </div>
    </footer>
  )
}
