import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WigCard from "../components/WigCard";

import { useWishlist } from "../context/WishlistContext";

import "../styles/wishlist.css";

const Wishlist = () => {

  // ✅ FIX: correct naming + safety fallback
  const {
    wishlistItems = [],
    removeFromWishlist
  } = useWishlist() || {};

  return (
    <>
      <Navbar />

      <section className="wishlist-page">

        <div className="container">

          <div className="wishlist-header">
            <h1>Your Wishlist</h1>
            <p>Save your favorite luxury wigs for later.</p>
          </div>

          {wishlistItems.length === 0 ? (
            <p className="empty">
              Your wishlist is empty 💔
            </p>
          ) : (
            <div className="wishlist-grid">

              {wishlistItems.map((item) => (
                <div key={item._id || item.id}>

                  <WigCard item={item} />

                  <button
                    className="remove-btn"
                    onClick={() =>
                      removeFromWishlist(item._id || item.id)
                    }
                  >
                    Remove
                  </button>

                </div>
              ))}

            </div>
          )}

        </div>

      </section>

      <Footer />
    </>
  );
};

export default Wishlist;