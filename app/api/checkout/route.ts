import { NextRequest, NextResponse } from 'next/server'
import { createCheckout } from '@/lib/lemon'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { productId, email } = body

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    const checkoutData = await createCheckout(productId, email)
    return NextResponse.json(checkoutData)
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout' },
      { status: 500 }
    )
  }
}
