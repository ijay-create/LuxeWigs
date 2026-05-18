import { useEffect, useState } from "react";
import Topbar from "../components/Topbar";

import {
  fetchProducts,
  createProduct,
  deleteProduct
} from "../../services/api";

import "../../styles/admin.css";

const Products = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // NEW: separate file state
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
    description: "",
    stock: ""
  });

  const token = localStorage.getItem("token");

  // =========================
  // LOAD PRODUCTS
  // =========================
  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchProducts();
      setProducts(data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // =========================
  // UPLOAD IMAGE TO CLOUDINARY
  // =========================
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("http://localhost:5000/api/upload", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    return data.url;
  };

  // =========================
  // CREATE PRODUCT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitting) return;
    setSubmitting(true);

    try {
      let imageUrl = formData.image;

      // IF USER UPLOADED FILE
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      await createProduct(
        {
          ...formData,
          image: imageUrl
        },
        token
      );

      // RESET
      setFormData({
        name: "",
        price: "",
        image: "",
        category: "",
        description: "",
        stock: ""
      });

      setImageFile(null);

      await loadProducts();

    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  // =========================
  // DELETE PRODUCT
  // =========================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await deleteProduct(id, token);
      setProducts((prev) => prev.filter(p => p._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="admin-layout">

      <main className="admin-main">

        <Topbar />

        <div className="admin-page-content">

          <h2>Products Management</h2>

          {/* FORM */}
          <form className="product-form" onSubmit={handleSubmit}>

            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
            />

            {/* NEW: FILE UPLOAD */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              required
            />

            {/* optional fallback URL */}
            <input
              type="text"
              name="image"
              placeholder="Or paste image URL"
              value={formData.image}
              onChange={handleChange}
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
            />

            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={formData.stock}
              onChange={handleChange}
            />

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
            />

            <button type="submit" disabled={submitting}>
              {submitting ? "Uploading..." : "Add Product"}
            </button>

          </form>

          {/* LOADING */}
          {loading && <p>Loading products...</p>}

          {/* EMPTY */}
          {!loading && products.length === 0 && (
            <p>No products yet. Add your first product 👇</p>
          )}

          {/* GRID */}
          <div className="admin-products-grid">

            {products.map((item) => (
              <div className="admin-product-card" key={item._id}>

                <img
                  src={item.image}
                  alt={item.name}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300";
                  }}
                />

                <h3>{item.name}</h3>

                <p>₦{Number(item.price).toLocaleString()}</p>

                {item.stock !== undefined && (
                  <small style={{ color: item.stock < 5 ? "red" : "green" }}>
                    Stock: {item.stock}
                  </small>
                )}

                <div className="admin-product-actions">

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))}

          </div>

        </div>

      </main>

    </div>
  );
};

export default Products;