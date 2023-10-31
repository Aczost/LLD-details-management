const API_ENDPOINT_V1 = "https://details-management-kv4b.onrender.com/details-management/api/v1";
// const API_ENDPOINT_V1 = "http://localhost:4000/details-management/api/v1";
const API_ENDPOINT = API_ENDPOINT_V1;
const STATISTICS_API = {
  GET_DETAILS : `${API_ENDPOINT}/get-details`,
  POST_DETAILS : `${API_ENDPOINT}/add-details`,
  UPDATE_DETAILS : `${API_ENDPOINT}/update-details`,
  DELETE_DETAILS : `${API_ENDPOINT}/delete-details`,
  BULKINSERT_DETAILS : `${API_ENDPOINT}/bulk-insert-details`,
  UPDATE_TASK_STATUS: `${API_ENDPOINT}/task-status`,
  UPDATE_START_END_DURATION: `${API_ENDPOINT}/task-picked-status`
};
export const PASSWORD = '820987';

export const DYNAMICOPTIONS = {
  DESIGN: ["Praful", "Dhruvanshu"],
  LASER: ['Vicky', 'Mahindra', 'Dhruvanshu'],
  BENDER: ['Mahindra', 'Manoj', 'Vicky', 'Dhruvanshu',],
  DELIVERY: ['Vinod', 'Bhola Kaka', 'Vivek', 'Dhruvanshu'],
  FITTING: ['Raju', 'Shatru', 'Nikul', 'Vicky', 'Dhruvanshu'],
  CREASING: ['Vivek', 'Parag', 'Manoj', 'Vicky', 'Mahindra', 'Raju', 'Shatru', 'Nikul', 'Dhruvanshu']
}
export const PARTY = ['LPP'];
export const CREATEDBY = ['Dhruvanshu', "Praful"]
export const PLYWOOD = ['18mm', '18mm  Birch', '15mm']
export const CUTTING = ['Black Cat (23.80mm) CB', 'Black Cat (23.80mm) LCB', 'Juho (23.80mm) CB', 'Juho (23.80mm) LCB', 'Bohmer (23.80mm) CB', 'Bohmer (23.80mm) LCB', 'Aitches (23.80mm) CB']
export const CREASING = ['Sigma (23.25mm)', 'Bohmer (23.25mm)', 'Juho (23.25mm)', 'Juho (23.30mm)', 'DTL (23.25mm)' ]
export const ALLJOBSECTION = [
  {
    title: "Design",
  },
  {
    title: "Laser",
  },
  {
    title: "Bender",
  },
  {
    title: "Fitting",
  },
  {
    title: "Creasing",
  },
  {
    title: "Delivery",
  },
];

export const API_ROUTES = {
  ...STATISTICS_API,
};