import { useState } from "react";
import Sidebar from "../../admin/components/Sidebar";
import Footer from "../../components/Footer";
import { Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const AdminLayout = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-layout">

      <button
        className="admin-hamburger"
        onClick={() => setSidebarOpen(true)}
      >
        <FaBars />
      </button>

      {sidebarOpen && (
        <div
          className="admin-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <main className="admin-main">
        <Outlet />
        <Footer />
      </main>

    </div>
    
  );
};

export default AdminLayout;