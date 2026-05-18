import { useState, useEffect } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { searchProducts } from "../services/api";

import "../styles/searchmodal.css";

const SearchModal = ({ isOpen, closeModal }) => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const query = search.trim().toLowerCase();

  // LOAD PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        // empty search gets all products
        const data = await searchProducts("");

        // FIX RESPONSE SHAPE
        const products = Array.isArray(data)
          ? data
          : data.products || [];

        setAllProducts(products);

      } catch (error) {
        console.log("Search load error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchProducts();
    }
  }, [isOpen]);

  // FILTER PRODUCTS
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const filtered = allProducts.filter((item) => {
      const name = item.name?.toLowerCase() || "";
      const category = item.category?.toLowerCase() || "";
      const description = item.description?.toLowerCase() || "";

      return (
        name.includes(query) ||
        category.includes(query) ||
        description.includes(query)
      );
    });

    setResults(filtered);
  }, [query, allProducts]);

  // HIGHLIGHT TEXT
  const highlightText = (text, searchTerm) => {
    if (!searchTerm) return text;

    const regex = new RegExp(`(${searchTerm})`, "gi");

    return text.split(regex).map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} className="highlight">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  if (!isOpen) return null;

  return (
    <div className="search-overlay">
      <div className="search-modal">

        {/* TOP */}
        <div className="search-top">

          <div className="search-input-box">
            <FaSearch className="search-icon" />

            <input
              type="text"
              placeholder="Search wigs, styles, lace, colors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
          </div>

          <button
            className="close-search"
            onClick={closeModal}
          >
            <FaTimes />
          </button>

        </div>

        {/* RESULTS */}
        <div className="search-results">

          {loading && (
            <p className="no-results">
              Searching products...
            </p>
          )}

          {!loading && !query && (
            <div className="search-suggestions">

              <h4>Popular Searches</h4>

              <div className="suggestion-tags">
                <span onClick={() => setSearch("Bone Straight")}>
                  Bone Straight
                </span>

                <span onClick={() => setSearch("Curly Wig")}>
                  Curly Wig
                </span>

                <span onClick={() => setSearch("HD Lace")}>
                  HD Lace
                </span>

                <span onClick={() => setSearch("Deep Wave")}>
                  Deep Wave
                </span>
              </div>

            </div>
          )}

          {!loading && query && results.length === 0 && (
            <p className="no-results">
              No products found for "{search}"
            </p>
          )}

          {!loading &&
            results.map((item) => (
              <Link
                key={item._id || item.id}
                to={`/product/${item._id || item.id}`}
                className="search-item"
                onClick={closeModal}
              >

                <img
                  src={item.image}
                  alt={item.name}
                />

                <div className="search-info">

                  <h4>
                    {highlightText(item.name, query)}
                  </h4>

                  <p className="search-category">
                    {item.category}
                  </p>

                  <p className="search-price">
                    ₦
                    {Number(item.price).toLocaleString()}
                  </p>

                </div>

              </Link>
            ))}

        </div>

      </div>
    </div>
  );
};

export default SearchModal;