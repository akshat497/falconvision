import { createSlice } from "@reduxjs/toolkit";

const fetchcontactUsSlice=createSlice({
    name:"fetchcontactus",
    initialState: {
        fetchcontactus: null,
        fetchcontactusloading: false,
        fetchcontactuserror: null,
      },
      reducers: {
        setfetchContactus: (state, action) => {
          state.fetchcontactus = action.payload;
        },
        setfetchContactusloading: (state, action) => {
          state.fetchcontactusloading = action.payload;
        },
        setfetchContactuserror: (state, action) => {
          state.fetchcontactuserror = action.payload;
        },
      },
})
export const { setfetchContactus, setfetchContactusloading, setfetchContactuserror } = fetchcontactUsSlice.actions;
export default fetchcontactUsSlice.reducer;