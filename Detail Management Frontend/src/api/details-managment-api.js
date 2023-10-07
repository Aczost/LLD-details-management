import axios from 'axios';

const handleCreateDetail = async (data) => {
  const response = await axios.post('http://localhost:4000/details-management/api/v1/add-details', data);
  return response;
}

const handleGetDetails = async () => {
  const response = await axios.get('http://localhost:4000/details-management/api/v1/get-details');
  return response;
}

const handleEditDetail = async (data, id) => {
  const response = await axios.put(`http://localhost:4000/details-management/api/v1/update-details/${id}`, data);
  return response;
}

const handleDeleteDetail = async (id) => {
  const response = await axios.delete(`http://localhost:4000/details-management/api/v1/delete-details/${id}`);
  return response;
}

const handleDragDrop = async (data) => {
  const response = await axios.post('http://localhost:4000/details-management/api/v1/bulk-insert-details', data);
  return response;
}

export {handleCreateDetail, handleGetDetails, handleEditDetail, handleDeleteDetail, handleDragDrop}