import { useEffect, useState } from "react";
import Topbar from "../components/Topbar";

import {
  fetchProducts,
  createProduct,
  deleteProduct,
  uploadImage
} from "../../services/api";

import "../../styles/admin.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
    description: "",
    stock: ""
  });

  // =========================
  // LOAD PRODUCTS
  // =========================
  const loadProducts = async () => {
    setLoading(true);

    try {
      const data = await fetchProducts();

      // ✅ fetchProducts already returns array
      setProducts(data || []);

    } catch (err) {
      console.error("Load products error:", err);
      setProducts([]);
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
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
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

      // ✅ UPLOAD IMAGE
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      // ✅ VALIDATION
      if (!imageUrl) {
        alert("Image upload failed");
        return;
      }

      // ✅ CREATE PRODUCT
      await createProduct({
        name: formData.name,
        price: Number(formData.price),
        image: imageUrl,
        category: formData.category,
        description: formData.description,
        stock: Number(formData.stock)
      });

      // ✅ RESET FORM
      setFormData({
        name: "",
        price: "",
        image: "",
        category: "",
        description: "",
        stock: ""
      });

      setImageFile(null);

      // ✅ RELOAD PRODUCTS
      await loadProducts();

      alert("Product created successfully");

    } catch (err) {
      console.error("Create product error:", err);
      alert(err.message || "Failed to create product");
    } finally {
      setSubmitting(false);
    }
  };

  // =========================
  // DELETE PRODUCT
  // =========================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);

      setProducts((prev) =>
        prev.filter((p) => p._id !== id)
      );

    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="admin-layout">
      <main className="admin-main">

        <Topbar />

        <div className="admin-page-content">

          <h2>Products Management</h2>

          {/* =========================
              PRODUCT FORM
          ========================= */}
          <form
            className="product-form"
            onSubmit={handleSubmit}
          >

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

            {/* IMAGE FILE */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImageFile(e.target.files[0])
              }
            />

            {/* IMAGE URL */}
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

            <button
              type="submit"
              disabled={submitting}
            >
              {submitting
                ? "Uploading..."
                : "Add Product"}
            </button>

          </form>

          {/* LOADING */}
          {loading && (
            <p>Loading products...</p>
          )}

          {/* EMPTY STATE */}
          {!loading && products.length === 0 && (
            <p>
              No products yet. Add your first
              product 👇
            </p>
          )}

          {/* PRODUCTS GRID */}
          <div className="admin-products-grid">

            {products.map((item) => (
              <div
                className="admin-product-card"
                key={item._id}
              >

                <img
                  src={item.image}
                  alt={item.name}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300";
                  }}
                />

                <h3>{item.name}</h3>

                <p>
                  ₦
                  {Number(
                    item.price
                  ).toLocaleString()}
                </p>

                {item.stock !== undefined && (
                  <small
                    style={{
                      color:
                        item.stock < 5
                          ? "red"
                          : "green"
                    }}
                  >
                    Stock: {item.stock}
                  </small>
                )}

                <button
                  className="delete-btn"
                  onClick={() =>
                    handleDelete(item._id)
                  }
                >
                  Delete
                </button>

              </div>
            ))}

          </div>

        </div>

      </main>
    </div>
  );
};

export default Products;