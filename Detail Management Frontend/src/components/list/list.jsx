import { useEffect } from 'react';
import { List, Card, Button, Select, Form } from 'antd'
import { useAppStore } from '../../store/store'
import { ALLJOBSECTION, DYNAMICOPTIONS } from '../../utils/enums'
import { RiCheckboxCircleLine } from 'react-icons/ri'
import { CgSandClock } from 'react-icons/cg'
import { LiaUserClockSolid } from 'react-icons/lia'
import { CiDeliveryTruck } from 'react-icons/ci'

import useListController from './list-controller';

const { Option } = Select;

const Section = () => {
  const [form] = Form.useForm();
  const { clickedCellData, sectionValue, setSectionValue, setSectionForm } = useAppStore()
  console.log("🚀 ~ file: list.jsx:13 ~ Section ~ clickedCellData:", clickedCellData.designStartedAt)
  const { handleJobSection } = useListController(form);
  useEffect(() => {
    setSectionForm(form)
  }, [])
  return (
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
          return <List.Item>
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
                            <LiaUserClockSolid size={"20px"} color="blue"  style={{ marginBottom: "-4px", marginLeft: "5px" }} />
                          </span>
                        </>
                      )
                  )
              }
            >


              {/* drop down */}
              {/* Form wrapper for Select component */}
              <Form form={form} name={`sectionForm${index}`}>
                <Form.Item
                  name={`section${index}`}
                  rules={[{ required: true, message: 'Please select or add a party' }]}
                >
                  <Select
                    placeholder={clickedCellData[`${sectionDetails.title.charAt(0).toLowerCase() + sectionDetails.title.slice(1)}EndedAt`] ? `Completed By ${clickedCellData[`${sectionDetails.title.charAt(0).toLowerCase() + sectionDetails.title.slice(1)}By`]}` : `Select ${sectionDetails.title} By`}
                    onSelect={async (val) => {
                      setSectionValue(val);
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
                    type="primary"
                    danger
                    onClick={() => handleJobSection(`${sectionDetails.title.charAt(0).toLowerCase() + sectionDetails.title.slice(1)}`, sectionValue)}
                  >
                    End
                  </Button>
                </>

              ) : (
                <Button type="primary"
                  onClick={() => handleJobSection(`${sectionDetails.title.charAt(0).toLowerCase() + sectionDetails.title.slice(1)}`, sectionValue)}
                >
                  Start
                </Button>
              )}
            </Card>
          </List.Item>
        }}
      />
    </>
  )
}

export default Section