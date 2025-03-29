

const CheckoutForm = ({ formData, handleChange, handleSubmit, orderLoading }) => {
  return (
    <div className="card bg-base-100 shadow-sm border">
      <div className="card-body">
        <h2 className="text-xl font-semibold mb-4">অর্ডার করতে আপনার তথ্য দিন</h2>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">আপনার নাম*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="আপনার নাম"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Phone */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">ফোন নাম্বার*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="ফোন নাম্বার"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Address */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">এড্রেস*</span>
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="এড্রেস"
              className="textarea textarea-bordered w-full"
              rows="3"
              required
            ></textarea>
          </div>

          {/* Shipping Method */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">শিপিং মেথড</span>
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="shippingMethod"
                  value="inside"
                  checked={formData.shippingMethod === "inside"}
                  onChange={handleChange}
                  className="radio radio-primary"
                />
                <span>ঢাকা সিটির ভিতরে</span>
                <span className="ml-auto">৳ 70.00</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="shippingMethod"
                  value="outside"
                  checked={formData.shippingMethod === "outside"}
                  onChange={handleChange}
                  className="radio radio-primary"
                />
                <span>ঢাকা সিটির বাহিরে</span>
                <span className="ml-auto">৳ 130.00</span>
              </label>
            </div>
          </div>

          {/* Payment Method */}
          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text">পেমেন্ট মেথড</span>
            </label>
            <div className="flex items-center gap-2 border p-3 rounded-lg">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={true}
                className="radio radio-primary"
                readOnly
              />
              <span>ক্যাশ অন ডেলিভারি</span>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-full bg-[#f98c25] text-white" disabled={orderLoading}>
            {orderLoading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                অর্ডার প্রসেসিং...
              </>
            ) : (
              "অর্ডার কনফার্ম করুন"
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CheckoutForm

