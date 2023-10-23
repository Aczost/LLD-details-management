import React from "react";
import DashboardGrid from "./dashboard-grid/dashboard-grid";

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
