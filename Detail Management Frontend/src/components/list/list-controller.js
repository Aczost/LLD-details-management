import { useAppStore } from "../../store/store";
import { handleGetDetails, handleStartEndAndDuration as updateJobDetails, } from "../../api/details-managment-api";

import moment from "moment-timezone";
import { message } from "antd";

const useListController = (sectionForm) => {
  const { setRowData, clickedCellData, setShowRowData, setIsStartEndModal, setSectionValue} = useAppStore();

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

  const handleJobSection = async (sectionName, sectionValue) => {
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
        // form.resetFields();
      } else if (
        clickedCellData[`${sectionName}StartedAt`] &&
        sectionValue.length > 0
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
    sectionForm.resetFields();
  }

  return {
    handleJobSection,
    getDetails
  }
}
export default useListController