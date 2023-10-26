import { useMemo } from "react";
import { Button, message } from "antd";
import { handleGetDetails, handleStartEndAndDuration as updateJobDetails, } from "../../../api/details-managment-api";
import { useAppStore } from "../../../store/store";
import { RiCheckboxCircleLine } from 'react-icons/ri'
import { CgSandClock } from 'react-icons/cg'
import { LiaUserClockSolid } from 'react-icons/lia'
import { CiDeliveryTruck} from 'react-icons/ci'

import moment from "moment-timezone";

const useDashboarsGridController = (form, prefix, moduleStartValue, setModuleStartValue) => {

  const { setRowData, jobStatus, setIsModalOpen, clickedCellData, setShowRowData, setIsStartEndModal } = useAppStore();

  const getDetails = async () => {
    try {
      setRowData([])
      const { data } = await handleGetDetails();
      if (data.data.length > 0) {
        setRowData(data.data);
      } else {
        setShowRowData(true);
      }
    } catch (err) { }
  };

  const handleStartEnd = async (val) => {
    setIsStartEndModal(true);
  };

  const handleStartEndModalBtn = async (val) => {
    if (!val.inProcess) {
      const data = {
        startedAt: moment
          .tz("Asia/Calcutta")
          .format("dddd DD-MM-YYYY hh:mm:ss A"),
        inProcess: true,
      };
      await updateJobDetails(data, val.id);
      setIsStartEndModal(false);
      await getDetails();
    }
    else if (val.inProcess && val.designEndedAt && val.laserEndedAt && val.benderEndedAt && val.fittingEndedAt && val.creasingEndedAt) {
      const endedAt = moment.tz("Asia/Calcutta");
      const startedAt = moment(
        val.startedAt,
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
      await updateJobDetails(data, val.id);
      setIsStartEndModal(false);
      await getDetails();
    }
    else {
      message.info("Job is under process!")
      // setIsStartEndModal(false);
    }
  }

  const handleOk = (value) => {
    setIsModalOpen(false);
    setIsStartEndModal(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsStartEndModal(false);
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
                  onClick={() => handleStartEnd(val)}
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
      {
        field: "deliveryBy",
        headerName: "DELIVERY BY",
        filter: "agTextColumnFilter",
        editable: true,
        cellRenderer: (val) => {
          if (val.data.deliveryStartedAt && val.data.deliveryEndedAt) {
            return (
              <div style={{ display: 'flex', }}>
                <div style={{ marginRight: "10px" }}>
                  <span>{val.data.deliveryBy}</span>
                </div>
                <div style={{ marginTop: "5px" }}>
                  <abbr title="Completed"><RiCheckboxCircleLine size={20} color="#4CBB17" /></abbr>
                </div>
              </div>
            )
          }
          else if (val.data.deliveryStartedAt && !(val.data.deliveryEndedAt)) {
            return (
              <div style={{ display: 'flex', }}>
                <div style={{ marginRight: "10px" }}>
                  <span>{val.data.deliveryBy}</span>
                </div>
                <div style={{ marginTop: "7px" }}>
                  <abbr title="On the way..."><CiDeliveryTruck size={25} color="blue" /></abbr>
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
    { key: 1, label: "Party", children: clickedCellData.name },
    { key: 2, label: "Plywood", children: clickedCellData.plywood },
    { key: 3, label: "Cutting", children: clickedCellData.cutting },
    { key: 4, label: "Creasing", children: clickedCellData.creasing },
    { key: 5, label: "Job", children: clickedCellData.description },
    { key: 6, label: `${prefix.charAt(0).toUpperCase() + prefix.slice(1).toLowerCase()} By`, children: clickedCellData[`${prefix.toLowerCase()}By`] },
    { key: 7, label: "Started At", children: clickedCellData[`${prefix.toLowerCase()}StartedAt`] },
    { key: 8, label: "Ended At", children: clickedCellData[`${prefix.toLowerCase()}EndedAt`] }
  ];

  const startAndEndModalDisplayField = [
    { key: 1, label: "Party", children: clickedCellData.name },
    { key: 2, label: "Plywood", children: clickedCellData.plywood },
    { key: 3, label: "Cutting", children: clickedCellData.cutting },
    { key: 4, label: "Creasing", children: clickedCellData.creasing },
    { key: 5, label: "Job", children: clickedCellData.description },
  ];
  
  const jobWorkerDetails = [
    createDetailItem(1, "Design By", "designBy"),
    createDetailItem(2, "Design Started At", "designStartedAt"),
    createDetailItem(3, "Design Ended At", "designEndedAt"),
    createDetailItem(4, "Laser By", "laserBy"),
    createDetailItem(5, "Laser Started At", "laserStartedAt"),
    createDetailItem(6, "Laser Ended At", "laserEndedAt"),
    createDetailItem(7, "Bender By", "benderBy"),
    createDetailItem(8, "Bender Started At", "benderStartedAt"),
    createDetailItem(9, "Bender Ended At", "benderEndedAt"),
    createDetailItem(10, "Fitting By", "fittingBy"),
    createDetailItem(11, "Fitting Started At", "fittingStartedAt"),
    createDetailItem(12, "Fitting Ended At", "fittingEndedAt"),
    createDetailItem(13, "Creasing By", "creasingBy"),
    createDetailItem(14, "Creasing Started At", "creasingStartedAt"),
    createDetailItem(15, "Creasing Ended At", "creasingEndedAt"),
    createDetailItem(16, "Delivery By", "deliveryBy"),
    createDetailItem(17, "Delivery Started At", "deliveryStartedAt"),
    createDetailItem(18, "Delivery Ended At", "deliveryEndedAt"),
    createDetailItem(19, "Job Created On", "createdAt"),
    createDetailItem(20, "Job Started At", "startedAt"),
    createDetailItem(21, "Job Ended At", "endedAt"),
    createDetailItem(22, "Duration", "duration"),
  ];

  function createDetailItem(key, label, property) {
    return {
      key,
      label,
      children: clickedCellData[property],
    };
  }
  
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
      const response = await updateJobDetails(data, clickedCellData.id);
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
    modalDisplayFields,
    handleStartEndModalBtn,
    startAndEndModalDisplayField,
    jobWorkerDetails
  }
}

export default useDashboarsGridController