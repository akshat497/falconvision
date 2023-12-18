import { createSlice } from "@reduxjs/toolkit";

const deletecontactUsSlice=createSlice({
    name:"deletecontactus",
    initialState: {
        deletecontactus: null,
        deletecontactusloading: false,
        deletecontactuserror: null,
      },
      reducers: {
        setdeleteContactus: (state, action) => {
          state.deletecontactus = action.payload;
        },
        setdeleteContactusloading: (state, action) => {
          state.deletecontactusloading = action.payload;
        },
        setdeleteContactuserror: (state, action) => {
          state.deletecontactuserror = action.payload;
        },
      },
})
export const { setdeleteContactus, setdeleteContactusloading, setdeleteContactuserror } = deletecontactUsSlice.actions;
export default deletecontactUsSlice.reducer;