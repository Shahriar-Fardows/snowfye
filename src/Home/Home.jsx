import AdSection from "../Components/AdSection/AdSection";
import FeaturedProductsGrid from "../Components/AllProducts/FeaturedProductsGrid";
import Products from "../Components/AllProducts/Products";
import Bennar from "../Components/Banner/Bennar";

const Home = () => {
    return (
        <div className=""> 
          <Bennar/>
          <div>
            <Products/>
            <AdSection/>
            <FeaturedProductsGrid/>
          </div>
        </div>
    );
};

export default Home;