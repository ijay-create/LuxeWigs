import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {

  // ✅ ALWAYS SAFE ARRAY
  const [wishlistItems, setWishlistItems] = useState([]);

  // LOAD FROM LOCAL STORAGE ONCE
  useEffect(() => {

    const stored = localStorage.getItem("wishlistItems");

    if (stored) {
      try {
        setWishlistItems(JSON.parse(stored));
      } catch (err) {
        console.error("Wishlist parse error:", err);
        setWishlistItems([]);
      }
    }

  }, []);

  // SAVE TO LOCAL STORAGE
  useEffect(() => {

    localStorage.setItem(
      "wishlistItems",
      JSON.stringify(wishlistItems)
    );

  }, [wishlistItems]);

  // ADD
  const addToWishlist = (item) => {

    const id = item._id || item.id;

    const exists = wishlistItems.find(
      (x) => (x._id || x.id) === id
    );

    if (exists) return;

    setWishlistItems((prev) => [...prev, item]);

  };

  // REMOVE
  const removeFromWishlist = (id) => {

    setWishlistItems((prev) =>
      prev.filter(
        (item) =>
          (item._id || item.id) !== id
      )
    );

  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );

};

// SAFE HOOK
export const useWishlist = () => {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }

  return context;
};