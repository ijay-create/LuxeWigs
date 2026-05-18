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

  const subtotal = cartItems.reduce(
    (acc, item) =>
      acc +
      parseInt(item.price.replace(/,/g, "")) *
      item.quantity,
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

                cartItems.map((item) => (
                  <div className="cart-item" key={item.id}>

                    <img src={item.image} alt={item.name} />

                    <div className="cart-details">
                      <h3>{item.name}</h3>
                      <p>₦{item.price}</p>
                    </div>

                    <div className="cart-quantity">

                      <button onClick={() => decreaseQuantity(item.id)}>
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button onClick={() => increaseQuantity(item.id)}>
                        +
                      </button>

                    </div>

                    <button
                      className="remove-btn"
                      onClick={() => {

                        removeFromCart(item.id);

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
                ))

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