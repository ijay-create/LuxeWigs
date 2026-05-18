import { useMemo, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WigCard from "../components/WigCard";

import wig1 from "../assets/images/wig1.jpg";
import wig2 from "../assets/images/wig2.jpg";
import wig3 from "../assets/images/wig3.jpg";
import wig4 from "../assets/images/wig4.jpg";

import "../styles/shop.css";

const Shop = () => {

  // =========================
  // STATES
  // =========================
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("");

  // =========================
  // PRODUCTS
  // =========================
  const products = [
    {
      id: 1,
      name: "Luxury Bone Straight",
      price: 220000,
      image: wig1,
      category: "Bone Straight",
      description: "Premium silky straight luxury wig"
    },
    {
      id: 2,
      name: "Curly HD Lace Wig",
      price: 300000,
      image: wig2,
      category: "Curly Wigs",
      description: "Luxury curly lace frontal wig"
    },
    {
      id: 3,
      name: "Deep Wave Wig",
      price: 280000,
      image: wig3,
      category: "Frontal Wigs",
      description: "Soft deep wave premium wig"
    },
    {
      id: 4,
      name: "Luxury Blonde Wig",
      price: 350000,
      image: wig4,
      category: "Colored Wigs",
      description: "Luxury blonde colored wig"
    }
  ];

  // =========================
  // CATEGORIES
  // =========================
  const categories = [
    "All",
    "Bone Straight",
    "Curly Wigs",
    "Frontal Wigs",
    "Pixie Cuts",
    "Colored Wigs"
  ];

  // =========================
  // LIVE FILTERING + SORTING
  // =========================
  const filteredProducts = useMemo(() => {

    let filtered = [...products];

    // CATEGORY FILTER
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (item) => item.category === selectedCategory
      );
    }

    // SEARCH FILTER
    if (search.trim()) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // SORTING
    switch (sortBy) {

      case "low":
        filtered.sort((a, b) => a.price - b.price);
        break;

      case "high":
        filtered.sort((a, b) => b.price - a.price);
        break;

      case "az":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case "za":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;

      default:
        break;
    }

    return filtered;

  }, [products, search, selectedCategory, sortBy]);

  // =========================
  // CLEAR FILTERS
  // =========================
  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("All");
    setSortBy("");
  };

  return (
    <>
      <Navbar />

      <section className="shop-page">

        <div className="container">

          {/* HEADER */}
          <div className="shop-header">

            <h1>Luxury Wig Collection</h1>

            <p>
              Discover premium luxury wigs crafted for elegance,
              confidence and beauty.
            </p>

          </div>

          {/* CONTROLS */}
          <div className="shop-topbar">

            {/* SEARCH */}
            <div className="shop-search">

              <input
                type="text"
                placeholder="Search wigs, categories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </div>

            {/* SORT */}
            <div className="shop-actions">

              <select
                className="shop-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="">Sort By</option>

                <option value="low">
                  Price: Low To High
                </option>

                <option value="high">
                  Price: High To Low
                </option>

                <option value="az">
                  A - Z
                </option>

                <option value="za">
                  Z - A
                </option>

              </select>

              <button
                className="clear-filters-btn"
                onClick={clearFilters}
              >
                Clear Filters
              </button>

            </div>

          </div>

          {/* SHOP LAYOUT */}
          <div className="shop-layout">

            {/* SIDEBAR */}
            <aside className="shop-sidebar">

              <div className="shop-sidebar-section">

                <h3>Categories</h3>

                <div className="shop-categories">

                  {categories.map((category) => (

                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={
                        selectedCategory === category
                          ? "active-category"
                          : ""
                      }
                    >
                      {category}
                    </button>

                  ))}

                </div>

              </div>

            </aside>

            {/* PRODUCTS */}
            <div className="shop-products">

              {/* RESULTS */}
              <div className="shop-results">

                <div>

                  <h2>{selectedCategory}</h2>

                  <p>
                    Showing {filteredProducts.length} product(s)
                  </p>

                </div>

              </div>

              {/* EMPTY */}
              {filteredProducts.length === 0 ? (

                <div className="empty-products">

                  <h3>No wigs found</h3>

                  <p>
                    Try another category or search keyword.
                  </p>

                </div>

              ) : (

                <div className="shop-grid">

                  {filteredProducts.map((item) => (

                    <WigCard
                      key={item.id}
                      item={{
                        ...item,
                        price: item.price.toLocaleString()
                      }}
                    />

                  ))}

                </div>

              )}

            </div>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
};

export default Shop;