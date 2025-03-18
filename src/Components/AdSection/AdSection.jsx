import { useEffect, useState } from "react"
import useAxios from "../../Hooks/useAxios"

const AdBanners = () => {
  const [ads, setAds] = useState([])
  const [error, setError] = useState(null)
  const axios = useAxios()

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get("/ad-banner")
        setAds(response.data)
      } catch (err) {
        console.error("Error fetching ads:", err)
        setError("Failed to load advertisements. Please try again later.")
      }
    }

    fetchAds()
  }, [])


  if (error) {
    return (
      <div className="w-full bg-red-50 p-8 rounded-lg shadow-md">
        <p className="text-red-500 text-center">{error}</p>
      </div>
    )
  }

  // Make sure we have ads before rendering
  if (ads.length === 0) {
    return null
  }

  return (
    <section className="w-full py-8 px-4">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-6">Featured Collections</h2>

        <div className="space-y-6">
          {/* First row - 2 banners side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ads.slice(0, 2).map((ad) => (
              <a
                key={ad._id}
                href={ad.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-transform hover:scale-[1.02] duration-300"
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg h-[50vh]">
                  <img src={ad.image || "/placeholder.svg"} alt={ad.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-xl font-bold text-white">{ad.title}</h3>
                    <p className="text-gray-200 mt-2 line-clamp-2">{ad.description}</p>
                    <div className="mt-3">
                      <span className="inline-block px-4 py-2 bg-white text-gray-900 rounded-md hover:bg-gray-100 transition-colors text-sm font-medium">
                        Shop Now
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Second row - 1 full-width banner */}
          {ads.length >= 3 && (
            <a
              href={ads[2].link}
              target="_blank"
              rel="noopener noreferrer"
              className="block transition-transform hover:scale-[1.01] duration-300"
            >
              <div className="relative overflow-hidden rounded-lg shadow-lg h-[50vh]">
                <img
                  src={ads[2].image || "/placeholder.svg"}
                  alt={ads[2].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-2xl font-bold text-white">{ads[2].title}</h3>
                  <p className="text-gray-200 mt-2 max-w-2xl">{ads[2].description}</p>
                  <div className="mt-4">
                    <span className="inline-block px-5 py-2.5 bg-white text-gray-900 rounded-md hover:bg-gray-100 transition-colors text-sm font-medium">
                      Shop Now
                    </span>
                  </div>
                </div>
              </div>
            </a>
          )}
        </div>
      </div>
    </section>
  )
}

export default AdBanners

