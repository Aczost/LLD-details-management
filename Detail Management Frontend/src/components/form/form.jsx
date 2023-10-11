import React from "react";
import {Form, Input, Button, message as Message, Row, Col} from "antd";
import {UserOutlined, MessageOutlined} from "@ant-design/icons";
import {handleCreateDetail, handleGetDetails} from "../../api/details-managment-api";
import "./form.css";
import {useAppStore} from "../../store/store";

const {TextArea} = Input;

const ContactForm = () => {
	const {setRowData} = useAppStore();
	const [form] = Form.useForm();

	const getDetails = async () => {
		try {
			const {data} = await handleGetDetails();
			setRowData(data.data);
		} catch (err) {}
	};

	const onFinishCreate = () => {
		form
			.validateFields()
			.then(async (values) => {
				const {name, message} = values;
				if (name && message) {
					const newRow = {
						description: message,
						name: name,
					};
					await handleCreateDetail(newRow);
					await getDetails();
					form.resetFields();
					Message.success("Create successfully!");
				} else {
					alert("Please fill in both input fields.");
				}
			})
			.catch((error) => {
				console.error("Validation failed:", error);
			});
	};

	return (
		<div className="container-form">
				<div className="contact-form-container">
					<Form
						form={form}
						name="contact-form"
						layout="vertical"
						initialValues={{name: "", message: ""}}
					>
						<Form.Item
							name="name"
							label="Party"
							rules={[
								{
									required: true,
									message: "Please enter your party name!",
								},
							]}
						>
							<Input placeholder="Party Name" />
						</Form.Item>

						<Form.Item
							name="message"
							label="Job"
							rules={[
								{
									required: true,
									message: "Please enter your job description!",
								},
							]}
						>
							<TextArea
								rows={4}
								prefix={<MessageOutlined />}
								placeholder="Your job description"
							/>
						</Form.Item>

						<Row gutter={16}>
							<Col span={24}>
								<Form.Item>
									<Button
										type="primary"
										onClick={onFinishCreate}
										style={{
											width: "100%",
											background: "#24a0ed",
										}}
									>
										Create
									</Button>
								</Form.Item>
							</Col>
						</Row>
					</Form>
				</div>
		</div>
	);
};

export default ContactForm;
