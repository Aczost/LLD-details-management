import React, { useEffect, useState } from "react";
import { Form, Modal, Descriptions, Button } from "antd";
import { useAppStore } from "../../../store/store";

import AgGridTable from "../../../components/table/table";
import useDashboarsGridController from "./dashboard-grid-controller";
import Section from "../../../components/list/list";

const DashboardGrid = () => {
  const { clickedCellData, columnHeaderName, setOwner, isStartEndModal } = useAppStore();
  const [prefix, setPrifix] = useState(columnHeaderName.split(" ")[0]);
  const [moduleStartValue, setModuleStartValue] = useState("");
  const [form] = Form.useForm();
  const { gridColumnDefs, handleCancel, handleStartEndModalBtn, startAndEndModalDisplayField, jobWorkerDetails } = useDashboarsGridController(prefix, moduleStartValue, setModuleStartValue);

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
        width={'90%'}
        style={{top:"5px"}}
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
