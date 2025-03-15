import AdSection from "../Components/AdSection/AdSection";
import FeaturedProductsGrid from "../Components/AllProducts/FeaturedProductsGrid";
import Products from "../Components/AllProducts/Products";
import Bennar from "../Components/Banner/Bennar";
import Testimonials from "../Components/Testimonials/TestimonialCarousel";

const Home = () => {
    return (
        <div className=""> 
          <Bennar/>
          <div>
            <Products title="Latest Fashion Trends" />
            <AdSection/>
            <FeaturedProductsGrid/>
            <Testimonials/>
            <Products title="Style Picks for You"/>
          </div>
        </div>
    );
};

export default Home;