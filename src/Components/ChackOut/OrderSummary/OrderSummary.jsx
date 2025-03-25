"use client"

import { useState } from "react"

const OrderSummary = ({
  cartItems,
  appliedPromo,
  setAppliedPromo,
  calculateSubtotal,
  calculateDiscount,
  calculateTotal,
  shippingCosts,
  shippingMethod,
  axios,
}) => {
  const [promoCode, setPromoCode] = useState("")
  const [promoLoading, setPromoLoading] = useState(false)
  const [promoError, setPromoError] = useState(null)

  // Apply promo code
  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      setPromoError("Please enter a promo code")
      return
    }

    try {
      setPromoLoading(true)
      setPromoError(null)

      // Fetch promo codes from API
      const response = await axios.get("/promo-codes")
      const promoCodes = response.data

      // Find matching promo code
      const matchedPromo = promoCodes.find(
        (promo) => promo.code.toLowerCase() === promoCode.toLowerCase() && promo.isActive,
      )

      if (!matchedPromo) {
        setPromoError("Invalid or expired promo code")
        setPromoLoading(false)
        return
      }

      // Check if promo code is expired
      const isExpired = new Date(matchedPromo.expiryDate) < new Date()
      if (isExpired) {
        setPromoError("This promo code has expired")
        setPromoLoading(false)
        return
      }

      // Check minimum purchase
      if (calculateSubtotal() < matchedPromo.minimumPurchase) {
        setPromoError(`Minimum purchase of ৳${matchedPromo.minimumPurchase} required`)
        setPromoLoading(false)
        return
      }

      setAppliedPromo(matchedPromo)
      setPromoError(null)
    } catch (err) {
      setPromoError("Failed to apply promo code", err)
    } finally {
      setPromoLoading(false)
    }
  }

  // Remove applied promo code
  const handleRemovePromo = () => {
    setAppliedPromo(null)
    setPromoCode("")
  }

  return (
    <div>
  <div className="card bg-base-100 shadow-sm border mb-4">
    <div className="card-body">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

      {/* Cart Items */}
      <div className="space-y-4 mb-6">
        {cartItems.length === 0 ? (
          <p className="text-center py-4">Your cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <div key={item._id} className="flex gap-3 border-b pb-3">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.productName}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-medium">{item.productName}</h3>
                <div className="text-sm text-gray-500">
                  <span>Size: {item.size}</span> • <span>Color: {item.color}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span>
                    {item.quantity} × ৳{item.price}
                  </span>
                  <span className="font-medium">৳{item.totalPrice}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Promo Code */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Promo Code</h3>

        {appliedPromo ? (
          <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
            <div>
              <span className="font-medium">{appliedPromo.code}</span>
              <p className="text-sm text-green-600">
                {appliedPromo.discountType === "percentage"
                  ? `${appliedPromo.discountPercent}% off`
                  : `৳${appliedPromo.discountFixed} off`}
              </p>
            </div>
            <button onClick={handleRemovePromo} className="btn btn-sm btn-ghost">
              ✕
            </button>
          </div>
        ) : (
          <div>
            <div className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter promo code"
                className="input input-bordered flex-1"
              />
              <button onClick={handleApplyPromo} className="btn bg-[#f98c25] text-white" disabled={promoLoading}>
                {promoLoading ? <span className="loading loading-spinner loading-sm"></span> : "Apply"}
              </button>
            </div>
            {promoError && <p className="text-sm text-red-500 mt-1">{promoError}</p>}
          </div>
        )}
      </div>

      {/* Order Calculation */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>৳{calculateSubtotal().toFixed(2)}</span>
        </div>

        {appliedPromo && calculateDiscount() > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-৳{calculateDiscount().toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>৳{shippingCosts[shippingMethod].toFixed(2)}</span>
        </div>

        <div className="flex justify-between font-bold text-lg pt-2 border-t">
          <span>Total</span>
          <span>৳{calculateTotal().toFixed(2)}</span>
        </div>
      </div>
    </div>
  </div>

  {/* Back to Cart */}
  <div className="text-center">
    <a href="/cart" className="link link-hover text-[#f98c25]">
      ← Back to Cart
    </a>
  </div>
</div>

  )
}

export default OrderSummary

