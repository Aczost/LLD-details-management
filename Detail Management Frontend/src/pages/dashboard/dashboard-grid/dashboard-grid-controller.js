import { useMemo } from "react";
import { Button, message } from "antd";
import { handleGetDetails, handleStartEndAndDuration as updateJobDetails, } from "../../../api/details-managment-api";
import { useAppStore } from "../../../store/store";
import { RiCheckboxCircleLine } from 'react-icons/ri'
import { CgSandClock } from 'react-icons/cg'
import { LiaUserClockSolid } from 'react-icons/lia'

import moment from "moment-timezone";

const useDashboarsGridController = (form, prefix, moduleStartValue, setModuleStartValue) => {

  const { setRowData, jobStatus, setIsModalOpen, clickedCellData } = useAppStore();

  const getDetails = async () => {
    try {
      const { data } = await handleGetDetails();
      setRowData(data.data);
    } catch (err) { }
  };

  const handleStartEnd = async (val) => {
    if (!val.data.inProcess) {
      const data = {
        startedAt: moment
          .tz("Asia/Calcutta")
          .format("dddd DD-MM-YYYY hh:mm:ss A"),
        inProcess: true,
      };
      await updateJobDetails(data, val.data.id);
      await getDetails();
    }
    else if (val.data.inProcess && val.data.designEndedAt && val.data.laserEndedAt && val.data.benderEndedAt && val.data.fittingEndedAt && val.data.creasingEndedAt) {
      const endedAt = moment.tz("Asia/Calcutta");
      const startedAt = moment(
        val.data.startedAt,
        "dddd DD-MM-YYYY hh:mm:ss A"
      );
      const miliseconds = endedAt.diff(startedAt);
      const duration = moment.duration(miliseconds);
      const days = duration.days();
      const hours = duration.hours();
      const minutes = duration.minutes();
      const seconds = duration.seconds();
      const data = {
        endedAt: moment
          .tz("Asia/Calcutta")
          .format("dddd DD-MM-YYYY hh:mm:ss A"),
        duration: `${days}D, ${hours}H, ${minutes}M, ${seconds}S`,
      };
      await updateJobDetails(data, val.data.id);
      await getDetails();

    }
    else {
      message.info("Job is under process!")
    }
  };

  const handleOk = (value) => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const gridColumnDefs = useMemo(
    () => [
      {
        headerName: "SERIAL NO",
        valueGetter: (params) => params.node.rowIndex + 1,
        filter: false, 
        editable: false,
        pinned: 'left',
        width: "121px",
      },
      {
        field: "name",
        filter: "agTextColumnFilter",
        headerName: "PARTY",
        editable: false,
      },
      {
        field: "plywood",
        filter: "agTextColumnFilter",
        headerName: "PLYWOOD",
      },
      {
        field: "cutting",
        filter: "agTextColumnFilter",
        headerName: "CUTTING",
      },
      {
        field: "creasing",
        filter: "agTextColumnFilter",
        headerName: "CREASING",
      },
      {
        field: "description",
        headerName: "JOB",
        filter: "agTextColumnFilter",
        editable: false,
        width: "500px",
      },
      {
        field: "start",
        headerName: "START-END",
        cellRenderer: (val) => {
          return (
            <>
              {val.data.endedAt ? (
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
              ) : val.data.inProcess ? (
                <>
                  <Button
                    type="primary"
                    danger
                    onClick={() => handleStartEnd(val)}

                  >
                    End
                  </Button>
                </>

              ) : (
                <Button type="primary" onClick={() => handleStartEnd(val)} >
                  Start
                </Button>
              )}
            </>
          );
        },
      },
      {
        field: "designBy",
        headerName: "DESIGN BY",
        filter: "agTextColumnFilter",
        editable: true,
        cellRenderer: (val) => {
          if (val.data.designStartedAt && val.data.designEndedAt) {
            return (
              <div style={{ display: 'flex', }}>
                <div style={{ marginRight: "10px" }}>
                  <span>{val.data.designBy}</span>
                </div>
                <div style={{ marginTop: "5px" }}>
                  <abbr title="Completed"><RiCheckboxCircleLine size={20} color="#4CBB17" /></abbr>
                </div>
              </div>
            )
          }
          else if (val.data.designStartedAt && !(val.data.designEndedAt)) {
            return (
              <div style={{ display: 'flex', }}>
                <div style={{ marginRight: "10px" }}>
                  <span>{val.data.designBy}</span>
                </div>
                <div style={{ marginTop: "7px" }}>
                  <abbr title="Working..."><LiaUserClockSolid size={25} color="blue" /></abbr>
                </div>
              </div>
            )
          }
          else {
            return (
              <div style={{ marginTop: "7px" }}>
                <abbr title="Pending..."><CgSandClock size={25} color="orange" /></abbr>
              </div>
            )
          }
        }

      },
      {
        field: "laserBy",
        headerName: "LASER BY",
        filter: "agTextColumnFilter",
        editable: true,
        cellRenderer: (val) => {
          if (val.data.laserStartedAt && val.data.laserEndedAt) {
            return (
              <div style={{ display: 'flex', }}>
                <div style={{ marginRight: "10px" }}>
                  <span>{val.data.laserBy}</span>
                </div>
                <div style={{ marginTop: "5px" }}>
                  <abbr title="Completed"><RiCheckboxCircleLine size={20} color="#4CBB17" /></abbr>
                </div>
              </div>
            )
          }
          else if (val.data.laserStartedAt && !(val.data.laserEndedAt)) {
            return (
              <div style={{ display: 'flex', }}>
                <div style={{ marginRight: "10px" }}>
                  <span>{val.data.laserBy}</span>
                </div>
                <div style={{ marginTop: "7px" }}>
                  <abbr title="Working..."><LiaUserClockSolid size={25} color="blue" /></abbr>
                </div>
              </div>
            )
          }
          else {
            return (
              <div style={{ marginTop: "7px" }}>
                <abbr title="Pending..."><CgSandClock size={25} color="orange" /></abbr>
              </div>
            )
          }
        }
      },
      {
        // field: "pickedBy",
        field: "benderBy",
        headerName: "BENDER BY",
        filter: "agTextColumnFilter",
        editable: true,
        cellRenderer: (val) => {
          if (val.data.benderStartedAt && val.data.benderEndedAt) {
            return (
              <div style={{ display: 'flex', }}>
                <div style={{ marginRight: "10px" }}>
                  <span>{val.data.benderBy}</span>
                </div>
                <div style={{ marginTop: "5px" }}>
                  <abbr title="Completed"><RiCheckboxCircleLine size={20} color="#4CBB17" /></abbr>
                </div>
              </div>
            )
          }
          else if (val.data.benderStartedAt && !(val.data.benderEndedAt)) {
            return (
              <div style={{ display: 'flex', }}>
                <div style={{ marginRight: "10px" }}>
                  <span>{val.data.benderBy}</span>
                </div>
                <div style={{ marginTop: "7px" }}>
                  <abbr title="Working..."><LiaUserClockSolid size={25} color="blue" /></abbr>
                </div>
              </div>
            )
          }
          else {
            return (
              <div style={{ marginTop: "7px" }}>
                <abbr title="Pending..."><CgSandClock size={25} color="orange" /></abbr>
              </div>
            )
          }
        }
      },
      {
        // field: "pickedBy",
        field: "fittingBy",
        headerName: "FITTING BY",
        filter: "agTextColumnFilter",
        editable: true,
        cellRenderer: (val) => {
          if (val.data.fittingStartedAt && val.data.fittingEndedAt) {
            return (
              <div style={{ display: 'flex', }}>
                <div style={{ marginRight: "10px" }}>
                  <span>{val.data.fittingBy}</span>
                </div>
                <div style={{ marginTop: "5px" }}>
                  <abbr title="Completed"><RiCheckboxCircleLine size={20} color="#4CBB17" /></abbr>
                </div>
              </div>
            )
          }
          else if (val.data.fittingStartedAt && !(val.data.fittingEndedAt)) {
            return (
              <div style={{ display: 'flex', }}>
                <div style={{ marginRight: "10px" }}>
                  <span>{val.data.fittingBy}</span>
                </div>
                <div style={{ marginTop: "7px" }}>
                  <abbr title="Working..."><LiaUserClockSolid size={25} color="blue" /></abbr>
                </div>
              </div>
            )
          }
          else {
            return (
              <div style={{ marginTop: "7px" }}>
                <abbr title="Pending..."><CgSandClock size={25} color="orange" /></abbr>
              </div>
            )
          }
        }
      },
      {
        // field: "pickedBy",
        field: "creasingBy",
        headerName: "CREASING BY",
        filter: "agTextColumnFilter",
        editable: true,
        cellRenderer: (val) => {
          if (val.data.creasingStartedAt && val.data.creasingEndedAt) {
            return (
              <div style={{ display: 'flex', }}>
                <div style={{ marginRight: "10px" }}>
                  <span>{val.data.creasingBy}</span>
                </div>
                <div style={{ marginTop: "5px" }}>
                  <abbr title="Completed"><RiCheckboxCircleLine size={20} color="#4CBB17" /></abbr>
                </div>
              </div>
            )
          }
          else if (val.data.creasingStartedAt && !(val.data.creasingEndedAt)) {
            return (
              <div style={{ display: 'flex', }}>
                <div style={{ marginRight: "10px" }}>
                  <span>{val.data.creasingBy}</span>
                </div>
                <div style={{ marginTop: "7px" }}>
                  <abbr title="Working..."><LiaUserClockSolid size={25} color="blue" /></abbr>
                </div>
              </div>
            )
          }
          else {
            return (
              <div style={{ marginTop: "7px" }}>
                <abbr title="Pending..."><CgSandClock size={25} color="orange" /></abbr>
              </div>
            )
          }
        }
      },
      // {
      //   // field: "pickedBy",
      //   field: "deliverBy",
      //   headerName: "DELIVERY BY",
      //   filter: "agTextColumnFilter",
      //   editable: true,
      //   cellEditor: "agSelectCellEditor",
      //   cellEditorParams: {
      //     values: DELIVER,
      //   },
      //   onCellValueChanged: (event) => onChange(event),
      // cellRenderer: (val) => {
      //   // form={form} name="myForm" onFinish={onFinish}
      //   return (
      //     <>
      //       <Select
      //         onChange={handleSelect}
      //         style={{width: 180}}
      //         defaultValue={val}
      //         value={deliverValue}
      //       >
      //         <Option key={-1} value="Select">
      //           Select
      //         </Option>
      //         {DELIVER.map((option, index) => {
      //           return (
      //             <Option key={index} value={option}>
      //               {option.toUpperCase()}
      //             </Option>
      //           );
      //         })}
      //         <Option key={-2} value="Other"> other
      //         </Option>
      //       </Select>
      //     </>
      //   );
      // },
      // },
      {
        field: "startedAt",
        headerName: "STARTED AT",
        filter: "agTextColumnFilter",
        editable: false,
      },
      {
        field: "endedAt",
        headerName: "ENDED AT",
        filter: "agTextColumnFilter",
        editable: false,
      },
      {
        field: "duration",
        headerName: "DURATION",
        filter: "agTextColumnFilter",
      },
      {
        field: "createdAt",
        headerName: "CREATED ON",
        filter: "agTextColumnFilter",
      },
    ],
    [jobStatus]
  );

  const modalDisplayFields = [
    {
      key: 1,
      label: "Party",
      children: clickedCellData.name,
    },
    {
      key: 2,
      label: "Plywood",
      children: clickedCellData.plywood,
    },
    {
      key: 3,
      label: "Cutting",
      children: clickedCellData.cutting,
    },
    {
      key: 4,
      label: "Creasing",
      children: clickedCellData.creasing,
    },
    {
      key: 5,
      label: "Job",
      children: clickedCellData.description,
    },
    {
      key: 6,
      label: `${prefix.charAt(0).toUpperCase() + prefix.slice(1).toLowerCase()
        } By`,
      children: clickedCellData[`${prefix.toLowerCase()}By`],
    },
    {
      key: 7,
      label: "Starte At",
      children: clickedCellData[`${prefix.toLowerCase()}StartedAt`],
    },
    {
      key: 8,
      label: "Ended At",
      children: clickedCellData[`${prefix.toLowerCase()}EndedAt`],
    },
  ];

  const onFinish = async (value) => {
    if (clickedCellData.startedAt) {
      const data = {};
      if (
        !clickedCellData[`${prefix.toLowerCase()}StartedAt`] &&
        moduleStartValue.length > 0
      ) {
        data[`${prefix.toLowerCase()}By`] = moduleStartValue;
        data[`${prefix.toLowerCase()}StartedAt`] = moment
          .tz("Asia/Calcutta")
          .format("dddd DD-MM-YYYY hh:mm:ss A");
        setIsModalOpen(false);
        setModuleStartValue("");
      } else if (
        clickedCellData[`${prefix.toLowerCase()}StartedAt`] &&
        moduleStartValue.length > 0
      ) {
        data[`${prefix.toLowerCase()}By`] = moduleStartValue;
        data[`${prefix.toLowerCase()}EndedAt`] = moment
          .tz("Asia/Calcutta")
          .format("dddd DD-MM-YYYY hh:mm:ss A");
        setIsModalOpen(false);
        setModuleStartValue("");
      } else {
        message.error(`Please select ${prefix.toLowerCase()} by`);
      }
      await updateJobDetails(data, clickedCellData.id);
      await getDetails();
      form.resetFields();
      setModuleStartValue("");
    } else {
      message.error("Please Start The Job.");
    }
  };

  return {
    handleCancel,
    handleOk,
    onFinish,
    getDetails,
    gridColumnDefs,
    modalDisplayFields

  }
}

export default useDashboarsGridController