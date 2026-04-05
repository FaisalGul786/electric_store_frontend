'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { ProductCard } from '@/components/ProductCard'
import { EmptyState, LoadingSpinner, Container } from '@/components/EmptyState'
import { api, CATEGORIES } from '@/lib/api'

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true)
      try {
        const data = await api.getProducts(selectedCategory === 'All' ? null : selectedCategory)
        setProducts(data)
      } catch (error) {
        console.error('Failed to load products:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProducts()
  }, [selectedCategory])

  return (
    <>
      <Header />
      <Container className="py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Our Products</h1>
          <p className="text-muted-foreground">Explore our collection of premium tech products</p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-4">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-accent text-card'
                  : 'bg-secondary text-foreground hover:bg-secondary/80'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <LoadingSpinner />
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="📭"
            title="No Products Found"
            description="We couldn't find any products in this category. Please try another one."
          />
        )}
      </Container>
    </>
  )
}
