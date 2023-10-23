import useTableController from "./table-controller";

import {AgGridReact} from "ag-grid-react";
import {useAppStore} from "../../store/store";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";

const AgGridTable = ({columnDefs}) => {

	const {handleRowDragEnd, onGridReady, onCellClicked, defaultColDef} = useTableController();
	const {rowData} = useAppStore();
	
	return (
		<div className="ag-theme-alpine custom-ag-grid" style={{width:"100%", height:"700px"}}>
			<AgGridReact
				rowData={rowData}
				columnDefs={columnDefs}
				animateRows={true}
				defaultColDef={defaultColDef}
				rowDragManaged={true}
				onGridReady={onGridReady}
				rowSelection="multiple"
				// onCellValueChanged={handleCellValueChanged}
				onRowDragEnd={handleRowDragEnd}
				alwaysShowHorizontalScroll={true}
				alwaysShowVerticalScroll={true}
				style={{ width: '100%', height: '100%' }}
				singleClickEdit={true}
				onCellClicked={onCellClicked}
			/>
		</div>
	);
};

export default AgGridTable;
