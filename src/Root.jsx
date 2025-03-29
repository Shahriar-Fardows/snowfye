import { Outlet } from "react-router-dom";
import Navbar from "./Shared/Navbar/Navbar";
import Footer from "./Shared/Footer/Footer";

const Root = () => {
    return (
        <div className="relative  flex flex-col min-h-screen">
      <div className="sticky top-0 left-0 right-0 z-10">
      <Navbar />
      </div>
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
    );
};

export default Root;