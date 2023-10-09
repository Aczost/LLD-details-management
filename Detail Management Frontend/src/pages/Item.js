import React, {useState, useRef, useEffect, useMemo} from "react";
import {Button, message} from "antd";
import {AgGridReact} from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./Item.css";
import ContactForm from "../components/form.jsx";
import {
  handleDeleteDetail,
  handleDragDrop,
  handleEditDetail,
  handleGetDetails,
} from "../api/details-managment-api";

function CustomTable() {
  const [owner, setOwner] = useState(false);
  const [rowData, setRowData] = useState([]);
  const gridApiRef = useRef(null);

  const getDetails = async () => {
    try {
      const {data} = await handleGetDetails();
      setRowData(data.data);
    } catch (err) {
      // Handle errors
    }
  };

  useEffect(() => {
    getDetails(); // Fetch data initially
    const intervalId = setInterval(() => {
      getDetails(); // Fetch data every 2 minutes
    }, 120000);
    return () => clearInterval(intervalId);
  }, []);

  const handleDeleteRow = async (val) => {
    try {
      await handleDeleteDetail(val.id);
      await getDetails();
      message.success("Deleted Successfully!");
    } catch (error) {
      // Handle errors
    }
  };

  const columnDefsOwnerTrue = useMemo(() => [
    {
      field: "",
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
      cellRenderer: (val) => (
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
      ),
    },
  ], [handleDeleteRow]); // TODO: Remove the handleDeleteRow 

  const columnDefsOwnerFalse = useMemo(() => [
    {
      field: "name",
      filter: "agTextColumnFilter",
      headerName: "Name",
      editable: false,
    },
    {
      field: "description",
      headerName: "Message",
      filter: "agTextColumnFilter",
      editable: false,
    },
  ], []);

  const columnDefs = owner ? columnDefsOwnerTrue : columnDefsOwnerFalse;
  const defaultColDef = useMemo(
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
    };
    try {
      await handleEditDetail(data, event.data.id);
      await getDetails();
      message.success("Edited Successfully.");
    } catch (error) {
    }
  };

  const handleRowDragEnd = async (event) => {
    const updatedData = event.api.getModel().rowsToDisplay.map((row) => row.data);
    try {
      await handleDragDrop(updatedData);
      await getDetails();
    } catch (error) {
    }
  };

  return (
    <div className="container">
      <ContactForm
        setRowData={setRowData}
        rowData={rowData}
        getDetails={getDetails}
        owner={owner}
        setOwner={setOwner}
      />
      <div
        className="ag-theme-alpine custom-ag-grid"
        style={{height: 400, width: 850, textAlign: "left"}}
      >
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
        />
      </div>
    </div>
  );
}

export default CustomTable;
