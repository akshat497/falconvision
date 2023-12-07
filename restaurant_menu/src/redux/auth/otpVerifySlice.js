import { createSlice } from "@reduxjs/toolkit";

const otpVerifySlice = createSlice({
  name: "otpverify",
  initialState: {
    v_otp: null,
    v_otploading: false,
    v_otperror: null,
  },
  reducers: {
    setOtpVerify: (state, action) => {
      state.v_otp = action.payload;
    },
    setOtpLoadingVerify: (state, action) => {
      state.v_otploading = action.payload;
    },
    setOtpErrorVerify: (state, action) => {
      state.v_otperror = action.payload;
    },
  },
});

export const { setOtpVerify, setOtpLoadingVerify, setOtpErrorVerify } = otpVerifySlice.actions;
export default otpVerifySlice.reducer;
