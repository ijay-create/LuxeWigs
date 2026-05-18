import {
  useParams
} from "react-router-dom";

import {
  useCart
} from "../context/CartContext";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import wig1 from "../assets/images/wig1.jpg";
import wig2 from "../assets/images/wig2.jpg";
import wig3 from "../assets/images/wig3.jpg";
import wig4 from "../assets/images/wig4.jpg";

import "../styles/product.css";

const ProductDetails = () => {

  const { id } = useParams();

  const { addToCart } = useCart();

  const products = [
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

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return <h1>Product Not Found</h1>;
  }

  return (
    <>
      <Navbar />

      <section className="product-page">

        <div className="container product-layout">

          <div className="product-gallery">

            <img
              src={product.image}
              alt={product.name}
              className="main-product-image"
            />

          </div>

          <div className="product-content">

            <span className="product-tag">
              Premium Human Hair
            </span>

            <h1>{product.name}</h1>

            <h2>₦{product.price}</h2>

            <p>
              Experience luxury with our premium
              handcrafted wig collection.
            </p>

            <div className="product-buttons">

              <button
                onClick={() =>
                  addToCart(product)
                }
              >
                Add To Cart
              </button>

            </div>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
};

export default ProductDetails;