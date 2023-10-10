const createDashboardSlice = (set, get) => ({
  rowData: [],
  setRowData: (data) => {
    set({rowData: data});
  },

  owner: false,
  setOwner: (data) => {
    set({owner: data})
  }

});

export default createDashboardSlice
