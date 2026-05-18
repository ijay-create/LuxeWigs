import Topbar from "../components/Topbar";
import StatsCard from "../components/StatsCard";

import "../../styles/admin.css";

const Dashboard = () => {
  return (
    <div className="admin-layout">

      <main className="admin-main">

        <Topbar />

        <div className="stats-grid">

          <StatsCard
            title="Total Revenue"
            value="₦2,450,000"
          />

          <StatsCard
            title="Orders"
            value="128"
          />

          <StatsCard
            title="Products"
            value="24"
          />

          <StatsCard
            title="Customers"
            value="89"
          />

        </div>

      </main>

    </div>
  );
};

export default Dashboard;