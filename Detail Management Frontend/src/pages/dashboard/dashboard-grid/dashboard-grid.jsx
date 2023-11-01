import React, { useEffect, useState } from "react";
import { Form, Modal, Descriptions, Button, Input } from "antd";
import { useAppStore } from "../../../store/store";

import AgGridTable from "../../../components/table/table";
import useDashboarsGridController from "./dashboard-grid-controller";
import Section from "../../../components/list/list";
import image from '../../../assets/LINK_LASER_DIE-removebg-preview.png'
import './dashboard-grid.css'


const DashboardGrid = () => {
  const { clickedCellData, columnHeaderName, setOwner, isStartEndModal, isOtpValid, setIsOtpValid, otpValue, setOtpValue } = useAppStore();
  const [prefix, setPrifix] = useState(columnHeaderName.split(" ")[0]);
  const [moduleStartValue, setModuleStartValue] = useState("");
  const [fetch, setFetch] = useState(false);
  const [form] = Form.useForm();
  const { gridColumnDefs, handleCancel, handleStartEndModalBtn, startAndEndModalDisplayField, jobWorkerDetails, handleOtpChange, handleVerify, handleGetOtp } = useDashboarsGridController(prefix, setFetch);

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

      <div className={`${!isOtpValid ? "blured-bck" : null}`}>
        <Modal
          closable={false}
          open={!isOtpValid}
          footer={[
            <Button key="verify" loading={fetch} type="primary" onClick={handleGetOtp}>
              Get OTP
            </Button>
          ]}>
          <div style={{ width: "100%" }}>
            <img src={image} alt="#Logo" style={{ width: "30%", height: "auto" }} />
          </div>
          <Form.Item
            name="otp"
            label="OTP"
            rules={[
              {
                required: true,
                message: 'Please enter the OTP',
              },
              {
                pattern: /^[0-9]{4}$/,
                message: 'Please enter a 4-digit OTP containing only numbers',
              },
            ]}
          >
            <Input type="text" placeholder="Enter OTP" maxLength={4} onKeyUp={handleOtpChange} />
          </Form.Item>
        </Modal>
      </div>

      <Modal
        width={'90%'}
        style={{ top: "5px" }}
        title={columnHeaderName}
        open={isStartEndModal}
        onCancel={handleCancel}
        footer={(_, { CancelBtn }) => (
          <>
            {clickedCellData.endedAt ? (
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
            ) : clickedCellData.inProcess ? (
              <>
                <Button
                  type="primary"
                  danger
                  onClick={() => handleStartEndModalBtn(clickedCellData)}

                >
                  End
                </Button>
              </>

            ) : (
              <Button type="primary"
                onClick={() => handleStartEndModalBtn(clickedCellData)}
              >
                Start
              </Button>
            )}
            <CancelBtn />
          </>
        )}
      >
        <hr style={{ marginBottom: "20px" }} />

        <Descriptions
          title={`Job Info Related to ${prefix.charAt(0).toUpperCase() + prefix.slice(1).toLowerCase()
            }.`}
          items={startAndEndModalDisplayField}
        />
        <Descriptions
          items={jobWorkerDetails}
        />
        <Section />
      </Modal>
    </>
  );
};

export default DashboardGrid;
