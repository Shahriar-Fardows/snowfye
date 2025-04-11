import { useState } from "react"
import { ShoppingCart, ChevronLeft, ChevronRight, Check, Star, StarHalf, Truck, RotateCcw } from "lucide-react"
import { Link, useLoaderData } from "react-router-dom"
import FeaturesSection from "./features-section"
import AllProductsSlider from "./Products"
import { Info, ChevronDown, ChevronUp } from "lucide-react"
import useAuthContext from "../../Hooks/useAuthContext"
import useAxios from "../../Hooks/useAxios"
import Swal from "sweetalert2"

const ProductDetails = () => {
    // This would come from your API in a real application
    const product = useLoaderData()
    console.log(product)
    const [expanded, setExpanded] = useState(true)
    const { user } = useAuthContext();
    const [selectedSize, setSelectedSize] = useState("")
    const [selectedColor, setSelectedColor] = useState("")
    const [selectedColorName, setSelectedColorName] = useState("")
    const [quantity, setQuantity] = useState(1)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const axios = useAxios();

    const handleSizeChange = (size) => {
        setSelectedSize(size)
    }

    const handleColorChange = (color) => {
        const colorName = product.colors[color]
        setSelectedColor(color)
        setSelectedColorName(colorName)
    }

    const handleQuantityChange = (change) => {
        const newQuantity = quantity + change
        if (newQuantity > 0 && newQuantity <= (selectedSize ? product.stock[selectedSize] : 20)) {
            setQuantity(newQuantity)
        }
    }

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert("Please select a size")
            return
        }
        if (!selectedColor) {
            alert("Please select a color")
            return
        }

        const selectedData = {
            productName: product.name,
            size: selectedSize,
            color: selectedColorName,
            quantity: quantity,
            price: product.price,
            totalPrice: product.price * quantity,
            email: user.email,
            image: product.images[0],

        }

        axios.post("/cart", selectedData)
        .then((response) => {
            console.log(response.data)
            Swal.fire({
                icon: "success",
                title: "Added to cart",
                text: `${quantity} ${product.name} - Size: ${selectedSize}, Color: ${selectedColorName} has been added to your cart.`,
            })
        })
        .catch((error) => {
            console.error("Error adding to cart:", error)
        })
    }

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === product.images.length - 1 ? 0 : prevIndex + 1))
    }

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? product.images.length - 1 : prevIndex - 1))
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: product.currency,
        }).format(price)
    }

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="flex mb-8 text-sm text-gray-500 container mx-auto">
                <Link to='/' className="hover:text-[#f98c25] transition-colors">
                    Home
                </Link>
                <span className="mx-2">/</span>
                <a href="#" className="hover:text-[#f98c25] transition-colors">
                    {product.category}
                </a>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">{product.name}</span>
            </nav>
            <div className="max-w-7xl mx-auto">


                <div className="bg-white overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Product Images */}
                        <div className="relative bg-gray-100 p-6 lg:p-10">
                            <div className="aspect-square rounded-xl overflow-hidden relative bg-white">
                                <img
                                    src={product.images[currentImageIndex] || "/placeholder.svg"}
                                    alt={product.name}
                                    className="w-full h-full object-contain"
                                />
                                <button
                                    onClick={prevImage}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 rounded-full p-2 shadow-md hover:bg-[#f98c25] hover:text-white transition-colors"
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 rounded-full p-2 shadow-md hover:bg-[#f98c25] hover:text-white transition-colors"
                                    aria-label="Next image"
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Image indicators */}
                            <div className="mt-4 flex justify-center space-x-2">
                                {product.images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`w-3 h-3 rounded-full transition-colors ${index === currentImageIndex ? "bg-[#f98c25]" : "bg-gray-300 hover:bg-gray-400"
                                            }`}
                                        aria-label={`View image ${index + 1}`}
                                    />
                                ))}
                            </div>

                            {/* Thumbnails */}
                            <div className="mt-6 grid grid-cols-3 gap-3">
                                {product.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`rounded-lg overflow-hidden border-2 transition-all ${index === currentImageIndex
                                            ? "border-[#f98c25] ring-2 ring-[#f98c25]/30"
                                            : "border-transparent hover:border-gray-300"
                                            }`}
                                    >
                                        <img
                                            src={image || "/placeholder.svg"}
                                            alt={`Thumbnail ${index + 1}`}
                                            className="w-full h-full object-cover aspect-square"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="p-6 lg:p-10 flex flex-col">
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="inline-block px-3 py-1 text-xs font-medium bg-[#f98c25]/10 text-[#f98c25] rounded-full">
                                        {product.category}
                                    </span>

                                </div>
                                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                                <div className="text-2xl font-semibold text-[#f98c25] mb-4">{formatPrice(product.price)}</div>
                            </div>

                            <div className="space-y-8 flex-grow">
                                {/* Size Selection */}
                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <h2 className="font-medium text-gray-900">Size</h2>
                                        <button className="text-sm text-[#f98c25] hover:underline">Size Guide</button>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {product.sizes.map((size) => {
                                            const isOutOfStock = product.stock[size] === 0
                                            return (
                                                <button
                                                    key={size}
                                                    onClick={() => !isOutOfStock && handleSizeChange(size)}
                                                    className={`min-w-[3.5rem] h-11 border rounded-lg flex items-center justify-center transition-all ${selectedSize === size
                                                        ? "bg-[#f98c25] text-white border-[#f98c25] font-medium shadow-md"
                                                        : isOutOfStock
                                                            ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                                                            : "border-gray-300 text-gray-700 hover:border-[#f98c25] hover:shadow-sm"
                                                        }`}
                                                    disabled={isOutOfStock}
                                                >
                                                    {size}
                                                    {isOutOfStock && (
                                                        <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-red-500 whitespace-nowrap">
                                                            Out of stock
                                                        </span>
                                                    )}
                                                </button>
                                            )
                                        })}
                                    </div>
                                    {selectedSize && product.stock[selectedSize] > 0 && (
                                        <p className="mt-3 text-sm text-green-600 flex items-center">
                                            <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                                            {product.stock[selectedSize]} items available
                                        </p>
                                    )}
                                </div>

                                {/* Color Selection */}
                                <div>
                                    <h2 className="font-medium text-gray-900 mb-3">Color</h2>
                                    <div className="flex flex-wrap gap-4">
                                        {Object.entries(product.colors).map(([colorName, colorHex]) => (
                                            <button
                                                key={colorName}
                                                onClick={() => handleColorChange(colorName)}
                                                className={`group relative w-12 h-12 rounded-full border-2 transition-all ${selectedColor === colorName
                                                    ? "border-[#f98c25] ring-2 ring-[#f98c25]/30"
                                                    : "border-gray-300 hover:border-[#f98c25]"
                                                    }`}
                                                style={{ backgroundColor: colorHex }}
                                                title={colorName}
                                            >
                                                {selectedColor === colorName && (
                                                    <span className="absolute inset-0 flex items-center justify-center">
                                                        <Check className={`h-5 w-5 ${colorName === "White" ? "text-black" : "text-white"}`} />
                                                    </span>
                                                )}
                                                <span className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {colorName}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Quantity */}
                                <div>
                                    <h2 className="font-medium text-gray-900 mb-3">Quantity</h2>
                                    <div className="flex items-center">
                                        <button
                                            onClick={() => handleQuantityChange(-1)}
                                            className="w-12 h-12 rounded-l-lg bg-gray-100 flex items-center justify-center border border-gray-300 hover:bg-gray-200 transition-colors"
                                            aria-label="Decrease quantity"
                                        >
                                            <span className="text-xl font-medium">−</span>
                                        </button>
                                        <div className="w-20 h-12 flex items-center justify-center border-t border-b border-gray-300 font-medium text-lg">
                                            {quantity}
                                        </div>
                                        <button
                                            onClick={() => handleQuantityChange(1)}
                                            className="w-12 h-12 rounded-r-lg bg-gray-100 flex items-center justify-center border border-gray-300 hover:bg-gray-200 transition-colors"
                                            aria-label="Increase quantity"
                                        >
                                            <span className="text-xl font-medium">+</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Add to Cart */}
                            <div className="mt-8">
                                <button
                                    onClick={handleAddToCart}
                                    className="w-full bg-[#f98c25] text-white py-4 px-6 rounded-lg hover:bg-[#e07b14] transition-colors flex items-center justify-center gap-2 font-medium shadow-lg shadow-[#f98c25]/20"
                                >
                                    <ShoppingCart className="h-5 w-5" />
                                    Add to Cart
                                </button>
                            </div>

                            {/* Product Details */}
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                        In Stock
                                    </div>
                                    <div>SKU: {product.id}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="my-8 group">
                    <div
                        className="flex items-center justify-between bg-white rounded-t-lg border border-gray-200 px-5 py-3 cursor-pointer"
                        onClick={() => setExpanded(!expanded)}
                    >
                        <div className="flex items-center gap-2">
                            <Info className="h-5 w-5 text-[#f98c25]" />
                            <h2 className="text-lg font-medium text-gray-800">Product Description</h2>
                        </div>
                        <button
                            className="text-gray-500 hover:text-[#f98c25] transition-colors"
                            aria-label={expanded ? "Collapse description" : "Expand description"}
                        >
                            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </button>
                    </div>

                    <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${expanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                            } border-x border-b border-gray-200 rounded-b-lg`}
                    >
                        <div className="p-5 bg-white">
                            <p className="text-gray-700 leading-relaxed"> {product.description || "No description available."}</p>
                        </div>
                    </div>
                </section>

            </div>

            <FeaturesSection />
            <AllProductsSlider title="Other Prodcuts " />

        </div>
    )
}

export default ProductDetails

