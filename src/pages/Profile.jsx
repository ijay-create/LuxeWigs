import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaBoxOpen,
  FaHeart,
  FaShoppingCart,
  FaMapMarkerAlt,
  FaSignOutAlt,
  FaCreditCard,
  FaCheckCircle,
  FaClock
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../styles/profile.css";

const Profile = () => {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const recentOrders = [
    {
      id: "LW-2031",
      product: "Luxury Bone Straight Wig",
      status: "Delivered",
      amount: "₦320,000",
      date: "12 May 2026"
    },
    {
      id: "LW-2032",
      product: "Deep Wave Wig",
      status: "Processing",
      amount: "₦180,000",
      date: "15 May 2026"
    }
  ];

  return (
    <>
      <Navbar />

      <section className="profile-page">

        <div className="container profile-container">

          {/* SIDEBAR */}
          <aside className="profile-sidebar">

            <div className="profile-user-card">

              <div className="profile-avatar">
                <FaUser />
              </div>

              <div>
                <h3>{user?.name || "Customer"}</h3>
                <p>{user?.email}</p>
              </div>

            </div>

            <div className="profile-menu">

              <Link to="/profile" className="active-link">
                <FaUser />
                My Account
              </Link>

              <Link to="/profile">
                <FaBoxOpen />
                Orders
              </Link>

              <Link to="/wishlist">
                <FaHeart />
                Wishlist
              </Link>

              <Link to="/cart">
                <FaShoppingCart />
                Cart
              </Link>

              <Link to="/profile">
                <FaMapMarkerAlt />
                Address Book
              </Link>

              <Link to="/profile">
                <FaCreditCard />
                Payment Methods
              </Link>

            </div>

            <button
              className="profile-logout-btn"
              onClick={handleLogout}
            >
              <FaSignOutAlt />
              Logout
            </button>

          </aside>

          {/* CONTENT */}
          <div className="profile-content">

            {/* HERO */}
            <div className="profile-banner">

              <div>
                <h1>
                  Welcome Back, {user?.name || "Customer"} 👋
                </h1>

                <p>
                  Track orders, manage your account,
                  wishlist and luxury purchases.
                </p>
              </div>

            </div>

            {/* STATS */}
            <div className="profile-stats-grid">

              <div className="profile-stat-card">
                <FaBoxOpen />
                <div>
                  <h2>12</h2>
                  <p>Total Orders</p>
                </div>
              </div>

              <div className="profile-stat-card">
                <FaHeart />
                <div>
                  <h2>8</h2>
                  <p>Wishlist Items</p>
                </div>
              </div>

              <div className="profile-stat-card">
                <FaShoppingCart />
                <div>
                  <h2>3</h2>
                  <p>Items In Cart</p>
                </div>
              </div>

              <div className="profile-stat-card">
                <FaCheckCircle />
                <div>
                  <h2>10</h2>
                  <p>Delivered Orders</p>
                </div>
              </div>

            </div>

            {/* ACCOUNT DETAILS */}
            <div className="profile-box">

              <div className="profile-box-header">
                <h3>Account Details</h3>
              </div>

              <div className="profile-details-grid">

                <div className="detail-card">
                  <span>Full Name</span>
                  <h4>{user?.name}</h4>
                </div>

                <div className="detail-card">
                  <span>Email Address</span>
                  <h4>{user?.email}</h4>
                </div>

                <div className="detail-card">
                  <span>Phone Number</span>
                  <h4>+234 800 000 0000</h4>
                </div>

                <div className="detail-card">
                  <span>Delivery Address</span>
                  <h4>Lagos, Nigeria</h4>
                </div>

              </div>

            </div>

            {/* RECENT ORDERS */}
            <div className="profile-box">

              <div className="profile-box-header">
                <h3>Recent Orders</h3>

                <Link to="/profile" className="view-all-btn">
                  View All
                </Link>
              </div>

              <div className="recent-orders">

                {recentOrders.map((order) => (
                  <div className="recent-order-card" key={order.id}>

                    <div className="recent-order-left">

                      <div className="order-icon">
                        <FaBoxOpen />
                      </div>

                      <div>
                        <h4>{order.product}</h4>

                        <p>
                          Order ID: {order.id}
                        </p>

                        <span>
                          {order.date}
                        </span>
                      </div>

                    </div>

                    <div className="recent-order-right">

                      <h3>{order.amount}</h3>

                      <div
                        className={`order-status ${order.status.toLowerCase()}`}
                      >
                        {order.status === "Delivered" ? (
                          <FaCheckCircle />
                        ) : (
                          <FaClock />
                        )}

                        {order.status}
                      </div>

                    </div>

                  </div>
                ))}

              </div>

            </div>

            {/* ACTIVITY */}
            <div className="profile-box">

              <div className="profile-box-header">
                <h3>Recent Activity</h3>
              </div>

              <ul className="activity-list">

                <li>
                  Luxury Bone Straight Wig added to cart
                </li>

                <li>
                  Order #LW2031 delivered successfully
                </li>

                <li>
                  Added Deep Wave Wig to wishlist
                </li>

                <li>
                  Payment completed for Order #LW2032
                </li>

              </ul>

            </div>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
};

export default Profile;