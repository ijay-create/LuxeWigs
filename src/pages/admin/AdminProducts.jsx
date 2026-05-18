import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_API_URL;

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${BASE_URL}/products`);
      const data = await res.json();

      setProducts(data.products || []); // 🔥 FIX
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>

      {loading && <p>Loading...</p>}

      {!loading && products.length === 0 && (
        <p>No products found</p>
      )}

      {products.map((p) => (
        <div key={p._id} className="admin-card">
          <img src={p.image} width="80" alt={p.name} />
          <h3>{p.name}</h3>
          <p>₦{Number(p.price).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminProducts;