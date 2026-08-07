export interface CaseStudy {
  slug: string
  name: string
  subtitle: string
  heroImage: string
  whatWeDid: {
    label: string
    href: string
  }
  // Exactly 10 full-bleed images shown below the details section.
  images: string[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'baked-1',
    name: 'Bekary',
    subtitle:
      "Great brands aren't built by decoration. They're built through clear thinking, intentional systems, and decisions that serve the business.",
    heroImage: '#',
    whatWeDid: { label: 'What We Did', href: '#' },
    images: Array.from({ length: 10 }, () => '#'),
  },
  {
    slug: 'baked-2',
    name: 'Bekary',
    subtitle:
      "Great brands aren't built by decoration. They're built through clear thinking, intentional systems, and decisions that serve the business.",
    heroImage: '#',
    whatWeDid: { label: 'What We Did', href: '#' },
    images: Array.from({ length: 10 }, () => '#'),
  },
  {
    slug: 'baked-3',
    name: 'Bekary',
    subtitle:
      "Great brands aren't built by decoration. They're built through clear thinking, intentional systems, and decisions that serve the business.",
    heroImage: '#',
    whatWeDid: { label: 'What We Did', href: '#' },
    images: Array.from({ length: 10 }, () => '#'),
  },
]

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug)
}
