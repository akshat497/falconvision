
import { createSlice } from "@reduxjs/toolkit";

const updateCouponCodeSlice = createSlice({
  name: "updatecoupon",
  initialState: {
    updatecoupon: null,
    updatecouponloading: false,
    updatecouponerror: null,
  },
  reducers: {
    setupdateCoupon: (state, action) => {
      state.updatecoupon = action.payload;
    },
    setupdateCouponloading: (state, action) => {
      state.updatecouponloading = action.payload;
    },
    setupdateCouponerror: (state, action) => {
      state.updatecouponerror = action.payload;
    },
  },
});

export const { setupdateCoupon, setupdateCouponloading, setupdateCouponerror } = updateCouponCodeSlice.actions;
export default updateCouponCodeSlice.reducer;
