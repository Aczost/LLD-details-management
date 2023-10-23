import { useMemo } from "react";
import { Button, message } from "antd";
import { handleGetDetails, handleStartEndAndDuration } from "../../../api/details-managment-api";
import { useAppStore } from "../../../store/store";
import { RiCheckboxCircleLine } from 'react-icons/ri'
import { CgSandClock } from 'react-icons/cg'
import { LiaUserClockSolid } from 'react-icons/lia'
import moment from "moment-timezone";

const useDashboarsGridController = () => {

  const { setRowData, jobStatus, setIsModalOpen, columnHeaderName } = useAppStore();

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
      await handleStartEndAndDuration(data, val.data.id);
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
      await handleStartEndAndDuration(data, val.data.id);
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
        filter: false, // If you don't want to filter this column
        editable: false,
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
                    // marginTop: '-14px'
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
        // field: "pickedBy",
        field: "laserBy",
        headerName: "LASER BY",
        filter: "agTextColumnFilter",
        editable: true,
        // cellEditor: "agSelectCellEditor",
        // cellEditorParams: {
        //   values: LASER,
        // },
        // onCellValueChanged: (event) => onChange(event),
        cellRenderer: (val) => {
          if (val.data.laserStartedAt && val.data.laserEndedAt) {
            // return <><span style={{marginRight:"10px"}}>{val.data.designBy}</span> <abbr title="Completed"><RiCheckboxCircleLine size={19}/></abbr></> 
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
        // cellEditor: "agSelectCellEditor",
        // cellEditorParams: {
        //   values: BENDER,
        // },
        // onCellValueChanged: (event) => onChange(event),
        cellRenderer: (val) => {
          if (val.data.benderStartedAt && val.data.benderEndedAt) {
            // return <><span style={{marginRight:"10px"}}>{val.data.designBy}</span> <abbr title="Completed"><RiCheckboxCircleLine size={19}/></abbr></> 
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
        // cellEditor: "agSelectCellEditor",
        // cellEditorParams: {
        //   values: FITTING,
        // },
        // onCellValueChanged: (event) => onChange(event),
        cellRenderer: (val) => {
          if (val.data.fittingStartedAt && val.data.fittingEndedAt) {
            // return <><span style={{marginRight:"10px"}}>{val.data.designBy}</span> <abbr title="Completed"><RiCheckboxCircleLine size={19}/></abbr></> 
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
        // cellEditor: "agSelectCellEditor",
        // cellEditorParams: {
        //   values: CREASING,
        // },
        // onCellValueChanged: (event) => onChange(event),
        cellRenderer: (val) => {
          if (val.data.creasingStartedAt && val.data.creasingEndedAt) {
            // return <><span style={{marginRight:"10px"}}>{val.data.designBy}</span> <abbr title="Completed"><RiCheckboxCircleLine size={19}/></abbr></> 
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

  const onFinish = (value) => {
  }

  return {
    handleCancel,
    handleOk,
    onFinish,
    gridColumnDefs,

  }
}

export default useDashboarsGridController