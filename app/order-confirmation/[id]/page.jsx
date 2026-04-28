'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Container, LoadingSpinner } from '@/components/EmptyState'
import { api } from '@/lib/api'

export default function OrderConfirmationPage({ params }) {
  const [order, setOrder] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { id } = use(params)

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const orderData = await api.getOrderById(id)
        setOrder(orderData)
      } catch (error) {
        console.error('Failed to load order:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadOrder()
  }, [id])

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

  if (!order) {
    return (
      <>
        <Header />
        <Container className="py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Order not found</h1>
            <p className="text-muted-foreground mb-6">We couldn&apos;t find your order.</p>
            <Link
              href="/products"
              className="inline-block px-6 py-2 bg-accent text-card rounded-lg hover:bg-accent/90 transition-colors"
            >
              Continue Shopping
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
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 text-accent mb-4">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground mb-6">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
          </div>

          {/* Order Details */}
          <div className="border border-border rounded-lg p-6 bg-card mb-8">
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Order Number</p>
                <p className="font-semibold">{order.id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Status</p>
                <p className="font-semibold capitalize">
                  <span className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-xs">
                    {order.status}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Order Date</p>
                <p className="font-semibold">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Estimated Delivery</p>
                <p className="font-semibold">
                  3 Days
                </p>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <h3 className="font-semibold mb-4">Shipping Address</h3>
              <p className="text-muted-foreground">{order.shippingAddress}</p>
            </div>
          </div>

          {/* Items */}
          <div className="border border-border rounded-lg overflow-hidden mb-8">
            <div className="p-6 bg-secondary border-b border-border">
              <h3 className="font-semibold">Order Items</h3>
            </div>
            {order.items.map((item, index) => (
              <div
                key={item.id}
                className={`p-6 flex gap-6 ${index > 0 ? 'border-t border-border' : ''}`}
              >
                <div className="w-20 h-20 flex-shrink-0 rounded-lg bg-secondary overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">Qty: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="border border-border rounded-lg p-6 bg-card mb-8">
            <div className="flex justify-between text-lg font-bold">
              <span>Total Amount</span>
              <span>${order.totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Next Steps */}
          <div className="space-y-4">
            <Link
              href="/orders"
              className="block w-full text-center py-3 bg-accent text-card rounded-lg font-semibold hover:bg-accent/90 transition-colors"
            >
              View All Orders
            </Link>
            <Link
              href="/products"
              className="block w-full text-center py-3 border border-border rounded-lg font-semibold hover:bg-secondary transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </Container>
    </>
  )
}
