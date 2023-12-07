import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    setUserLogin: (state, action) => {
      state.user = action.payload;
      
    },
    setLoadingLogin: (state, action) => {
      state.loading = action.payload;
    },
    setErrorLogin: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUserLogin, setLoadingLogin, setErrorLogin } = loginSlice.actions;
export default loginSlice.reducer;
