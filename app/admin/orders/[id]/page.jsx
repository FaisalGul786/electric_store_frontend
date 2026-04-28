'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Container, LoadingSpinner } from '@/components/EmptyState'
import { useAuth } from '@/context/AuthContext'
import { api } from '@/lib/api'

export default function AdminOrderPage({ params }) {
  const { user, isLoading: isAuthLoading } = useAuth()
  const [order, setOrder] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const { id } = use(params)

  useEffect(() => {
    

    if (!user || user.role !== 'admin') {
      setIsLoading(false)
      return
    }

    const loadOrder = async () => {
      try {
        const data = await api.adminOrderById(id)
        console.log('order admin detail', data) ;
        setOrder(data)
      } catch (error) {
        console.error('Failed to load order:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadOrder()
  }, [id, user])

  const handleStatusUpdate = async (newStatus) => {
    setIsUpdating(true)
    try {
      const updated = await api.updateOrderStatus(id, newStatus)
      console.log('order update result ... ', updated) ;
      setOrder(prev => ({ ...prev, status: newStatus }))
    } catch (error) {
      console.error('Failed to update order status:', error)
    } finally {
      setIsUpdating(false)
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

  if (!user || user.role !== 'admin') {
    return (
      <>
        <Header />
        <Container className="py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
            <p className="text-muted-foreground">You don't have permission to view this page.</p>
          </div>
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
        <div className="max-w-3xl">
          <Link href="/admin" className="text-accent hover:text-accent/80 mb-4 inline-block">
            ← Back to Admin
          </Link>
          <h1 className="text-3xl font-bold mb-8">Order Details</h1>

          {/* Order Header */}
          <div className="border border-border rounded-lg p-6 bg-card mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Order ID</p>
                <p className="font-semibold font-mono text-sm">{order.id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Customer</p>
                <p className="font-semibold">{order.customerName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Order Date</p>
                <p className="font-semibold">{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Estimated Delivery</p>
                <p className="font-semibold">
                  {new Date(order.estimatedDelivery).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Status Update */}
          <div className="border border-border rounded-lg p-6 bg-card mb-8">
            <h2 className="text-lg font-bold mb-4">Order Status</h2>
            <div className="flex items-center gap-3 mb-4">
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold capitalize ${
                  order.status === 'pending'
                    ? 'bg-amber-500/20 text-amber-500'
                    : 'bg-accent/20 text-accent'
                }`}
              >
                {order.status}
              </span>
            </div>
            <div className="flex gap-2">
              {['pending', 'ship'].map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusUpdate(status)}
                  disabled={isUpdating || order.status === status}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    order.status === status
                      ? 'bg-accent text-card'
                      : 'border border-border hover:bg-secondary disabled:opacity-50'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Items */}
          <div className="border border-border rounded-lg overflow-hidden mb-8">
            <div className="p-6 bg-secondary border-b border-border">
              <h3 className="font-bold">Order Items</h3>
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
                  <p className="text-sm text-muted-foreground mt-1">
                    Category: {item.category}
                  </p>
                </div>
                <div className="text-right flex flex-col items-end">
                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  <p className="font-semibold mt-2">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Shipping Address */}
          <div className="border border-border rounded-lg p-6 bg-card mb-8">
            <h3 className="font-bold mb-4">Shipping Address</h3>
            <p className="text-muted-foreground">{order.shippingAddress}</p>
          </div>

          {/* Total */}
          <div className="border border-border rounded-lg p-6 bg-card">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${order.totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t border-border pt-3">
                <span>Total Amount</span>
                <span>${order.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
