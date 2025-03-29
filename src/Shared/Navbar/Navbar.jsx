import { useState, useEffect } from "react"
import { Menu, X, ChevronDown  } from "lucide-react"
import images from "../../assets/images"
import CartLogButton from "../../Components/Reusable/Cart&log/CartLogButton"
import useAuthContext from "../../Hooks/useAuthContext"

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState(null)
  const {user} = useAuthContext();
  console.log(user)

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isSidebarOpen && !e.target.closest(".sidebar") && !e.target.closest(".menu-button")) {
        setIsSidebarOpen(false)
      }
    }

    document.addEventListener("mousedown", handleOutsideClick)

    // Prevent scrolling when sidebar is open
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
      document.body.style.overflow = "auto"
    }
  }, [isSidebarOpen])

  const navLinks = [
    {
      title: "Home",
      url: "/",
    },
    {
      title: "All Products",
      url: "/all-products",
    },
    {
      title: "About Us",
      url: "/about",
    },
    
    {
      title: "Contact Us",
      url: "/contact",
      // submenu: [
      //   { title: "Web Development", url: "/services/web-development" },
      //   { title: "SEO", url: "/services/seo" },
      //   { title: "Marketing", url: "/services/marketing" },
      // ],
    },
  ]

  const toggleSubmenu = (index) => {
    setOpenSubmenu(openSubmenu === index ? null : index)
  }

  return (
    <div>
      {/* Announcement Bar */}
      {/* <div className="bg-[#f98c25] py-2 px-4 text-white text-center text-sm font-medium">
        Special offer: 20% off all services this month!
      </div> */}

      {/* Navbar */}
      <div className="bg-white shadow-sm relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <a href="/" className="text-[#f98c25] text-xl font-bold">
              <img src={images.image.logo} alt="logo" className="w-16" />
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center">
              <div className="ml-10 flex items-baseline space-x-4">
                {navLinks.map((link, index) => (
                  <div key={index} className="relative">
                    {link.submenu ? (
                      <button
                        onClick={() => toggleSubmenu(index)}
                        className="text-gray-700 hover:text-[#f98c25] px-3 py-2 rounded-md text-sm font-medium flex items-center"
                      >
                        {link.title}
                        <ChevronDown
                          className={`ml-1 h-4 w-4 transition-transform ${openSubmenu === index ? "rotate-180" : ""}`}
                        />
                      </button>
                    ) : (
                      <a
                        href={link.url}
                        className="text-gray-700 hover:text-[#f98c25] px-3 py-2 rounded-md text-sm font-medium"
                      >
                        {link.title}
                      </a>
                    )}

                    {/* Dropdown Menu */}
                    {link.submenu && openSubmenu === index && (
                      <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                        {link.submenu.map((sublink, subIndex) => (
                          <a
                            key={subIndex}
                            href={sublink.url}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#f98c25]"
                          >
                            {sublink.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Account & Cart Button for large */}
            <div className="hidden lg:flex items-center gap-7">
            <CartLogButton />
            </div>


            {/* Mobile menu button */}
            <div className="flex items-center lg:hidden">
              {/* Account & Cart Button */}
            <CartLogButton/>
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="menu-button inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#f98c25] hover:bg-gray-100 focus:outline-none"
                aria-expanded={isSidebarOpen}
              >
                <span className="sr-only">Open main menu</span>
                <Menu className="block h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <>
        {/* Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-[#00000052] bg-opacity-50 z-20 lg:hidden transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`sidebar fixed top-0 left-0 bottom-0 w-64 bg-white shadow-lg z-30 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out lg:hidden`}
        >
          <div className="p-4 border-b flex justify-between items-center">
            <a href="/" className="text-[#f98c25] text-xl font-bold">
              <img src={images.image.logo} alt="logo" className="w-20" />
            </a>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 rounded-md text-gray-700 hover:text-[#f98c25] hover:bg-gray-100 focus:outline-none"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="py-4 px-2 h-full overflow-y-auto">
            <div className="space-y-1">
              {navLinks.map((link, index) => (
                <div key={index} className="mb-2">
                  {link.submenu ? (
                    <button
                      onClick={() => toggleSubmenu(index)}
                      className="w-full text-left text-gray-700 hover:text-[#f98c25] flex justify-between items-center px-3 py-2 rounded-md text-base font-medium"
                    >
                      {link.title}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${openSubmenu === index ? "rotate-180" : ""}`}
                      />
                    </button>
                  ) : (
                    <a
                      href={link.url}
                      className="text-gray-700 hover:text-[#f98c25] block px-3 py-2 rounded-md text-base font-medium"
                    >
                      {link.title}
                    </a>
                  )}

                  {/* Submenu */}
                  {link.submenu && openSubmenu === index && (
                    <div className="pl-4 space-y-1 mt-1 bg-gray-50 rounded-md">
                      {link.submenu.map((sublink, subIndex) => (
                        <a
                          key={subIndex}
                          href={sublink.url}
                          className="text-gray-600 hover:text-[#f98c25] block px-3 py-2 rounded-md text-sm"
                        >
                          {sublink.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    </div>
  )
}

export default Navbar

