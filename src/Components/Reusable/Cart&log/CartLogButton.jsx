import {  ShoppingBag, User  } from "lucide-react"

const CartLogButton = () => {
    return (
        <div>
          <div className="flex items-center gap-7">
              <a
                href="#"
                className="text-[#f98c25] hover:text-[#e07b14] transition-colors"
              >
                <User  className="h-6 w-6 mr-2" />
              </a>
              <a
                href="#"
                className="text-[#f98c25] hover:text-[#e07b14] transition-colors"
              >
                <ShoppingBag className="h-6 w-6 mr-2" />
              </a>
            </div>  
        </div>
    );
};

export default CartLogButton;