/* eslint-disable */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FilterState = {
  search: string;
  status: string[];
  category: string[];
  pricing: string;
};

const initialState: FilterState = {
  search: "",
  status: [],
  category: [],
  pricing: "",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<FilterState>>) => {
      return { ...state, ...action.payload };
    },
    resetFilters: () => initialState,
  },
});

export const { setFilters, resetFilters } = filterSlice.actions;
export const selectFilters = (state: any): FilterState => state.filters;
export default filterSlice.reducer;
