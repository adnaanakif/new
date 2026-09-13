import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'

export const CLIENT_SESSION_COOKIE = 'client_session'
const SESSION_TTL_SECONDS = 60 * 60 * 8
const SCRYPT_KEY_LENGTH = 64

type ClientSession = { clientId: string; issuedAt: number }

function getSecret() {
  const secret = process.env.SESSION_SECRET ?? process.env.SUPABASE_JWT_SECRET
  if (!secret || secret.length < 32) throw new Error('SESSION_SECRET or SUPABASE_JWT_SECRET must be configured with at least 32 characters')
  return secret
}

export function hashAccessCode(accessCode: string) {
  const salt = randomBytes(16).toString('hex')
  const hash = scryptSync(accessCode, salt, SCRYPT_KEY_LENGTH).toString('hex')
  return `scrypt:${salt}:${hash}`
}

export function verifyAccessCode(accessCode: string, storedHash: string) {
  const [, salt, hash] = storedHash.split(':')
  if (!salt || !hash) return false
  const expected = Buffer.from(hash, 'hex')
  const actual = scryptSync(accessCode, salt, expected.length)
  return expected.length === actual.length && timingSafeEqual(expected, actual)
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
