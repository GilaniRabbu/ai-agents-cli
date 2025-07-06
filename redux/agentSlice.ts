/* eslint-disable */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import mockAgents from "@/data/mock-agents.json";

type Filters = {
  search: string;
  status: string[];
  category: string[];
  pricing: string;
};

const initialState = {
  filters: {
    search: "",
    status: [],
    category: [],
    pricing: "",
  } as Filters,
};

export const agentSlice = createSlice({
  name: "agents",
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Partial<Filters>>) {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
    resetFilters(state) {
      state.filters = initialState.filters;
    },
  },
});

// Actions
export const { setFilters, resetFilters } = agentSlice.actions;

// Selectors
export const selectFilters = (state: any) => state.agents.filters;

export const selectFilteredAgents = (state: any) => {
  const { search, status, category, pricing } = state.agents.filters;

  return mockAgents.filter((agent) => {
    const matchSearch =
      !search ||
      agent.name.toLowerCase().includes(search.toLowerCase()) ||
      agent.description.toLowerCase().includes(search.toLowerCase());

    const matchStatus = !status.length || status.includes(agent.status);
    const matchCategory = !category.length || category.includes(agent.category);
    const matchPricing = !pricing || pricing === agent.pricingModel;

    return matchSearch && matchStatus && matchCategory && matchPricing;
  });
};
