import { Link } from "react-router-dom";
import images from "../../assets/images";
import Swal from "sweetalert2";
import useAuthContext from "../../Hooks/useAuthContext";

const ForgetPage = () => {
  const { forgotPassword } = useAuthContext(); // Moved outside handleReset

  const handleReset = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const email = form.get("email");

    if (!email) {
      return Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please enter your email address!",
      });
    }

    try {
      await forgotPassword(email); // Actual reset logic from context
      Swal.fire({
        icon: "success",
        title: "Check Your Email",
        text: `Password reset link has been sent to ${email}`,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: error?.message || "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        {/* Logo */}
        <div className="flex justify-center">
          <Link to="/">
            <img
              src={images?.image?.logo}
              alt="Logo"
              className="h-16 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Forgot your password?
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            No worries! Enter your email and we’ll send you a reset link.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleReset} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 outline-none w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200"
              placeholder="Enter your email"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md focus:ring-4 focus:ring-orange-300 focus:outline-none transition duration-200"
          >
            Send Reset Link
          </button>

          <div className="text-center text-sm text-gray-600">
            Back to{" "}
            <Link to="/login" className="text-orange-500 hover:text-orange-600 font-medium">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPage;
