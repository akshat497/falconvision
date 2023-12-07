
import { createSlice } from "@reduxjs/toolkit";

const generateCoupenCodeSlice = createSlice({
  name: "generatecoupencode",
  initialState: {
    generatecoupencode: null,
    generatecoupencodeloading: false,
    generatecoupencodeerror: null,
  },
  reducers: {
    setGenerateCoupenCode: (state, action) => {
      state.generatecoupencode = action.payload;
    },
    setGenerateCoupenCodeLoading: (state, action) => {
      state.generatecoupencodeloading = action.payload;
    },
    setGenerateCoupenCodeError: (state, action) => {
      state.generatecoupencodeerror = action.payload;
    },
  },
});

export const { setGenerateCoupenCode, setGenerateCoupenCodeLoading, setGenerateCoupenCodeError } = generateCoupenCodeSlice.actions;
export default generateCoupenCodeSlice.reducer;
