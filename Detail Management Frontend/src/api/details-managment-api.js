import axios from 'axios';
import { API_ROUTES } from '../utils/enums.js';

const handleCreateDetail = async (data) => {
  const response = await axios.post(`${API_ROUTES.POST_DETAILS}`, data);
  return response;
}

const handleGetDetails = async () => {
  const response = await axios.get(`${API_ROUTES.GET_DETAILS}`);
  return response;
}

const handleEditDetail = async (data, id) => {
  const response = await axios.put(`${API_ROUTES.UPDATE_DETAILS}/${id}`, data);
  return response;
}

const handleDeleteDetail = async (id) => {
  const response = await axios.delete(`${API_ROUTES.DELETE_DETAILS}/${id}`);
  return response;
}

const handleDragDrop = async (data) => {
  const response = await axios.post(`${API_ROUTES.BULKINSERT_DETAILS}`, data);
  return response;
}

const handleTaskStatus = async (data, id) => {
  const response = await axios.put(`${API_ROUTES.UPDATE_TASK_STATUS}/${id}`, data);
  return response;
}

// to do change name 
const handleStartEndAndDuration = async (data, id) => {
  const response = await axios.put(`${API_ROUTES.UPDATE_START_END_DURATION}/${id}`, data);
  return response
}

const handleGetOtpCall = async () => {
  return await axios.get(`${API_ROUTES.GET_OTP}`);

}
export { handleCreateDetail, handleGetDetails, handleEditDetail, handleDeleteDetail, handleDragDrop, handleTaskStatus, handleStartEndAndDuration, handleGetOtpCall }