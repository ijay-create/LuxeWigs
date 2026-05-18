import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WigCard from "../components/WigCard";

import wig1 from "../assets/images/wig1.jpg";
import wig2 from "../assets/images/wig2.jpg";
import wig3 from "../assets/images/wig3.jpg";
import wig4 from "../assets/images/wig4.jpg";

import "../styles/bestsellers.css";

const BestSellers = () => {

  const bestSellerWigs = [

    {
      id: 1,
      name: "Luxury Bone Straight",
      price: "220,000",
      image: wig1
    },

    {
      id: 2,
      name: "HD Lace Frontal Wig",
      price: "180,000",
      image: wig2
    },

    {
      id: 3,
      name: "Deep Wave Wig",
      price: "250,000",
      image: wig3
    },

    {
      id: 4,
      name: "Luxury Curly Unit",
      price: "200,000",
      image: wig4
    }

  ];

  return (
    <>
      <Navbar />

      <section className="bestsellers-page">

        <div className="container">

          <div className="bestsellers-header">

            <h1>
              Best Selling Luxury Wigs
            </h1>

            <p>
              Explore our most loved premium
              luxury wigs trusted by thousands
              of women.
            </p>

          </div>

          <div className="bestsellers-grid">

            {bestSellerWigs.map((item) => (

              <WigCard
                key={item.id}
                item={item}
              />

            ))}

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
};

export default BestSellers;