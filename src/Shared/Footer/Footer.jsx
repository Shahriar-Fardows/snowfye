import { useState } from "react"
import { FaFacebook, FaInstagram, FaTiktok, FaArrowUp } from "react-icons/fa"
import { Link } from "react-router-dom"
import images from "../../assets/images"


const Footer = () => {
    const [email, setEmail] = useState("")
    const currentYear = new Date().getFullYear()

    const handleNewsletterSubmit = (e) => {
        e.preventDefault()
        // Handle newsletter subscription logic here
        alert("Thank you for subscribing to our newsletter!")
        setEmail("")
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }

    return (
        <footer className="bg-gray-100 text-gray-700 py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Newsletter Subscription */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-gray-800">LET'S GET IN TOUCH</h3>
                        <p className="mb-4 text-sm">Subscribe now for information on sales and discount codes</p>
                        <form onSubmit={handleNewsletterSubmit}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 mb-3 bg-white border border-gray-300 text-gray-700 focus:outline-none focus:border-[#f98c25] focus:ring-1 focus:ring-[#f98c25]"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full md:w-auto px-6 py-3 bg-[#f98c25] text-white hover:bg-[#e07b1a] transition duration-300"
                            >
                                SUBSCRIBE NOW
                            </button>
                        </form>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-gray-800">QUICK LINK</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="hover:text-[#f98c25] transition duration-300">
                                    Search
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-[#f98c25] transition duration-300">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-[#f98c25] transition duration-300">
                                    Blogs
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-[#f98c25] transition duration-300">
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal Pages */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-gray-800">LEGAL PAGES</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="hover:text-[#f98c25] transition duration-300">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-[#f98c25] transition duration-300">
                                    Refund Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-[#f98c25] transition duration-300">
                                    Terms of Service
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-gray-800">FOLLOW US ON</h3>
                        <div className="flex space-x-4">
                            <a
                                href="#"
                                className="bg-[#f98c25] text-white p-3 rounded-full hover:bg-[#e07b1a] transition duration-300"
                            >
                                <FaFacebook size={20} />
                            </a>
                            <a
                                href="#"
                                className="bg-[#f98c25] text-white p-3 rounded-full hover:bg-[#e07b1a] transition duration-300"
                            >
                                <FaInstagram size={20} />
                            </a>
                            <a
                                href="#"
                                className="bg-[#f98c25] text-white p-3 rounded-full hover:bg-[#e07b1a] transition duration-300"
                            >
                                <FaTiktok size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Back to top button */}
                <div className="flex justify-center my-10">
                    <button
                        onClick={scrollToTop}
                        className="p-3 rounded-full bg-[#f98c25] text-white hover:bg-[#e07b1a] transition duration-300"
                        aria-label="Back to top"
                    >
                        <FaArrowUp />
                    </button>
                </div>

                {/* Copyright and Payment Methods */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-300">
                    <div className="mb-4 md:mb-0 flex items-center">
                        <p className="text-gray-600">© Snowfy {currentYear}</p>
                        <Link to="https://www.facebook.com/profile.php?id=61560049115008" target="_blank" className="text-gray-600 ml-4 hover:text-[#f98c25] transition duration-300">
                            <button className="ml-4 bg-[#f98c25] text-white px-4 py-1 rounded-md flex items-center hover:bg-[#e07b1a] transition duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1">
                                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                </svg>
                                Develop by Shahriar
                            </button>
                        </Link>
                    </div>

                    <div className="flex flex-wrap justify-center gap-2">
                        <img
                            src={images?.image?.bkash}
                            alt="American Express"
                            className="h-8"
                        />
                       
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer

