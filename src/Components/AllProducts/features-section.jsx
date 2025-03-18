import { ShieldCheck, RotateCcw, CreditCard } from "lucide-react"

const FeaturesSection = () => {
  const features = [
    {
      icon: <ShieldCheck className="w-12 h-12 text-[#f98c25]" />,
      title: "100% QUALITY",
      description: "Comfort with our 100% quality and guaranteed products.",
    },
    {
      icon: <RotateCcw className="w-12 h-12 text-[#f98c25]" />,
      title: "30 DAYS RETURN",
      description: "Enjoy a seamless shopping experience, facilitated by our complimentary shipping.",
    },
    {
      icon: <CreditCard className="w-12 h-12 text-[#f98c25]" />,
      title: "SECURE PAYMENT",
      description: "Shop With Confidence – Safe and Hassle-Free Transactions",
    },
  ]

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center text-center transition-transform hover:transform hover:scale-105 hover:shadow-lg"
            >
              <div className="mb-4 relative">
                <div className="absolute -inset-1 rounded-full bg-[#f98c25]/10 animate-pulse"></div>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection

