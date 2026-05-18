import { useState } from "react";
import Topbar from "../components/Topbar";
import "../../styles/admin.css";

const Orders = () => {
 const [orders, setOrders] = useState([
    {
      id: "LW-2031",
      customer: "Sarah Johnson",
      email: "sarah@example.com",
      total: "₦320,000",
      status: "Delivered",
      date: "12 May 2026",
      items: 3
    },
    {
      id: "LW-2032",
      customer: "Amanda Grace",
      email: "amanda@example.com",
      total: "₦180,000",
      status: "Processing",
      date: "14 May 2026",
      items: 1
    },
    {
      id: "LW-2033",
      customer: "Chioma Bliss",
      email: "chioma@example.com",
      total: "₦450,000",
      status: "Shipped",
      date: "15 May 2026",
      items: 5
    }
  ]);
  
  const handleDelete = (id) => {
  const filtered = orders.filter((order) => order.id !== id);
  setOrders(filtered);
  };

  const handleStatusChange = (id) => {

    const updated = orders.map((order) => {

      if (order.id === id) {

        if (order.status === "Pending") {
          return { ...order, status: "Processing" };
        }

        if (order.status === "Processing") {
          return { ...order, status: "Shipped" };
        }

        if (order.status === "Shipped") {
          return { ...order, status: "Delivered" };
        }

      }

      return order;
    });

    setOrders(updated);
  };

  const handleView = (order) => {
    alert(`
  Order ID: ${order.id}
  Customer: ${order.customer}
  Email: ${order.email}
  Amount: ${order.total}
  Status: ${order.status}
    `);
  };

  const handleExport = () => {
    alert("Orders exported successfully");
  };

  return (
    <div className="admin-layout">

      <main className="admin-main">

        <Topbar />

        <div className="admin-page-content">

          <div className="orders-header">
            <div>
              <h2>Orders Management</h2>
              <p>Track and manage customer orders.</p>
            </div>

            <button className="export-btn" onClick={handleExport}>
              Export Orders
            </button>

          </div>

          <div className="orders-stats">

            <div className="order-stat-card">
              <h3>24</h3>
              <p>Total Orders</p>
            </div>

            <div className="order-stat-card">
              <h3>8</h3>
              <p>Pending</p>
            </div>

            <div className="order-stat-card">
              <h3>10</h3>
              <p>Delivered</p>
            </div>

            <div className="order-stat-card">
              <h3>₦2.4M</h3>
              <p>Total Revenue</p>
            </div>

          </div>

          <div className="orders-table-wrapper">

            <table className="orders-table">

              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Email</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {orders.map((order) => (
                  <tr key={order.id}>

                    <td>{order.id}</td>

                    <td>{order.customer}</td>

                    <td>{order.email}</td>

                    <td>{order.items}</td>

                    <td>{order.total}</td>

                    <td>{order.date}</td>

                    <td>
                      <span
                        className={`status-badge ${order.status.toLowerCase()}`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td>
                      <div className="order-actions">
                        <button className="view-order-btn" onClick={() => handleView(order)}>
                          View
                        </button>

                        <button
                          className="status-btn"
                          onClick={() => handleStatusChange(order.id)}
                        >
                          Update
                        </button>

                        <button
                          className="delete-order-btn"
                          onClick={() => handleDelete(order.id)}
                        >
                          Delete
                        </button>
                      </div>
                  </td>
                

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>

      </main>

    </div>
  );
};

export default Orders;