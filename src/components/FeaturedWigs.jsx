import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import WigCard from "./WigCard";
import { getProducts } from "../services/api";

import "../styles/featured.css";

const FeaturedWigs = () => {
  const [wigs, setWigs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const products = await getProducts(); // ✅ already array

        setWigs(products.slice(0, 8));
      } catch (err) {
        console.error(err);
        setWigs([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <section className="featured">
      <div className="container">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2>Featured Luxury Wigs</h2>
          <p>Explore our premium collection</p>
        </motion.div>

        {loading ? (
          <p>Loading...</p>
        ) : wigs.length === 0 ? (
          <p>No featured products available.</p>
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