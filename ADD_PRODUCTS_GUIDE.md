# How to Add Products to Your Store

Your Lemon Squeezy integration is **working perfectly**! The store page is ready to display products. You just need to add products to your Lemon Squeezy account first.

## Step-by-Step: Add Your First Product

### 1. Go to Lemon Squeezy Dashboard
- Open your Lemon Squeezy account at https://app.lemonsqueezy.com
- Navigate to **Products** in the left sidebar

### 2. Create a New Product
- Click the **"+ New Product"** button (usually top-right)
- Fill in the product details:

#### Required Fields:
- **Product Name**: e.g., "Brand Guidelines", "UI Kit", "Typography Pack"
- **Description**: Short description of what the product is
- **Price**: Enter in cents
  - For $800: enter `80000`
  - For $299: enter `29900`
  - For $149: enter `14900`

#### Optional but Important:
- **Product Image/Thumbnail**: Upload a product image (will display on your store)
  - Recommended size: 1600x900 pixels (16:9 aspect ratio)
  - Formats: JPG, PNG, WebP

### 3. Save the Product
- Click **"Save"** or **"Create Product"**
- The product will be assigned a unique ID

### 4. Verify It Appears on Your Store
- Go to your store page: `http://localhost:3000/store`
- The product should appear in the grid
- When you click **"Buy Now"**, it will redirect to Lemon Squeezy checkout

## How the Integration Works

```
Lemon Squeezy Dashboard
       ↓
(You create a product)
       ↓
Your Store API (/api/products)
       ↓
(Fetches products every time page loads)
       ↓
Store Page (/store)
       ↓
(Displays products in a grid)
       ↓
Buy Now Button
       ↓
(Opens Lemon Squeezy checkout)
```

## Product Display

Each product card shows:
1. **Product Image** - from Lemon Squeezy
2. **Product Name** - from Lemon Squeezy
3. **Description** - from Lemon Squeezy
4. **Price** - from Lemon Squeezy (automatically formatted)
5. **Buy Now Button** - redirects to Lemon Squeezy checkout

## Test API Endpoint

To verify your products are being fetched correctly, visit:
```
http://localhost:3000/api/products
```

You should see a JSON array of products. When empty, it returns `[]`.

## Add Multiple Products

Repeat the process to add more products. The store will automatically:
- Fetch all products from Lemon Squeezy
- Display them in a responsive grid (1 column on mobile, 3 columns on desktop)
- Format prices correctly
- Handle checkout seamlessly

## Troubleshooting

### Products Not Showing?
1. **Check API**: Visit `http://localhost:3000/api/products` to see if products are being fetched
2. **Check Env Vars**: Make sure `LEMON_SQUEEZY_API_KEY` and `LEMON_SQUEEZY_STORE_ID` are set
3. **Verify Products Exist**: Log into your Lemon Squeezy dashboard and confirm products are created
4. **Check Console**: Open browser dev tools (F12) and check for any errors

### Checkout Not Working?
- Make sure you're using a valid Lemon Squeezy store
- Check that products have `buy_now_url` or `payment_page_url` configured

### Images Not Loading?
- Ensure you uploaded a thumbnail in Lemon Squeezy
- Check the image URL is accessible
- Try a different image format

## Next Steps

1. **Create your first product** in Lemon Squeezy
2. **Verify it appears** on your store
3. **Test the checkout** flow
4. **Add more products** as needed
5. **Deploy** when ready!

## API Documentation

Your store uses these endpoints:

### GET /api/products
Returns all products from Lemon Squeezy
```json
[
  {
    "id": "123",
    "type": "products",
    "attributes": {
      "name": "Brand Guidelines",
      "description": "...",
      "price": 80000,
      "thumb_url": "...",
      "buy_now_url": "https://..."
    }
  }
]
```

### GET /api/checkout
Creates a checkout session (optional - currently using direct buy_now_url)

## Questions?

- Lemon Squeezy Docs: https://docs.lemonsqueezy.com
- API Reference: https://docs.lemonsqueezy.com/api
