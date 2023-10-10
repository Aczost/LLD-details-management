import React, {useState} from "react";
import {Button, Modal, Input, message} from "antd";
import {PASSWORD} from "../utils/enums";

const Toggle = ({setOwner}) => {
	const [open, setOpen] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [password, setPasswords] = useState("");
	const handleOk = () => {
		setTimeout(() => {
			if (PASSWORD === password) {
				setOwner(true);
				message.success('Success!! 👍');
			} else {
				message.error("Wrong password!! 👎");
			}
		}, 1100);
		setPasswords("");
		setConfirmLoading(true);
		setTimeout(() => {
			setOpen(false);
			setConfirmLoading(false);
		}, 1000);
	};

	const handleCancel = () => {
		setOpen(false);
	};
	const showModal = () => {
		setOpen(true);
	};
	
	return (
		<>
			<Button type="primary" onClick={showModal}>
				Owner
			</Button>
			<Modal
				title="Enter Password"
				open={open}
				onOk={handleOk}
				confirmLoading={confirmLoading}
				onCancel={handleCancel}
			>
				<Input
					type="password"
					onChange={(e) => setPasswords(e.target.value)}
					value={password}
				/>
			</Modal>
		</>
	);
};

export default Toggle;
