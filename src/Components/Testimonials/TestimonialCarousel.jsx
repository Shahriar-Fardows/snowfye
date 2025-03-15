import { useState, useEffect, useRef } from "react"
import axios from "axios"

const TestimonialCarousel = () => {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const carouselRef = useRef(null)
  const autoplayRef = useRef(null)
  const itemsPerView = 3 // Number of items visible at once

  // Fetch testimonials
  useEffect(() => {
    axios
      .get("http://localhost:5000/testimonials")
      .then((response) => {
        // If we have fewer than 3 testimonials, duplicate them to fill the view
        let data = response.data
        while (data.length < itemsPerView) {
          data = [...data, ...data]
        }
        setTestimonials(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching testimonials:", error)
        setLoading(false)
      })
  }, [])

  // Create a circular array for infinite scrolling
  const getCircularItems = () => {
    if (testimonials.length === 0) return []

    // Create enough duplicates to ensure no empty spaces
    // We need at least 3 sets: one before, one visible, one after
    return [...testimonials, ...testimonials, ...testimonials]
  }

  const allItems = getCircularItems()

  // Handle auto-rotation
  useEffect(() => {
    if (testimonials.length === 0) return

    const startAutoplay = () => {
      autoplayRef.current = setInterval(() => {
        nextSlide()
      }, 3000)
    }

    startAutoplay()

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
  }, [testimonials, currentIndex])

  // Handle the loop transition
  useEffect(() => {
    if (testimonials.length === 0) return

    // If we've gone too far forward, reset to the beginning of the second set
    if (currentIndex >= testimonials.length * 2) {
      const timeout = setTimeout(() => {
        setIsTransitioning(true)
        setCurrentIndex(currentIndex % testimonials.length)

        const resetTimeout = setTimeout(() => {
          setIsTransitioning(false)
        }, 50)

        return () => clearTimeout(resetTimeout)
      }, 500)

      return () => clearTimeout(timeout)
    }

    // If we've gone too far backward, reset to the end of the first set
    if (currentIndex < 0) {
      const timeout = setTimeout(() => {
        setIsTransitioning(true)
        setCurrentIndex(testimonials.length + (currentIndex % testimonials.length))

        const resetTimeout = setTimeout(() => {
          setIsTransitioning(false)
        }, 50)

        return () => clearTimeout(resetTimeout)
      }, 500)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, testimonials.length])

  const nextSlide = () => {
    if (testimonials.length === 0) return
    setCurrentIndex((prevIndex) => prevIndex + 1)
  }

  const prevSlide = () => {
    if (testimonials.length === 0) return
    setCurrentIndex((prevIndex) => prevIndex - 1)
  }

  // Render loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  // If no testimonials found
  if (testimonials.length === 0) {
    return <div className="text-center py-8">No testimonials available</div>
  }

  // Calculate translateX value for carousel
  // We use percentage to ensure it works across different screen sizes
  const translateValue = `-${currentIndex * (100 / itemsPerView)}%`

  return (
    <div className="relative max-w-7xl mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>

      {/* Carousel Container */}
      <div className="relative overflow-hidden px-12">
        {/* Carousel Track */}
        <div
          ref={carouselRef}
          className={`flex ${isTransitioning ? "" : "transition-transform duration-500 ease-in-out"}`}
          style={{ transform: `translateX(${translateValue})` }}
        >
          {allItems.map((testimonial, index) => (
            <div
              key={`${testimonial._id}-${index}`}
              className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-2"
              style={{ width: `${100 / itemsPerView}%` }} // Ensure each item takes exactly 1/3 of the container
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full m-2 transition-all duration-300 hover:shadow-xl">
                <div className="p-6 flex flex-col h-full">
                  {/* Quote Icon */}
                  <div className="mb-4 text-blue-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="36"
                      height="36"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                    </svg>
                  </div>

                  {/* Review */}
                  <p className="text-gray-700 mb-6 flex-grow line-clamp-4">{testimonial.review}</p>

                  {/* Rating */}
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill={i < testimonial.rating ? "currentColor" : "none"}
                        stroke={i < testimonial.rating ? "none" : "currentColor"}
                        strokeWidth="1.5"
                        className="w-5 h-5 text-yellow-500"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                  </div>

                  {/* Customer Info */}
                  <div className="flex items-center mt-auto">
                    <img
                      src={testimonial.image || "/placeholder.svg?height=48&width=48"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-gray-500 text-sm">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-800 font-bold p-3 rounded-full shadow-lg z-10 flex items-center justify-center"
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-800 font-bold p-3 rounded-full shadow-lg z-10 flex items-center justify-center"
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}

export default TestimonialCarousel

