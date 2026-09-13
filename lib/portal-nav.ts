export type PortalNavItem = {
  label: string
  href: string
  description: string
  status: string
}

export const PORTAL_NAV_ITEMS: PortalNavItem[] = [
  { label: 'Brand Questionnaire', href: '/client-portal/brand-questionnaire', description: 'Tell us about your brand and goals.', status: 'Start' },
  { label: 'Brand Strategy', href: '/client-portal/brand-strategy', description: 'Review your strategic direction and positioning.', status: 'View' },
  { label: 'Proposal', href: '/client-portal/proposal', description: 'See the agreed scope, deliverables, and timeline.', status: 'View' },
  { label: 'Invoice', href: '/client-portal/invoice', description: 'Review your balance and payment details.', status: 'View' },
  { label: 'Contract', href: '/client-portal/contract', description: 'Access your project agreement and terms.', status: 'View' },
  { label: 'Brand Guidelines', href: '/client-portal/brand-guidelines', description: 'Keep your approved identity system close.', status: 'View' },
]
