import { useMemo } from "react";
import { Button, message } from "antd";
import { handleGetDetails, handleStartEndAndDuration as updateJobDetails, handleGetOtpCall } from "../../../api/details-managment-api";
import { useAppStore } from "../../../store/store";

import moment from "moment-timezone";
import handleCookies from "../../../api/authentication/login";

const useDashboarsGridController = (prefix,setFetch) => {
  const { setRowData, jobStatus, setIsModalOpen, clickedCellData, setShowRowData, setIsStartEndModal, setSectionValue, setIsOtpValid, otpValue, setOtpValue, setOtpValueFromApi, otpValueFromApi, setOwner, owner} = useAppStore();
  // console.log('otp from api', otpValueFromApi);
  const getDetails = async () => {
    try {
      setRowData([])
      const { data } = await handleGetDetails();
      if (data.data.length > 0) {
        setRowData(data.data);
        setOwner(false)
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
      setSectionValue('')
    }
    else if (val.inProcess && val.designEndedAt && val.laserEndedAt && val.benderEndedAt && val.fittingEndedAt && val.creasingEndedAt && val.deliveryEndedAt) {
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
      setSectionValue('')
    }
    else {
      message.info("Job is under process!")
      setSectionValue('')
    }
  }

  const handleOk = async (value) => {
    setIsModalOpen(false);
    setIsStartEndModal(false);
    setSectionValue('')
  };

  const handleCancel = async () => {
    setIsModalOpen(false);
    setIsStartEndModal(false);
    setSectionValue("")
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
        width: "178px",

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
      },
      {
        field: "start",
        headerName: "START-END",
        width: "135px",
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
    { key: 6, label: "Job Created On", children: clickedCellData.createdAt },
    { key: 7, label: "Job Started At", children: clickedCellData.startedAt },
    { key: 8, label: "Job Ended At", children: clickedCellData.endedAt },
    { key: 9, label: "Duration", children: clickedCellData.duration },

  ];

  const handleGetOtp = async () => {
    setFetch(true)
    const response = await handleGetOtpCall();
    handleCookies();
    setOtpValueFromApi(response.data.data);
    setFetch(false)
    message.info('OTP sent to your email.')
  }

  const handleOtpChange = (e) => {
    const userEnteredOtp = e.target.value;
    setOtpValue(userEnteredOtp);
    if (otpValueFromApi === userEnteredOtp) {
      setIsOtpValid(true);
    } 
    if(userEnteredOtp.length===4 && (otpValueFromApi !== userEnteredOtp)) {
      message.error('Invalid OTP please try again.')
    }
  };

  const handleJobSection = async (sectionName, sectionValue, sectionPerformBy) => {
    if (clickedCellData.startedAt) {
      const data = {};
      if (
        !clickedCellData[`${sectionName}StartedAt`] &&
        sectionValue.length > 0
      ) {
        data[`${sectionName}By`] = sectionValue;
        data[`${sectionName}StartedAt`] = moment
          .tz("Asia/Calcutta")
          .format("dddd DD-MM-YYYY hh:mm:ss A");
        setIsStartEndModal(false);
        setSectionValue("");
      } else if (
        clickedCellData[`${sectionName}StartedAt`] &&
        (sectionValue.length > 0 || sectionPerformBy)
      ) {
        data[`${sectionName}By`] = sectionValue;
        data[`${sectionName}EndedAt`] = moment
          .tz("Asia/Calcutta")
          .format("dddd DD-MM-YYYY hh:mm:ss A");
        setIsStartEndModal(false);
        setSectionValue("");
      } else {
        message.error(`Please select ${sectionName} by`);
      }
      await updateJobDetails(data, clickedCellData.id);
      await getDetails();
      setSectionValue("");
    } else {
      message.error("Please Start The Job.");
      setSectionValue("");
    }
  }

  return {
    handleCancel,
    handleOk,
    getDetails,
    handleStartEndModalBtn,
    handleOtpChange,
    handleGetOtp,
    handleJobSection,
    gridColumnDefs,
    modalDisplayFields,
    startAndEndModalDisplayField,
  }
}

export default useDashboarsGridController