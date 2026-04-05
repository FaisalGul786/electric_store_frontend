import Link from 'next/link'
import { Header } from '@/components/Header'
import { Container } from '@/components/EmptyState'

export default function Home() {
  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <Container className="py-20 min-h-[calc(100vh-4rem)] flex flex-col justify-center">
        <div className="max-w-3xl">
          <h1 className="text-6xl font-bold leading-tight mb-6 text-balance">
            Premium Tech Products for Your Digital Life
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Discover the latest gadgets and electronics curated for tech enthusiasts. High quality, competitive prices, and exceptional service guaranteed.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link
              href="/products"
              className="px-8 py-3 bg-accent text-card rounded-lg font-semibold hover:bg-accent/90 transition-colors"
            >
              Shop Now
            </Link>
            <Link
              href="/about"
              className="px-8 py-3 border border-border rounded-lg font-semibold hover:bg-secondary transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </Container>

      {/* Featured Categories */}
      <Container className="py-20">
        <h2 className="text-4xl font-bold mb-12 text-balance">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Laptops', description: 'High-performance machines for work and gaming', icon: '💻' },
            { name: 'Smartphones', description: 'Latest mobile devices with cutting-edge technology', icon: '📱' },
            { name: 'Audio Equipment', description: 'Premium headphones and speakers', icon: '🎧' },
          ].map((category) => (
            <Link key={category.name} href="/products">
              <div className="border border-border rounded-lg p-8 bg-card hover:bg-secondary transition-colors cursor-pointer group">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{category.icon}</div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-accent transition-colors">{category.name}</h3>
                <p className="text-muted-foreground mb-4">{category.description}</p>
                <span className="text-accent font-semibold hover:underline">Browse {category.name} →</span>
              </div>
            </Link>
          ))}
        </div>
      </Container>

      {/* Why Choose Us */}
      <Container className="py-20 bg-card/30">
        <h2 className="text-4xl font-bold mb-12 text-balance">Why Choose TechStore?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: 'Fast Shipping', description: 'Free shipping on orders over $50', icon: '🚀' },
            { title: 'Secure Payment', description: '100% secure and encrypted transactions', icon: '🔒' },
            { title: '30-Day Returns', description: 'Easy returns within 30 days', icon: '↩️' },
            { title: '24/7 Support', description: 'Dedicated customer support team', icon: '💬' },
          ].map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="text-5xl mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* Featured Products Section */}
      <Container className="py-20">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold">Featured Products</h2>
          <Link href="/products" className="text-accent font-semibold hover:underline">
            View All →
          </Link>
        </div>
        <p className="text-muted-foreground mb-8">
          Curated selection of our most popular and highest-rated tech products. Each item is carefully chosen for quality, performance, and value.
        </p>
        <div className="border border-border rounded-lg p-8 bg-card/50 text-center">
          <p className="text-muted-foreground mb-4">Browse our full collection to see featured products with detailed reviews</p>
          <Link
            href="/products"
            className="inline-block px-8 py-3 bg-accent text-card rounded-lg font-semibold hover:bg-accent/90 transition-colors"
          >
            Explore All Products
          </Link>
        </div>
      </Container>

      {/* Newsletter Section */}
      <Container className="py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 text-balance">Stay Updated with Latest Deals</h2>
          <p className="text-muted-foreground mb-8">
            Subscribe to our newsletter and receive exclusive offers, new product announcements, and tech tips.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
            />
            <button className="px-6 py-3 bg-accent text-card rounded-lg font-semibold hover:bg-accent/90 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </Container>

      {/* Footer */}
      <Container className="py-12 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-bold mb-4">About TechStore</h4>
            <p className="text-sm text-muted-foreground">Your one-stop destination for premium tech products with exceptional customer service.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li><Link href="/products" className="hover:text-accent transition-colors">Products</Link></li>
              <li><Link href="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-accent transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Returns</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-accent transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Facebook</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>© 2024 TechStore. All rights reserved.</p>
        </div>
      </Container>
    </>
  )
}
