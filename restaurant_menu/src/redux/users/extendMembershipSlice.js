
import { createSlice } from "@reduxjs/toolkit";

const extendMembershipSlice = createSlice({
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

export const { setextendmembership, setextendmembershiploading, setextendmembershiperror } = extendMembershipSlice.actions;
export default extendMembershipSlice.reducer;
