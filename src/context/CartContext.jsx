import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

const CartContext = createContext();

/* =========================
   CART PROVIDER
========================= */
export const CartProvider = ({ children }) => {

  // LOAD SAVED CART
  const [cartItems, setCartItems] = useState(() => {

    const savedCart = localStorage.getItem("cartItems");

    return savedCart ? JSON.parse(savedCart) : [];

  });

  /* =========================
     SAVE CART TO LOCALSTORAGE
  ========================= */
  useEffect(() => {

    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems)
    );

  }, [cartItems]);

  /* =========================
     NORMALIZE ITEM ID
  ========================= */
  const getItemId = (item) => {

    return String(item?._id || item?.id);

  };

  /* =========================
     ADD TO CART
  ========================= */
  const addToCart = (product) => {

    const productId = getItemId(product);

    setCartItems((prev) => {

      const existingItem = prev.find(
        (item) => getItemId(item) === productId
      );

      // IF ITEM EXISTS → INCREASE QUANTITY
      if (existingItem) {

        return prev.map((item) =>

          getItemId(item) === productId
            ? {
                ...item,
                quantity: item.quantity + 1
              }
            : item

        );

      }

      // ADD NEW ITEM
      return [
        ...prev,
        {
          ...product,
          quantity: 1
        }
      ];

    });

  };

  /* =========================
     REMOVE FROM CART
  ========================= */
  const removeFromCart = (id) => {

    const itemId = String(id);

    setCartItems((prev) =>

      prev.filter(
        (item) => getItemId(item) !== itemId
      )

    );

  };

  /* =========================
     INCREASE QUANTITY
  ========================= */
  const increaseQuantity = (id) => {

    const itemId = String(id);

    setCartItems((prev) =>

      prev.map((item) =>

        getItemId(item) === itemId
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item

      )

    );

  };

  /* =========================
     DECREASE QUANTITY
  ========================= */
  const decreaseQuantity = (id) => {

    const itemId = String(id);

    setCartItems((prev) =>

      prev.map((item) =>

        getItemId(item) === itemId &&
        item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1
            }
          : item

      )

    );

  };

  /* =========================
     CLEAR CART
  ========================= */
  const clearCart = () => {

    setCartItems([]);
    localStorage.removeItem("cartItems");

  };

  return (

    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart
      }}
    >

      {children}

    </CartContext.Provider>

  );

};

/* =========================
   CUSTOM HOOK
========================= */
export const useCart = () => {

  const context = useContext(CartContext);

  if (!context) {

    throw new Error(
      "useCart must be used inside CartProvider"
    );

  }

  return context;

};