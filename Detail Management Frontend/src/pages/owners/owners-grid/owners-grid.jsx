import React, {useEffect, useState} from "react";
import {
  Form,
  Input,
  Modal,
  Descriptions,
  Select,
} from "antd";
import {useAppStore} from "../../../store/store";
import {PARTY, PLYWOOD, CUTTING, CREASING} from "../../../utils/enums";

import AgGridTable from "../../../components/table/table";
import useOwnerGridController from './owner-grid-controller.js'

const {Option} = Select;

const OwnersGrid = () => {
  const {setOwner, isModalOpen} = useAppStore();
  const [form] = Form.useForm();
  const [isModaInputEmpty, setIsModalInputEmpty] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const {modalDisplayFields, columnDefs, handleOk, handleCancel, handleSearch, handleSelect, onFinish } = useOwnerGridController(form, setIsModalInputEmpty, setInputValue)
  const [party, setParty] = useState(PARTY);
  const [playwood, setPlywood] = useState(PLYWOOD);
  const [creasing, setCreasing] = useState(CREASING);
  const [cutting, setCutting] = useState(CUTTING);

  useEffect(() => {
    setOwner(true);
  }, []);

  return (
    <>
      <AgGridTable columnDefs={columnDefs} />
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
                  setCreasing([...creasing, value]);
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
