'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import useSWR from 'swr'
import Header from '@/components/header'
import Footer from '@/components/footer'
import type { LemonSqueezyProduct } from '@/lib/lemon'

const fetcher = (url: string) => fetch(url, { cache: 'no-store' }).then((res) => res.json())


// ─── Store Hero ─────────────────────────────────────────────────────
function StoreHero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start end', 'end start'],
  })
  const heroImageY = useTransform(scrollYProgress, [0, 1], ['-24%', '24%'])
  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.0])

  useEffect(() => { setIsMounted(true) }, [])

  const heroImage = '/work-hero.svg'

  return (
    <div
      ref={heroRef}
      className="relative w-screen -mx-[calc(50vw-50%)] overflow-hidden"
      style={{ height: 'min(100vh, calc(100vw * 16 / 9))' }}
    >
      {heroImage && (
        <motion.div
          className="w-full h-full"
          style={{ y: heroImageY, scale: heroImageScale }}
        >
          <img
            src={heroImage}
            alt="Store"
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
          />
        </motion.div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-background" />

      {/* "Premium Store" title — centered, looping slide animation */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden px-2 lg:px-4">
        <div className="overflow-hidden h-[58px] md:h-[126px] lg:h-[187px]">
          <motion.div
            className="flex flex-col"
            animate={{ y: ['0%', '0%', '-50%', '-50%'] }}
            transition={{
              duration: 5.5,
              times: [0, 0.42, 0.58, 1],
              repeat: Infinity,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            <motion.h1
              animate={{ scale: [1, 1, 0.985, 1, 1] }}
              transition={{ duration: 5.5, times: [0, 0.4, 0.5, 0.6, 1], repeat: Infinity, ease: 'easeInOut' }}
              className="text-[64px] md:text-[140px] lg:text-[208px] font-medium tracking-tighter leading-[0.9] text-foreground text-center"
            >
              Premium Store
            </motion.h1>
            <h1 className="text-[64px] md:text-[140px] lg:text-[208px] font-medium tracking-tighter leading-[0.9] text-foreground text-center">
              Premium Store
            </h1>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// ─── Store Card ──────────────────────────────────────────────────────
interface StoreProduct {
  id: string
  title: string
  image: string
  description: string
  price: number
  license: string
  images?: string[]
}

function StoreCard({
  product,
}: {
  product: StoreProduct
}) {
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter()

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    router.push(`/store/${product.id}`)
  }

  return (
    <motion.div
      className="group flex flex-col h-full cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => router.push(`/store/${product.id}`)}
    >
      {/* Product Image — 16:9 aspect ratio */}
      <div className="relative w-full overflow-hidden bg-foreground/10" style={{ aspectRatio: '16/9' }}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Product Info */}
      <div className="pt-3 flex flex-col gap-1 lg:gap-3 mt-2 flex-grow">
        <h3 className="text-[24px] font-regular text-foreground tracking-tight leading-tight">
          {product.title}
        </h3>

        {/* Divider under the title */}
        <div className="h-px w-full bg-foreground" />

        <p className="text-[18px] font-regular text-foreground leading-tight tracking-tight flex-grow">
          {product.description}
        </p>

        <div className="flex items-center justify-between gap-2">
          <p className="text-[22px] font-regular tracking-tight text-foreground">
            ${(product.price / 100).toFixed(2)}
          </p>
          <button
            onClick={handleBuyNow}
            className="px-4 py-2 bg-foreground text-background"
          >
            Buy Now
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main Store Page ────────────────────────────────────────────────
export default function StorePage() {
  const { data: productsData, isLoading, error } = useSWR<LemonSqueezyProduct[]>(
    '/api/products',
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      refreshInterval: 30000, // Refresh every 30 seconds to show new products immediately
    }
  )

  const formattedProducts: StoreProduct[] = Array.isArray(productsData)
    ? productsData.map((product) => ({
        id: product.id,
        title: product.attributes.name,
        image: product.attributes.thumb_url || product.attributes.large_thumb_url || '/work-hero.svg',
        description: product.attributes.description || 'Premium design resource',
        price: product.attributes.price || 0,
        license: `License - ${product.attributes.name}`,
      }))
    : []

  return (
    <>
      <Header preloaderDone={true} />
      <main className="min-h-screen bg-background text-foreground">

        {/* Hero Section */}
        <StoreHero />

        {/* Products Grid */}
        <div className="px-3 lg:px-6 pt-16 pb-20">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <p className="text-foreground/60">Loading products...</p>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-20">
              <p className="text-red-500">Failed to load products. Please try again later.</p>
            </div>
          ) : formattedProducts.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <p className="text-foreground/60">No products available yet.</p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              {formattedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  viewport={{ once: true, margin: '-100px' }}
                >
                  <StoreCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

      </main>
      <Footer />
    </>
  )
}
