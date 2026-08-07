'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import useSWR from 'swr'
import Header from '@/components/header'
import Footer from '@/components/footer'
import type { LemonSqueezyProduct } from '@/lib/lemon'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

// Product metadata with subtitles and specs
// Add entries here using the exact product name as the key to customize specs per product
// If a product is not in this object, specs will be auto-generated from product attributes
const productMetadata: Record<string, { 
  subtitle: string
  specs: { includes: string; software: string; format: string }
}> = {
  // Example - customize as needed:
  // "Lozinr": {
  //   subtitle: "Professional Design Kit",
  //   specs: { includes: "Design files, Icons, Templates", software: "Figma, Adobe XD", format: "Digital files" }
  // },
  // "UI Kit Pro": {
  //   subtitle: "Complete Figma Component Library",
  //   specs: { includes: "100+ Components", software: "Figma", format: "Digital files" }
  // }
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const productId = params.productId as string
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [showFullDescription, setShowFullDescription] = useState(false)

  const { data: productsData, isLoading, error } = useSWR<LemonSqueezyProduct[]>(
    '/api/products',
    fetcher
  )

  const product = productsData?.find((p) => p.id === productId)

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!product?.attributes.buy_now_url) return

    setIsCheckingOut(true)
    // Open Lemon Squeezy checkout in new tab
    window.open(product.attributes.buy_now_url, '_blank')
    setIsCheckingOut(false)
  }

  if (isLoading) {
    return (
      <>
        <Header preloaderDone={true} />
        <main className="min-h-screen bg-background text-foreground flex items-center justify-center">
          <p className="text-foreground/60">Loading product...</p>
        </main>
        <Footer />
      </>
    )
  }

  if (error || !product) {
    return (
      <>
        <Header preloaderDone={true} />
        <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center gap-4">
          <p className="text-red-500">Product not found</p>
          <button
            onClick={() => router.back()}
            className="px-6 py-2 bg-foreground text-background rounded hover:opacity-80 transition-opacity"
          >
            Go Back
          </button>
        </main>
        <Footer />
      </>
    )
  }

  const price = product.attributes.price / 100
  const imageUrl = product.attributes.large_thumb_url || product.attributes.thumb_url
  
  // Auto-generate unique specs for each product based on their ID and attributes
  const generateProductSpecs = (prod: LemonSqueezyProduct) => {
    // Get product ID for unique identification
    const productId = prod.id
    
    // Create unique specs based on product ID hash
    const idHash = productId.split('').reduce((a, b) => a + b.charCodeAt(0), 0)
    const softwareOptions = ['Figma', 'Adobe XD', 'Sketch', 'Framer', 'Webflow']
    const includesOptions = [
      'Design files & assets',
      'Components & templates',
      'UI elements & icons',
      'Complete design system',
      'Interactive prototypes'
    ]
    const formatOptions = [
      'Digital files (.fig, .xd, .sketch)',
      'Vector & raster files',
      'Cloud storage ready',
      'Organized folders & layers',
      'High-resolution assets'
    ]
    
    return {
      includes: includesOptions[idHash % includesOptions.length],
      software: softwareOptions[idHash % softwareOptions.length],
      format: formatOptions[idHash % formatOptions.length]
    }
  }
  
  // Get metadata for this product, or use auto-generated specs
  const metadata = productMetadata[product.attributes.name] || {
    subtitle: `Professional Design Resource - ${product.attributes.name}`,
    specs: generateProductSpecs(product)
  }
  
  const subtitle = metadata.subtitle

  // Use product description from Lemon Squeezy, split into short and full
  const fullDescription = product.attributes.description || "Explore our comprehensive design resource collection. This premium template includes everything you need to elevate your design projects with professional-grade assets, detailed documentation, and easy-to-customize components."
  
  // Extract first sentence/paragraph as short description
  const shortDescription = fullDescription.split('\n')[0] || fullDescription.substring(0, 100) + '...'
  const displayDescription = showFullDescription ? fullDescription : shortDescription

  // Product gallery images (use same image multiple times if needed)
  const galleryImages = [
    imageUrl,
    imageUrl,
    imageUrl,
    imageUrl,
  ].filter(Boolean)

  return (
    <>
      <Header preloaderDone={true} />
      <main className="min-h-screen bg-background text-foreground">
        
        {/* MOBILE LAYOUT - Horizontal Slider on Top */}
        <div className="lg:hidden w-full flex flex-col">
          {/* Image Slider - Full Width at Top */}
          <div className="w-full overflow-x-auto scrollbar-hide flex-shrink-0">
            <div className="flex gap-1 w-max">
              {galleryImages.map((img, idx) => (
                <div key={idx} className="flex-shrink-0 w-[361px] h-[361px]">
                  <img
                    src={img}
                    alt={`Product image ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info Below Images */}
          <div className="px-4 py-8 flex flex-col gap-5">
            
            {/* Product Title & Subtitle */}
            <div className="pt-2">
              <h1 className="text-[28px] md:text-[36px] font-regular tracking-tight leading-tight mb-2 text-foreground">
                {product.attributes.name}
              </h1>
              <p className="text-[18px] tracking-tight text-foreground mb-4">
                {subtitle}
              </p>
              <div className="h-px w-full bg-foreground" />
            </div>

            {/* Price */}
            <div>
              <p className="text-[28px] md:text-[36px] font-regular tracking-tight text-foreground">
                ${price.toFixed(2)}
              </p>
            </div>

            {/* Description + More/Less kept close together */}
            <div className="flex flex-col gap-2 pt-2">
              <p className="text-[18px] leading-tight text-foreground">
                {displayDescription || "Explore our comprehensive design resource collection."}
              </p>

              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-[16px] font-regular text-foreground hover:opacity-80 transition-opacity text-left flex items-center gap-2"
              >
                <span>{showFullDescription ? '−' : '+'}</span> {showFullDescription ? 'Less' : 'More'}
              </button>
            </div>

            {/* Product Specifications - Always Visible */}
            <div className="space-y-2 py-4 border-t border-foreground/20">
              <div className="flex justify-between">
                <span className="text-foreground text-[18px] tracking-tight">Includes</span>
                <span className="text-foreground font-regular text-[18px] tracking-tight">{metadata.specs.includes}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground text-[18px] tracking-tight">Software</span>
                <span className="text-foreground font-regular text-[18px] tracking-tight">{metadata.specs.software}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground text-[18px] tracking-tight">Format</span>
                <span className="text-foreground font-regular text-[18px] tracking-tight">{metadata.specs.format}</span>
              </div>
            </div>

            {/* Buy Button */}
            <button
              onClick={handleBuyNow}
              disabled={isCheckingOut}
              className="w-full py-3 px-4 bg-foreground text-background text-[22px] md:text-[36px] font-regular disabled:opacity-50"
            >
              {isCheckingOut ? 'Redirecting...' : 'Buy'}
            </button>

            {/* Info Note */}
            <div className="pt-3 border-t border-foreground">
              <p className="text-[16px] text-foreground tracking-tight">
                You will receive immediate access to all files after purchase via email.
              </p>
            </div>

          </div>
        </div>

        {/* DESKTOP LAYOUT - Two Column */}
        <div className="hidden lg:block px-6 py-20">
          <div className="w-full">
            <div className="grid grid-cols-[40%_60%] gap-16">
              
              {/* LEFT SIDE - 40%: Product Information */}
              <div className="flex flex-col gap-8 pt-8">
                
                {/* Product Title & Subtitle */}
                <div>
                  <h1 className="text-[36px] font-regular tracking-tight leading-tight mb-2 text-foreground">
                    {product.attributes.name}
                  </h1>
                  <p className="text-[18px] text-foreground mb-6">
                    {subtitle}
                  </p>
                  <div className="h-px w-full bg-foreground" />
                </div>

                {/* Price */}
                <div>
                  <p className="text-[36px] font-regular tracking-tight text-foreground">
                    ${price.toFixed(2)}
                  </p>
                </div>

                {/* Description + More/Less kept close together */}
                <div className="flex flex-col gap-1">
                  <p className="text-[18px] leading-tight text-foreground">
                    {displayDescription}
                  </p>

                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-[18px] font-regular text-foreground  text-left flex items-center gap-2"
                  >
                    <span>{showFullDescription ? '−' : '+'}</span> {showFullDescription ? 'Less' : 'More'}
                  </button>
                </div>

                {/* Product Specifications - Always Visible */}
                <div className="space-y-2 py-6 border-t border-foreground">
                  <div className="flex justify-between">
                    <span className="text-foreground text-[18px]">Includes</span>
                    <span className="text-foreground font-regular text-[18px]">{metadata.specs.includes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground text-[18px]">Software</span>
                    <span className="text-foreground font-regular text-[18px]">{metadata.specs.software}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground text-[18px]">Format</span>
                    <span className="text-foreground font-regular text-[18px]">{metadata.specs.format}</span>
                  </div>
                </div>

                {/* Buy Button */}
                <button
                  onClick={handleBuyNow}
                  disabled={isCheckingOut}
                  className="w-full py-4 px-6 bg-foreground text-background text-[22px] font-regular disabled:opacity-50"
                >
                  {isCheckingOut ? 'Redirecting...' : 'Buy'}
                </button>

                {/* Info Note */}
                <div className="pt-4 border-t border-foreground">
                  <p className="text-[18px] text-foreground">
                    You will receive immediate access to all files after purchase via email.
                  </p>
                </div>

              </div>

              {/* RIGHT SIDE - 60%: Vertical Image Gallery */}
              <div className="flex flex-col gap-0 pt-8 h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-foreground/30 scrollbar-track-foreground/10 relative">
                {galleryImages.map((img, idx) => (
                  <div key={idx} className="flex-shrink-0 w-full aspect-square mb-4">
                    <img
                      src={img}
                      alt={`Product image ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

        </main>
        <Footer />
      </>
    )
  }
