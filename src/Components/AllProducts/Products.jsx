import { useEffect, useState, useRef } from "react";
import axios from "axios";

const AllProductsSlider = ({title}) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products");
        setProducts(response.data);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  // Function to handle navigation to product details
  const navigateToProductDetails = (productId) => {
    // You can implement navigation to the product details page
    // For example: window.location.href = `/product/${productId}`;
    console.log(`Navigating to product details for ID: ${productId}`);
  };

  // Slider navigation functions
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -280, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 280, behavior: 'smooth' });
    }
  };
  if (error) {
    return (
      <div className="container mx-auto py-16 px-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-3 md:px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{title}</h2>
          
          {/* Slider Navigation Buttons */}
          <div className="flex space-x-2">
            <button 
              onClick={scrollLeft}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Scroll left"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={scrollRight}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Scroll right"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Horizontal Slider */}
        <div className="relative">
          <div 
            ref={sliderRef}
            className="flex overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((product) => (
              <div 
                key={product._id} 
                className="flex-none w-[250px] md:w-[280px] mr-4 snap-start"
              >
                <div 
                  className="group bg-white rounded-lg overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer h-full"
                  onClick={() => navigateToProductDetails(product._id)}
                >
                  {/* Product Image */}
                  <div className="aspect-square bg-gray-50 p-2 overflow-hidden">
                    <img 
                      src={product.images[0] || "/placeholder.svg"} 
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
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
                      <span className="text-base font-bold text-gray-800">
                        {product.currency === "USD" ? "$" : product.currency} {product.price.toFixed(2)}
                      </span>
                      
                      {/* Colors */}
                      <div className="flex -space-x-1">
                        {product.colors.slice(0, 3).map((color, index) => (
                          <div 
                            key={`slider-${product._id}-${color}`}
                            className="w-4 h-4 rounded-full border-2 border-white ring-1 ring-gray-200"
                            style={{ 
                              backgroundColor: color.toLowerCase(),
                              zIndex: product.colors.length - index
                            }}
                            title={color}
                          ></div>
                        ))}
                        {product.colors.length > 3 && (
                          <div className="w-4 h-4 rounded-full bg-gray-100 border-2 border-white ring-1 ring-gray-200 flex items-center justify-center text-xs font-medium text-gray-500" title="More colors">
                            +{product.colors.length - 3}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Gradient Fade Effect on Edges */}
          <div className="absolute top-0 bottom-6 left-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
          <div className="absolute top-0 bottom-6 right-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};

export default AllProductsSlider;