import { Link } from "react-router-dom";

const About = () => {
    return (
        <div className=" bg-white font-sans">
            {/* Hero Section */}
            <div className="relative bg-gray-50 overflow-hidden">
                <div className="container mx-auto flex items-center justify-center h-[30vh] md:h-[40vh]">
                    <div className="text-center px-4 sm:px-6 lg:px-8">
                        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                            <span className="block xl:inline">About</span>{" "}
                            <span className="block text-[#f78c2a] xl:inline">Snowfye</span>
                        </h1>
                        <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg md:mt-5 md:text-xl">
                            Where style meets soul.
                        </p>
                    </div>
                </div>
            </div>


            {/* Mission Section */}
            <div className="py-16 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:text-center">
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            Our Mission
                        </p>
                        <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                            At Snowfye, we believe fashion is more than just clothing – it's a statement, an identity, a lifestyle.
                            Our mission is to create pieces that empower you to express yourself confidently and unapologetically.
                        </p>
                    </div>

                    <div className="mt-10">
                        <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                            <div className="relative">
                                <p className="mt-2 text-lg leading-7 text-gray-500">
                                    We bring together modern design, premium quality, and ultimate comfort to craft fashion that speaks
                                    your vibe. From casual essentials to bold signature looks, every Snowfye piece is made to help you
                                    stand out in your own unique way.
                                </p>
                            </div>
                            <div className="relative">
                                <div className="h-full w-full bg-amber-50 rounded-lg flex items-center justify-center p-8">
                                    <p className="text-[#f78c2a] text-lg italic font-light">
                                        "Fashion is about dressing according to what's fashionable. Style is more about being yourself."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:text-center">
                        <h2 className="text-base text-[#f78c2a] font-semibold tracking-wide uppercase">Benefits</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            Why Choose Snowfye?
                        </p>
                    </div>

                    <div className="mt-10">
                        <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                            <div className="relative">
                                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#f78c2a] text-white">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                                    🇧🇩 Designed with passion in Bangladesh
                                </p>
                                <p className="mt-2 ml-16 text-base text-gray-500">
                                    Proudly designed and crafted in Bangladesh with attention to detail and cultural inspiration.
                                </p>
                            </div>

                            <div className="relative">
                                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#f78c2a] text-white">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                                    ✂️ Premium fabrics & flawless finishing
                                </p>
                                <p className="mt-2 ml-16 text-base text-gray-500">
                                    We use only the highest quality materials and ensure perfect craftsmanship in every piece.
                                </p>
                            </div>

                            <div className="relative">
                                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#f78c2a] text-white">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                                    🔥 Trendy, limited-edition collections
                                </p>
                                <p className="mt-2 ml-16 text-base text-gray-500">
                                    Stay ahead of the fashion curve with our exclusive, limited-run designs.
                                </p>
                            </div>

                            <div className="relative">
                                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#f78c2a] text-white">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                                    🚚 Fast delivery & smooth return policy
                                </p>
                                <p className="mt-2 ml-16 text-base text-gray-500">
                                    Shop with confidence knowing we prioritize your satisfaction with quick shipping and hassle-free
                                    returns.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-[#f78c2a]">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
                    <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                        <span className="block">We're not just a brand.</span>
                        <span className="block">We're a movement.</span>
                    </h2>
                    <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                        <div className="inline-flex rounded-md shadow">
                            <Link
                                to="/products"

                                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-[#f78c2a] bg-white hover:bg-gray-50"
                            >
                                Shop Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;