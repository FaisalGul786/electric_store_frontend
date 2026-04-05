import Link from 'next/link'
import { useCart } from '@/context/CartContext'

export function ProductCard({ product }) {
  const { addToCart } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product)
  }

  return (
    <Link href={`/product/${product.id}`}>
      <div className="group h-full rounded-lg border border-border bg-card overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-accent cursor-pointer flex flex-col">
        {/* Product Image */}
        <div className="relative h-48 bg-secondary overflow-hidden flex items-center justify-center">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.style.display = 'none'
                const sibling = e.target.nextElementSibling
                if (sibling) sibling.style.display = 'flex'
              }}
              crossOrigin="anonymous"
            />
          ) : null}
          <div
            className="w-full h-full flex flex-col items-center justify-center bg-secondary text-muted-foreground"
            style={{ display: product.image ? 'none' : 'flex' }}
          >
            <div className="text-4xl mb-2">📦</div>
            <p className="text-sm">No image available</p>
          </div>
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 flex flex-col flex-1">
          <p className="text-xs text-accent font-semibold uppercase tracking-wider">
            {product.category}
          </p>
          <h3 className="mt-1 font-semibold text-foreground line-clamp-2 group-hover:text-accent transition-colors">
            {product.name}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2 flex-1">
            {product.description}
          </p>

          {/* Rating */}
          <div className="mt-3 flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-lg ${
                    i < Math.floor(product.rating) ? 'text-accent' : 'text-muted'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">({product.reviews})</span>
          </div>

          {/* Price and Button */}
          <div className="mt-4 flex items-center justify-between gap-2">
            <span className="text-lg font-bold text-foreground">
              ${product.price.toFixed(2)}
            </span>
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="px-3 py-2 rounded-lg bg-accent text-card font-medium text-sm hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {product.inStock ? 'Add' : 'Unavailable'}
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
