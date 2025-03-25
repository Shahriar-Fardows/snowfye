import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import useAxios from "../../Hooks/useAxios"
import useAuthContext from "../../Hooks/useAuthContext"

const SimplifiedCartPage = () => {
  const { user } = useAuthContext()
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [updateLoading, setUpdateLoading] = useState(null) // Track which item is being updated
  const axios = useAxios()

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        setLoading(true)
        const response = await axios.get("/cart")
        // data filter by user email
        const data = response.data.filter((item) => item.email === user?.email)
        setCartItems(data)
        setLoading(false)
      } catch (err) {
        setError("Failed to load cart items")
        setLoading(false)
        console.log("Error fetching cart items:", err)
      }
    }

    fetchCartData()
  }, [axios, user?.email])

  const updateQuantity = async (itemId, change) => {
    // Don't allow decreasing if quantity would be less than 1
    const currentItem = cartItems.find((item) => item._id === itemId)
    if (currentItem.quantity + change < 1) return

    try {
      setUpdateLoading(itemId)

      // Call the PATCH endpoint with the quantity change
      const response = await axios.patch(`/cart/${itemId}`, {
        quantity: change, // +1 to increase, -1 to decrease
      })

      // Update local state with the response from the server
      setCartItems(
        cartItems.map((item) => {
          if (item._id === itemId) {
            return {
              ...item,
              quantity: response.data.newQuantity,
              totalPrice: response.data.newTotalPrice.toFixed(2),
            }
          }
          return item
        }),
      )

      setUpdateLoading(null)
    } catch (err) {
      console.error("Error updating cart item:", err)
      setError("Failed to update cart item")
      setUpdateLoading(null)
    }
  }

  const removeItem = (itemId) => {
    // Remove item from cart
    axios
      .delete(`/cart/${itemId}`)
      .then(() => {
        setCartItems(cartItems.filter((item) => item._id !== itemId))
      })
      .catch((err) => {
        console.error("Error removing item:", err)
        setError("Failed to remove item")
      })
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + Number.parseFloat(item.totalPrice), 0).toFixed(2)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto my-8 p-4">
        <h1 className="text-3xl font-bold text-center mb-8">Shopping Cart</h1>
        <div className="text-center p-8 border rounded-lg border-[#f98c25]">
          <p className="text-lg mb-4">Your cart is empty</p>
          <Link to="/all-products">
            <button className="btn bg-[#f98c25] text-white">Continue Shopping</button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto my-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-4">Shopping Cart</h1>

      {/* Breadcrumb */}
      <div className="text-sm breadcrumbs mb-8 flex justify-center">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>Your Shopping Cart</li>
        </ul>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
          <button className="float-right" onClick={() => setError(null)}>
            ×
          </button>
        </div>
      )}

      {/* Cart Table Header */}
      <div className="hidden md:grid grid-cols-4 gap-4 border-b pb-2 mb-4 font-semibold">
        <div className="col-span-1">Product</div>
        <div className="text-center">Price</div>
        <div className="text-center">Quantity</div>
        <div className="text-right">Total</div>
      </div>

      {/* Cart Items */}
      {cartItems.map((item) => (
        <div key={item._id} className="grid md:grid-cols-4 gap-4 border-b py-6 items-center">
          {/* Product */}
          <div className="col-span-1 flex gap-4">
            <img src={item.image || "/placeholder.svg"} alt={item.productName} className="w-20 h-20 object-cover" />
            <div>
              <h3 className="font-medium">{item.productName}</h3>
              <div className="text-sm text-gray-600 mt-1">
                <div>Size: {item.size}</div>
                <div>Color: {item.color}</div>
              </div>
              <button
                onClick={() => removeItem(item._id)}
                className="text-sm text-blue-600 hover:underline mt-2"
                disabled={updateLoading === item._id}
              >
                Remove
              </button>
            </div>
          </div>

          {/* Price */}
          <div className="text-center">${item.price.toFixed(2)}</div>

          {/* Quantity */}
          <div className="flex justify-center">
            <div className="flex border rounded-md">
              <button
                className="px-3 py-1 border-r disabled:opacity-50"
                onClick={() => updateQuantity(item._id, -1)}
                disabled={item.quantity <= 1 || updateLoading === item._id}
              >
                −
              </button>
              <div className="w-12 flex items-center justify-center">
                {item.quantity}
              </div>
              <button
                className="px-3 py-1 border-l disabled:opacity-50"
                onClick={() => updateQuantity(item._id, 1)}
                disabled={updateLoading === item._id}
              >
                +
              </button>
            </div>
          </div>

          {/* Total */}
          <div className="text-right font-semibold">${item.totalPrice}</div>
        </div>
      ))}

      {/* Cart Summary */}
      <div className="mt-8 md:w-1/2 ml-auto">
        <div className="flex justify-between py-2 text-lg">
          <span className="font-semibold">Subtotal</span>
          <span className="font-semibold">${calculateSubtotal()}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <Link to="/all-products">
            <button className="btn btn-outline flex-1">Continue Shopping</button>
          </Link>
          <Link to="/check-out">
            <button className="btn bg-[#f98c25] text-white flex-1">CHECK OUT</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SimplifiedCartPage

