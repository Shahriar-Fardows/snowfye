import {  ShoppingBag, User  } from "lucide-react"
import { Link } from "react-router-dom";

const CartLogButton = () => {
    return (
        <div>
          <div className="flex items-center gap-7">
              <Link
                to='/login'
                className="text-[#f98c25] hover:text-[#e07b14] transition-colors"
              >
                <User  className="h-6 w-6 mr-2" />
              </Link>
              <Link
                to='/cart'
                href="#"
                className="text-[#f98c25] hover:text-[#e07b14] transition-colors"
              >
                <ShoppingBag className="h-6 w-6 mr-2" />
              </Link>
            </div>  
        </div>
    );
};

export default CartLogButton;