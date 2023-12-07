
import { createSlice } from "@reduxjs/toolkit";

const getCouponCodeSlice = createSlice({
  name: "getCoupon",
  initialState: {
    getCoupon: null,
    getCouponloading: false,
    getCouponerror: null,
  },
  reducers: {
    setGetCoupon: (state, action) => {
      state.getCoupon = action.payload;
    },
    setGetCouponLoading: (state, action) => {
      state.getCouponloading = action.payload;
    },
    setGetCouponError: (state, action) => {
      state.getCouponerror = action.payload;
    },
  },
});

export const { setGetCoupon, setGetCouponLoading, setGetCouponError } = getCouponCodeSlice.actions;
export default getCouponCodeSlice.reducer;
