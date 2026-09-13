import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://lozinr.com'

  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/work'],
      // Private + tool pages that should not be crawled or indexed.
      disallow: [
        '/services',
        '/about',
        '/contact',
        '/projects/',
        '/store',
        '/design-news',
        '/client-portal',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
