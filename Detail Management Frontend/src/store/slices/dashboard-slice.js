const createDashboardSlice = (set, get) => ({
  rowData: [],
  setRowData: (data) => {
    set({ rowData: data });
  },

  owner: false,
  setOwner: (data) => {
    set({ owner: data })
  },

  jobStatus: false,
  setJobStatus: () => {
    set((prev) => ({ jobStatus: !prev.jobStatus }));
  },

  pickedBy: null,
  setPickedBy: (data) => {
    set({pickedBy: data})
  },

  isModalOpen: false,
  setIsModalOpen: (data) => {
    set({isModalOpen: data})
  },

  clickedCellData: {},
  setClickedCellData: (data) => {
    set({clickedCellData: data})
  },

  columnHeaderName: '',
  setColumnHeaderName: (data) =>{
    set({columnHeaderName: data})
  },

  isStartEndModal: false,
  setIsStartEndModal: (data) => {
    set({isStartEndModal: data})
  },

  sectionValue: "",
  setSectionValue: (data) => {
    set({sectionValue: data})
  },

  sectionForm: {},
  setSectionForm: (data) => {
    set({sectionForm: data})
  },

  isOtpValid: false,
  setIsOtpValid: (data) => {
    set({isOtpValid: data})
  },

  otpValue: null,
  setOtpValue: (data) =>{
    set({otpValue: data})
  },

  otpValueFromApi: null,
  setOtpValueFromApi: (data) =>{
    set({otpValueFromApi: data})
  },

});

export default createDashboardSlice
