import { NextResponse } from 'next/server'
import { getProducts } from '@/lib/lemon'

export const revalidate = 30 // Revalidate every 30 seconds to show new products immediately

export async function GET() {
  try {
    const products = await getProducts()
    
    // Add cache headers to ensure fresh data is fetched
    const response = NextResponse.json(products)
    response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
    return response
  } catch (error) {
    console.error('API error:', error instanceof Error ? error.message : error)
    return NextResponse.json(
      [],
      { 
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=60'
        }
      }
    )
  }
}
