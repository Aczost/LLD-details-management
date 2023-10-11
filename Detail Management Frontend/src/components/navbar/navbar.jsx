import React from "react";
import Toggle from "../toggle/toggle";
import image from "../../assets/LINK_LASER_DIE-removebg-preview.png";

const Navbar = () => {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				width: "100%",
			}}
		>
			<div style={{width: "150px"}}>
				<img src={image} alt="#Logo" style={{width: "100%", height: "auto"}} />
			</div>
			<div>
				<Toggle />
			</div>
		</div>
	);
};

export default Navbar;
