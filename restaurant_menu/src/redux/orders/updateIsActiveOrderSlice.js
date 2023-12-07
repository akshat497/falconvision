
import { createSlice } from "@reduxjs/toolkit";

const updateIsActiveOrderSlice = createSlice({
  name: "updateisactiveorder",
  initialState: {
    isActiveOrder: null,
    isActiveOrderloading: false,
    isActiveOrdererror: null,
  },
  reducers: {
    setisActiveOrder: (state, action) => {
      state.isActiveOrder = action.payload;
    },
    setisActiveOrderloading: (state, action) => {
      state.isActiveOrderloading = action.payload;
    },
    setisActiveOrdererror: (state, action) => {
      state.isActiveOrdererror = action.payload;
    },
  },
});

export const { setisActiveOrder, setisActiveOrderloading, setisActiveOrdererror } = updateIsActiveOrderSlice.actions;
export default updateIsActiveOrderSlice.reducer;
