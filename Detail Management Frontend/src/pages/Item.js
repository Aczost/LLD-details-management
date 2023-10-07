import React, {useMemo, useState, useRef, useEffect} from "react";
import {Button, message} from "antd";
import {AgGridReact} from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

// import data from "../data.json";
import "./Item.css";
import ContactForm from "../components/form.jsx";

import {handleDeleteDetail, handleDragDrop, handleEditDetail, handleGetDetails} from "../api/details-managment-api";

function CustomeTable() {
  const [rowData, setRowData] = useState();
  const gridApiRef = useRef(null);

  const getDetails = async () => {
    try {
      const {data} = await handleGetDetails();
      setRowData(data.data);
    } catch (err) {
    }
  }

  const handleDeleteRow = async (val) => {
    try {
      await handleDeleteDetail(val.id)
      message.destroy("Deleted Successfully!");
      await getDetails()
    } catch (error) {
    }

  };

  const [columnDefs] = useState([
    {
      field: '',
      headerName: "",
      rowDrag: true,
    },
    {
      field: "name",
      filter: "agTextColumnFilter",
      headerName: "Name",
      editable: true,
    },
    {
      field: "description",
      headerName: "Message",
      filter: "agTextColumnFilter",
      editable: true,
    },
    {
      field: "",
      headerName: "",
      cellRenderer: (val) => {
        return (
          <Button
            type="primary"
            onClick={() => handleDeleteRow(val.data)}
            style={{
              width: "100%",
              background: "#d11a2a",
            }}
          >
            Delete
          </Button>
        );
      },
    },
  ]);

  const defaultColdef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      enableRowGroup: true,
      flex: 1,
    }),
    []
  );

  const onGridReady = (params) => {
    gridApiRef.current = params.api;
  };

  const handleCellValueChanged = async (event) => {
    const data = {
      name: event.data.name,
      description: event.data.description,
    }
    try {
      await handleEditDetail(data, event.data.id)
      await getDetails();
      message.info('Edited Successfully.');
    } catch (error) {
    }
  };

  const handleRowDragEnd = async (event) => {
    const updatedData = event.api
      .getModel()
      .rowsToDisplay.map((row) => row.data);
    try {
      await handleDragDrop(updatedData);
      await getDetails(); 
} catch (error) {

    }
  };

  useEffect(() => {
    getDetails();
  }, [])
  return (
    <div className="container">
      <ContactForm setRowData={setRowData} rowData={rowData} getDetails={getDetails} />
      <div
        className="ag-theme-alpine custom-ag-grid"
        style={{height: 500, width: 1000, textAlign: "left", }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          animateRows={true}
          defaultColDef={defaultColdef}
          rowDragManaged={true}
          onGridReady={onGridReady}
          rowSelection="multiple"
          onCellValueChanged={handleCellValueChanged}
          onRowDragEnd={handleRowDragEnd}
        />
      </div>
    </div>
  );
}

export default CustomeTable;





