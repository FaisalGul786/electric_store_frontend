'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Container, LoadingSpinner } from '@/components/EmptyState'
import { useAuth } from '@/context/AuthContext'
import { api } from '@/lib/api'

export default function EditProductPage({ params }) {
  const router = useRouter()
  // const { user, isLoading: isAuthLoading } = useAuth()
  const [product, setProduct] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const { id } = use(params)

  useEffect(() => {
    
    const loadProduct = async () => {
      try {
        const data = await api.getProductById(id)
        const productData = await data.json()
        console.log('Fetched product by id ... ', productData)
        setProduct(productData)
      } catch (err) {
        setError('Failed to load product')
      } finally {
        setIsLoading(false)
      }
    }

    loadProduct()
  }, [id, router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsSaving(true)

    try {
      const updatedProduct = await api.updateProduct(id, product)
      setProduct(updatedProduct)
      
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      await api.deleteProduct(id)
      router.push('/admin')
    } catch (err) {
      setError(err.message)
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

  // if (!user || user.role !== 'admin') {
  //   return (
  //     <>
  //       <Header />
  //       <Container className="py-12">
  //         <div className="text-center">
  //           <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
  //           <p className="text-muted-foreground">You don't have permission to edit products.</p>
  //         </div>
  //       </Container>
  //     </>
  //   )
  // }

  if (!product) {
    return (
      <>
        <Header />
        <Container className="py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Product not found</h1>
            <Link href="/admin" className="text-accent hover:text-accent/80">
              Back to Admin
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
        <div className="max-w-2xl">
          <div className="mb-8">
            <Link href="/admin" className="text-accent hover:text-accent/80 mb-4 inline-block">
              ← Back to Admin
            </Link>
            <h1 className="text-3xl font-bold">Edit Product</h1>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive text-destructive text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="border border-border rounded-lg p-6 bg-card space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Product Name</label>
              <input
                type="text"
                value={product.name}
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-secondary text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <input
                  type="text"
                  value={product.category}
                  onChange={(e) => setProduct({ ...product, category: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-secondary text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={product.price}
                  onChange={(e) =>
                    setProduct({ ...product, price: parseFloat(e.target.value) })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-border bg-secondary text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={product.description}
                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-secondary text-foreground focus:outline-none focus:ring-2 focus:ring-accent min-h-32"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Rating</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={product.rating}
                  onChange={(e) =>
                    setProduct({ ...product, rating: parseFloat(e.target.value) })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-border bg-secondary text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Reviews</label>
                <input
                  type="number"
                  value={product.reviews}
                  onChange={(e) => setProduct({ ...product, reviews: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-secondary text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={product.inStock}
                  onChange={(e) => setProduct({ ...product, inStock: e.target.checked })}
                  className="w-4 h-4 rounded border-border"
                />
                <span className="text-sm font-medium">In Stock</span>
              </label>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="submit"
                disabled={isSaving}
                className="flex-1 py-2 bg-accent text-card rounded-lg font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 border border-destructive text-destructive rounded-lg font-semibold hover:bg-destructive/10 transition-colors"
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </Container>
    </>
  )
}
