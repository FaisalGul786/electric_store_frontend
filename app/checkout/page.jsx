'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Container, EmptyState } from '@/components/EmptyState'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { api } from '@/lib/api'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCart()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [error, setError] = useState('')

  if (!user) {
    return (
      <>
        <Header />
        <Container className="py-12">
          <EmptyState
            icon="🔐"
            title="Sign In Required"
            description="Please sign in to proceed with checkout"
            action={
              <Link
                href="/login"
                className="inline-block px-6 py-2 bg-accent text-card rounded-lg hover:bg-accent/90 transition-colors"
              >
                Sign In
              </Link>
            }
          />
        </Container>
      </>
    )
  }

  if (items.length === 0) {
    return (
      <>
        <Header />
        <Container className="py-12">
          <EmptyState
            icon="🛒"
            title="Your Cart is Empty"
            description="Add some products before checking out"
            action={
              <Link
                href="/products"
                className="inline-block px-6 py-2 bg-accent text-card rounded-lg hover:bg-accent/90 transition-colors"
              >
                Continue Shopping
              </Link>
            }
          />
        </Container>
      </>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!address || !city || !state || !zipCode) {
      setError('Please fill in all address fields')
      return
    }

    setIsLoading(true)

    try {
      const shippingAddress = `${address}, ${city}, ${state} ${zipCode}`
      console.log('cart checkout data', {
      id: user.id,
      items,
      shippingAddress
      })
      const order = await api.createOrder(user.id, items, shippingAddress)
      console.log('order .',order);
      clearCart()
      router.push(`/order-confirmation/${order}`)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Header />
      <Container className="py-12">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="border border-border rounded-lg p-6 bg-card">
              <h2 className="text-xl font-bold mb-6">Shipping Information</h2>

              {error && (
                <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive text-destructive text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    value={user.name}
                    disabled
                    className="w-full px-4 py-2 rounded-lg border border-border bg-secondary text-foreground disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full px-4 py-2 rounded-lg border border-border bg-secondary text-foreground disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Street Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-secondary text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="123 Main St"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-secondary text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="New York"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">State</label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-secondary text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="NY"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">ZIP Code</label>
                  <input
                    type="text"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-secondary text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="10001"
                    required
                  />
                </div>

                <div className="pt-4">
                  <h3 className="font-semibold mb-4">Payment Method</h3>
                  <div className="p-4 border border-border rounded-lg bg-secondary text-center text-muted-foreground text-sm">
                    Demo Mode: Click complete order to proceed (no actual payment required)
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-accent text-card rounded-lg font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                >
                  {isLoading ? 'Processing...' : 'Complete Order'}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border border-border rounded-lg p-6 bg-card sticky top-20">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-2 mb-4 pb-4 border-b border-border">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.name} × {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-4 pb-4 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (10%)</span>
                  <span>${(totalPrice * 0.1).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${(totalPrice * 1.1).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
