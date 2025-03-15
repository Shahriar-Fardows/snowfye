import axios from "axios";
import { useEffect, useState } from "react";

const Bennar = () => {
    const [slider, setSlider] = useState([]);
    console.log(slider);

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
                    return (
                        <div key={slide._id} id={`slide${index + 1}`} className={`carousel-item relative w-full ${index === 0 ? 'active' : ''}`}>
                            <img
                                src={slide.image}  // Use dynamic image URL from API response
                                alt={slide.title}  // Optionally add alt text for accessibility
                                className="w-full"
                            />
                            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                                <a href={`#slide${index === 0 ? slider.length : index}`} className="btn btn-circle">❮</a>
                                <a href={`#slide${index === slider.length - 1 ? 1 : index + 2}`} className="btn btn-circle">❯</a>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
};

export default Bennar;
