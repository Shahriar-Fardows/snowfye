"use client"

import { ChevronDown, ChevronUp, Search, ShoppingBag, SlidersHorizontal, X } from "lucide-react"
import { useEffect, useState } from "react"
import useAxios from "../../Hooks/useAxios"
import { useNavigate } from "react-router-dom" // Import for navigation

const AllProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  console.log(error)
  const [searchQuery, setSearchQuery] = useState("")
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [maxPrice, setMaxPrice] = useState(1000)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
  })
  const axios = useAxios()
  const navigate = useNavigate() // For navigation to product details

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await axios.get("/products")
        setProducts(response.data)

        // Extract unique categories from products
        const uniqueCategories = [...new Set(response.data.map((product) => product.category))]
        setCategories(uniqueCategories)

        // Find the maximum price for the slider
        const highestPrice = Math.max(...response.data.map((product) => product.price))
        setMaxPrice(Math.ceil(highestPrice / 100) * 100) // Round up to nearest hundred
        setPriceRange([0, Math.ceil(highestPrice / 100) * 100])
        setLoading(false)
      } catch (err) {
        console.error("Error fetching products:", err)
        setError("Failed to load products. Please try again later.")
        setLoading(false)
      }
    }

    fetchProducts()
  }, [axios])

  // Handle search and filter
  const filteredProducts = products.filter((product) => {
    const matchesSearchQuery = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true
    const matchesPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1]
    return matchesSearchQuery && matchesCategory && matchesPriceRange
  })

  // Function to handle navigation to product details
  const navigateToProductDetails = (productId) => {
    // Navigate to product details page
    navigate(`/products/${productId}`)
  }

  // Function to clear all filters
  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("")
    setPriceRange([0, maxPrice])
  }

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Custom slider component
  const PriceRangeSlider = () => {
    const handleMinChange = (e) => {
      const newMin = Number(e.target.value)
      setPriceRange([newMin, priceRange[1]])
    }

    const handleMaxChange = (e) => {
      const newMax = Number(e.target.value)
      setPriceRange([priceRange[0], newMax])
    }

    return (
      <div className="my-3">
        <div className="grid grid-cols-2 gap-3 mb-2">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Min Price</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                min={0}
                max={priceRange[1]}
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Max Price</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                min={priceRange[0]}
                max={maxPrice}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        <input
          type="range"
          min={0}
          max={maxPrice}
          value={priceRange[0]}
          onChange={handleMinChange}
          className="w-full mb-2 accent-blue-600"
        />
        <input
          type="range"
          min={0}
          max={maxPrice}
          value={priceRange[1]}
          onChange={handleMaxChange}
          className="w-full accent-blue-600"
        />
      </div>
    )
  }

  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {/* Mobile Filter Toggle - Only visible on mobile */}
        <div className="md:hidden mb-4">
          <button
            className="w-full flex items-center justify-between bg-white p-3 rounded-lg shadow-sm border border-gray-200"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5 text-gray-500" />
              <span className="font-medium text-gray-700">Filters</span>
            </div>
            <ChevronDown
              className={`h-5 w-5 text-gray-500 transition-transform ${showMobileFilters ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Filters */}
          <div className={`md:w-1/4 lg:w-1/5 ${showMobileFilters ? "block" : "hidden md:block"}`}>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden sticky top-4">
              {/* Search Box Above Filters */}
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search for products..."
                    className="w-full p-3 pl-10 pr-12 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={() => setSearchQuery("")}
                    >
                      <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    </button>
                  )}
                </div>
              </div>

              {/* Filter Header */}
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-medium text-gray-800">Filters</h3>
                {(selectedCategory || priceRange[0] > 0 || priceRange[1] < maxPrice) && (
                  <button className="text-sm text-blue-600 hover:text-blue-800" onClick={clearFilters}>
                    Clear All
                  </button>
                )}
              </div>

              {/* Categories Section */}
              <div className="border-b border-gray-200">
                <button
                  className="w-full p-4 flex justify-between items-center hover:bg-gray-50"
                  onClick={() => toggleSection("categories")}
                >
                  <span className="font-medium text-gray-700">Categories</span>
                  {expandedSections.categories ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>

                {expandedSections.categories && (
                  <div className="px-4 pb-4 space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                    <div className="flex items-center">
                      <input
                        id="category-all"
                        type="radio"
                        name="category"
                        checked={selectedCategory === ""}
                        onChange={() => setSelectedCategory("")}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor="category-all" className="ml-2 text-sm font-medium text-gray-700">
                        All Categories
                      </label>
                    </div>

                    {categories.map((category) => (
                      <div key={category} className="flex items-center">
                        <input
                          id={`category-${category}`}
                          type="radio"
                          name="category"
                          checked={selectedCategory === category}
                          onChange={() => setSelectedCategory(category)}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                        />
                        <label htmlFor={`category-${category}`} className="ml-2 text-sm font-medium text-gray-700">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Range Section */}
              <div>
                <button
                  className="w-full p-4 flex justify-between items-center hover:bg-gray-50"
                  onClick={() => toggleSection("price")}
                >
                  <span className="font-medium text-gray-700">Price Range</span>
                  {expandedSections.price ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>

                {expandedSections.price && (
                  <div className="px-4 pb-4">
                    <PriceRangeSlider />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:w-3/4 lg:w-4/5">
            {/* Results Count */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 mb-4 text-sm text-gray-600 flex justify-between items-center">
              <span>
                Showing <span className="font-medium">{filteredProducts.length}</span> of{" "}
                <span className="font-medium">{products.length}</span> products
              </span>
              <span className="text-xs text-gray-500 hidden sm:inline-block">
                {selectedCategory ? `Category: ${selectedCategory}` : "All Categories"} | Price: ${priceRange[0]} - $
                {priceRange[1]}
              </span>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <>
                {/* No Results */}
                {filteredProducts.length === 0 && (
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                      <ShoppingBag className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                    <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
                    <button
                      onClick={clearFilters}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}

                {/* Product Grid */}
                {filteredProducts.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredProducts.map((product) => (
                      <div
                        key={product._id}
                        className="group bg-white overflow-hidden rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 cursor-pointer"
                        onClick={() => navigateToProductDetails(product._id)}
                      >
                        {/* Product Image */}
                        <div className="aspect-square bg-gray-50 p-4 overflow-hidden relative">
                          <img
                            src={product.images[0] || "/placeholder.svg?height=300&width=300"}
                            alt={product.name}
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3">
                            <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                              {product.category}
                            </span>
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="p-4">
                          {/* Title */}
                          <h3 className="text-sm md:text-base font-medium text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                            {product.name}
                          </h3>

                          {/* Price and Colors */}
                          <div className="flex justify-between items-center">
                            {/* Price */}
                            <span className="text-base md:text-lg font-bold text-gray-800">
                              {product.currency === "USD" ? "$" : product.currency} {product.price.toFixed(2)}
                            </span>

                            {/* Colors */}
                            {product.colors && product.colors.length > 0 && (
                              <div className="flex -space-x-1">
                                {product.colors.slice(0, 3).map((color, index) => (
                                  <div
                                    key={`${product._id}-${color}`}
                                    className="w-4 h-4 md:w-5 md:h-5 rounded-full border-2 border-white ring-1 ring-gray-200"
                                    style={{
                                      backgroundColor: color.toLowerCase(),
                                      zIndex: product.colors.length - index,
                                    }}
                                    title={color}
                                  ></div>
                                ))}
                                {product.colors.length > 3 && (
                                  <div
                                    className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-gray-100 border-2 border-white ring-1 ring-gray-200 flex items-center justify-center text-xs font-medium text-gray-500"
                                    title="More colors"
                                  >
                                    +{product.colors.length - 3}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Available Sizes */}
                          {product.sizes && product.sizes.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-1">
                              {product.sizes.map((size) => (
                                <span
                                  key={`${product._id}-${size}`}
                                  className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                                >
                                  {size}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AllProducts

