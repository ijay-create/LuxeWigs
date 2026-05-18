import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturedWigs from "../components/FeaturedWigs";
import Categories from "../components/Categories";
import BestSellers from "../components/BestSellers";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedWigs />
      <Categories />
      <BestSellers />
      <Testimonials />
      <Newsletter />
      <Footer />
    </>
  );
};

export default Home;