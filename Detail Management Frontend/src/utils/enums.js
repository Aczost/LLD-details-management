const API_ENDPOINT_V1 = "https://details-management-kv4b.onrender.com/details-management/api/v1";
const API_ENDPOINT = API_ENDPOINT_V1;
const STATISTICS_API = {
  GET_DETAILS : `${API_ENDPOINT}/get-details`,
  POST_DETAILS : `${API_ENDPOINT}/add-details`,
  UPDATE_DETAILS : `${API_ENDPOINT}/update-details`,
  DELETE_DETAILS : `${API_ENDPOINT}/delete-details`,
  BULKINSERT_DETAILS : `${API_ENDPOINT}/bulk-insert-details`,
  UPDATE_TASK_STATUS: `${API_ENDPOINT}/task-status`,
};
export const PASSWORD = '12';
export const API_ROUTES = {
  ...STATISTICS_API,
};