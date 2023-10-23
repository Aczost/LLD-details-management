import React, {useEffect, useState} from "react";
import {Form, Modal, Select, Descriptions, message, Button} from "antd";
import {useAppStore} from "../../../store/store";
import {DYNAMICOPTIONS} from "../../../utils/enums";
import {
  handleStartEndAndDuration as updateJobDetails,
  handleGetDetails,
} from "../../../api/details-managment-api";

import AgGridTable from "../../../components/table/table";
import useDashboarsGridController from "./dashboard-grid-controller";
import moment from "moment-timezone";
const {Option} = Select;

const DashboardGrid = () => {
  const {
    isModalOpen,
    setIsModalOpen,
    clickedCellData,
    columnHeaderName,
    setOwner,
    setRowData,
  } = useAppStore();
  const {gridColumnDefs, handleCancel} = useDashboarsGridController();
  const [prefix, setPrifix] = useState(columnHeaderName.split(" ")[0]);
  const [moduleStartValue, setModuleStartValue] = useState("");
  const [form] = Form.useForm();

  const options = DYNAMICOPTIONS[prefix] || [];
  const modalDisplayFields = [
    {
      key: 1,
      label: "Party",
      children: clickedCellData.name,
    },
    {
      key: 2,
      label: "Job",
      children: clickedCellData.description,
    },
    {
      key: 3,
      label: `${
        prefix.charAt(0).toUpperCase() + prefix.slice(1).toLowerCase()
      } By`,
      children: clickedCellData[`${prefix.toLowerCase()}By`],
    },
    {
      key: 4,
      label: "Starte At",
      children: clickedCellData[`${prefix.toLowerCase()}StartedAt`],
    },
    {
      key: 5,
      label: "Ended At",
      children: clickedCellData[`${prefix.toLowerCase()}EndedAt`],
    },
  ];

  useEffect(() => {
    setOwner(false);
  }, []);

  useEffect(() => {
    setPrifix(columnHeaderName.split(" ")[0]);
    form.resetFields();
  }, [clickedCellData]);

  const getDetails = async () => {
    try {
      const {data} = await handleGetDetails();
      setRowData(data.data);
    } catch (err) {}
  };

  const onFinish = async (value) => {
    if (clickedCellData.startedAt) {
      const data = {};
      if (
        !(clickedCellData[`${prefix.toLowerCase()}StartedAt`]) &&
        moduleStartValue.length > 0
      ) {
        data[`${prefix.toLowerCase()}By`] = moduleStartValue;
        data[`${prefix.toLowerCase()}StartedAt`] = moment
          .tz("Asia/Calcutta")
          .format("dddd DD-MM-YYYY hh:mm:ss A");
        setIsModalOpen(false);
        setModuleStartValue("");
      } else if (
        clickedCellData[`${prefix.toLowerCase()}StartedAt`] &&
        moduleStartValue.length > 0
      ) {
        data[`${prefix.toLowerCase()}By`] = moduleStartValue;
        data[`${prefix.toLowerCase()}EndedAt`] = moment
          .tz("Asia/Calcutta")
          .format("dddd DD-MM-YYYY hh:mm:ss A");
        setIsModalOpen(false);
        setModuleStartValue("");
      } else {
        message.error("Please select a value:-");
      }
      await updateJobDetails(data, clickedCellData.id);
      await getDetails();
      form.resetFields();
      setModuleStartValue("");
    } else {
      message.error("Please Start The Job.");
    }
  };

  return (
    <>
      <AgGridTable columnDefs={gridColumnDefs} />
      <Modal
        title={columnHeaderName}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={(_, {CancelBtn}) => (
          <>
            {!(clickedCellData[`${prefix.toLowerCase()}StartedAt`]) ? (
              <Button type="primary" onClick={onFinish}>
              Start
            </Button>
            ) : !(clickedCellData[`${prefix.toLowerCase()}EndedAt`]) ? (
              <Button
                  type="primary"
                  danger
                  onClick={onFinish}
                >
                  End
                </Button>
            ) : (
              <Button
                  type="primary"
                  disabled
                  style={{
                    backgroundColor: "#4CBB17",
                    color: "white",
                    border: "none",
                  }}
                >
                  Completed
                </Button>
            )}
            <CancelBtn />
          </>
        )}
      >
        <hr style={{marginBottom: "20px"}} />
        <Form form={form} name="myForm" onFinish={onFinish}>
          <Form.Item name="columnHeaderName" label={`${columnHeaderName}: `}>
            <Select
              placeholder={`SELECT ${prefix} BY`}
              onSelect={(val) => {
                setModuleStartValue(val);
              }}
            >
              {options
                ? options.map((option, index) => (
                    <Option key={index} value={option}>
                      {option}
                    </Option>
                  ))
                : null}
            </Select>
          </Form.Item>
        </Form>
        <Descriptions
          title={`Job Info Related to ${
            prefix.charAt(0).toUpperCase() + prefix.slice(1).toLowerCase()
          }.`}
          items={modalDisplayFields}
        />
      </Modal>
    </>
  );
};

export default DashboardGrid;
