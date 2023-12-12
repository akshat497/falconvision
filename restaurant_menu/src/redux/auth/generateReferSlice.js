
import { createSlice } from "@reduxjs/toolkit";

const generateReferCodeSlice = createSlice({
  name: "generateReferCode",
  initialState: {
    generateReferCode: null,
    generateReferCodeloading: false,
    generateReferCodeerror: null,
  },
  reducers: {
    setgenerateReferCode: (state, action) => {
      state.generateReferCode = action.payload;
    },
    setgenerateReferCodeLoading: (state, action) => {
      state.generateReferCodeloading = action.payload;
    },
    setgenerateReferCodeError: (state, action) => {
      state.generateReferCodeerror = action.payload;
    },
  },
});

export const { setgenerateReferCode, setgenerateReferCodeLoading, setgenerateReferCodeError } = generateReferCodeSlice.actions;
export default generateReferCodeSlice.reducer;
