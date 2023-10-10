import React, {useMemo} from "react";
import AgGridTable from "../../../components/table/table";
import {
	handleGetDetails,
	handleTaskStatus,
} from "../../../api/details-managment-api";
import {useAppStore} from "../../../store/store";

const DashboardGrid = () => {
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

	const columnDefs = useMemo(
		() => [
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
				flex: 0.3,
			},
			{
				field: "name",
				filter: "agTextColumnFilter",
				headerName: "PARTY",
				editable: false,
				flex: 0.5,
			},
			{
				field: "description",
				headerName: "JOB",
				filter: "agTextColumnFilter",
				editable: false,
				resizable: true,
			},
			{
				field: "createdAt",
				headerName: "CREATED ON",
				filter: "agTextColumnFilter",
				flex: 0.5,
				cellRenderer: (val) => {
					const date = new Date(val.value);
					return `${date.toUTCString().replace(/ GMT$/, '')}`;
				},
			},
		],
		[]
	);

	return <AgGridTable columnDefs={columnDefs} />;
};

export default DashboardGrid;
