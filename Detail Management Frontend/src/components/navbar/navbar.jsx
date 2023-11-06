import React from "react";
import Toggle from "../toggle/toggle";
import image from "../../assets/LINK_LASER_DIE-removebg-preview.png";
import Logout from "../logout/logout";

import { useAppStore } from "../../store/store";

const Navbar = () => {
	const { owner } = useAppStore()
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				width: "100%",
			}}
		>
			<div style={{ width: "150px" }}>
				<img src={image} alt="#Logo" style={{ width: "100%", height: "auto" }} />
			</div>
			{
				owner && owner ? <h1>JOB CREATION</h1> : <h1>WORKSHOP</h1>
			}
			<div className="hello" style={{
				display: 'flex',
				justifyContent: 'space-between',
				minWidth: '140px',
			}}>


				<div>
					{
						owner && owner ? null : <Toggle />
					}
				</div>
				<div>
					<Logout />
				</div>
			</div>
		</div>
	);
};

export default Navbar;
