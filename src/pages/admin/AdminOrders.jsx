import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_API_URL;

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${BASE_URL}/orders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      const data = await res.json();

      setOrders(data.orders || []); // 🔥 FIX
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Orders</h1>

      {loading && <p>Loading orders...</p>}

      {!loading && orders.length === 0 && (
        <p>No orders yet</p>
      )}

      {orders.map((order) => (
        <div key={order._id} className="admin-card">

          <h3>{order.customerName || "Unknown Customer"}</h3>
          <p>{order.userEmail || "No email"}</p>

          <p>
            ₦{Number(order.totalAmount || 0).toLocaleString()}
          </p>

          <p>
            Status: <b>{order.status || "pending"}</b>
          </p>

        </div>
      ))}
    </div>
  );
};

export default AdminOrders;