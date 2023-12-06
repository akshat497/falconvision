
import { createSlice } from "@reduxjs/toolkit";

const UpdateItemSlice = createSlice({
  name: "updateitem",
  initialState: {
    u_Item: null,
    u_Itemloading: false,
    u_Itemerror: null,
  },
  reducers: {
    setupdateItem: (state, action) => {
      state.u_Item = action.payload;
    },
    setupdateItemloading: (state, action) => {
      state.u_Itemloading = action.payload;
    },
    setupdateItemerror: (state, action) => {
      state.u_Itemerror = action.payload;
    },
  },
});

export const { setupdateItem, setupdateItemloading, setupdateItemerror } = UpdateItemSlice.actions;
export default UpdateItemSlice.reducer;
