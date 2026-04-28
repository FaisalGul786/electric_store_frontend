export const CATEGORIES = ['All', 'Audio', 'Video', 'Peripherals', 'Accessories', 'Storage', 'Lighting']

export const api = {
  // Products for customer
  getProducts: async (category = 'All') => {
  console.log('selected category .',category)
  const response = await fetch(`http://localhost:5000/api/fetch/products/customer?productCategory=${category}`);
    
    const customerProducts = await response.json();
    console.log('products data . . . ',  customerProducts);
    return customerProducts
  },

  getProductById: async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/fetch/products/${id}`, {
        credentials: 'include'
      })
      return response
    } catch(error){
      throw Error(`error in fetching product ${error}`)
    }
  },
  // # To get single products details
  getDetailsProductById: async(id) => {
    console.log('to fetch single product details ... id ... ', id);
    const response = await fetch(`http://localhost:5000/api/product/details/${id}`);
    return await response.json()
  },

  

  signup: async (name, email,shippingAddress, password, role) => {
    console.log("data for signup ",{name,email,shippingAddress,password,role})
    const response = await fetch('http://localhost:5000/auth/signup', {
      method: 'POST',
      body: JSON.stringify({name,email,shippingAddress, password, role}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response
  },

  login: async (email, password) => {
    console.log("data for   login ... ", email, password);
    const response = await fetch('http://localhost:5000/auth/login',{
      method: 'POST',
      body: JSON.stringify({email, password}),
      headers: {
        'Content-Type': 'application/json'
      },
	credentials: 'include'
    });
    return response;
  },

  
  createOrder: async (userId, cartItems, shippingAddress) => {
    const order = await fetch('http://localhost:5000/api/v1/orders/place',{
    	method: 'POST',
    	body: JSON.stringify({userId, cartItems, shippingAddress}),
    	headers: {
    		'Content-Type': 'application/json'
    	},
    	credentials: 'include'
    })
    
    return await order.json()
  },

  getOrders: async (userId) => {
    const response = await fetch(`http://localhost:5000/api/v1/orders/${userId}`, {
    	credentials: 'include'
    })
    const userOrders =   await response.json()
    return userOrders
  },

  getOrderById: async (orderId) => {
  	console.log('order confirmation id' , orderId);
    
    const response = await fetch(`http://localhost:5000/api/v1/order/confirmation/${orderId}`, {
    credentials: "include"
    })
    const orderConfirmationData = await response.json()
    console.log(orderConfirmationData);
    return orderConfirmationData
  },

  updateOrderStatus: async (orderId, status) => {
  	console.log('orderId & status ... ', orderId, status)
    const order = await fetch('http://localhost:5000/api/v1/admin/order-status', {
    	method: 'PATCH',
    	body: JSON.stringify({orderId, status}),
    	headers: {
    		'Content-Type': 'application/json'
    	},
    	credentials: 'include'
    })
    const res = await order.json()
    return res ;
  },

  // Admin: Get all orders
  getAllOrders: async () => {
    const ordersData = await fetch('http://localhost:5000/api/v1/fetch/admin/orders',{
	credentials: 'include'})
	console.log('orders . . . . @');
  if(!ordersData) throw Error('orders are not fetched .')
    const res = await ordersData.json();
    console.log('orders data from database . ',res)

    return res
  },

  // Admin: Add product
  addProduct: async (product) => {
    console.log('product data .. ',product);
    const response = await fetch('http://localhost:5000/api/upload/product', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json'
      },
	credentials: 'include'
    });

    if(response.ok) {
      const newProduct = await  response.json();
      return newProduct
    }

    return []
  },

  // Admin: Update product
  updateProduct: async (productId, updates) => {
  
  console.log('ID & PRODUCT ... ', productId, updates);
  
    const response = await fetch(`http://localhost:5000/api/update/fetch/product/${productId}`, {
    	method: 'PATCH',
    	body: JSON.stringify(updates),
    	headers: {
    	    'Content-Type': 'application/json'
    	    },
    	credentials: 'include'
    })
    const updatedProduct = await response.json()
    return updatedProduct
  },

  // Admin: Delete product
  deleteProduct: async (productId) => {
    await fetch(`http://localhost:5000/api/product/delete/${productId}`, {
    method: 'DELETE',
    credentials: 'include'
    })
    return true
  },
  
  // Admin: Fetch all product
  fetchProducts: async () => {
  	const productsData = await fetch('http://localhost:5000/api/fetch/products',{
	credentials: 'include'		
	});
	if(!productsData) throw Error('products are not fetched .')
	const res = await productsData.json();
	
	return res ;
  },
  adminOrderById: async(orderId) => {
  	const adminOrderData = await fetch(`http://localhost:5000/api/v1/fetch/admin/order/detail/${orderId}`, {
  		credentials: 'include'
  	})
  	const res = await adminOrderData.json()
  	console.log('order status data ...', res);
  	return res ;
  }
}
