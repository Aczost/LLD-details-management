import React, {useEffect, useMemo, useState} from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Descriptions,
  Popconfirm,
  Select,
  message,
} from "antd";
import {useAppStore} from "../../../store/store";
import {PARTY, PLYWOOD, CUTTING, CREASING} from "../../../utils/enums";
import {
  handleDeleteDetail,
  handleEditDetail,
  handleGetDetails,
  handleTaskStatus,
} from "../../../api/details-managment-api";

import AgGridTable from "../../../components/table/table";

const {Option} = Select;

const OwnersGrid = () => {
  const {setRowData, setOwner, isModalOpen, setIsModalOpen, clickedCellData} =
    useAppStore();
  const [form] = Form.useForm();
  const [isModaInputEmpty, setIsModalInputEmpty] = useState(false);
  const [party, setParty] = useState(PARTY);
  const [playwood, setPlywood] = useState(PLYWOOD);
  const [creasing, setCreasing] = useState(CREASING);
  const [cutting, setCutting] = useState(CUTTING);
  const [inputValue, setInputValue] = useState("");
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
  useEffect(() => {
    setOwner(true);
  }, []);

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
    } catch (error) {}
  };

  const handleOk = (value) => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const handleSearch = (value) => {
    setInputValue(value);
  };

  const handleSelect = (value) => {
    setInputValue("");
  };

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
    // console.log("🚀 ~ file: owners-grid.jsx:81 ~ onFinish ~ data:", data)
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

  const columnDefs = useMemo(
    () => [
      {
        field: "",
        headerName: "",
        rowDrag: true,
        width: "20px",
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
      },
      {
        field: "name",
        filter: "agTextColumnFilter",
        headerName: "PARTY",
        editable: true,
        // cellRenderer: (val)=>{
        //   return val.data.name[0]
        // }
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
        width: "700px",
      },
      {
        field: "createdBy", // todo change
        headerName: "CREATED BY",
        filter: "agTextColumnFilter",
        width: "250px",
      },
      {
        field: "createdAt",
        headerName: "CREATED ON",
        filter: "agTextColumnFilter",
        width: "300px",
      },
      {
        field: "",
        headerName: "",
        width: "150px",
        cellRenderer: (val) => (
          // <Popconfirm
          //   title="Delete the task"
          //   description="Are you sure to delete this task?"
          //   onConfirm={() => handleDeleteRow(val.data)}
          //   okText="Yes"
          //   cancelText="No"
          // >
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
          // </Popconfirm>
        ),
      },
    ],
    []
  );

  return (
    <>
      <AgGridTable columnDefs={columnDefs} />;
      <Modal
        title="Update Job Details"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Update"
        okButtonProps={{
          form: "ownerForm",
          htmlType: "submit",
          disabled: isModaInputEmpty ? false : true,
        }}
      >
        <hr style={{marginBottom: "20px"}} />
        <Form
          layout="vertical"
          form={form}
          name="ownerForm"
          onFinish={onFinish}
        >
          <Form.Item name="name" label={`Party: `}>
            <Select
              showSearch
              mode="tags"
              value={inputValue}
              placeholder={`SELECT PARTY`}
              onChange={handleSelect}
              onSearch={handleSearch}
              onSelect={(value) => {
                if (!party.includes(value.trim())) {
                  setParty([...party, value]);
                }
                setIsModalInputEmpty(true);
              }}
            >
              {party
                ? party.map((option, index) => (
                    <Option key={index} value={option}>
                      {option}
                    </Option>
                  ))
                : null}
            </Select>
          </Form.Item>
          <Form.Item
            name="description"
            label={`Job: `}
            onChange={() => setIsModalInputEmpty(true)}
          >
            <Input placeholder="enter" />
          </Form.Item>
          <Form.Item name="plywood" label={`Plywood: `}>
            <Select
              showSearch
              mode="tags"
              value={inputValue}
              placeholder={`SELECT PLYWOOD`}
              onChange={handleSelect}
              onSearch={handleSearch}
              onSelect={(value) => {
                if (!PLYWOOD.includes(value.trim())) {
                  setPlywood([...PLYWOOD, value]);
                }
                setIsModalInputEmpty(true);
              }}
            >
              {playwood
                ? playwood.map((option, index) => (
                    <Option key={index} value={option}>
                      {option}
                    </Option>
                  ))
                : null}
            </Select>
          </Form.Item>
          <Form.Item name="cutting" label={`Cutting: `}>
            <Select
              showSearch
              mode="tags"
              value={inputValue}
              placeholder={`SELECT CUTTING`}
              onChange={handleSelect}
              onSearch={handleSearch}
              onSelect={(value) => {
                if (cutting.includes(value.trim())) {
                  setCutting([...cutting, value]);
                }
                setIsModalInputEmpty(true);
              }}
            >
              {cutting
                ? cutting.map((option, index) => (
                    <Option key={index} value={option}>
                      {option}
                    </Option>
                  ))
                : null}
            </Select>
          </Form.Item>
          <Form.Item name="creasing" label={`Creasing: `}>
            <Select
              showSearch
              mode="tags"
              value={inputValue}
              placeholder={`SELECT CREASING`}
              onChange={handleSelect}
              onSearch={handleSearch}
              onSelect={(value) => {
                if (creasing.includes(value.trim())) {
                  setCutting([...creasing, value]);
                }
                setIsModalInputEmpty(true);
              }}
            >
              {creasing
                ? creasing.map((option, index) => (
                    <Option key={index} value={option}>
                      {option}
                    </Option>
                  ))
                : null}
            </Select>
          </Form.Item>
        </Form>
        <Descriptions title={`Job Details.`} items={modalDisplayFields} />
      </Modal>
    </>
  );
};

export default OwnersGrid;
