import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/cart.css";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    undoRemove
  } = useCart();

  // 🔥 SAFE PRICE PARSER (FIXED BUG)
  const getPrice = (price) =>
    Number(String(price || 0).replace(/,/g, ""));

  const subtotal = cartItems.reduce(
    (acc, item) =>
      acc + getPrice(item.price) * (item.quantity || 1),
    0
  );

  return (
    <>
      <Navbar />

      <section className="cart-page">
        <div className="container">

          <h1>Your Cart</h1>

          <div className="cart-layout">

            {/* CART ITEMS */}
            <div className="cart-items">

              {cartItems.length === 0 ? (
                <h2>Your cart is empty.</h2>
              ) : (

                cartItems.map((item) => {

                  // 🔥 FIX: SINGLE SOURCE OF TRUTH FOR ID
                  const itemId = String(item._id || item.id);

                  return (
                    <div className="cart-item" key={itemId}>

                      <img src={item.image} alt={item.name} />

                      <div className="cart-details">
                        <h3>{item.name}</h3>

                        <p>
                          ₦{getPrice(item.price).toLocaleString()}
                        </p>
                      </div>

                      <div className="cart-quantity">

                        <button onClick={() => decreaseQuantity(itemId)}>
                          -
                        </button>

                        <span>{item.quantity}</span>

                        <button onClick={() => increaseQuantity(itemId)}>
                          +
                        </button>

                      </div>

                      <button
                        className="remove-btn"
                        onClick={() => {

                          removeFromCart(itemId);

                          toast((t) => (
                            <div>
                              <p>Item removed from cart</p>

                              <button
                                onClick={() => {
                                  undoRemove();
                                  toast.dismiss(t.id);
                                  toast.success("Item restored 🛒");
                                }}
                                style={{
                                  marginTop: "5px",
                                  background: "#000",
                                  color: "#fff",
                                  padding: "6px 12px",
                                  borderRadius: "6px",
                                  border: "none",
                                  cursor: "pointer"
                                }}
                              >
                                Undo
                              </button>
                            </div>
                          ), {
                            duration: 5000
                          });

                        }}
                      >
                        Remove
                      </button>

                    </div>
                  );
                })

              )}

            </div>

            {/* SUMMARY */}
            <div className="cart-summary">

              <h2>Cart Summary</h2>

              <div className="summary-row total">
                <span>Total</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>

              <Link to="/checkout">
                <button>
                  Proceed To Checkout
                </button>
              </Link>

            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Cart;