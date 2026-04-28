'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Container, EmptyState, LoadingSpinner } from '@/components/EmptyState'
import { useAuth } from '@/context/AuthContext'
import { api } from '@/lib/api'

export default function OrdersPage() {
  const { user, isLoading: isAuthLoading } = useAuth()
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    

    if (!user) {
      setIsLoading(false)
      return
    }

    const loadOrders = async () => {
      try {
        const data = await api.getOrders(user.id)
        console.log('customer all data placed .', data)
        setOrders(data)
      } catch (error) {
        console.error('Failed to load orders:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadOrders()
  }, [user])

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

  if (!user) {
    return (
      <>
        <Header />
        <Container className="py-12">
          <EmptyState
            icon="🔐"
            title="Sign In Required"
            description="Please sign in to view your orders"
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

  return (
    <>
      <Header />
      <Container className="py-12">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <EmptyState
            icon="📭"
            title="No Orders Yet"
            description="You haven't placed any orders yet. Start shopping to create your first order."
            action={
              <Link
                href="/products"
                className="inline-block px-6 py-2 bg-accent text-card rounded-lg hover:bg-accent/90 transition-colors"
              >
                Continue Shopping
              </Link>
            }
          />
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Link key={order.id} href={`/order-confirmation/${order.id}`}>
                <div className="border border-border rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer hover:border-accent bg-card">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Order Number</p>
                      <p className="font-semibold">{order.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-semibold">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="font-semibold">${parseFloat(order.totalPrice).toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold capitalize">
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </>
  )
}
