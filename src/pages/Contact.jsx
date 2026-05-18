import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { motion } from "framer-motion";

import {
  FaWhatsapp,
  FaEnvelope,
  FaPhoneAlt
} from "react-icons/fa";

import "../styles/contact.css";

const Contact = () => {
  return (
    <>
      <Navbar />

      <section className="contact-page">

        <div className="container">

          <motion.div
            className="contact-header"
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >

            <h1>Contact Us</h1>

            <p>
              We'd love to hear from you. Reach out for
              consultations, inquiries, or support.
            </p>

          </motion.div>

          <div className="contact-layout">

            <motion.form
              className="contact-form"
              initial={{ opacity: 0, x: -70 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >

              <input type="text" placeholder="Full Name" />
              <input type="email" placeholder="Email Address" />
              <input type="text" placeholder="Phone Number" />

              <textarea
                rows="7"
                placeholder="Your Message"
              ></textarea>

              <button type="submit">
                Send Message
              </button>

            </motion.form>

            <motion.div
              className="contact-info"
              initial={{ opacity: 0, x: 70 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >

              <div className="info-card">
                <FaWhatsapp />
                <div>
                  <h3>WhatsApp</h3>
                  <p>+234 800 000 0000</p>
                </div>
              </div>

              <div className="info-card">
                <FaEnvelope />
                <div>
                  <h3>Email</h3>
                  <p>support@luxewigs.com</p>
                </div>
              </div>

              <div className="info-card">
                <FaPhoneAlt />
                <div>
                  <h3>Call Us</h3>
                  <p>+234 800 000 0000</p>
                </div>
              </div>

            </motion.div>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
};

export default Contact;