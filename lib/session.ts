import { createHmac, timingSafeEqual } from 'node:crypto'

export const CLIENT_SESSION_COOKIE = 'client_session'
const SESSION_TTL_SECONDS = 60 * 60 * 24

type ClientSession = { clientId: string; issuedAt: number }

function getSecret() {
  const secret = process.env.SESSION_SECRET
  if (!secret) throw new Error('SESSION_SECRET is not configured')
  return secret
}

export function createClientSession(clientId: string) {
  const payload: ClientSession = { clientId, issuedAt: Date.now() }
  const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const signature = createHmac('sha256', getSecret()).update(encoded).digest('base64url')
  return { value: `${encoded}.${signature}`, maxAge: SESSION_TTL_SECONDS }
}

export function readClientSession(value?: string): ClientSession | null {
  if (!value) return null
  const [encoded, signature] = value.split('.')
  if (!encoded || !signature) return null
  const expected = createHmac('sha256', getSecret()).update(encoded).digest('base64url')
  const actualBuffer = Buffer.from(signature)
  const expectedBuffer = Buffer.from(expected)
  if (actualBuffer.length !== expectedBuffer.length || !timingSafeEqual(actualBuffer, expectedBuffer)) return null
  try {
    const session = JSON.parse(Buffer.from(encoded, 'base64url').toString()) as ClientSession
    if (!session.clientId || Date.now() - session.issuedAt > SESSION_TTL_SECONDS * 1000) return null
    return session
  } catch {
    return null
  }
}

export function sessionCookieOptions(maxAge: number) {
  return { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' as const, path: '/', maxAge }
}
