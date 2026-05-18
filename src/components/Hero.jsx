import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import heroImg from "../assets/images/hero-wig.png";

import "../styles/hero.css";

const Hero = () => {
  return (
    <section className="hero">

      <div className="container hero-content">

        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >

          <span className="hero-tag">
            Premium Human Hair Collection
          </span>

          <h1>
            Luxury Wigs Delivered Straight To Your Doorstep
          </h1>

          <p>
            Discover flawless luxury wigs crafted with premium
            human hair designed for elegance, confidence,
            and beauty.
          </p>

          <div className="hero-buttons">

            <Link to="/shop" className="hero-btn">
              Shop Now
            </Link>

            <Link
              to="/contact"
              className="hero-btn outline-btn"
            >
              Book Consultation
            </Link>

          </div>

        </motion.div>

        <motion.div
          className="hero-image"
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >

          <img src={heroImg} alt="Luxury Wig" />

          <div className="floating-card card-one">
            Fast Delivery
          </div>

          <div className="floating-card card-two">
            HD Lace
          </div>

          <div className="floating-card card-three">
            Trusted By 10k+ Women
          </div>

        </motion.div>

      </div>

    </section>
  );
};

export default Hero;