import {useRef, useEffect, useMemo} from "react";
import {message} from "antd";

import {
  handleDragDrop,
  handleEditDetail,
  handleGetDetails,
} from "../../api/details-managment-api";
import {useAppStore} from "../../store/store";

const useTableController = () => {
  const {setRowData} = useAppStore()
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
      enableRowGroup: true,
      cellStyle: {textAlign: "left"},
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
  return {
    handleRowDragEnd,
    handleCellValueChanged,
    onGridReady,
    defaultColDef,
  }
}

export default useTableController