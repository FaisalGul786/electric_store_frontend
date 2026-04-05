'use client'

import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'
import { useState } from 'react'

export function Header() {
  const { user, logout } = useAuth()
  const { totalItems } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-card">
              ✦
            </div>
            <span>TechStore</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link href="/products" className="text-sm hover:text-accent transition-colors">
              Products
            </Link>
            <Link href="/about" className="text-sm hover:text-accent transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-sm hover:text-accent transition-colors">
              Contact
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Cart Link */}
            <Link
              href="/cart"
              className="relative flex items-center gap-2 text-sm hover:text-accent transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-card w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2 text-sm hover:text-accent transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                {user?.name ? user.name.split(' ')[0] : 'Account'}
              </button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg border border-border bg-card shadow-lg">
                  {user ? (
                    <>
                      <div className="px-4 py-3 border-b border-border">
                        <p className="text-sm font-semibold">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                      {user.role === 'admin' && (
                        <Link
                          href="/admin"
                          className="block px-4 py-2 text-sm hover:bg-secondary transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Admin Dashboard
                        </Link>
                      )}
                      {user.role === 'customer' && (
                        <>
                          <Link
                            href="/profile"
                            className="block px-4 py-2 text-sm hover:bg-secondary transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            My Profile
                          </Link>
                          <Link
                            href="/orders"
                            className="block px-4 py-2 text-sm hover:bg-secondary transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            My Orders
                          </Link>
                        </>
                      )}
                      <button
                        onClick={() => {
                          logout()
                          setIsMenuOpen(false)
                        }}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors border-t border-border"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="block px-4 py-2 text-sm hover:bg-secondary transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        href="/register"
                        className="block px-4 py-2 text-sm hover:bg-secondary transition-colors border-t border-border"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button className="lg:hidden text-foreground hover:text-accent">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
