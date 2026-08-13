export interface CaseStudy {
  slug: string
  name: string
  subtitle: string
  heroImage: string
  // 4-5 static pill/bar labels shown next to the details (e.g. "Strategy & Positioning")
  services: string[]
  // Exactly 10 full-bleed images shown below the details section.
  images: string[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'baked-1',
    name: 'BAKED',
    subtitle:
      'BAKED on Earsham Street had earned real community trust in just four months — daily queues, a loyal following, genuine word-of-mouth. But their identity had not caught up. We built a complete brand system: a distinctive mark, a warm and confident visual language, and full application across packaging, signage, and social — so the shop finally looks like what it already is.',
    heroImage: '#',
    services: ['Brand Strategy', 'Identity Design', 'Packaging', 'Signage', 'Social Templates'],
    images: Array.from({ length: 10 }, () => '#'),
  },
  {
    slug: 'baked-2',
    name: 'Bekary',
    subtitle:
      "Great brands aren't built by decoration. They're built through clear thinking, intentional systems, and decisions that serve the business.",
    heroImage: '#',
    services: ['Strategy & Positioning', 'Branding', 'Packaging', 'Tone of Voice'],
    images: Array.from({ length: 10 }, () => '#'),
  },
  {
    slug: 'baked-3',
    name: 'Bekary',
    subtitle:
      "Great brands aren't built by decoration. They're built through clear thinking, intentional systems, and decisions that serve the business.",
    heroImage: '#',
    services: ['Strategy & Positioning', 'Branding', 'Packaging', 'Tone of Voice'],
    images: Array.from({ length: 10 }, () => '#'),
  },
]

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug)
}
