import { ShoppingBag, User } from "lucide-react";
import { Link } from "react-router-dom";
import useAuthContext from "../../../Hooks/useAuthContext";

const CartLogButton = () => {
  const { user, LogOut } = useAuthContext(); // Assuming logout is available in your context
  console.log(user);

  return (
    <div>
      {user ? (
        // When user is logged in
        <div className="flex items-center gap-7">
          {/* Cart Icon */}
          <Link
            to="/cart"
            className="text-[#f98c25] hover:text-[#e07b14] transition-colors"
          >
            <ShoppingBag className="h-6 w-6" />
          </Link>

          {/* Avatar with Dropdown */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="User avatar"
                  src={user.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} // Use user's photo if available
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  {user.displayName || "User"} {/* Display user's name */}
                </a>
              </li>
              <li>
                <a>{user.email || "No email"}</a> {/* Display user's email */}
              </li>
              <li>
                <a onClick={LogOut}>Logout</a> {/* Logout functionality */}
              </li>
            </ul>
          </div>
        </div>
      ) : (
        // When user is not logged in
        <button className="btn bg-[#f98c25] hover:bg-[#e07b14] transition-colors">
          <Link
            to="/login"
            className="text-white  transition-colors flex items-center"
          >
            <User className="h-6 w-6 mr-2" />
            <span>Login</span>
          </Link>
        </button>
      )}
    </div>
  );
};

export default CartLogButton;