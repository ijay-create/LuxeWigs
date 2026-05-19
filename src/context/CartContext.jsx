import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import "../styles/cartdrawer.css";

const CartDrawer = ({ isOpen, onClose }) => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity
  } = useCart();

  const navigate = useNavigate();

  // SAFE PRICE PARSER
  const getPrice = (price) =>
    Number(String(price || 0).replace(/,/g, ""));

  const total = cartItems.reduce(
    (acc, item) =>
      acc + getPrice(item.price) * item.quantity,
    0
  );

  return (
    <>
      {/* BACKDROP */}
      <div
        className={`cart-backdrop ${isOpen ? "show" : ""}`}
        onClick={onClose}
      />

      {/* DRAWER */}
      <div className={`cart-drawer ${isOpen ? "open" : ""}`}>

        {/* HEADER */}
        <div className="cart-header">
          <h2>Your Cart</h2>

          <button type="button" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        {/* BODY */}
        <div className="cart-body">

          {cartItems.length === 0 ? (
            <p className="empty">Your cart is empty</p>
          ) : (
            cartItems.map((item) => {

              // 🔥 FIX: ALWAYS NORMALIZE ID
              const itemId = String(item._id || item.id);

              return (
                <div className="cart-item" key={itemId}>

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <div className="cart-info">

                    <h4>{item.name}</h4>

                    <p>
                      ₦{getPrice(item.price).toLocaleString()}
                    </p>

                    {/* QUANTITY CONTROLS */}
                    <div className="qty-controls">

                      <button
                        type="button"
                        onClick={() => decreaseQuantity(itemId)}
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        type="button"
                        onClick={() => increaseQuantity(itemId)}
                      >
                        +
                      </button>

                    </div>

                  </div>

                  {/* REMOVE BUTTON (FIXED) */}
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromCart(itemId);
                    }}
                  >
                    Remove
                  </button>

                </div>
              );
            })
          )}

        </div>

        {/* FOOTER */}
        <div className="cart-footer">

          <h3>
            Total: ₦{total.toLocaleString()}
          </h3>

          <button
            className="checkout-btn"
            onClick={() => {
              onClose();
              navigate("/checkout");
            }}
          >
            Checkout
          </button>

        </div>

      </div>
    </>
  );
};

export default CartDrawer;