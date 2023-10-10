import React, {useMemo} from "react";
import {Button, Popconfirm, message} from "antd";

import {useAppStore} from "../../../store/store";
import {
	handleDeleteDetail,
	handleGetDetails,
	handleTaskStatus,
} from "../../../api/details-managment-api";
import AgGridTable from "../../../components/table/table";

const OwnersGrid = () => {
	const {setRowData} = useAppStore();
	const getDetails = async () => {
		try {
			const {data} = await handleGetDetails();
			setRowData(data.data);
		} catch (err) {}
	};

	const handleInputChange = async (val) => {
		const id = val.data.id;
		const data = {
			status: !val.data.isCompleted,
		};
		await handleTaskStatus(data, id);
		await getDetails();
	};

	const handleDeleteRow = async (val) => {
		try {
			await handleDeleteDetail(val.id);
			await getDetails();
			message.success("Deleted Successfully!");
		} catch (error) {
			// Handle errors
		}
	};

	const columnDefs = useMemo(
		() => [
			{
				field: "",
				headerName: "",
				rowDrag: true,
				flex: 0.2,
			},
			{
				field: "isCompleted",
				headerName: "COMPLETED",
				cellRenderer: (val) => (
					<input
						type="checkbox"
						checked={val.data.isCompleted}
						onClick={() => handleInputChange(val)}
					/>
				),
				flex: 0.4  ,
			},
			{
				field: "name",
				filter: "agTextColumnFilter",
				headerName: "PARTY",
				editable: true,
				flex: 0.5  ,
        
			},
			{
				field: "description",
				headerName: "JOB",
				filter: "agTextColumnFilter",
				editable: true,
				resizable: true,
				flex: 1.5,
			},
			{
				field: "",
				headerName: "",
				cellRenderer: (val) => (
					<Popconfirm
						title="Delete the task"
						description="Are you sure to delete this task?"
						onConfirm={() => handleDeleteRow(val.data)}
						okText="Yes"
						cancelText="No"
					>
						<Button
							type="primary" 
              danger
							style={{
								width: "100%",
							}}
						>
							Delete
						</Button>
					</Popconfirm>
				),
        flex: 0.4
			},
		],
		[]
	);
	return <AgGridTable columnDefs={columnDefs} />;
};

export default OwnersGrid;