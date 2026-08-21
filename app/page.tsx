import type { Metadata } from 'next'
import Header from '@/components/header'
import Hero from '@/components/hero'
import WhoWeAre from '@/components/who-we-are'
import Beliefs from '@/components/beliefs'
import Work from '@/components/work'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Lozinr — Brand Identity Studio for Funded Startups & Ambitious Founders',
  description: 'Lozinr is a brand identity studio helping funded startups and ambitious founders build distinctive brands through strategy, visual identity systems, and timeless design. Get in touch to start your project.',
  keywords: [
    'brand identity studio',
    'brand identity for startups',
    'SaaS branding',
    'D2C branding',
    'startup brand identity',
    'contact brand studio',
    'hire brand designer',
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://lozinr.com',
  },
  openGraph: {
    type: 'website',
    url: 'https://lozinr.com',
    title: 'Lozinr — Brand Identity Studio for Funded Startups & Ambitious Founders',
    description: 'Brand identity systems built for startups, SaaS companies, and ambitious founders who want to build brands worth remembering.',
  },
}

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero triggerAnimation={true} />
        <div className="relative z-10 bg-background">
          <WhoWeAre />
          <Beliefs />
          <Work />
        </div>
      </main>
      <Footer />
    </>
  )
}
