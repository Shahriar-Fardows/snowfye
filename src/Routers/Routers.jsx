import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import ErrorPage from "../Error/ErrorPage";
import Home from "../Home/Home";
import LoadingSpinner from "../Shared/LoadingSpinner";
import Login from "../Auth/Login/Login";
import Register from "../Auth/Register/Register";
import AllProducts from "../page/AllProducts/AllProducts";
import PrivetRoutes from "./PrivetRoutes";
import Product from "../Components/AllProducts/Product";
import Cart from "../page/Cart/Cart";
import Checkout from "../page/CheckOut/CheckOut";
import About from "../page/About/About";
import Contact from "../page/Contact/Contact";

// Define the wait function
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Dynamically import the Root component
const Root = lazy(() => wait(3000).then(() => import("../Root")));

const Routers = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Root />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/about",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: "/",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/all-products",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PrivetRoutes>
              <AllProducts />
            </PrivetRoutes>
          </Suspense>
        ),
      },
      {
        path: "/products/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PrivetRoutes>
              <Product />
            </PrivetRoutes>
          </Suspense>
        ),
        loader: ({params})=> fetch(`https://snowfye-server-production.up.railway.app/products/${params.id}`)
        
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PrivetRoutes>
              <Cart />
            </PrivetRoutes>
          </Suspense>
        ),
      
        
      },
      {
        path: "/check-out",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PrivetRoutes>
              <Checkout />
            </PrivetRoutes>
          </Suspense>
        ),
      },

    ],
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Register />
      </Suspense>
    ),
  },
]);

export default Routers;
