
import { createSlice } from "@reduxjs/toolkit";

const authResetPasswordSlice = createSlice({
  name: "authresetpassword",
  initialState: {
    authresetpassword: null,
    authresetpasswordloading: false,
    authresetpassworderror: null,
  },
  reducers: {
    setAuthResetPassword: (state, action) => {
      state.authresetpassword = action.payload;
    },
    setAuthResetPasswordLoading: (state, action) => {
      state.authresetpasswordloading = action.payload;
    },
    setAuthResetPasswordError: (state, action) => {
      state.authresetpassworderror = action.payload;
    },
  },
});

export const { setAuthResetPassword, setAuthResetPasswordLoading, setAuthResetPasswordError } = authResetPasswordSlice.actions;
export default authResetPasswordSlice.reducer;
