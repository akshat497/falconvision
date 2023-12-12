import { createSlice } from "@reduxjs/toolkit";

const qrGeneratorSlice = createSlice({
  name: "qrgenerator",
  initialState: {
    qr: null,
    qrloading: false,
    qrerror: null,
  },
  reducers: {
    setQr: (state, action) => {
      state.qr = action.payload;
    },
    setQrLoading: (state, action) => {
      state.qrloading = action.payload;
    },
    setQrError: (state, action) => {
      state.qrerror = action.payload;
    },
  },
});

export const { setQr, setQrLoading, setQrError } = qrGeneratorSlice.actions;
export default qrGeneratorSlice.reducer;
