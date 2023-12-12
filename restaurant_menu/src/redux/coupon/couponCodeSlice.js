import { createSlice } from "@reduxjs/toolkit";

const couponCodeSlice=createSlice({
    name:"couponcodes",
    initialState: {
        couponcode: null,
        couponcodeloading: false,
        couponcodeerror: null,
      },
      reducers: {
        setCouponCode: (state, action) => {
          state.couponcode = action.payload;
        },
        setCouponCodeloading: (state, action) => {
          state.couponcodeloading = action.payload;
        },
        setCouponCodeerror: (state, action) => {
          state.couponcodeerror = action.payload;
        },
      },
})
export const { setCouponCode, setCouponCodeloading, setCouponCodeerror } = couponCodeSlice.actions;
export default couponCodeSlice.reducer;