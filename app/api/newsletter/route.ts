import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory storage (for production, use a database)
const subscribers: string[] = []

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check if email already subscribed
    if (subscribers.includes(email)) {
      return NextResponse.json(
        { message: 'Already subscribed', email },
        { status: 200 }
      )
    }

    // Add to subscribers
    subscribers.push(email)

    // Log to console (in production, send to email service or database)
    console.log('[Newsletter] New subscriber:', email)
    console.log('[Newsletter] Total subscribers:', subscribers.length)
    console.log('[Newsletter] All subscribers:', subscribers)

    return NextResponse.json(
      { message: 'Successfully subscribed', email },
      { status: 200 }
    )
  } catch (error) {
    console.error('[Newsletter] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { subscribers, count: subscribers.length },
    { status: 200 }
  )
}
