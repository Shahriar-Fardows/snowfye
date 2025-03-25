import { ShoppingBag, User } from "lucide-react";
import { Link } from "react-router-dom";
import useAuthContext from "../../../Hooks/useAuthContext";
import useAxios from "../../../Hooks/useAxios";
import { useEffect, useState } from "react";

const CartLogButton = () => {
  const { user, LogOut } = useAuthContext(); // User Authentication Data
  const axios = useAxios();
  const [cartItems, setCartItems] = useState([]); // ✅ Corrected useState
  const itemCount = cartItems.length;

  // Function to get the user's initials
  const getInitials = (name) => {
    const nameParts = name?.split(" ");
    const firstNameInitial = nameParts[0]?.charAt(0).toUpperCase();
    const lastNameInitial = nameParts[1]?.charAt(0).toUpperCase();
    return `${firstNameInitial || ""}${lastNameInitial || ""}`;
  };

  // ✅ Cart Data Fetch Function
  const fetchCartData = async () => {
    try {
      const response = await axios.get("/cart");
      if (user?.email) {
        const filteredData = response.data.filter(
          (item) => item.email === user.email
        );
        setCartItems(filteredData);
      }
    } catch (err) {
      console.error("Error fetching cart items:", err);
    }
  };

  // ✅ useEffect to Fetch Cart Data
  useEffect(() => {
    if (user?.email) {
      fetchCartData(); // Initial Fetch
      const interval = setInterval(fetchCartData, 5000); // Auto Refresh Every 5s
      return () => clearInterval(interval); // Cleanup on Unmount
    }
  }, [user?.email]); // ✅ Dependency Fixed

  console.log("Cart Items Count:", itemCount); // ✅ Fixed Console Log

  return (
    <div>
      {user ? (
        <div className="flex items-center gap-7">
          {/* Cart Icon with Item Count */}
          <Link
            to="/cart"
            className="relative text-[#f98c25] hover:text-[#e07b14] transition-colors"
          >
            <ShoppingBag className="h-6 w-6" />
            <span className="absolute -top-2 -right-2 bg-[#f98c25] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {itemCount}
            </span>
          </Link>

          {/* Avatar with Dropdown */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <div className="w-10 h-10 rounded-full bg-[#f98c25] flex items-center justify-center text-white">
                <span className="text-lg font-semibold">
                  {getInitials(user.displayName)}
                </span>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-40 mt-3 w-52 p-2 shadow"
            >
              <li><a>{user.displayName || "User"}</a></li>
              <li><a>{user.email || "No email"}</a></li>
              <li><a onClick={LogOut}>Logout</a></li>
            </ul>
          </div>
        </div>
      ) : (
        <button className="btn bg-[#f98c25] hover:bg-[#e07b14] transition-colors">
          <Link to="/login" className="text-white flex items-center">
            <User className="h-6 w-6 mr-2" />
            <span>Login</span>
          </Link>
        </button>
      )}
    </div>
  );
};

export default CartLogButton;
