
import { createSlice } from "@reduxjs/toolkit";

const getOrderSlice = createSlice({
  name: "salessummery",
  initialState: {
    sales: null,
    loadingsales: false,
    errorsales: null,
  },
  reducers: {
    setSales: (state, action) => {
      state.sales = action.payload;
    },
    setLoadingSales: (state, action) => {
      state.loadingsales = action.payload;
    },
    setErrorSales: (state, action) => {
      state.errorsales = action.payload;
    },
  },
});

export const { setSales, setLoadingSales, setErrorSales } = getOrderSlice.actions;
export default getOrderSlice.reducer;
