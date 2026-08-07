import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services — Brand Strategy & Identity Systems | Lozinr Brand Identity Studio',
  description:
    'Brand Foundation, Identity System, and Launch System — brand strategy and identity design built for startups and ambitious founders, using the LOZINR Method.',
  keywords: [
    'brand strategy services',
    'brand identity design services',
    'startup branding services',
    'SaaS brand identity',
    'brand guidelines design',
    'logo and identity design',
    'LOZINR Method',
  ],
  robots: {
    index: false,
    follow: true,
  },
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
