import React from "react";
import DashboardGrid from "./dashboard-grid/dashboard-grid";
import Toggle from "../../components/toggle/toggle";

const Dashboard = () => {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				flexDirection: "column",
				alignItems: "center",
				margin:"20px"
			}}
		>
			<Toggle />
			<DashboardGrid />
		</div>
	);
};

export default Dashboard;
