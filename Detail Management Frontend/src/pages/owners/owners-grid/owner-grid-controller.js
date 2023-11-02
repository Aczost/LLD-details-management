import { Button, message } from "antd";
import { handleDeleteDetail, handleEditDetail, handleGetDetails, handleTaskStatus } from "../../../api/details-managment-api";
import { useAppStore } from "../../../store/store";
import { useMemo } from "react";

const useOwnerGridController = (form, setIsModalInputEmpty, setInputValue) => {

  const { setRowData, setIsModalOpen, clickedCellData, setShowRowData, setOwner, owner } = useAppStore();
  const modalDisplayFields = [
    {
      key: 1,
      label: "Party",
      children: clickedCellData.name,
    },
    {
      key: 2,
      label: "Job No.",
      children: clickedCellData.description,
    },
    {
      key: 3,
      label: "Plywood",
      children: clickedCellData.plywood,
    },
    {
      key: 4,
      label: "Cutting",
      children: clickedCellData.cutting,
    },
    {
      key: 5,
      label: "Creasing",
      children: clickedCellData.creasing,
    },
  ];

  const getDetails = async () => {
    try {
      setRowData([])
      const { data } = await handleGetDetails();
      if (data.data.length >= 0) {
        setRowData(data.data);
        setOwner(true)
      } else {
        setShowRowData(true);
      }
    } catch (err) { }
  };

  const handleDeleteRow = async (val) => {
    try {
      await handleDeleteDetail(val.id);
      await getDetails();
    } catch (error) {}
    message.success("Deleted Successfully!");
  };

  const columnDefs = useMemo(
    () => [
      {
        field: "",
        headerName: "",
        rowDrag: true,
        width: "20px",
        pinned: 'left',

      },
      {
        headerName: "SERIAL NO",
        valueGetter: (params) => params.node.rowIndex + 1,
        filter: false, 
        editable: false,
        pinned: 'left',
        width: "121px",
      },
      {
        field: "name",
        filter: "agTextColumnFilter",
        headerName: "PARTY",
        editable: true,
      },
      {
        field: "plywood",
        filter: "agTextColumnFilter",
        headerName: "PLYWOOD",
        editable: true,
      },
      {
        field: "cutting",
        filter: "agTextColumnFilter",
        headerName: "CUTTING",
        editable: true,
      },
      {
        field: "creasing",
        filter: "agTextColumnFilter",
        headerName: "CREASING",
        editable: true,
      },
      {
        field: "description",
        headerName: "JOB",
        filter: "agTextColumnFilter",
        editable: true,
        resizable: true,
        },
      {
        field: "createdBy",
        headerName: "CREATED BY",
        filter: "agTextColumnFilter",
        width: "250px",
      },
      {
        field: "createdAt",
        headerName: "CREATED ON",
        filter: "agTextColumnFilter",
        width: "290px",
      },
      {
        field: "",
        headerName: "",
        width: "150px",
        cellRenderer: (val) => (
          <Button
            type="primary"
            danger
            style={{
              width: "100%",
            }}
            onClick={() => {
              handleDeleteRow(val.data);
            }}
          >
            Delete
          </Button>
        ),
      },
    ],
    []
  );

  const onFinish = async (value) => {
    const data = {
      name: Array.isArray(value.name) ? value.name[0] : value.name,
      description: value.description,
      creasing: Array.isArray(value.creasing)
        ? value.creasing[0]
        : value.creasing,
      cutting: Array.isArray(value.cutting) ? value.cutting[0] : value.cutting,
      plywood: Array.isArray(value.plywood) ? value.plywood[0] : value.plywood,
    };
    try {
      await handleEditDetail(data, clickedCellData.id);
      await getDetails();
      form.resetFields();
      setIsModalInputEmpty(false);
      message.success("Edited Successfully.");
    } catch (error) {
      setIsModalInputEmpty(false);
      form.resetFields();
    }
  };

  

  // const handleInputChange = async (val) => {
  //   const id = val.data.id;
  //   const data = {
  //     status: !val.data.isCompleted,
  //   };
  //   await handleTaskStatus(data, id);
  //   await getDetails();
  // };

  const handleOk = (value) => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
    setIsModalInputEmpty(false)
  };

  const handleSearch = (value) => {
    setInputValue(value);
  };

  const handleSelect = (value) => {
    setInputValue("");
  };

  return {
    handleCancel,
    handleOk,
    handleSearch,
    handleSelect,
    onFinish,
    getDetails,
    // handleInputChange,
    handleDeleteRow,
    modalDisplayFields,
    columnDefs
  }
}

export default useOwnerGridController