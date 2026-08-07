// Lemon Squeezy API utilities
const API_KEY = process.env.LEMON_SQUEEZY_API_KEY
const STORE_ID = process.env.LEMON_SQUEEZY_STORE_ID
const BASE_URL = 'https://api.lemonsqueezy.com/v1'

export interface LemonSqueezyProduct {
  id: string
  type: string
  attributes: {
    store_id: number
    name: string
    slug: string
    description: string
    status: string
    status_formatted: string
    thumb_url: string
    large_thumb_url: string
    price: number
    price_formatted: string
    from_price: number | null
    to_price: number | null
    pay_what_you_want: boolean
    buy_now_url: string
    from_price_formatted: string | null
    to_price_formatted: string | null
    created_at: string
    updated_at: string
    test_mode: boolean
  }
  relationships: Record<string, any>
}

export interface LemonSqueezyCheckoutData {
  checkoutUrl: string
  productId: string
  productName: string
}

/**
 * Fetch all products from Lemon Squeezy store
 */
export async function getProducts(): Promise<LemonSqueezyProduct[]> {
  if (!API_KEY || !STORE_ID) {
    throw new Error('LEMON_SQUEEZY_API_KEY or LEMON_SQUEEZY_STORE_ID not configured')
  }

  try {
    const response = await fetch(`${BASE_URL}/stores/${STORE_ID}/products`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error(`Lemon Squeezy API error: ${response.statusText}`)
    }

    const data = await response.json()
    return data.data || []
  } catch (error) {
    console.error('Error fetching Lemon Squeezy products:', error)
    throw error
  }
}

/**
 * Fetch a single product by ID
 */
export async function getProduct(productId: string): Promise<LemonSqueezyProduct | null> {
  if (!API_KEY) {
    throw new Error('LEMON_SQUEEZY_API_KEY not configured')
  }

  try {
    const response = await fetch(`${BASE_URL}/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    return data.data || null
  } catch (error) {
    console.error('Error fetching Lemon Squeezy product:', error)
    throw error
  }
}

/**
 * Create a checkout session for a product
 */
export async function createCheckout(
  productId: string,
  email?: string,
  customData?: Record<string, any>
): Promise<LemonSqueezyCheckoutData> {
  if (!API_KEY || !STORE_ID) {
    throw new Error('LEMON_SQUEEZY_API_KEY or LEMON_SQUEEZY_STORE_ID not configured')
  }

  try {
    const product = await getProduct(productId)
    if (!product) {
      throw new Error('Product not found')
    }

    // Lemon Squeezy uses buy_now_url or payment_page_url for direct checkout
    // You can customize the URL with query parameters
    let checkoutUrl = product.attributes.buy_now_url || product.attributes.payment_page_url

    if (email) {
      checkoutUrl += `?email=${encodeURIComponent(email)}`
    }

    return {
      checkoutUrl,
      productId: product.id,
      productName: product.attributes.name,
    }
  } catch (error) {
    console.error('Error creating Lemon Squeezy checkout:', error)
    throw error
  }
}

/**
 * Get checkout URL for a product (simple helper)
 */
export function getCheckoutUrl(buyNowUrl: string, email?: string): string {
  if (!buyNowUrl) {
    throw new Error('Buy now URL not available')
  }

  if (email) {
    return `${buyNowUrl}?email=${encodeURIComponent(email)}`
  }

  return buyNowUrl
}
