import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import WigCard from "./WigCard";
import { getProducts } from "../services/api";

import "../styles/featured.css";

const FeaturedWigs = () => {
  const [wigs, setWigs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWigs = async () => {
      try {
        const data = await getProducts();
        setWigs(data.slice(0, 8)); // top 8 featured
      } catch (err) {
        console.error("Failed to load wigs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWigs();
  }, []);

  return (
    <section className="featured">
      <div className="container">

        <motion.div
          className="featured-header"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">
            Featured Luxury Wigs
          </h2>

          <p className="section-subtitle">
            Explore our premium collection
          </p>
        </motion.div>

        {loading ? (
          <p>Loading featured wigs...</p>
        ) : (
          <div className="featured-grid">
            {wigs.map((item) => (
              <WigCard key={item._id} item={item} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default FeaturedWigs;