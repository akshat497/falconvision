import { createSlice } from "@reduxjs/toolkit";

const contactUsSlice=createSlice({
    name:"contactus",   
    initialState: {
        contactus: null,
        contactusloading: false,
        contactuserror: null,
      },
      reducers: {
        setContactus: (state, action) => {
          state.contactus = action.payload;
        },
        setContactusloading: (state, action) => {
          state.contactusloading = action.payload;
        },
        setContactuserror: (state, action) => {
          state.contactuserror = action.payload;
        },
      },
})
export const { setContactus, setContactusloading, setContactuserror } = contactUsSlice.actions;
export default contactUsSlice.reducer;