import { motion } from "framer-motion";

import "../styles/newsletter.css";

const Newsletter = () => {
  return (
    <section className="newsletter">

      <div className="container">

        <motion.div
          className="newsletter-content"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >

          <div className="newsletter-text">

            <span>Luxury Hair Updates</span>

            <h2>
              Join Our Beauty Community
            </h2>

            <p>
              Subscribe for exclusive wig drops, beauty tips,
              discounts, and premium hair updates.
            </p>

          </div>

          <form className="newsletter-form">

            <input
              type="email"
              placeholder="Enter your email address"
            />

            <button type="submit">
              Subscribe
            </button>

          </form>

        </motion.div>

      </div>

    </section>
  );
};

export default Newsletter;