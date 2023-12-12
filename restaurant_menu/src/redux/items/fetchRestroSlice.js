
import { createSlice } from "@reduxjs/toolkit";

const fetchRestroSlice = createSlice({
  name: "restrodetail",
  initialState: {
    restro: null,
    loading: false,
    error: null,
  },
  reducers: {
    setRestro: (state, action) => {
      state.restro = action.payload;
    },
    setRestroLoading: (state, action) => {
      state.loading = action.payload;
    },
    setRestroError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setRestro, setRestroLoading, setRestroError } = fetchRestroSlice.actions;
export default fetchRestroSlice.reducer;
