
import { createSlice } from "@reduxjs/toolkit";

const updateupdateUserSlice = createSlice({
  name: "updateUser",
  initialState: {
    updateUser: null,
    updateUserloading: false,
    updateUsererror: null,
  },
  reducers: {
    setupdateUser: (state, action) => {
      state.updateUser = action.payload;
    },
    setupdateUserloading: (state, action) => {
      state.updateUserloading = action.payload;
    },
    setupdateUsererror: (state, action) => {
      state.updateUsererror = action.payload;
    },
  },
});

export const { setupdateUser, setupdateUserloading, setupdateUsererror } = updateupdateUserSlice.actions;
export default updateupdateUserSlice.reducer;
