import { motion } from "framer-motion";
import WigCard from "./WigCard";

import wig1 from "../assets/images/wig1.jpg";
import wig2 from "../assets/images/wig2.jpg";
import wig3 from "../assets/images/wig3.jpg";
import wig4 from "../assets/images/wig4.jpg";

import "../styles/bestsellers.css";

const BestSellers = () => {

  const products = [
    {
      id: 5,
      name: "Brazilian Curly Wig",
      price: "270,000",
      image: wig1
    },
    {
      id: 6,
      name: "Silky Straight Unit",
      price: "300,000",
      image: wig2
    },
    {
      id: 7,
      name: "Luxury Blonde Wig",
      price: "350,000",
      image: wig3
    },
    {
      id: 8,
      name: "HD Frontal Deep Wave",
      price: "280,000",
      image: wig4
    }
  ];

  return (
    <section className="best-sellers">

      <div className="container">

        <motion.div
          className="best-header"
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >

          <h2 className="section-title">
            Best Sellers
          </h2>

          <p className="section-subtitle">
            Discover the most loved luxury wigs by our customers.
          </p>

        </motion.div>

        <div className="best-scroll">
          {products.map((item) => (
            <div className="best-item" key={item.id}>
              <WigCard item={item} />
            </div>
          ))}
        </div>

      </div>

    </section>
  );
};

export default BestSellers;