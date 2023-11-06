import React, {useState} from "react";

import {useAppStore} from "../../store/store";
import {Form, Input, Select, Button, message as Message} from "antd";
import {handleCreateDetail, handleGetDetails} from "../../api/details-managment-api";
import { PARTY, CREATEDBY, PLYWOOD, CUTTING, CREASING } from "../../utils/enums";
import "./form.css";

const {Option} = Select;

const ContactForm = () => {

  const {setRowData, setShowRowData} = useAppStore();
  const [form] = Form.useForm();
  const [inputValue, setInputValue] = useState("");
  const [party, setParty] = useState(PARTY);
  const [plywood, setPlywood] = useState(PLYWOOD);
  const [cutting, setCutting] = useState(CUTTING);
  const [creasing, setCreasing] = useState(CREASING);

  const getDetails = async () => {
    try {
      const {data} = await handleGetDetails();
      if (data.data.length > 0) {
        setRowData(data.data);
      } else {
        setShowRowData(true);
      }
    } catch (err) {}
  };

  const onFinish = async (values) => {
    // Handle form submission here
		if(values){
    const newRow = {
      createdBy: values.createdBy,
      description: values.job,
      name: Array.isArray(values.party)?values.party[0]:values.party,
      cutting: Array.isArray(values.cutting)?values.cutting[0]:values.cutting,
      plywood: Array.isArray(values.plywood)?values.plywood[0]:values.plywood,
      creasing: Array.isArray(values.creasing)?values.creasing[0]:values.creasing,
    };
    await handleCreateDetail(newRow);
    await getDetails();
		Message.success("Create successfully!");
    form.resetFields();
	} else {
		Message.error("Please Fill Details!");
	}
    // setRowData(values); // Update the state or perform any other action
  };

  const handleSearch = (value) => {
    setInputValue(value);
  };

  const handleSelect = (value) => {
    setInputValue("");
  };

  return (
    <Form form={form} name="myForm" onFinish={onFinish} layout="inline" style={{marginBottom: '20px'}}>
      <Form.Item
        name="createdBy"
        label="Job Created By"
        rules={[{required: true, message: "Please select a job creator name."}]}
      >
        <Select style={{width: "190px"}} placeholder="Select job creator name">
          {
            CREATEDBY.map((person, index) => (
              <Option key={index} value={person}>
                {person}
              </Option>
            ))
          }
        </Select>
      </Form.Item>
      <Form.Item
        name="party"
        label="Party"
        rules={ [{required: true, message: "Please select or add a party"}]}
      >
        <Select
          style={{width: "180px"}}
          showSearch
          mode="tags"
          placeholder="Select or add a party"
          value={inputValue}
          onChange={handleSelect}
          onSearch={handleSearch}
          onSelect={(value) => {
            if (!party.includes(value.trim())) {
              setParty([...party, value]);
            }
          }}
        >
          {party.map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="job"
        label="Job No."
        rules={[{required: true, message: "Please enter a job number"}]}
      >
        <Input style={{width:"150px"}} placeholder="Enter a job number  " />
      </Form.Item>
      <Form.Item
        name="plywood"
        label="Plywood"
        rules={ [{required: true, message: "Please select or add a plywood"}]}
      >
        <Select
          style={{width: "198px"}}
          showSearch
          mode="tags"
          placeholder="Select or add a plywood"
          value={inputValue}
          onChange={handleSelect}
          onSearch={handleSearch}
          onSelect={(value) => {
            if (!plywood.includes(value.trim())) {
              setPlywood([...plywood, value]);
            }
          }}
        >
          {plywood.map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="cutting"
        label="Cutting"
        rules={ [{required: true, message: "Please select or add a cutting"}]}
      >
        <Select
          style={{width: "185px"}}
          showSearch
          mode="tags"
          placeholder="Select or add a cutting"
          value={inputValue}
          onChange={handleSelect}
          onSearch={handleSearch}
          onSelect={(value) => {
            if (!cutting.includes(value.trim())) {
              setCutting([...cutting, value]);
            }
          }}
        >
          {cutting.map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="creasing"
        label="Creasing"
        rules={ [{required: true, message: "Please select or add a creasing"}]}
      >
        <Select
          style={{width: "199px"}}
          showSearch
          mode="tags"
          placeholder="Select or add a creasing"
          value={inputValue}
          onChange={handleSelect}
          onSearch={handleSearch}
          onSelect={(value) => {
            if (!creasing.includes(value.trim())) {
              setCreasing([...creasing, value]);
            }
          }}
        >
          {creasing.map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ContactForm;
