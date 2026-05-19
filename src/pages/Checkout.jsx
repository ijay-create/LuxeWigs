import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { launchConfetti } from "../utils/confetti";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { payWithPaystack } from "../utils/paystack";

import "../styles/checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const total = cartItems.reduce((acc, item) => {
    return (
      acc +
      Number(String(item.price).replace(/,/g, "")) * item.quantity
    );
  }, 0);

  const handleCheckout = () => {
    if (!name || !email || !phone) {
      alert("Please fill all billing details");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    setLoading(true);

    payWithPaystack({
      email,
      amount: total,

      onSuccess: async (response) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/orders`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },

              // ✅ FIX: cleaned payload (mobile-safe)
              body: JSON.stringify({
                userEmail: email,
                customerName: name,
                phone,

                items: cartItems.map((item) => ({
                  id: item.id || item._id,
                  name: item.name,
                  price: Number(String(item.price).replace(/,/g, "")),
                  quantity: item.quantity,
                })),

                totalAmount: total,
                reference: response.reference,
              }),
            }
          );

          let data = {};
          try {
            data = await res.json();
          } catch (e) {
            data = {};
          }

          if (!res.ok) {
            console.log("ORDER ERROR:", data);
            throw new Error(data.message || "Order save failed");
          }

          // 🎉 SUCCESS EFFECTS
          launchConfetti();

          clearCart();
          localStorage.removeItem("cartItems");

          setTimeout(() => {
            navigate("/success");
          }, 1200);
        } catch (error) {
          console.log("CHECKOUT ERROR:", error);
          alert("Payment successful but order failed to save");
        } finally {
          setLoading(false);
        }
      },

      onClose: () => {
        setLoading(false);
      },
    });
  };

  return (
    <>
      <Navbar />

      <section className="checkout-page">
        <div className="container">
          <h1 className="checkout-title">Secure Checkout</h1>

          <div className="checkout-grid">
            <div className="checkout-form">
              <h3>Billing Details</h3>

              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="checkout-summary">
              <h3>Order Summary</h3>

              {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                cartItems.map((item) => (
                  <div className="summary-item" key={item.id || item._id}>
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>
                      ₦
                      {(
                        Number(String(item.price).replace(/,/g, "")) *
                        item.quantity
                      ).toLocaleString()}
                    </span>
                  </div>
                ))
              )}

              <hr />

              <h2>Total: ₦{total.toLocaleString()}</h2>

              <button
                className="pay-btn"
                onClick={handleCheckout}
                disabled={loading}
              >
                {loading ? "Opening Payment..." : "Pay Now"}
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Checkout;