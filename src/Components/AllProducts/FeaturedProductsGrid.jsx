import { useEffect, useState } from "react";
import useAxios from "../../Hooks/useAxios";
import { Link } from "react-router-dom";

const FeaturedProductsGrid = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const axios = useAxios();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/products");
        // Limit to 8 products
        setProducts(response.data.slice(0, 8));
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
    <section className="bg-gray-50 py-12 md:py-16">
      <div className="container mx-auto px-3 md:px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 md:mb-4">Our Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Discover our collection of high-quality products designed for comfort and style.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 lg:gap-8">
          {products.map((product) => (
            <div 
              className="group relative bg-white overflow-hidden rounded-lg md:rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => navigateToProductDetails(product._id)}
            >
              {/* Product Image */}
              <div className="aspect-square bg-gray-50 p-2 md:p-4 overflow-hidden">
                <img 
                  src={product.images[0] || "/placeholder.svg"} 
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Product Info */}
              <div className="p-3 md:p-5">
                {/* Title */}
                <h3 className="text-sm md:text-lg font-medium text-gray-800 mb-1 md:mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                  {product.name}
                </h3>
                
                {/* Price and Colors */}
                <div className="flex justify-between items-center">
                  {/* Price */}
                  <span className="text-base md:text-xl font-bold text-gray-800">
                    {product.currency === "USD" ? "$" : product.currency} {product.price.toFixed(2)}
                  </span>
                  
                  {/* Colors */}
                  <div className="flex -space-x-1">
                    {product.colors.slice(0, 3).map((color, index) => (
                      <div 
                        key={`${product._id}-${color}`}
                        className="w-4 h-4 md:w-6 md:h-6 rounded-full border-2 border-white ring-1 ring-gray-200"
                        style={{ 
                          backgroundColor: color.toLowerCase(),
                          zIndex: product.colors.length - index
                        }}
                        title={color}
                      ></div>
                    ))}
                    {product.colors.length > 3 && (
                      <div className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-gray-100 border-2 border-white ring-1 ring-gray-200 flex items-center justify-center text-xs md:text-sm font-medium text-gray-500" title="More colors">
                        +{product.colors.length - 3}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#0000005e] bg-opacity-0 group-hover:bg-opacity-5 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <Link to={`/products/${product._id}`} key={product._id} >
                <span className="px-4 py-2 bg-white bg-opacity-90 rounded-full text-sm font-medium text-gray-800 shadow-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  View Details
                </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsGrid;