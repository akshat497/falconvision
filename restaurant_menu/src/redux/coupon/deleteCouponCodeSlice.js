
import { createSlice } from "@reduxjs/toolkit";

const deleteCouponCodeSlice = createSlice({
  name: "deletecoupon",
  initialState: {
    deletecoupon: null,
    deletecouponLoading: false,
    deletecouponerror: null,
  },
  reducers: {
    setDeleteCoupon: (state, action) => {
      state.deletecoupon = action.payload;
    },
    setDeleteCouponloading: (state, action) => {
      state.deletecouponLoading = action.payload;
    },
    setDeleteCouponerror: (state, action) => {
      state.deletecouponerror = action.payload;
    },
  },
});

export const { setDeleteCoupon, setDeleteCouponloading, setDeleteCouponerror } = deleteCouponCodeSlice.actions;
export default deleteCouponCodeSlice.reducer;
