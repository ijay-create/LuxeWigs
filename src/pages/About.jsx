import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { motion } from "framer-motion";

import aboutImg from "../assets/images/about.jpg";

import "../styles/about.css";

const About = () => {
  return (
    <>
      <Navbar />

      <section className="about-page">

        <div className="container about-container">

          <motion.div
            className="about-image"
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >

            <img src={aboutImg} alt="About LuxeWigs" />

          </motion.div>

          <motion.div
            className="about-content"
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >

            <span className="about-tag">
              Our Luxury Story
            </span>

            <h1>
              Redefining Beauty With Premium Human Hair
            </h1>

            <p>
              LuxeWigs was created to help women feel
              confident, elegant, and beautiful through
              luxurious handcrafted wigs made with
              premium quality human hair.
            </p>

            <p>
              Our collections are designed for women who
              appreciate beauty, confidence, and timeless
              luxury.
            </p>

            <div className="about-stats">

              <div>
                <h2>10k+</h2>
                <p>Happy Clients</p>
              </div>

              <div>
                <h2>500+</h2>
                <p>Luxury Units</p>
              </div>

              <div>
                <h2>99%</h2>
                <p>Client Satisfaction</p>
              </div>

            </div>

          </motion.div>

        </div>

      </section>

      <Footer />
    </>
  );
};

export default About;