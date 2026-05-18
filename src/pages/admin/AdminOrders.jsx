import { useEffect, useState } from "react";

const AdminOrders = () => {

  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await fetch("http://localhost:5000/api/orders", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Orders</h1>

      {orders.map((order) => (
        <div key={order._id} className="admin-card">

          <h3>{order.customerName}</h3>
          <p>{order.userEmail}</p>
          <p>₦{order.totalAmount}</p>
          <p>Status: {order.status}</p>

        </div>
      ))}

    </div>
  );
};

export default AdminOrders;