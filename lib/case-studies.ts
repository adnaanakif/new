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
      '/baked-problem-newer.jpg',
      '/baked-research-new.jpg',
      '/baked-explorations-new.jpg',
      '/baked-decision-new.jpg',
      '/baked-01.jpg',
      '/baked-02.jpg',
      '/baked-03.jpg',
      '/baked-04.jpg',
      '/baked-05.jpg',
      '/baked-06.jpg',
      '/baked-07.jpg',
      '/baked-08.jpg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Social-Template-gygBMViQ1gdFYT6jlmy9faJ5fnjRJH.jpg',
    ],
    processCaptions: [
      { title: 'Problem', description: 'BAKED. on Earsham Street had built genuine community trust in four months, but its identity had not caught up. The website used an elegant serif wordmark while Instagram used a separate illustrated storefront, leaving the brand fragmented and difficult to own as the business grew.' },
      { title: 'Research', description: 'We studied the independent bakery category and found two familiar lanes: whimsical illustration or refined restraint. We also looked at BAKED.’s own products, using warm crust, chocolate, and roasted tones already present in the bread as the most honest starting point.' },
      { title: 'Exploration', description: 'We generated more than 50 concepts by hand, exploring monograms, crumb shapes, doorway motifs, and score-cut marks. Three routes reached the shortlist before the team chose to move from refined minimalism toward a bolder, warmer, more playful wordmark-led direction.' },
      { title: 'Decision', description: 'The final identity pairs a bold, wavy-baseline BAKED wordmark with a rounded B mark and soft internal swirl. It is confident, handmade in spirit, and flexible across seals, favicons, packaging details, and the wider bakery experience.' },
    ],
  },
  {
    slug: 'live-lil',
    name: 'Live & Lil',
    subtitle:
      'Live & Lil is a charm jewelry brand built around the pieces customers collect one at a time. Every brand in the category reaches for the same symbols — hearts, stars, moons. We built an identity around the charm itself instead: a mark, a color story, and a full system that reads as craft rather than trend.',
    heroImage:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Live%20%26%20Lil%20Hero%20Image-5Crr7vbEISiYoZCBVmDlqbuuuzuTmj.jpg',
    services: ['Brand Strategy', 'Identity Design', 'Packaging', 'Social Templates'],
    images: [
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Problem-dVyW9eEs1ubZeoq2tjy21cPPoATby3.png',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Research-UtqiTDRF17l8a2Eb03GK89zDJyw5rv.png',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Exploration-6KBIw3B1cka0tNxPdDJDNceRId0HNC.png',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dicision.gif-AwUbM6xuF7Ocd0ttWtukF1GgbOWdvZ.jpeg',
      '#',
      '#',
      '#',
      '#',
      '#',
      '#',
    ],
    processCaptions: [
      {
        title: 'Problem',
        description: 'Live & Lil had a warm, personal product and a growing community, but its visual presence did not yet communicate the charm, care, and individuality behind the brand. The identity needed to feel more intentional while staying close to the founders and their customers.',
      },
      {
        title: 'Research',
        description: 'We looked across the charm jewelry category, studied how customers discover and collect meaningful pieces, and mapped the visual language around gifting, self-expression, and everyday rituals. The strongest opportunity was to create a world that felt collectible rather than overly polished.',
      },
      {
        title: 'Exploration',
        description: 'We explored wordmarks, monograms, charm shapes, tactile materials, and color combinations that could carry the brand across packaging and social. The direction grew from small, personal details into a flexible system with a balance of softness, confidence, and play.',
      },
      {
        title: 'Decision',
        description: 'The final direction centers Live & Lil around a distinctive monogram and a rich plum-and-gold palette. It gives the brand a recognizable signature while leaving enough room for the jewelry, stories, and customers to remain the focus.',
      },
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
