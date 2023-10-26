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

  currentRow : {},
  setCurrentRow: (data) => {
    set({currentRow: data});
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

  defaultValue: '',
  setDefaultValue: (data) =>{
    set({defaultValue: data})
  },

  isStartEndModal: false,
  setIsStartEndModal: (data) => {
    set({isStartEndModal: data})
  }
  
});

export default createDashboardSlice
