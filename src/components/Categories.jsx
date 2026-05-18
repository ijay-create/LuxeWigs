import { motion } from "framer-motion";

import cat1 from "../assets/images/cat1.jpg";
import cat2 from "../assets/images/cat2.jpg";
import cat3 from "../assets/images/cat3.jpg";
import cat4 from "../assets/images/cat4.jpg";
import cat5 from "../assets/images/cat5.jpg";
import cat6 from "../assets/images/cat6.jpg";

import "../styles/categories.css";

const Categories = () => {

  const categories = [
    {
      title: "Bone Straight",
      image: cat1
    },
    {
      title: "Curly Wigs",
      image: cat2
    },
    {
      title: "Frontal Wigs",
      image: cat3
    },
    {
      title: "Closure Wigs",
      image: cat4
    },
    {
      title: "Colored Wigs",
      image: cat5
    },
    {
      title: "Pixie Cuts",
      image: cat6
    }
  ];

  return (
    <section className="categories">

      <div className="container">

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="categories-header"
        >

          <h2 className="section-title">
            Shop By Categories
          </h2>

          <p className="section-subtitle">
            Find the perfect style tailored to your beauty.
          </p>

        </motion.div>

        <div className="categories-grid">

          {categories.map((item, index) => (
            <motion.div
              className="category-card"
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >

              <img src={item.image} alt={item.title} />

              <div className="category-overlay">
                <h3>{item.title}</h3>
              </div>

            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default Categories;