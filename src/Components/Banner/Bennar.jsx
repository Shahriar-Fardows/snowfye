import axios from "axios";
import { useEffect, useState } from "react";

const Bennar = () => {
    const [slider, setSlider] = useState([]);
    
    useEffect(() => {
        axios.get("http://localhost:5000/slider")
            .then((response) => {
                setSlider(response.data);
            });
    }, []);

    return (
        <div className="carousel w-full">
            {
                slider.map((slide, index) => {  
                    // Calculate previous and next slide indices for continuous looping
                    const prevIndex = index === 0 ? slider.length - 1 : index - 1;
                    const nextIndex = index === slider.length - 1 ? 0 : index + 1;
                    
                    // Check if we have content to display in the overlay
                    const hasContent = slide.title || slide.subtitle || (slide.buttonText && slide.buttonLink);
                    
                    return (
                        <div key={slide._id} id={`slide${index}`} className="carousel-item relative w-full">
                            <img
                                src={slide.image || "/placeholder.svg"}
                                alt={slide.title || "Banner image"}
                                className="w-full h-auto md:h-[500px] lg:h-[70vh] object-cover lg:object-fill"
                            />
                            
                            {/* Text and Button Overlay - Only shown on larger screens and if content exists */}
                            {hasContent && (
                                <div className="absolute inset-0 hidden md:flex flex-col items-start justify-center px-10 md:px-48 bg-black/40">
                                    <div className="max-w-xl text-left">
                                        {slide.title && (
                                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
                                                {slide.title}
                                            </h2>
                                        )}
                                        
                                        {slide.subtitle && (
                                            <p className="text-xl md:text-2xl text-white mb-6">
                                                {slide.subtitle}
                                            </p>
                                        )}
                                        
                                        {slide.buttonText && slide.buttonLink && (
                                            <a 
                                                href={slide.buttonLink} 
                                                className="px-6 py-3 bg-[#f98c25] hover:bg-[#be9269] text-white font-medium rounded-md transition-colors"
                                            >
                                                {slide.buttonText}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}
                            
                            {/* Navigation Arrows */}
                            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                                <a href={`#slide${prevIndex}`} className="btn btn-circle">❮</a>
                                <a href={`#slide${nextIndex}`} className="btn btn-circle">❯</a>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
};

export default Bennar;