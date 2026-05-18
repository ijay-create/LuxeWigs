import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });

  const [lastRemoved, setLastRemoved] = useState(null);

  // SAVE TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // ADD TO CART
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // INCREASE QTY
  const increaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // DECREASE QTY
  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // REMOVE ITEM (with undo support)
  const removeFromCart = (id) => {
    const item = cartItems.find((i) => i.id === id);

    setCartItems((prev) => prev.filter((i) => i.id !== id));
    setLastRemoved(item);
  };

  // UNDO REMOVE
  const undoRemove = () => {
    if (!lastRemoved) return;

    setCartItems((prev) => {
      const exists = prev.find((i) => i.id === lastRemoved.id);

      if (exists) {
        return prev.map((item) =>
          item.id === lastRemoved.id
            ? {
                ...item,
                quantity: item.quantity + lastRemoved.quantity
              }
            : item
        );
      }

      return [...prev, lastRemoved];
    });

    setLastRemoved(null);
  };

  // CLEAR CART
  const clearCart = () => {
    setCartItems([]);
    setLastRemoved(null);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        undoRemove,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);