import {
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaCcVisa,
  FaCcMastercard,
  FaPaypal
} from "react-icons/fa";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <motion.div
        className="footer-wrapper"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="footer-watermark">LuxeWigs</div>

        <div className="container footer-grid">

          {/* BRAND */}
          <div className="footer-brand">
            <h2>LuxeWigs</h2>
            <p>
              Delivering premium luxury wigs crafted for elegance,
              confidence and beauty.
            </p>

            {/* SOCIALS */}
            <div className="footer-socials">
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <FaInstagram />
              </a>

              <a href="https://tiktok.com" target="_blank" rel="noreferrer">
                <FaTiktok />
              </a>

              <a
                href="https://wa.me/2348000000000"
                target="_blank"
                rel="noreferrer"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/shop">Shop</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/wishlist">Wishlist</Link></li>
            </ul>
          </div>

          {/* CATEGORIES */}
          <div className="footer-links">
            <h3>Categories</h3>
            <ul>
              <li>Bone Straight</li>
              <li>Curly Wigs</li>
              <li>Pixie Cuts</li>
              <li>Closure Wigs</li>
              <li>Colored Wigs</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="footer-contact">
            <h3>Contact</h3>
            <p>support@luxewigs.com</p>
            <p>+234 800 000 0000</p>
            <p>Lagos, Nigeria</p>

            <div className="payment-icons">
              <FaCcVisa />
              <FaCcMastercard />
              <FaPaypal />
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          <p>© 2026 LuxeWigs. All Rights Reserved.</p>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;