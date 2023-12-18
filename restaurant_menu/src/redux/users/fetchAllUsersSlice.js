
import { createSlice } from "@reduxjs/toolkit";

const updatefetchAllUsersSlice = createSlice({
  name: "fetchAllUsers",
  initialState: {
    fetchAllUsers: null,
    fetchAllUsersloading: false,
    fetchAllUserserror: null,
  },
  reducers: {
    setfetchAllUsers: (state, action) => {
      state.fetchAllUsers = action.payload;
    },
    setfetchAllUsersloading: (state, action) => {
      state.fetchAllUsersloading = action.payload;
    },
    setfetchAllUserserror: (state, action) => {
      state.fetchAllUserserror = action.payload;
    },
  },
});

export const { setfetchAllUsers, setfetchAllUsersloading, setfetchAllUserserror } = updatefetchAllUsersSlice.actions;
export default updatefetchAllUsersSlice.reducer;
