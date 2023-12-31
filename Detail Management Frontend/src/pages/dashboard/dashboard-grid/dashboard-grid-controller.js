import { useMemo } from "react";
import { Button, message } from "antd";
import { handleGetDetails, handleUpdateJobDetails, handleGetOtpCall } from "../../../api/details-managment-api";
import { useAppStore } from "../../../store/store";

import moment from "moment-timezone";
import handleCookies from "../../../api/authentication/login";

const useDashboarsGridController = (prefix, checkSection, value, setVal) => {
  const { setRowData, jobStatus, setIsModalOpen, clickedCellData, setShowRowData, setIsStartEndModal, setSectionValue, setOwner } = useAppStore();
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
      await handleUpdateJobDetails(data, val._id);
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
      await handleUpdateJobDetails(data, val._id);
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
        field: "description",
        headerName: "JOB",
        filter: "agTextColumnFilter",
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

  const handleJobSection = async (sectionName, sectionValue, sectionPerformBy,) => {
    if ((clickedCellData[`${sectionName}StartedAt`] || (checkSection.sectionButtonName.toLowerCase() === sectionName || !sectionValue)) ) {
      if (clickedCellData.startedAt) {
        const data = {};
        const currentTime = moment.tz("Asia/Calcutta");

        if (
          (!clickedCellData[`${sectionName}StartedAt`] && sectionValue.length > 0) ||
          (clickedCellData[`${sectionName}StartedAt`] && (sectionValue.length > 0 || sectionPerformBy))
        ) {
          data[`${sectionName}By`] = Object.keys(value).includes(sectionName)? value[sectionName] : clickedCellData[`${sectionName}By`];

          if (!clickedCellData[`${sectionName}StartedAt`]) {
            data[`${sectionName}StartedAt`] = currentTime.format("dddd DD-MM-YYYY hh:mm:ss A");
          } else {
            data[`${sectionName}EndedAt`] = currentTime.format("dddd DD-MM-YYYY hh:mm:ss A");
          }
          setIsStartEndModal(false);
          setSectionValue("");
        } else {
          message.error(`Please select ${sectionName} by`);
        }

        await handleUpdateJobDetails(data, clickedCellData._id);
        await getDetails();
        setSectionValue("");
      } else {
        message.error("Please Start The Job.");
        setSectionValue("");
      }
    }
    else {
      // setVal({});
      message.error(`${checkSection.sectionButtonName.toUpperCase()} department employees cannot work in ${sectionName.toUpperCase()} department.`);
      setIsStartEndModal(false);
    }

  }

  return {
    handleCancel,
    handleOk,
    getDetails,
    handleStartEndModalBtn,
    handleJobSection,
    gridColumnDefs,
    modalDisplayFields,
    startAndEndModalDisplayField,
  }
}

export default useDashboarsGridController