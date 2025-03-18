import { Link } from "react-router-dom";
import images from "../../assets/images";
import Swal from "sweetalert2";
import useAuthContext from "../../Hooks/useAuthContext";

const Register = () => {

    const {createUser} = useAuthContext();

    const userSignUp = (e) => {
        e.preventDefault() 
        const from = new FormData(e.target)
        const email = from.get('email')
        const password = from.get('password')
        const confirmPassword = from.get('confirm-password')
        console.log(email, password, confirmPassword)

        if (password !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Password does not match',
            })
        }
         
        createUser(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user)
            Swal.fire({
                icon: 'success',
                title: 'Account Created',
                text: 'Your account has been created successfully',
            })
        })
    }


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        {/* Logo Section */}
        <div className="flex justify-center">
          <img 
            src={images?.image?.logo} 
            alt="Logo" 
            className="h-16 w-auto object-contain"
          />
        </div>

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="mt-2 text-sm text-gray-600">Join us by registering below</p>
        </div>

        {/* Form */}
        <form onSubmit={userSignUp} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
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

          <div>
            <label  className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
                name="password"
              className="mt-1 outline-none w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200"
              placeholder="Create a password"
              required
            />
          </div>

          <div>
            <label  className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
                name="confirm-password"
              className="mt-1 outline-none w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200"
              placeholder="Confirm your password"
              required
            />
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-center">
            <input
              id="terms"
              type="checkbox"
              className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
              required
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
              I agree to the{' '}
              <a href="#" className="text-orange-500 hover:text-orange-600">
                Terms & Conditions
              </a>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md focus:ring-4 focus:ring-orange-300 focus:outline-none transition duration-200"
          >
            Register Now
          </button>

          {/* Login Link */}
          <div className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to='/login' className="text-orange-500 hover:text-orange-600 font-medium">
              Sign in here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;