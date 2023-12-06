import { createSlice } from "@reduxjs/toolkit";

const ResetPasswordSlice = createSlice({
  name: "reset",
  initialState: {
    reset: null,
    resetloading: false,
    reseterror: null,
  },
  reducers: {
    setReset: (state, action) => {
      state.reset = action.payload;
      
    },
    setResetloading: (state, action) => {
      state.resetloading = action.payload;
    },
    setReseterror: (state, action) => {
      state.reseterror = action.payload;
    },
  },
});

export const { setReset, setResetloading, setReseterror } = ResetPasswordSlice.actions;
export default ResetPasswordSlice.reducer;
