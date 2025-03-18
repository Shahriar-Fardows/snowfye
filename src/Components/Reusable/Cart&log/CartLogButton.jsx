import { ShoppingBag, User } from "lucide-react";
import { Link } from "react-router-dom";
import useAuthContext from "../../../Hooks/useAuthContext";

const CartLogButton = () => {
  const { user, LogOut } = useAuthContext(); // Assuming logout is available in your context
  console.log(user);

  // Function to get the user's initials
  const getInitials = (name) => {
    const nameParts = name?.split(" ");
    const firstNameInitial = nameParts[0]?.charAt(0).toUpperCase();
    const lastNameInitial = nameParts[1]?.charAt(0).toUpperCase();
    return `${firstNameInitial || ""}${lastNameInitial || ""}`;
  };

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
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle ">
              <div className="w-10 h-10 rounded-full bg-[#f98c25] flex items-center justify-center text-white">
                {/* Display initials if photo is not available */}
                <span className="text-lg font-semibold">
                  {getInitials(user.displayName)} {/* Display initials */}
                </span>
              </div>

            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-40 mt-3 w-52 p-2 shadow"
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
            className="text-white transition-colors flex items-center"
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
