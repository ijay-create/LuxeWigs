import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import BestSellers from "./pages/BestSellers";
import ScrollToTop from "./components/ScrollToTop";
import NotFound from "./pages/NotFound";

// ADMIN
import AdminLayout from "./pages/admin/AdminLayout";
import ProtectedAdmin from "./routes/ProtectedAdmin";
import ProtectedUser from "./routes/ProtectedUser";

import Dashboard from "./admin/pages/Dashboard";
import Products from "./admin/pages/Products";
import Orders from "./admin/pages/Orders";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/bestsellers" element={<BestSellers />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />

        {/* USER PROFILE (PROTECTED) */}
        <Route
          path="/profile"
          element={
            <ProtectedUser>
              <Profile />
            </ProtectedUser>
          }
        />

        {/* ADMIN ROUTES (CLEAN + NESTED + PROTECTED) */}
        <Route
          path="/admin"
          element={
            <ProtectedAdmin>
              <AdminLayout />
            </ProtectedAdmin>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;