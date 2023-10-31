import { useRef, useEffect, useMemo } from "react";

import {
  handleDragDrop,
  handleEditDetail,
  handleGetDetails,
} from "../../api/details-managment-api";
import { useAppStore } from "../../store/store";

const useTableController = () => {
  const { setRowData, owner, setIsModalOpen, setClickedCellData, setColumnHeaderName , setShowRowData } = useAppStore()
  const gridApiRef = useRef(null);
  useEffect(() => {
    getDetails(); // Fetch data initially
    const intervalId = setInterval(() => {
      getDetails(); // Fetch data every 2 minutes
    }, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const getDetails = async () => {
    try {
      const { data } = await handleGetDetails();
      if (data.data.length > 0) {
        setRowData(data.data);
      } else {
        setShowRowData(true);
      }
    } catch (err) {
    }
  };

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      // floatingFilter: true,
      enableRowGroup: true,
      cellStyle: { textAlign: "left" },
      resizable: true,
      // flex: 1,
      suppressMovable: true

    }),
    []
  );

  const onGridReady = (params) => {
    gridApiRef.current = params.api;
  };

  const handleRowDragEnd = async (event) => {
    const updatedData = event.api.getModel().rowsToDisplay.map((row) => row.data);
    try {
      await handleDragDrop(updatedData);
      await getDetails();
    } catch (error) {
    }
  };

  const onCellClicked = async (event) => {
    setIsModalOpen(false);
    if(event.colDef.headerName==="START-END" ) {
      setColumnHeaderName(event.colDef.headerName)
      setClickedCellData(event.data);
    }
    if (event.colDef.headerName==="DELIVERY BY"||event.colDef.headerName === "DESIGN BY" || event.colDef.headerName === "LASER BY" || event.colDef.headerName === "BENDER BY" || event.colDef.headerName === "FITTING BY" || event.colDef.headerName === "CREASING BY") {
      setColumnHeaderName(event.colDef.headerName)
      setClickedCellData(event.data);
      setIsModalOpen(true)
    }
    if ((event.colDef.headerName === "PARTY" || event.colDef.headerName === "JOB" || event.colDef.headerName === "CUTTING" || event.colDef.headerName === "CREASING" || event.colDef.headerName === "PLYWOOD") && owner) {
      setClickedCellData(event.data);
      setIsModalOpen(true)
    }
    await getDetails();
  }

  const noRowOverLay = () => {
      return '<span><img src="https://ag-grid.com/images/ag-grid-loading-spinner.svg " width="150px"  alt="Loading Spinner" /></span>'
  }

  return {
    handleRowDragEnd,
    onGridReady,
    defaultColDef,
    onCellClicked,
    noRowOverLay
  }
}

export default useTableController