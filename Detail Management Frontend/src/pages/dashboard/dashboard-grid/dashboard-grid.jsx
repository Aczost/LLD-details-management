import React, {useEffect, useState} from "react";
import {Form, Modal, Select, Descriptions, message, Button} from "antd";
import {useAppStore} from "../../../store/store";
import {DYNAMICOPTIONS} from "../../../utils/enums";

import AgGridTable from "../../../components/table/table";
import useDashboarsGridController from "./dashboard-grid-controller";
const {Option} = Select;

const DashboardGrid = () => {
  const {isModalOpen, clickedCellData, columnHeaderName, setOwner} = useAppStore();
  const [prefix, setPrifix] = useState(columnHeaderName.split(" ")[0]);
  const [moduleStartValue, setModuleStartValue] = useState("");
  const [form] = Form.useForm();
  const {gridColumnDefs, handleCancel, modalDisplayFields, onFinish} = useDashboarsGridController(form,prefix,moduleStartValue,setModuleStartValue);

  const options = DYNAMICOPTIONS[prefix] || [];
  // const modalDisplayFields = [
  //   {
  //     key: 1,
  //     label: "Party",
  //     children: clickedCellData.name,
  //   },
  //   {
  //     key: 2,
  //     label: "Plywood",
  //     children: clickedCellData.plywood,
  //   },
  //   {
  //     key: 3,
  //     label: "Cutting",
  //     children: clickedCellData.cutting,
  //   },
  //   {
  //     key: 4,
  //     label: "Creasing",
  //     children: clickedCellData.creasing,
  //   },
  //   {
  //     key: 5,
  //     label: "Job",
  //     children: clickedCellData.description,
  //   },
  //   {
  //     key: 6,
  //     label: `${
  //       prefix.charAt(0).toUpperCase() + prefix.slice(1).toLowerCase()
  //     } By`,
  //     children: clickedCellData[`${prefix.toLowerCase()}By`],
  //   },
  //   {
  //     key: 7,
  //     label: "Starte At",
  //     children: clickedCellData[`${prefix.toLowerCase()}StartedAt`],
  //   },
  //   {
  //     key: 8,
  //     label: "Ended At",
  //     children: clickedCellData[`${prefix.toLowerCase()}EndedAt`],
  //   },
  // ];

  useEffect(() => {
    setOwner(false);
  }, []);

  useEffect(() => {
    setPrifix(columnHeaderName.split(" ")[0]);
    form.resetFields();
  }, [clickedCellData]);

  return (
    <>
      <AgGridTable columnDefs={gridColumnDefs} />
      <Modal
        title={columnHeaderName}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={(_, {CancelBtn}) => (
          <>
            {!clickedCellData[`${prefix.toLowerCase()}StartedAt`] ? (
              <Button type="primary" onClick={onFinish}>
                Start
              </Button>
            ) : !clickedCellData[`${prefix.toLowerCase()}EndedAt`] ? (
              <Button type="primary" danger onClick={onFinish}>
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
          <Form.Item
            name="columnHeaderName"
            label={`${columnHeaderName}: `}
            rules={[{required: true}]}
          >
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
