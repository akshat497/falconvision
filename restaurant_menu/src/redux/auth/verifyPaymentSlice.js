import { createSlice } from "@reduxjs/toolkit";

const verifyPayment = createSlice({
  name: "verifypayment",
  initialState: {
    Verifypayment: null,
    Verifypaymentloading: false,
    Verifypaymenterror: null,
  },
  reducers: {
    setVerifyPayment: (state, action) => {
      state.Verifypayment = action.payload;
    },
    setVerifyPaymentLoading: (state, action) => {
      state.Verifypaymentloading = action.payload;
    },
    setVerifyPaymentError: (state, action) => {
      state.Verifypaymenterror = action.payload;
    },
  },
});

export const { setVerifyPayment, setVerifyPaymentLoading, setVerifyPaymentError } = verifyPayment.actions;
export default verifyPayment.reducer;
