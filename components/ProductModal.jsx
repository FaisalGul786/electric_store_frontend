'use client'

import { useState } from 'react'

export function ProductModal({ isOpen, onClose, onSubmit, isLoading = false }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Laptops',
    description: '',
    price: '',
    inStock: true,
    rating: 5,
    reviews: 0,
    image: null,
  })
  const [previewUrl, setPreviewUrl] = useState('')

  const categories = ['Laptops', 'Smartphones', 'Audio Equipment', 'Tablets', 'Accessories']

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : name === 'price' || name === 'rating' || name === 'reviews' ? parseFloat(value) || '' : value,
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }))
      
      // Create preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({
      name: '',
      category: 'Laptops',
      description: '',
      price: '',
      inStock: true,
      rating: 5,
      reviews: 0,
      image: null,
    })
    setPreviewUrl('')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Add New Product</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-semibold mb-2">Product Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g., MacBook Pro 15-inch"
              className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold mb-2">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:border-accent transition-colors"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-2">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Describe your product..."
              rows="4"
              className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors resize-none"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-semibold mb-2">Price (USD) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              placeholder="0.00"
              className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          {/* Product Image Upload */}
          <div>
            <label className="block text-sm font-semibold mb-2">Product Image *</label>
            <div className="relative border-2 border-dashed border-border rounded-lg p-6 bg-secondary/50 hover:border-accent transition-colors cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required={!formData.image}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="text-center">
                <div className="text-3xl mb-2">📸</div>
                <p className="font-semibold text-foreground">
                  {formData.image ? formData.image.name : 'Click to upload image'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {formData.image ? 'Click to change' : 'or drag and drop'}
                </p>
                <p className="text-xs text-muted-foreground mt-2">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
            {previewUrl && (
              <div className="mt-3 rounded-lg overflow-hidden border border-border bg-secondary">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-48 object-cover"
                />
              </div>
            )}
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-semibold mb-2">Rating (0-5) *</label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              required
              min="0"
              max="5"
              step="0.1"
              className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          {/* Reviews Count */}
          <div>
            <label className="block text-sm font-semibold mb-2">Number of Reviews</label>
            <input
              type="number"
              name="reviews"
              value={formData.reviews}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          {/* In Stock */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="inStock"
              id="inStock"
              checked={formData.inStock}
              onChange={handleChange}
              className="w-4 h-4 rounded border-border cursor-pointer"
            />
            <label htmlFor="inStock" className="text-sm font-semibold cursor-pointer">
              In Stock
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-border rounded-lg font-semibold hover:bg-secondary transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-accent text-card rounded-lg font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-card border-t-transparent rounded-full animate-spin" />
                  Adding...
                </>
              ) : (
                'Add Product'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
