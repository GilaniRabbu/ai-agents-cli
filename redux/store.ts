import { configureStore } from "@reduxjs/toolkit";
import { agentSlice } from "./agentSlice";
import filterReducer from "./filterSlice";

export const store = configureStore({
  reducer: {
    agents: agentSlice.reducer,
    filters: filterReducer,
  },
});
