import {create} from "zustand";
import {
  createDashboardSlice
} from "./slices";

export const useAppStore = create()((...a) => ({
  ...createDashboardSlice(...a)
}));
