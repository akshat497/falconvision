import { createSlice } from "@reduxjs/toolkit";

const createPaymentSlice = createSlice({
  name: "createpayment",
  initialState: {
    payment: null,
    paymentloading: false,
    paymenterror: null,
  },
  reducers: {
    setPayment: (state, action) => {
      state.payment = action.payload;
    },
    setPaymentLoading: (state, action) => {
      state.paymentloading = action.payload;
    },
    setPaymentError: (state, action) => {
      state.paymenterror = action.payload;
    },
  },
});

export const { setPayment, setPaymentLoading, setPaymentError } = createPaymentSlice.actions;
export default createPaymentSlice.reducer;
