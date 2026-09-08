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
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dicision.gif-jQNgGrTMmR95s4O0ygRqjzyZ8CJMCF.jpeg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/01-9nfQFdrTPLXLIpoOIYtWSElmcH8dip.png',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/02.gif-ILWlieRqT3ifxtmdAp2d00ZMy7SX9T.jpeg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/03-yq7Wq2zzz1WlV8gXAi4jwCMiASvdNR.png',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/04-K8y4rNZ6A9ug3FSD6iFDNJTXEz9nK9.png',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/05-7SUI1uUpFWuv2Be5DkRLON2s3sq2Yp.png',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/06-yBoGwm1I4zAnkIPINQRyfAoTQlbGPS.png',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/07-ah9uOaM84vUG5OtGhhqA1RAmsaCXzN.png',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/08-61mTYJYkM70zr7bG4e51RGASrgciHD.png',
    ],
    processCaptions: [
      {
        title: 'Problem',
        description: 'Live & Lil is a jewelry brand built around charms — small, personal pieces customers layer over time. But every brand in this category defaults to the same handful of symbols: hearts, stars, moons. Familiar, safe, and completely interchangeable with the next brand on the page.',
      },
      {
        title: 'Research',
        description: 'Jewelry branding research pointed toward leaning into the familiar — customers already associate hearts and stars with charm jewelry, and familiarity converts. But that’s also how a brand ends up looking like everyone else selling the same category.',
      },
      {
        title: 'Exploration',
        description: 'The first round of sketches leaned into that familiar territory anyway — heart pendants, heart wordmarks, floral monograms. On paper, they looked fine. That was the problem. Any one of them could have been lifted onto a different jewelry brand’s page without anyone noticing.',
      },
      {
        title: 'Decision',
        description: 'The real material of the brand wasn’t a heart — it was the charm itself. Nine digital variations later, the strongest version turned out to be the simplest: a bold “L,” carrying a single round charm bead, with a soft curved tail extending from its base. Legible at the size of an actual charm — which, for a jewelry brand, is the whole point.',
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
