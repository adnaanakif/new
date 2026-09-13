import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { CLIENT_SESSION_COOKIE, readClientSession } from '@/lib/session'

export default async function SecurePortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const session = readClientSession(cookieStore.get(CLIENT_SESSION_COOKIE)?.value)

  // No valid session — send them to the portal sign-in instead of rendering
  // the page. This is what actually stops someone from reaching a document
  // by typing the URL directly; it's not just a UI nicety.
  if (!session) redirect('/client-portal')

  return children
}
