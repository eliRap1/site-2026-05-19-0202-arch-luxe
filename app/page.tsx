import { Navbar } from '@/components/Navbar'
import { HeroSection } from '@/components/HeroSection'
import { ManifestoSection } from '@/components/ManifestoSection'
import { WorkSection } from '@/components/WorkSection'
import { ProcessSection } from '@/components/ProcessSection'
import { TestimonialsSection } from '@/components/TestimonialsSection'
import { MarqueeSection } from '@/components/MarqueeSection'
import { CTASection } from '@/components/CTASection'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ManifestoSection />
      <WorkSection />
      <MarqueeSection />
      <ProcessSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  )
}
