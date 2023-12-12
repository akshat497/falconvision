
import { createSlice } from "@reduxjs/toolkit";

const forgetPasswordSlice = createSlice({
  name: "forgetpassword",
  initialState: {
    forgetpassword: null,
    forgetpasswordloading: false,
    forgetpassworderror: null,
  },
  reducers: {
    setForgetPassword: (state, action) => {
      state.forgetpassword = action.payload;
    },
    setForgetPasswordLoading: (state, action) => {
      state.forgetpasswordloading = action.payload;
    },
    setForgetPasswordError: (state, action) => {
      state.forgetpassworderror = action.payload;
    },
  },
});

export const { setForgetPassword, setForgetPasswordLoading, setForgetPasswordError } = forgetPasswordSlice.actions;
export default forgetPasswordSlice.reducer;
