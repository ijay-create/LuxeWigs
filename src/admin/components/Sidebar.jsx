import { FaTachometerAlt, FaBoxOpen, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = ({ sidebarOpen = false, setSidebarOpen = () => {} }) => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>

      <div className="admin-logo">
        LuxeWigs Admin
      </div>

      <nav className="admin-nav">

        <NavLink onClick={() => setSidebarOpen(false)} to="/admin/dashboard">
          <FaTachometerAlt /> Dashboard
        </NavLink>

        <NavLink onClick={() => setSidebarOpen(false)} to="/admin/products">
          <FaBoxOpen /> Products
        </NavLink>

        <NavLink onClick={() => setSidebarOpen(false)} to="/admin/orders">
          <FaShoppingCart /> Orders
        </NavLink>

      </nav>

      <button className="logout-btn" onClick={handleLogout}>
        <FaSignOutAlt /> Logout
      </button>

    </aside>
  );
};

export default Sidebar;