
import { createSlice } from "@reduxjs/toolkit";

const updateextendmembershipSlice = createSlice({
  name: "extendmembership",
  initialState: {
    extendmembership: null,
    extendmembershiploading: false,
    extendmembershiperror: null,
  },
  reducers: {
    setextendmembership: (state, action) => {
      state.extendmembership = action.payload;
    },
    setextendmembershiploading: (state, action) => {
      state.extendmembershiploading = action.payload;
    },
    setextendmembershiperror: (state, action) => {
      state.extendmembershiperror = action.payload;
    },
  },
});

export const { setextendmembership, setextendmembershiploading, setextendmembershiperror } = updateextendmembershipSlice.actions;
export default updateextendmembershipSlice.reducer;
