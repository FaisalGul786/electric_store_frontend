import { Header } from '@/components/Header'
import { Container } from '@/components/EmptyState'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <>
      <Header />
      <Container className="py-12">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold mb-6">About TechStore</h1>

          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              TechStore is a leading e-commerce platform specializing in premium technology products and electronics. We&apos;re dedicated to bringing the latest innovations to tech enthusiasts and professionals worldwide.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8">Our Mission</h2>
            <p>
              To provide exceptional quality tech products at competitive prices, with outstanding customer service and fast delivery.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8">Why Choose Us</h2>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-accent">✓</span>
                <span>Wide selection of premium tech products</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent">✓</span>
                <span>Competitive prices and regular discounts</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent">✓</span>
                <span>Fast and free shipping on orders over $50</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent">✓</span>
                <span>30-day money-back guarantee</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent">✓</span>
                <span>Excellent customer support</span>
              </li>
            </ul>

            <div className="mt-8 pt-8 border-t border-border">
              <Link
                href="/products"
                className="inline-block px-6 py-3 bg-accent text-card rounded-lg font-semibold hover:bg-accent/90 transition-colors"
              >
                Browse Our Products
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
