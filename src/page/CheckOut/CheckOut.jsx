import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";
import useAuthContext from "../../Hooks/useAuthContext";
import OrderSummary from "../../Components/ChackOut/OrderSummary/OrderSummary";
import CheckoutForm from "../../Components/ChackOut/CheckoutForm/CheckoutForm";
import Swal from "sweetalert2";


const Checkout = () => {
  const { user } = useAuthContext();
  const axios = useAxios();
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    shippingMethod: "inside", // inside or outside
  });
  
  // Cart state
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Promo code state
  const [appliedPromo, setAppliedPromo] = useState(null);
  
  // Shipping costs
  const shippingCosts = {
    inside: 70,
    outside: 130
  };
  
  // Fetch cart data
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/cart");
        const data = response.data.filter((item) => item.email === user?.email);
        setCartItems(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load cart items", err);
        setLoading(false);
      }
    };

    fetchCartData();
  }, [axios, user?.email]);
  
  // Handle form input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Calculate subtotal
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + Number(item.totalPrice), 0);
  };
  
  // Calculate discount
  const calculateDiscount = () => {
    if (!appliedPromo) return 0;
    
    const subtotal = calculateSubtotal();
    
    // Check minimum purchase requirement
    if (subtotal < appliedPromo.minimumPurchase) {
      return 0;
    }
    
    if (appliedPromo.discountType === "percentage") {
      return (subtotal * appliedPromo.discountPercent) / 100;
    } else {
      return appliedPromo.discountFixed;
    }
  };
  
  // Calculate total
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();
    const shipping = shippingCosts[formData.shippingMethod];
    
    return subtotal - discount + shipping;
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.phone || !formData.address) {
      setError("Please fill in all required fields");
      return;
    }
    
    // Validate cart
    if (cartItems.length === 0) {
      setError("Your cart is empty");
      return;
    }
    
    try {
      setOrderLoading(true);
      
      // Create order object
      const order = {
        customerInfo: {
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          email: user?.email
        },
        orderItems: cartItems.map(item => ({
          productId: item.productId,
          productName: item.productName,
          quantity: item.quantity,
          price: item.price,
          totalPrice: item.totalPrice,
          image: item.image,
          size: item.size,
          color: item.color
        })),
        orderSummary: {
          subtotal: calculateSubtotal(),
          discount: calculateDiscount(),
          shipping: shippingCosts[formData.shippingMethod],
          total: calculateTotal()
        },
        shippingMethod: formData.shippingMethod === "inside" ? "ঢাকা সিটির ভিতরে" : "ঢাকা সিটির বাহিরে",
        paymentMethod: "Cash on Delivery",
        promoCode: appliedPromo ? appliedPromo.code : null,
        orderDate: new Date(),
        status: "Pending"
      };
      
      // Send order to server
      await axios.post("/orders", order);
      
      // Clear cart
      for (const item of cartItems) {
        await axios.delete(`/cart/${item._id}`);
      }
      
      // show to success sweetalet then back to home page
      Swal("Order Placed!", "Your order has been placed successfully", "success");
      navigate("/");
     

    } catch (err) {
      setError("Failed to place order. Please try again.", err);
    } finally {
      setOrderLoading(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }
  
  return (
    <div className="max-w-6xl mx-auto my-8 px-4">
      <h1 className="text-2xl font-bold text-center mb-6">Checkout</h1>
      
      {/* Error message */}
      {error && (
        <div className="alert alert-error mb-4">
          <span>{error}</span>
          <button className="btn btn-sm btn-ghost" onClick={() => setError(null)}>×</button>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Customer Information Form */}
        <CheckoutForm 
          formData={formData}
          handleChange={handleFormChange}
          handleSubmit={handleSubmit}
          orderLoading={orderLoading}
        />
        
        {/* Order Summary */}
        <OrderSummary
          cartItems={cartItems}
          appliedPromo={appliedPromo}
          setAppliedPromo={setAppliedPromo}
          calculateSubtotal={calculateSubtotal}
          calculateDiscount={calculateDiscount}
          calculateTotal={calculateTotal}
          shippingCosts={shippingCosts}
          shippingMethod={formData.shippingMethod}
          axios={axios}
        />
      </div>
    </div>
  );
};

export default Checkout;
