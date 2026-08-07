import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Work — Brand Identity Projects | Lozinr Brand Identity Studio',
  description: 'Explore our brand identity projects for startups and SaaS companies. Real case studies across tech, health, and D2C — brand identity systems built with strategy and craft.',
  keywords: [
    'brand identity case studies',
    'branding portfolio',
    'logo design examples',
    'brand strategy portfolio',
    'brand identity projects',
    'startup branding examples',
    'SaaS branding portfolio',
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://lozinr.com/work',
  },
  openGraph: {
    type: 'website',
    url: 'https://lozinr.com/work',
    title: 'Work — Brand Identity Projects | Lozinr Brand Identity Studio',
    description: 'Explore our brand identity projects for startups and SaaS companies — real case studies built with strategy and craft.',
  },
}

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
