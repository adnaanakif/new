import { PortalShell } from '@/components/portal-shell'

export default function ContractPage() {
  return (
    <PortalShell eyebrow="Documents" title="Contract">
      <div className="border border-[#6b6762] bg-[#191817] p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.25em] text-[#8f8a83]">Project agreement & terms</p>
        <p className="mt-3 max-w-lg text-sm leading-6 text-[#b8b3ab]">
          Your contract will appear here once it's ready to review.
        </p>
      </div>
    </PortalShell>
  )
}
