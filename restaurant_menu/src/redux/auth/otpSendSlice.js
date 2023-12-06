import { createSlice } from "@reduxjs/toolkit";

const otpSendSlice = createSlice({
  name: "otpsend",
  initialState: {
    otp: null,
    otploading: false,
    otperror: null,
  },
  reducers: {
    setOtp: (state, action) => {
      state.otp = action.payload;
      
    },
    setOtpLoading: (state, action) => {
      state.otploading = action.payload;
    },
    setOtpError: (state, action) => {
      state.otperror = action.payload;
    },
  },
});

export const { setOtp, setOtpLoading, setOtpError } = otpSendSlice.actions;
export default otpSendSlice.reducer;
