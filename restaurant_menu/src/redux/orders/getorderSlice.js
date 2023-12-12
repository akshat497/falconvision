
import { createSlice } from "@reduxjs/toolkit";

const getOrderSlice = createSlice({
  name: "getOrder",
  initialState: {
    order: null,
    loading: false,
    error: null,
  },
  reducers: {
    setorder: (state, action) => {
      state.order = action.payload;
    },
    setorderLoading: (state, action) => {
      state.loading = action.payload;
    },
    setorderError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setorder, setorderLoading, setorderError } = getOrderSlice.actions;
export default getOrderSlice.reducer;
