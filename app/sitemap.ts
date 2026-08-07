import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lozinr.com'

  // Only Home and Work are indexable.
  // Contact lives as a section on the Home page (see /#contact).
  return [
    {
      url: baseUrl,
      changeFrequency: 'weekly' as const,
      priority: 1,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/work`,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
      lastModified: new Date(),
    },
  ]
}
