
import { createSlice } from "@reduxjs/toolkit";

const createOrderSlice = createSlice({
  name: "createorder",
  initialState: {
    createorder: null,
    createorderloading: false,
    createordererror: null,
  },
  reducers: {
    setcreateorder: (state, action) => {
      state.createorder = action.payload;
    },
    setcreateorderloading: (state, action) => {
      state.createorderloading = action.payload;
    },
    setcreateordererror: (state, action) => {
      state.createordererror = action.payload;
    },
  },
});

export const { setcreateorder, setcreateorderloading, setcreateordererror } = createOrderSlice.actions;
export default createOrderSlice.reducer;
