import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://lozinr.com'

  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/work', '/about', '/templates'],
      disallow: [],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
