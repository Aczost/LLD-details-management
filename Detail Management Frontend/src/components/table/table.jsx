import {AgGridReact} from "ag-grid-react";

import useTableController from "./table-controller";
import {useAppStore} from "../../store/store";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";

const AgGridTable = ({columnDefs}) => {
	const {rowData} = useAppStore();
	const {
		handleRowDragEnd,
		handleCellValueChanged,
		onGridReady,
		defaultColDef,
	} = useTableController();
	return (
		<div className="ag-theme-alpine custom-ag-grid" style={{width:"100%"}}>
			<AgGridReact
				rowData={rowData}
				columnDefs={columnDefs}
				animateRows={true}
				defaultColDef={defaultColDef}
				rowDragManaged={true}
				onGridReady={onGridReady}
				rowSelection="multiple"
				onCellValueChanged={handleCellValueChanged}
				onRowDragEnd={handleRowDragEnd}
				alwaysShowHorizontalScroll={true}
				alwaysShowVerticalScroll={true}
			/>
		</div>
	);
};

export default AgGridTable;
