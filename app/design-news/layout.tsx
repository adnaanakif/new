import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Design News | Lozinr Brand Identity Studio',
  description: 'Design News from Lozinr — updates, insights, and thoughts on branding and design.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function DesignNewsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
