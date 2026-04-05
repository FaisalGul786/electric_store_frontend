// Mock data for products
export const PRODUCTS = [
  {
    id: 1,
    name: 'Pro Wireless Headphones',
    price: 299.99,
    category: 'Audio',
    description: 'Premium noise-canceling wireless headphones with 30-hour battery life.',
    image: '/api/placeholder?w=300&h=200&text=Wireless+Headphones',
    rating: 4.8,
    reviews: 256,
    inStock: true,
  },
  {
    id: 2,
    name: '4K Webcam',
    price: 149.99,
    category: 'Video',
    description: 'Professional 4K webcam with auto-focus and built-in microphone.',
    image: '/api/placeholder?w=300&h=200&text=4K+Webcam',
    rating: 4.6,
    reviews: 189,
    inStock: true,
  },
  {
    id: 3,
    name: 'USB-C Hub Pro',
    price: 79.99,
    category: 'Accessories',
    description: '7-in-1 USB-C hub with HDMI, USB 3.0, and SD card reader.',
    image: '/api/placeholder?w=300&h=200&text=USB-C+Hub',
    rating: 4.5,
    reviews: 142,
    inStock: true,
  },
  {
    id: 4,
    name: 'Mechanical Keyboard',
    price: 189.99,
    category: 'Peripherals',
    description: 'RGB mechanical keyboard with custom switches and aluminum frame.',
    image: '/api/placeholder?w=300&h=200&text=Mechanical+Keyboard',
    rating: 4.7,
    reviews: 312,
    inStock: true,
  },
  {
    id: 5,
    name: 'Portable SSD 1TB',
    price: 129.99,
    category: 'Storage',
    description: 'Fast portable SSD with 1050MB/s read speed and compact design.',
    image: '/api/placeholder?w=300&h=200&text=Portable+SSD',
    rating: 4.9,
    reviews: 478,
    inStock: true,
  },
  {
    id: 6,
    name: 'Wireless Mouse',
    price: 59.99,
    category: 'Peripherals',
    description: 'Ergonomic wireless mouse with precision tracking and long battery life.',
    image: '/api/placeholder?w=300&h=200&text=Wireless+Mouse',
    rating: 4.4,
    reviews: 234,
    inStock: true,
  },
  {
    id: 7,
    name: 'Monitor Stand Pro',
    price: 99.99,
    category: 'Accessories',
    description: 'Adjustable monitor stand with storage and cable management.',
    image: '/api/placeholder?w=300&h=200&text=Monitor+Stand',
    rating: 4.3,
    reviews: 156,
    inStock: true,
  },
  {
    id: 8,
    name: 'Desk Lamp LED',
    price: 89.99,
    category: 'Lighting',
    description: 'Dimmable LED desk lamp with USB charging and memory presets.',
    image: '/api/placeholder?w=300&h=200&text=Desk+Lamp',
    rating: 4.6,
    reviews: 201,
    inStock: true,
  },
]

export const CATEGORIES = ['All', 'Audio', 'Video', 'Peripherals', 'Accessories', 'Storage', 'Lighting']

// Simulated users database
const usersDB = new Map()

// Initialize with some test users
usersDB.set('admin@techstore.com', {
  id: 'admin-1',
  email: 'admin@techstore.com',
  name: 'Admin User',
  password: 'password123', // In real app, this would be hashed
  role: 'admin',
  createdAt: new Date().toISOString(),
})

usersDB.set('user@example.com', {
  id: 'user-1',
  email: 'user@example.com',
  name: 'John Doe',
  password: 'password123',
  role: 'customer',
  address: '123 Main St, City, ST 12345',
  phone: '555-1234',
  createdAt: new Date().toISOString(),
})

// Simulated orders database
const ordersDB = new Map()

export const api = {
  // Products
  getProducts: async (category = null) => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    if (category && category !== 'All') {
      return PRODUCTS.filter((p) => p.category === category)
    }
    return PRODUCTS
  },

  getProductById: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return PRODUCTS.find((p) => p.id === parseInt(id))
  },

  // Admin: Manage products
  updateProduct: async (id, updates) => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const index = PRODUCTS.findIndex((p) => p.id === parseInt(id))
    if (index !== -1) {
      PRODUCTS[index] = { ...PRODUCTS[index], ...updates }
      return PRODUCTS[index]
    }
    throw new Error('Product not found')
  },

  deleteProduct: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const index = PRODUCTS.findIndex((p) => p.id === parseInt(id))
    if (index !== -1) {
      PRODUCTS.splice(index, 1)
      return true
    }
    throw new Error('Product not found')
  },

  createProduct: async (productData) => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const newProduct = {
      id: Math.max(...PRODUCTS.map((p) => p.id)) + 1,
      ...productData,
      rating: 0,
      reviews: 0,
      inStock: true,
    }
    PRODUCTS.push(newProduct)
    return newProduct
  },

  // Auth
  register: async (email, password, name) => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    if (usersDB.has(email)) {
      throw new Error('Email already registered')
    }
    const newUser = {
      id: `user-${Date.now()}`,
      email,
      name,
      password, // In real app, this would be hashed with bcrypt
      role: 'customer',
      createdAt: new Date().toISOString(),
    }
    usersDB.set(email, newUser)
    return {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
    }
  },

  signup: async () => {
    
  },

  login: async (email, password) => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const user = usersDB.get(email)
    if (!user || user.password !== password) {
      throw new Error('Invalid email or password')
    }
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    }
  },

  // Orders
  createOrder: async (userId, cartItems, shippingAddress) => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const orderId = `ORDER-${Date.now()}`
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const order = {
      id: orderId,
      userId,
      items: cartItems,
      shippingAddress,
      totalPrice,
      status: 'pending',
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    }
    ordersDB.set(orderId, order)
    return order
  },

  getOrders: async (userId) => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const userOrders = Array.from(ordersDB.values()).filter((order) => order.userId === userId)
    return userOrders
  },

  getOrderById: async (orderId) => {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return ordersDB.get(orderId)
  },

  updateOrderStatus: async (orderId, status) => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const order = ordersDB.get(orderId)
    if (!order) throw new Error('Order not found')
    order.status = status
    return order
  },

  // Admin: Get all orders
  getAllOrders: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return Array.from(ordersDB.values())
  },

  // Admin: Add product
  addProduct: async (product) => {
    await new Promise((resolve) => setTimeout(resolve, 400))
    const newProduct = {
      ...product,
      id: product.id || `PROD-${Date.now()}`,
    }
    productsDB.set(newProduct.id, newProduct)
    return newProduct
  },

  // Admin: Update product
  updateProduct: async (productId, updates) => {
    await new Promise((resolve) => setTimeout(resolve, 400))
    const product = productsDB.get(productId)
    if (!product) throw new Error('Product not found')
    const updated = { ...product, ...updates }
    productsDB.set(productId, updated)
    return updated
  },

  // Admin: Delete product
  deleteProduct: async (productId) => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    productsDB.delete(productId)
    return true
  },
}
