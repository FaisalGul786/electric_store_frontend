'use client'

import Link from 'next/link'
import { Header } from '@/components/Header'
import { EmptyState, Container } from '@/components/EmptyState'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart()
  const { user } = useAuth()

  if (items.length === 0) {
    return (
      <>
        <Header />
        <Container className="py-12">
          <EmptyState
            icon="🛒"
            title="Your Cart is Empty"
            description="Add some products to your cart to get started"
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

  return (
    <>
      <Header />
      <Container className="py-12">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="border border-border rounded-lg overflow-hidden">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className={`p-6 flex gap-6 ${index > 0 ? 'border-t border-border' : ''}`}
                >
                  {/* Item Image */}
                  <div className="w-24 h-24 flex-shrink-0 rounded-lg bg-secondary overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Item Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-muted-foreground text-sm mt-1">{item.category}</p>
                    </div>
                    <p className="text-lg font-bold">${item.price.toFixed(2)}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-sm text-destructive hover:text-destructive/80 transition-colors"
                    >
                      Remove
                    </button>
                    <div className="flex items-center border border-border rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 hover:bg-secondary transition-colors"
                      >
                        −
                      </button>
                      <span className="px-3 py-1 font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 hover:bg-secondary transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border border-border rounded-lg p-6 bg-card sticky top-20">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              {/* Summary Details */}
              <div className="space-y-3 mb-4 pb-4 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${(totalPrice * 0.1).toFixed(2)}</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between text-lg font-bold mb-6">
                <span>Total</span>
                <span>${(totalPrice * 1.1).toFixed(2)}</span>
              </div>

              {/* Checkout Button */}
              {user ? (
                <Link
                  href="/checkout"
                  className="w-full block text-center py-3 bg-accent text-card rounded-lg font-semibold hover:bg-accent/90 transition-colors mb-3"
                >
                  Proceed to Checkout
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="w-full block text-center py-3 bg-accent text-card rounded-lg font-semibold hover:bg-accent/90 transition-colors mb-3"
                >
                  Login to Checkout
                </Link>
              )}

              <button
                onClick={clearCart}
                className="w-full py-2 text-center border border-border rounded-lg hover:bg-secondary transition-colors text-sm"
              >
                Clear Cart
              </button>

              {/* Continue Shopping */}
              <Link
                href="/products"
                className="block text-center mt-4 text-accent font-medium hover:text-accent/80 transition-colors text-sm"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
