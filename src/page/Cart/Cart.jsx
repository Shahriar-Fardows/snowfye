import { useState, useEffect } from "react"
import useAxios from "../../Hooks/useAxios"

const Cart = () => {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const axios = useAxios()

  useEffect(() => {
    // Fetch cart data
    const fetchCartData = async () => {
      try {
        setLoading(true)
        // Replace with your actual API endpoint
        const response = await axios.get("/cart")
        setCartItems(response.data)
        setLoading(false)
      } catch (err) {
        console.log("Error fetching cart items:", err)
        setError("Failed to load cart items")
        setLoading(false)
      }
    }

    fetchCartData()
  }, [axios])

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return

    try {
      // Update quantity in the backend
      await axios.put(`/cart/${itemId}`, { quantity: newQuantity })

      // Update local state
      setCartItems(
        cartItems.map((item) => {
          if (item._id === itemId) {
            const updatedItem = {
              ...item,
              quantity: newQuantity,
              totalPrice: (newQuantity * item.price).toFixed(2),
            }
            return updatedItem
          }
          return item
        }),
      )
    } catch (err) {
        console.log("Error fetching cart items:", err)
      setError("Failed to update quantity")
    }
  }

  const removeItem = async (itemId) => {
    try {
      // Remove item from the backend
      await axios.delete(`/api/cart/${itemId}`)

      // Update local state
      setCartItems(cartItems.filter((item) => item._id !== itemId))
    } catch (err) {
      setError("Failed to remove item")
      console.log("Error fetching cart items:", err)
    }
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + Number.parseFloat(item.totalPrice), 0).toFixed(2)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-error shadow-lg max-w-4xl mx-auto my-8">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto my-8 p-4">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            <h2 className="card-title">Your cart is empty</h2>
            <p>Add some items to your cart to see them here.</p>
            <div className="card-actions mt-4">
              <button className="btn btn-primary">Continue Shopping</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto my-8 p-4">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {/* Cart Items */}
      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body p-0">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Details</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-16 h-16">
                            <img src={item.image || "/placeholder.svg"} alt={item.productName} />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{item.productName}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="text-sm opacity-80">
                        <span className="badge badge-ghost badge-sm mr-1">Size: {item.size}</span>
                        <span className="badge badge-ghost badge-sm">Color: {item.color}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center">
                        <button
                          className="btn btn-square btn-xs"
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          className="btn btn-square btn-xs"
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>
                      <div className="font-medium">${item.price}</div>
                      <div className="text-sm opacity-80">Total: ${item.totalPrice}</div>
                    </td>
                    <td>
                      <button className="btn btn-error btn-sm" onClick={() => removeItem(item._id)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Cart Summary */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Order Summary</h2>
          <div className="flex justify-between py-2">
            <span>Subtotal</span>
            <span>${calculateTotal()}</span>
          </div>
          <div className="flex justify-between py-2">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          <div className="divider"></div>
          <div className="flex justify-between py-2 font-bold">
            <span>Total</span>
            <span>${calculateTotal()}</span>
          </div>
          <div className="card-actions justify-end mt-4">
            <button className="btn btn-primary btn-block">Proceed to Checkout</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart;

