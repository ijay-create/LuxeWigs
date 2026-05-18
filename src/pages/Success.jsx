import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../styles/success.css";

const Success = () => {
  return (
    <>
      <Navbar />

      <section className="success-page">

        <div className="container">

          <h1>🎉 Payment Successful</h1>

          <p>
            Thank you for your purchase.
            Your order is being processed.
          </p>

          <Link to="/shop">
            <button>
              Continue Shopping
            </button>
          </Link>

        </div>

      </section>

      <Footer />
    </>
  );
};

export default Success;