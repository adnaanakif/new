import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { CartProvider } from '@/lib/cart'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  interactiveWidget: 'resizes-content',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://lozinr.com'),
  title: {
    default: 'Lozinr — Brand Identity Studio for Ambitious Founders',
    template: '%s | Lozinr',
  },
  description: 'Lozinr is a brand identity studio helping funded startups and ambitious founders build distinctive brands through strategy, identity systems, and timeless design.',
  keywords: [
    'brand identity studio',
    'brand identity designer',
    'branding for startups',
    'startup branding',
    'brand strategy',
    'visual identity',
    'logo designer',
    'logo design',
    'branding studio',
    'brand identity agency',
    'Adnan Akif',
    'Lozinr'
  ],
  authors: [{ name: 'Adnan Akif' }],
  creator: 'Adnan Akif',
  publisher: 'Lozinr',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://lozinr.com',
  },
  verification: {
    google: 'W-OA6Yo3JGzMsaE1PXQh3t3b13bAG1bZgb1RReWRq2w',
  },
  category: 'Brand Identity Studio',
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Lozinr',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://lozinr.com',
    siteName: 'Lozinr',
    title: 'Lozinr — Brand Identity Studio for Funded Startups & D2C Brands',
    description: 'Brand identity systems built for startups, SaaS companies, and ambitious founders who want to build brands worth remembering.',
    images: [
      {
        url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Artboard%201%20copy%2001-WcAWbaFGMsa8gBIagDbeIVAx3k4w5n.jpg',
        width: 1200,
        height: 630,
        alt: 'Lozinr Brand Identity Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@adnaanakif',
    title: 'Lozinr — Brand Identity Studio for Funded Startups & D2C Brands',
    description: 'Brand identity systems built for startups, SaaS companies, and ambitious founders who want to build brands worth remembering.',
    images: [
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Artboard%201%20copy%2001-WcAWbaFGMsa8gBIagDbeIVAx3k4w5n.jpg',
    ],
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': ['ProfessionalService', 'Organization'],
    name: 'Lozinr',
    description: 'Brand identity studio helping startups and ambitious founders build memorable brands through strategy, identity systems, and visual design.',
    url: 'https://lozinr.com',
    logo: 'https://lozinr.com/favicon.png',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      url: 'https://lozinr.com/#contact',
      email: 'adnan.lozinr@gmail.com',
    },
    founder: {
      '@type': 'Person',
      name: 'Adnan Akif',
    },
    areaServed: 'Worldwide',
    serviceType: [
      'Brand Strategy',
      'Brand Identity',
      'Visual Identity System',
      'Logo Identity',
      'Brand Guidelines'
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Branding Services',
      url: 'https://lozinr.com',
    },
    sameAs: [
      'https://www.instagram.com/adnaanakif/',
      'https://www.facebook.com/adnaanakif',
      'https://www.youtube.com/adnaanakif',
    ],
  }

  return (
    <html lang="en" suppressHydrationWarning className="bg-background">
      <head>
        {/* Preconnect to blob storage for faster image loading */}
        <link rel="preconnect" href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://sork85p59iwczwgh.public.blob.vercel-storage.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://pipu74e1kouytary.private.blob.vercel-storage.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for external services */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Schema markup for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className="antialiased bg-background text-foreground transition-colors duration-300">
        <CartProvider>
          {children}
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
