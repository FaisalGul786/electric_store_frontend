'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Container, LoadingSpinner } from '@/components/EmptyState'
import { useCart } from '@/context/CartContext'
import { api } from '@/lib/api'

export default function ProductPage({ params }) {
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const { addToCart } = useCart()

  const { id } = use(params)

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true)
      try {
        const data = await api.getProductById(id)
        setProduct(data)
      } catch (error) {
        console.error('Failed to load product:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProduct()
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product)
      }
      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 2000)
    }
  }

  if (isLoading) {
    return (
      <>
        <Header />
        <Container className="py-12">
          <LoadingSpinner />
        </Container>
      </>
    )
  }

  if (!product) {
    return (
      <>
        <Header />
        <Container className="py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Product not found</h1>
            <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
            <Link
              href="/products"
              className="inline-block px-6 py-2 bg-accent text-card rounded-lg hover:bg-accent/90 transition-colors"
            >
              Back to Products
            </Link>
          </div>
        </Container>
      </>
    )
  }

  return (
    <>
      <Header />
      <Container className="py-12">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/products" className="hover:text-accent">
            Products
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div>
            <div className="aspect-square rounded-lg bg-secondary overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div>
            <p className="text-accent font-semibold uppercase text-sm tracking-wider">
              {product.category}
            </p>
            <h1 className="mt-2 text-3xl font-bold">{product.name}</h1>

            {/* Rating */}
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-xl ${
                      i < Math.floor(product.rating) ? 'text-accent' : 'text-muted'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-muted-foreground">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="mt-6">
              <p className="text-4xl font-bold">${product.price.toFixed(2)}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {product.inStock ? (
                  <span className="text-accent">✓ In Stock</span>
                ) : (
                  <span className="text-destructive">Out of Stock</span>
                )}
              </p>
            </div>

            {/* Description */}
            <p className="mt-6 text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Quantity & Add to Cart */}
            <div className="mt-8 flex gap-4">
              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-secondary transition-colors"
                >
                  −
                </button>
                <span className="px-4 py-2 font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-secondary transition-colors"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 py-2 rounded-lg font-semibold text-lg transition-all ${
                  addedToCart
                    ? 'bg-accent/50 text-card'
                    : 'bg-accent text-card hover:bg-accent/90'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {addedToCart ? '✓ Added to Cart' : 'Add to Cart'}
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-8 border-t border-border pt-8">
              <h3 className="font-semibold mb-4">Product Details</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Free shipping on orders over $50</li>
                <li>30-day money-back guarantee</li>
                <li>1-year manufacturer warranty</li>
                <li>Fast and secure checkout</li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
