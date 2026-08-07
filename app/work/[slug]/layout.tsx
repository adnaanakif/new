import type { Metadata } from 'next'
import { getCaseStudy } from '@/lib/case-studies'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getCaseStudy(slug)

  if (!project) return {}

  const title = `${project.name} — Case Study | Lozinr Brand Identity Studio`

  return {
    title,
    description: project.subtitle,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://lozinr.com/work/${project.slug}`,
    },
    openGraph: {
      type: 'website',
      url: `https://lozinr.com/work/${project.slug}`,
      title,
      description: project.subtitle,
    },
  }
}

export default function CaseStudyLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}) {
  return children
}
