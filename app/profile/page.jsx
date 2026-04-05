'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Container, EmptyState } from '@/components/EmptyState'
import { useAuth } from '@/context/AuthContext'

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const [editMode, setEditMode] = useState(false)

  if (!user) {
    return (
      <>
        <Header />
        <Container className="py-12">
          <EmptyState
            icon="🔐"
            title="Sign In Required"
            description="Please sign in to view your profile"
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

  const handleLogout = () => {
    logout()
    window.location.href = '/'
  }

  return (
    <>
      <Header />
      <Container className="py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">My Profile</h1>

          {/* Profile Info */}
          <div className="border border-border rounded-lg p-6 bg-card mb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
                <p className="text-muted-foreground">{user.email}</p>
                <p className="text-sm text-accent mt-2 capitalize font-semibold">
                  {user.role === 'admin' ? '👑 Administrator' : '👤 Customer'}
                </p>
              </div>
              <button
                onClick={() => setEditMode(!editMode)}
                className="px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors"
              >
                {editMode ? 'Cancel' : 'Edit'}
              </button>
            </div>

            {!editMode && (
              <div className="space-y-4 mt-6 pt-6 border-t border-border">
                <div>
                  <p className="text-sm text-muted-foreground">Account ID</p>
                  <p className="font-mono text-sm">{user.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Member Since</p>
                  <p className="text-sm">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : 'Recently joined'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Link
              href="/orders"
              className="border border-border rounded-lg p-4 hover:shadow-lg transition-all hover:border-accent"
            >
              <p className="text-3xl mb-2">📦</p>
              <h3 className="font-semibold">My Orders</h3>
              <p className="text-xs text-muted-foreground mt-1">View your order history</p>
            </Link>
            <Link
              href="/cart"
              className="border border-border rounded-lg p-4 hover:shadow-lg transition-all hover:border-accent"
            >
              <p className="text-3xl mb-2">🛒</p>
              <h3 className="font-semibold">Shopping Cart</h3>
              <p className="text-xs text-muted-foreground mt-1">Continue shopping</p>
            </Link>
            <Link
              href="/products"
              className="border border-border rounded-lg p-4 hover:shadow-lg transition-all hover:border-accent"
            >
              <p className="text-3xl mb-2">🏪</p>
              <h3 className="font-semibold">All Products</h3>
              <p className="text-xs text-muted-foreground mt-1">Browse our catalog</p>
            </Link>
          </div>

          {/* Settings */}
          <div className="border border-border rounded-lg p-6 bg-card">
            <h3 className="text-lg font-semibold mb-4">Settings</h3>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-2 hover:bg-secondary rounded-lg transition-colors">
                Change Password
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-secondary rounded-lg transition-colors">
                Email Preferences
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-secondary rounded-lg transition-colors">
                Notification Settings
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors font-semibold"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
