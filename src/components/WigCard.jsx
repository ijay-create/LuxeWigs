import { motion } from "framer-motion";
import { FaHeart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useRef } from "react";
import { flyToCart } from "../utils/flyToCart";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const WigCard = ({ item }) => {

  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const imgRef = useRef(null);

  const handleWishlist = () => {
    addToWishlist(item);
    toast.success("Added to wishlist ❤️");
  };

  const handleCart = () => {
    addToCart(item);
    toast.success("Added to cart 🛒");

    const cartIcon = document.querySelector(".cart-icon");
    flyToCart(imgRef.current, cartIcon);
  };

  return (
    <motion.div
      className="wig-card"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
    >

      <div className="wig-image">

        <img
          ref={imgRef}
          src={item.image}
          alt={item.name}
        />

        <button
          className="wishlist-btn"
          onClick={handleWishlist}
        >
          <FaHeart />
        </button>

      </div>

      <div className="wig-content">

        <div className="wig-rating">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </div>

        <Link to={`/product/${item.id}`}>
          <h3>{item.name}</h3>
        </Link>

        <p className="wig-price">
          ₦{item.price}
        </p>

        {/* SINGLE CLEAN CART BUTTON */}
        <button
          className="cart-btn"
          onClick={handleCart}
        >
          Add To Cart
        </button>

      </div>

    </motion.div>
  );
};

export default WigCard;