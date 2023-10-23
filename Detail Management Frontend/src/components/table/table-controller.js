import {useRef, useEffect, useMemo} from "react";
import {message} from "antd";

import {
  handleDragDrop,
  handleEditDetail,
  handleGetDetails,
} from "../../api/details-managment-api";
import {useAppStore} from "../../store/store";

const useTableController = () => {
  const {setRowData, owner ,setIsModalOpen, setClickedCellData, setColumnHeaderName, setDefaultValue} = useAppStore()
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
      const {data} = await handleGetDetails();
      setRowData(data.data);
    } catch (err) {
    }
  };

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      // floatingFilter: true,
      enableRowGroup: true,
      cellStyle: {textAlign: "left"},
      resizable: true,
      // flex: 1,
      
    }),
    []
  );

  const onGridReady = (params) => {
    gridApiRef.current = params.api;
  };

  // const handleCellValueChanged = async (event) => {
  //   const data = {
  //     name: event.data.name,
  //     description: event.data.description,
  //   };
  //   try {
  //     await handleEditDetail(data, event.data.id);
  //     await getDetails();
  //     message.success("Edited Successfully.");
  //   } catch (error) {
  //   }
  // };

  const handleRowDragEnd = async (event) => {
    const updatedData = event.api.getModel().rowsToDisplay.map((row) => row.data);
    try {
      await handleDragDrop(updatedData);
      await getDetails();
    } catch (error) {
    }
  };

  const onCellClicked = async (event) => {
    setDefaultValue("")
    setIsModalOpen(false);
    if( event.colDef.headerName === "DESIGN BY" || event.colDef.headerName === "LASER BY"  ||event.colDef.headerName === "BENDER BY" || event.colDef.headerName === "FITTING BY" || event.colDef.headerName === "CREASING BY") {
      setColumnHeaderName(event.colDef.headerName)
      setClickedCellData(event.data);
      setIsModalOpen(true)
    }
    if((event.colDef.headerName === "PARTY"|| event.colDef.headerName === "JOB" || event.colDef.headerName === "CUTTING" || event.colDef.headerName === "CREASING" || event.colDef.headerName === "PLYWOOD") && owner) {
      setClickedCellData(event.data);
      setIsModalOpen(true)
    }
    await getDetails();
  }

  return {
    handleRowDragEnd,
    // handleCellValueChanged,
    onGridReady,
    defaultColDef,
    onCellClicked
  }
}

export default useTableController