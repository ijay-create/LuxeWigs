import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

import "../styles/testimonials.css";

const Testimonials = () => {

  const reviews = [
    {
      initials: "S",
      name: "Sophia",
      review:
        "The quality is absolutely luxurious. Everyone thought it was my natural hair.",
    },
    {
      initials: "A",
      name: "Amanda",
      review:
        "Fast delivery and premium customer service. I’m obsessed with my wig.",
    },
    {
      initials: "V",
      name: "Vanessa",
      review:
        "Best wig brand I’ve purchased from. Soft, beautiful and long lasting.",
    },
  ];

  return (
    <section className="testimonials">

      <div className="container">

        <motion.div
          className="testimonial-header"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >

          <h2 className="section-title">
            What Our Clients Say
          </h2>

        </motion.div>

        <div className="testimonial-grid">

          {reviews.map((item, index) => (
            <motion.div
              className="testimonial-card"
              key={index}
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >

              <div className="testimonial-avatar">
                {item.initials}
              </div>

              <div className="testimonial-stars">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>

              <p>{item.review}</p>

              <h4>{item.name}</h4>

            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default Testimonials;