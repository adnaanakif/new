import { createClient } from '@supabase/supabase-js'

// ─── Server-only Supabase client ──────────────────────────────────────────
// This uses the SERVICE ROLE key, which bypasses Row Level Security.
// The `clients` table has RLS enabled with NO policies — that's intentional,
// it means the anon/public key can never read or write this table at all.
// Only this server-side client (route handlers, server components, server
// actions) can touch it. NEVER import this file into a 'use client' file,
// and NEVER expose SUPABASE_SERVICE_ROLE_KEY to the browser.
// ────────────────────────────────────────────────────────────────────────

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error(
    'Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables.'
  )
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// ─── Types matching the `clients` table ───────────────────────────────────
export type Client = {
  id: string
  access_code: string
  project_name: string
  contact_name: string
  status: 'Discovery' | 'Strategy' | 'Design' | 'Delivered'
  start_date: string
  guidelines_url: string | null
  proposal_scope: unknown[]
  proposal_packages: unknown[]
  proposal_timeline_weeks: number | null
  proposal_selected_package: string | null
  contract_deposit_percent: number | null
  contract_total_amount: number | null
  contract_revision_rounds: number | null
  contract_ownership_note: string | null
  contract_signed_date: string | null
  invoice_items: unknown[]
  invoice_deposit_paid: boolean
  invoice_balance_due: number | null
  invoice_due_date: string | null
  invoice_payoneer_link: string | null
  questionnaire: unknown[]
  questionnaire_submitted: boolean
  created_at: string
  updated_at: string
}
