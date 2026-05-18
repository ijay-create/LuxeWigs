import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
  FaSearch
} from "react-icons/fa";

import { getUserFromToken } from "../utils/auth";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

import SearchModal from "./SearchModal";
import CartDrawer from "./CartDrawer";

import "../styles/navbar.css";

const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const navigate = useNavigate();

  const { wishlistItems = [] } = useWishlist() || {};
  const { cartItems = [] } = useCart() || {};

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalItems = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item?.quantity || 0), 0);
  }, [cartItems]);

  // USE SINGLE SOURCE OF TRUTH (FIXED)
  const user = useMemo(() => getUserFromToken(), []);

  const isAdmin = user?.isAdmin === true;

  const handleProfileClick = () => {
    if (!user) return navigate("/login");

    if (isAdmin) return navigate("/admin/dashboard");

    return navigate("/profile");
  };

  return (
    <>
      <div className="topbar">
        <p>Free Nationwide Delivery On Orders Above ₦100,000</p>

        <div className="top-icons">
          <FaInstagram />
          <FaTiktok />
          <FaWhatsapp />
          <span>+234 800 000 0000</span>
        </div>
      </div>

      <nav className={`navbar ${scrolled ? "active-nav" : ""}`}>
        <div className="container nav-wrapper">

          <Link to="/" className="logo">LuxeWigs</Link>

          <ul className={`nav-links ${menuOpen ? "show-menu" : ""}`}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/bestsellers">Best Sellers</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>

            {isAdmin && (
              <li>
                <Link to="/admin/dashboard">Admin</Link>
              </li>
            )}
          </ul>

          <div className="nav-icons">

            <button className="icon-btn" onClick={() => setSearchOpen(true)}>
              <FaSearch />
            </button>

            <Link to="/wishlist" className="icon-btn wishlist-icon">
              <FaHeart />
              {wishlistItems.length > 0 && (
                <span className="wishlist-count">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <button className="icon-btn cart-icon" onClick={() => setCartOpen(true)}>
              <FaShoppingCart />
              {totalItems > 0 && (
                <span className="cart-count">
                  {totalItems}
                </span>
              )}
            </button>

            <button className="icon-btn" onClick={handleProfileClick}>
              <FaUser />
            </button>

          </div>

          <div className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>

        </div>
      </nav>

      <SearchModal isOpen={searchOpen} closeModal={() => setSearchOpen(false)} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Navbar;