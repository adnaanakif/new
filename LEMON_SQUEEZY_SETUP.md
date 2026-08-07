# Lemon Squeezy Integration Guide

This guide explains how the Lemon Squeezy payment integration works in your store.

## Overview

The integration fetches products directly from your Lemon Squeezy store and displays them on your store page. When users click "Buy Now", they're taken directly to Lemon Squeezy's checkout page.

## Setup Instructions

### 1. Get Your API Credentials

1. Log in to your [Lemon Squeezy Dashboard](https://app.lemonsqueezy.com)
2. Go to **Settings** → **API**
3. Copy your **API Key** (this is your `LEMON_SQUEEZY_API_KEY`)
4. Find your **Store ID** from the settings page (this is your `LEMON_SQUEEZY_STORE_ID`)

### 2. Add Environment Variables

Your environment variables have been configured in your Vercel project:
- `LEMON_SQUEEZY_API_KEY` - Your Lemon Squeezy API key
- `LEMON_SQUEEZY_STORE_ID` - Your Lemon Squeezy Store ID

These are automatically loaded in your Next.js app via `.env.development.local`.

## File Structure

### Core Files

- **`lib/lemon-squeezy.ts`** - API utilities for communicating with Lemon Squeezy
  - `getProducts()` - Fetch all products from your store
  - `getProduct(id)` - Fetch a single product by ID
  - `createCheckout()` - Create a checkout session
  - `getCheckoutUrl()` - Generate a checkout URL with optional email

- **`app/api/products/route.ts`** - API endpoint to fetch all products
  - Endpoint: `GET /api/products`
  - Returns: Array of Lemon Squeezy products

- **`app/api/checkout/route.ts`** - API endpoint to create checkout sessions
  - Endpoint: `POST /api/checkout`
  - Body: `{ productId: string, email?: string }`
  - Returns: `{ checkoutUrl: string, productId: string, productName: string }`

- **`app/store/page.tsx`** - Store page component
  - Fetches products using SWR
  - Displays products in a grid
  - Each product card has a "Buy Now" button

## How It Works

### 1. Product Fetching

When the store page loads:

```typescript
const { data: productsData, isLoading, error } = useSWR<LemonSqueezyProduct[]>(
  '/api/products',
  fetcher
)
```

The page uses SWR to fetch products from Lemon Squeezy and cache them for 1 hour.

### 2. Product Display

Products are transformed from Lemon Squeezy's API format to your store's format:

```typescript
const formattedProducts: StoreProduct[] = (productsData || []).map((product) => ({
  id: product.id,
  title: product.attributes.name,
  image: product.attributes.thumb_url || product.attributes.large_thumb_url,
  description: product.attributes.description,
  price: product.attributes.price, // in cents
  buyNowUrl: product.attributes.buy_now_url,
}))
```

Note: Lemon Squeezy prices are in cents, so we divide by 100 when displaying.

### 3. Checkout Flow

When a user clicks "Buy Now":

1. The button click handler opens the Lemon Squeezy checkout URL in a new tab
2. Lemon Squeezy handles payment processing
3. After payment, users are redirected to your configured success/cancel URLs

## API Responses

### Products Endpoint (`/api/products`)

```json
[
  {
    "id": "123456",
    "type": "product",
    "attributes": {
      "name": "Premium Design Kit",
      "slug": "premium-design-kit",
      "description": "Complete design resources",
      "price": 29900,
      "buy_now_url": "https://example.lmsqz.com/checkout/...",
      "thumb_url": "https://...",
      "large_thumb_url": "https://...",
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  }
]
```

### Checkout Endpoint (`/api/checkout`)

**Request:**
```json
{
  "productId": "123456",
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "checkoutUrl": "https://example.lmsqz.com/checkout/...",
  "productId": "123456",
  "productName": "Premium Design Kit"
}
```

## Customization

### Update Product Caching

To change how long products are cached (currently 1 hour), edit `lib/lemon-squeezy.ts`:

```typescript
next: { revalidate: 3600 }, // Change this value (in seconds)
```

### Add Customer Email to Checkout

Modify the "Buy Now" button in `app/store/page.tsx` to collect user email:

```typescript
const handleCheckout = async (e: React.MouseEvent) => {
  const userEmail = prompt('Enter your email:')
  if (userEmail && product.buyNowUrl) {
    window.open(
      `${product.buyNowUrl}?email=${encodeURIComponent(userEmail)}`,
      '_blank'
    )
  }
}
```

### Handle Checkout Variants

Lemon Squeezy supports product variants. To use them, modify the API:

```typescript
// In lib/lemon-squeezy.ts
export async function getProductVariants(productId: string) {
  const response = await fetch(
    `${BASE_URL}/products/${productId}/variants`,
    { headers: { Authorization: `Bearer ${API_KEY}` } }
  )
  return response.json()
}
```

## Troubleshooting

### Products Not Loading

1. **Check API credentials**: Verify `LEMON_SQUEEZY_API_KEY` and `LEMON_SQUEEZY_STORE_ID` are correct
2. **Check browser console**: Look for error messages in the developer console
3. **Check server logs**: Run `pnpm dev` to see API errors
4. **Verify Lemon Squeezy account**: Make sure you have products in your store

### Checkout URL Not Working

1. **Verify product has buy_now_url**: Check the API response in network tab
2. **Check Lemon Squeezy settings**: Ensure your store is configured for checkouts
3. **Test with Lemon Squeezy sandbox**: Use test mode to debug issues

### CORS Issues

The API calls go through your Next.js backend, so CORS shouldn't be an issue. However, if you see CORS errors:

1. Verify the `/api/products` and `/api/checkout` routes are accessible
2. Check that your environment variables are loaded

## Next Steps

1. **Add order tracking**: Implement webhook handling for order events
2. **Add customer portal**: Show order history to logged-in users
3. **Implement digital deliverables**: Automatically deliver products after purchase
4. **Add analytics**: Track which products are popular
5. **Setup webhooks**: Listen to Lemon Squeezy events like `order.created`, `order.refunded`

## Useful Links

- [Lemon Squeezy API Docs](https://docs.lemonsqueezy.com/api)
- [Lemon Squeezy Dashboard](https://app.lemonsqueezy.com)
- [Webhooks Documentation](https://docs.lemonsqueezy.com/guides/webhooks)

## Support

For issues with:
- **Lemon Squeezy API**: Check [Lemon Squeezy docs](https://docs.lemonsqueezy.com)
- **Next.js integration**: Check [Next.js docs](https://nextjs.org)
- **This implementation**: Review the code in `lib/lemon-squeezy.ts`
