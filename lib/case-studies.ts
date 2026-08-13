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
    slug: 'BAKED',
    name: 'BAKED',
    subtitle:
      'BAKED on Earsham Street had earned real community trust in just four months — daily queues, a loyal following, genuine word-of-mouth. But their identity had not caught up. We built a complete brand system: a distinctive mark, a warm and confident visual language, and full application across packaging, signage, and social — so the shop finally looks like what it already is.',
    heroImage: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/HERO%20IMAGE-1GbIK5ztXd1jx0vUuqodLBU9jVWwaM.jpg',
    services: ['Brand Strategy', 'Identity Design', 'Packaging', 'Signage', 'Social Templates'],
    images: [
      '/baked-problem.jpg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MOODBOARD-q7n5x1faBvY7opAlutHFyxqqaZSln3.jpg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SKETCHING-Nwu2nDfcvXKj54kC9w1rty8xAO35Ar.jpg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LOGOSHOT-TLfus6xuZqjxssvNcLEPVNtK5YoFU9.jpg',
      ...Array.from({ length: 6 }, () => '#'),
    ],
    processCaptions: [
      { title: 'Problem', description: 'BAKED. on Earsham Street had built genuine community trust in four months, but its identity had not caught up. The website used an elegant serif wordmark while Instagram used a separate illustrated storefront, leaving the brand fragmented and difficult to own as the business grew.' },
      { title: 'Research', description: 'We studied the independent bakery category and found two familiar lanes: whimsical illustration or refined restraint. We also looked at BAKED.’s own products, using warm crust, chocolate, and roasted tones already present in the bread as the most honest starting point.' },
      { title: 'Exploration', description: 'We generated more than 50 concepts by hand, exploring monograms, crumb shapes, doorway motifs, and score-cut marks. Three routes reached the shortlist before the team chose to move from refined minimalism toward a bolder, warmer, more playful wordmark-led direction.' },
      { title: 'Decision', description: 'The final identity pairs a bold, wavy-baseline BAKED wordmark with a rounded B mark and soft internal swirl. It is confident, handmade in spirit, and flexible across seals, favicons, packaging details, and the wider bakery experience.' },
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
