import { useEffect, useState } from "react";

const AdminProducts = () => {

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/api/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>

      {products.map((p) => (
        <div key={p._id} className="admin-card">

          <img src={p.image} width="80" />

          <h3>{p.name}</h3>

          <p>₦{p.price}</p>

        </div>
      ))}

    </div>
  );
};

export default AdminProducts;