export interface CaseStudy {
  slug: string
  name: string
  subtitle: string
  heroImage: string
  // 4-5 static pill/bar labels shown next to the details (e.g. "Strategy & Positioning")
  services: string[]
  // Exactly 10 full-bleed images shown below the details section.
  images: string[]
  processCaptions: Array<{ title: string; description: string }>
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'baked-1',
    name: 'BAKED',
    subtitle:
      'BAKED on Earsham Street had earned real community trust in just four months — daily queues, a loyal following, genuine word-of-mouth. But their identity had not caught up. We built a complete brand system: a distinctive mark, a warm and confident visual language, and full application across packaging, signage, and social — so the shop finally looks like what it already is.',
    heroImage: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/HERO%20IMAGE-1GbIK5ztXd1jx0vUuqodLBU9jVWwaM.jpg',
    services: ['Brand Strategy', 'Identity Design', 'Packaging', 'Signage', 'Social Templates'],
    images: Array.from({ length: 10 }, () => '#'),
    processCaptions: [
      { title: 'Problem', description: 'Demo description: the brand needed a clearer identity that matched the strength of its existing community.' },
      { title: 'Research', description: 'Demo description: we studied the shop, its customers, its daily rituals, and the local context around Earsham Street.' },
      { title: 'Exploration', description: 'Demo description: we explored marks, colour, type, and a visual language with warmth and confidence.' },
      { title: 'Decision', description: 'Demo description: we selected a distinctive brand system designed to work across every customer touchpoint.' },
    ],
  },
  {
    slug: 'baked-2',
    name: 'Bekary',
    subtitle:
      "Great brands aren't built by decoration. They're built through clear thinking, intentional systems, and decisions that serve the business.",
    heroImage: '#',
    services: ['Strategy & Positioning', 'Branding', 'Packaging', 'Tone of Voice'],
    images: Array.from({ length: 10 }, () => '#'),
    processCaptions: [
      { title: 'Problem', description: 'Demo description: the existing brand needed a sharper point of view and a system built for growth.' },
      { title: 'Research', description: 'Demo description: we gathered context from the audience, category, and everyday customer experience.' },
      { title: 'Exploration', description: 'Demo description: we tested a range of visual routes before narrowing into the strongest direction.' },
      { title: 'Decision', description: 'Demo description: we chose the clearest route and translated it into a practical identity system.' },
    ],
  },
  {
    slug: 'baked-3',
    name: 'Bekary',
    subtitle:
      "Great brands aren't built by decoration. They're built through clear thinking, intentional systems, and decisions that serve the business.",
    heroImage: '#',
    services: ['Strategy & Positioning', 'Branding', 'Packaging', 'Tone of Voice'],
    images: Array.from({ length: 10 }, () => '#'),
    processCaptions: [
      { title: 'Problem', description: 'Demo description: the brand needed a more memorable foundation for its next chapter.' },
      { title: 'Research', description: 'Demo description: we looked at the business, its market, and the people it needed to reach.' },
      { title: 'Exploration', description: 'Demo description: several strategic and visual directions were developed and tested.' },
      { title: 'Decision', description: 'Demo description: one focused direction became the basis for the final brand system.' },
    ],
  },
]

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug)
}
