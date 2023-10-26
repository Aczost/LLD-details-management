import React from "react";
import DashboardGrid from "./dashboard-grid/dashboard-grid";
import Loading from "../../components/loading/loading";

const Dashboard = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <DashboardGrid />
      </div>
    </>
  );
};

export default Dashboard;
