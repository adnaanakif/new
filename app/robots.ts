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
        '/invoice',
        '/contract',
        '/proposal',
        '/client-portal',
        '/brand-questionnaire',
        '/brand-guidelines',
        '/brand-strategy',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
