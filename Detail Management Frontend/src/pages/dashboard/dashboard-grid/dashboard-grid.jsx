import React, { useEffect, useState } from "react";
import { Form, Modal, Descriptions, Button, Input, Select, List, Card } from "antd";
import { useAppStore } from "../../../store/store";
import { ALLJOBSECTION, DYNAMICOPTIONS } from "../../../utils/enums";
import { RiCheckboxCircleLine } from 'react-icons/ri'
import { CgSandClock } from 'react-icons/cg'
import { LiaUserClockSolid } from 'react-icons/lia'

import Cookies from "js-cookie";
import AgGridTable from "../../../components/table/table";
import useDashboarsGridController from "./dashboard-grid-controller";
import image from '../../../assets/LINK_LASER_DIE-removebg-preview.png'
import './dashboard-grid.css'

const { Option } = Select;

const DashboardGrid = () => {
  const { clickedCellData, columnHeaderName, setOwner, isStartEndModal, isOtpValid, sectionValue, setSectionValue, setIsOtpValid } = useAppStore();
  const [prefix, setPrifix] = useState(columnHeaderName.split(" ")[0]);
  const [moduleStartValue, setModuleStartValue] = useState("");
  const [fetch, setFetch] = useState(false);
  const [form] = Form.useForm();
  const [checkSection, setCheckSection] = useState({sectionButtonName: '', sectionTitleName:'', sectionValueFrom: ''});
  const [val, setVal] = useState({});
  const { gridColumnDefs, handleCancel, handleStartEndModalBtn, startAndEndModalDisplayField, jobWorkerDetails, handleOtpChange, handleGetOtp, handleJobSection } = useDashboarsGridController(prefix, setFetch, checkSection, val, setVal);
  useEffect(() => {
    setOwner(false);
    const userInfo = Cookies.get('userInfo');
    const expirationTime = Cookies.get("expirationTime");
    if (userInfo && expirationTime && atob(userInfo) === 'Link Leaser Die User' && Number(expirationTime) >= Date.now()) {
      setIsOtpValid(true);
    }
  }, []);


  useEffect(() => {
    setPrifix(columnHeaderName.split(" ")[0]);
    form.resetFields();
  }, [clickedCellData]);

  return (
    <>
      <AgGridTable columnDefs={gridColumnDefs} />

      {/* <div className={`${!isOtpValid ? "blured-bck" : null}`}>
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
      </div> */}

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
        {/* <Section /> */}
        <>
          <List
            grid={{
              gutter: '16',
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 6,
              xxl: 3,
            }}
            dataSource={ALLJOBSECTION}
            renderItem={(sectionDetails, index) => {
              return <>
                {
                  clickedCellData && <List.Item>
                    {/* <Card title={sectionDetails.title }  > */}
                    <Card
                      title={
                        clickedCellData[`${sectionDetails.title.toLocaleLowerCase()}StartedAt`] &&
                          clickedCellData[`${sectionDetails.title.toLocaleLowerCase()}EndedAt`]
                          ? (
                            <>
                              <span>
                                {sectionDetails.title}
                              </span>
                              <span>
                                <RiCheckboxCircleLine size={"20px"} color="#4CBB17" style={{ marginBottom: "-4px", marginLeft: "5px" }} />
                              </span>
                            </>
                          )
                          : (
                            clickedCellData[`${sectionDetails.title.toLocaleLowerCase()}StartedAt`] &&
                              !clickedCellData[`${sectionDetails.title.toLocaleLowerCase()}EndedAt`]
                              ? (
                                <>
                                  <span>
                                    {sectionDetails.title}
                                  </span>
                                  <spna>
                                    <CgSandClock size={"20px"} color={"orange"} style={{ marginBottom: "-4px", marginLeft: "5px" }} />
                                  </spna>
                                </>
                              )
                              : (
                                <>
                                  <span>
                                    {sectionDetails.title}
                                  </span>
                                  <span>
                                    <LiaUserClockSolid size={"20px"} color="blue" style={{ marginBottom: "-4px", marginLeft: "5px" }} />
                                  </span>
                                </>
                              )
                          )
                      }
                    >


                      {/* drop down */}
                      <Form form={form} name={`sectionForm${index}`} >
                        <Form.Item
                          name={`section${index}`}
                          rules={[{ required: true, message: 'Please select or add a party' }]}
                        >

                          <Select
                            defaultValue={clickedCellData[`${sectionDetails.title.charAt(0).toLowerCase() + sectionDetails.title.slice(1)}By`] || undefined}
                            placeholder={`Select ${sectionDetails.title} By`}
                            onSelect={async (val) => {
                              setSectionValue(val);
                              setVal({ [sectionDetails.title.toLocaleLowerCase()]: val });
                              setCheckSection({
                                sectionButtonName: sectionDetails.button,
                                sectionTitleName: sectionDetails.title,
                              });
                            }}
                            style={{ width: '170px' }}
                          >
                            {sectionDetails.title
                              ? DYNAMICOPTIONS[sectionDetails.title.toUpperCase()].map((option, index) => (
                                <Option key={index} value={option}>
                                  {option}
                                </Option>
                              ))
                              : null}
                          </Select>
                        </Form.Item>
                      </Form>

                      {/* section information */}
                      <div>
                        <p>
                          {`${sectionDetails.title} By`} : {clickedCellData[`${sectionDetails.title.charAt(0).toLowerCase() + sectionDetails.title.slice(1)}By`]}
                          <br />
                          {`${sectionDetails.title} Started At`} : {clickedCellData[`${sectionDetails.title.charAt(0).toLowerCase() + sectionDetails.title.slice(1)}StartedAt`]}
                          <br />
                          {`${sectionDetails.title} Ended At`} : {clickedCellData[`${sectionDetails.title.charAt(0).toLowerCase() + sectionDetails.title.slice(1)}EndedAt`]}
                          <br />
                        </p>
                      </div>

                      {/* button for lists */}
                      {clickedCellData[`${sectionDetails.title.charAt(0).toLowerCase() + sectionDetails.title.slice(1)}EndedAt`] ? (
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
                      ) : clickedCellData[`${sectionDetails.title.charAt(0).toLowerCase() + sectionDetails.title.slice(1)}StartedAt`] ? (
                        <>
                          <Button
                            name={`${sectionDetails.button}`}
                            type="primary"
                            danger
                            onClick={() => handleJobSection(`${sectionDetails.title.charAt(0).toLowerCase() + sectionDetails.title.slice(1)}`, sectionValue, clickedCellData[`${sectionDetails.title.charAt(0).toLowerCase() + sectionDetails.title.slice(1)}By`])}
                          >
                            End
                          </Button>
                        </>

                      ) : (
                        <Button type="primary"
                            name={`${sectionDetails.button}`}
                          onClick={() => handleJobSection(`${sectionDetails.title.charAt(0).toLowerCase() + sectionDetails.title.slice(1)}`, sectionValue, clickedCellData[`${sectionDetails.title.charAt(0).toLowerCase() + sectionDetails.title.slice(1)}By`])}
                        >
                          Start
                        </Button>
                      )}
                    </Card>
                  </List.Item>
                }
              </>
            }}
          />
        </>
      </Modal>
    </>
  );
};

export default DashboardGrid;
