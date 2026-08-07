import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Insights | Lozinr Brand Identity Studio',
  description: 'Thoughts on branding, positioning, trust, and pricing power for founders building companies worth remembering.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://lozinr.com/insights',
  },
  openGraph: {
    type: 'website',
    url: 'https://lozinr.com/insights',
    title: 'Insights | Lozinr Brand Identity Studio',
    description: 'Thoughts on branding, positioning, trust, and pricing power for founders building companies worth remembering.',
  },
}

export default function InsightsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}