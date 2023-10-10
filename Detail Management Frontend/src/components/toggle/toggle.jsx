import React, {useRef, useState} from "react";
import {Button, Modal, Input, message} from "antd";
import {PASSWORD} from "../../utils/enums";
import {useNavigate} from "react-router-dom";

const Toggle = () => {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [password, setPasswords] = useState("");

	const inputRef = useRef(null);

	const handleOk = () => {
		setTimeout(() => {
			if (PASSWORD === password) {
				navigate("/owners");
				message.success("Success!! 👍");
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

		if (inputRef) {
			setTimeout(() => {
				inputRef?.current?.focus();
			}, 100);
		}
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
					ref={inputRef}
					autoFocus={true}
				/>
			</Modal>
		</>
	);
};

export default Toggle;
