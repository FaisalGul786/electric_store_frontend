'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Container, EmptyState } from '@/components/EmptyState'
import { ProductModal } from '@/components/ProductModal'
import { useAuth } from '@/context/AuthContext'
import { api } from '@/lib/api'

export default function AdminDashboard() {
const url = process.env.NEXT_PUBLIC_API_URL;

  // const { user, isLoading: isAuthLoading } = useAuth()
  const [activeTab, setActiveTab] = useState('products')
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    //  if (isAuthLoading) return

     const loadData = async () => {
       try {
         const [productsData, ordersData] = await Promise.all([
           api.fetchProducts(),
           api.getAllOrders(),
         ])
         setProducts(productsData)
         setOrders(ordersData)
       } catch (error) {
         console.error('Failed to load admin data:', error)
       } finally {
         setIsLoading(false)
       }
     }
     loadData()

/**
    const loadData = async () => {
      try {
        const productData = await api.fetchProducts()
        console.log('product data from database . ',productData)
        setProducts(productData)
      } catch (error) {
        console.error('Failed to load admin data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    // # orders Data
    const ordersData = async () => {
      try {
        
        const ordersData = await api.getAllOrders()
        console.log('orders data from database . ',ordersData)
        setOrders(ordersData)
      } catch (error) {
        console.error('Failed to load admin data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
    ordersData()
    **/
  }, [])

  const handleAddProduct = async (formData) => {
    console.log('product data ... ', formData);
    setIsSubmitting(true)
    try {
      let imageUrl = null

      // Upload image if provided
      if (formData.image) {
        const uploadFormData = new FormData()
        uploadFormData.append('image', formData.image)
	      console.log("form data ... ", uploadFormData)
        const uploadRes = await fetch(`${url}/api/image/upload`, {
          method: 'POST',
          body: uploadFormData,
          credentials: 'include'
        })

        if (!uploadRes.ok) {
          const error = await uploadRes.json()
          console.log('error message . . . ', error);
          throw new Error(error.error || 'Failed to upload image')
          return;
        }

        const { url } = await uploadRes.json()
        console.log('image url uploaded .', url );
        imageUrl = url
      }

      const newProduct = await api.addProduct({
        name: formData.name,
        category: formData.category,
        description: formData.description,
        price: formData.price,
        inStock: formData.inStock,
        rating: formData.rating,
        reviews: formData.reviews,
        image: imageUrl
        
      })
      {/**console.log('newProduct ... ', newProduct) **/}
      {/**setProducts((prev) => [...prev, newProduct]) **/}
      console.log('Current state before update:', products);
setProducts((prev) => {
  const updatedList = [...prev, newProduct[0]];
  console.log('New state after update:', updatedList);
  return updatedList;
});
      setIsModalOpen(false)
      alert('Product added successfully!')
    } catch (error) {
      console.error('Failed to add product:', error)
      alert(`Failed to add product: ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <>
        <Header />
        <Container className="py-12">
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-muted border-t-accent rounded-full animate-spin" />
          </div>
        </Container>
      </>
    )
  }

   {/* if (!user || user.role !== 'admin') {
    return (
      <>
        <Header />
        <Container className="py-12">
          <EmptyState
            icon="🚫"
            title="Access Denied"
            description="You don't have permission to access this page. Only administrators can view this dashboard."
            action={
              <Link
                href="/products"
                className="inline-block px-6 py-2 bg-accent text-card rounded-lg hover:bg-accent/90 transition-colors"
              >
                Go to Products
              </Link>
            }
          />
        </Container>
      </>
    )
  }

*/ }
  return (
    <>
      <Header />
      <Container className="py-12">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2">Welcome back, Owner. Manage your store here.</p>
          </div>
          <Link
            href="/products"
            className="px-4 py-2 border border-border rounded-lg font-semibold text-accent hover:bg-secondary transition-colors"
          >
            View as Customer →
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="border border-border rounded-lg p-6 bg-card">
            <p className="text-sm text-muted-foreground">Total Products</p>
            <p className="text-3xl font-bold mt-2">{products.length}</p>
          </div>
          <div className="border border-border rounded-lg p-6 bg-card">
            <p className="text-sm text-muted-foreground">Total Orders</p>
            <p className="text-3xl font-bold mt-2">{orders.length}</p>
          </div>
          <div className="border border-border rounded-lg p-6 bg-card">
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <p className="text-3xl font-bold mt-2">
             {/* ${orders.reduce((sum, order) => sum + order.totalPrice, 0).toFixed(2)}*/}
            </p>
          </div>
          <div className="border border-border rounded-lg p-6 bg-card">
            <p className="text-sm text-muted-foreground">Pending Orders</p>
            <p className="text-3xl font-bold mt-2">
              {orders.filter((o) => o.status === 'pending').length}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border mb-6 flex gap-8">
          <button
            onClick={() => setActiveTab('products')}
            className={`py-4 font-medium border-b-2 transition-colors ${
              activeTab === 'products'
                ? 'border-accent text-accent'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Products Management
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-4 font-medium border-b-2 transition-colors ${
              activeTab === 'orders'
                ? 'border-accent text-accent'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Orders Management
          </button>
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-bold">Products</h2>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-accent text-card rounded-lg font-semibold hover:bg-accent/90 transition-colors"
              >
                Add Product
              </button>
            </div>

            {products.length === 0 ? (
              <EmptyState
                icon="📭"
                title="No Products"
                description="You haven't added any products yet."
              />
            ) : (
              <div className="border border-border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-secondary border-b border-border">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Category</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Price</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Stock</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr
                        key={index}
                        className={index > 0 ? 'border-t border-border' : ''}
                      >
                        <td className="px-6 py-4">{product.name}</td>
                        <td className="px-6 py-4 text-muted-foreground">{product.category}</td>
                        <td className="px-6 py-4 font-semibold">${product.price}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${
                              product.inStock
                                ? 'bg-accent/20 text-accent'
                                : 'bg-destructive/20 text-destructive'
                            }`}
                          >
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <Link
                            href={`/admin/products/${product.id}`}
                            className="text-accent hover:text-accent/80 text-sm font-medium"
                          >
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            <h2 className="text-xl font-bold mb-6">Orders</h2>

            {orders.length === 0 ? (
              <EmptyState
                icon="📭"
                title="No Orders"
                description="You don't have any orders yet."
              />
            ) : (
              <div className="border border-border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-secondary border-b border-border">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Order ID</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Items</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Total</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => (
                      <tr
                        key={order.id}
                        className={index > 0 ? 'border-t border-border' : ''}
                      >
                        <td className="px-6 py-4 font-mono text-sm">{order.id}</td>
                        <td className="px-6 py-4 text-sm">
                          {new Date(order.orderDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm">{order.items.length} items</td>
                        <td className="px-6 py-4 font-semibold">${order.totalPrice.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold capitalize ${
                              order.status === 'pending'
                                ? 'bg-amber-500/20 text-amber-500'
                                : 'bg-accent/20 text-accent'
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <Link
                            href={`/admin/orders/${order.id}`}
                            className="text-accent hover:text-accent/80 text-sm font-medium"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Product Modal */}
        <ProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddProduct}
          isLoading={isSubmitting}
        />
      </Container>
    </>
  )
}
