
import { createSlice } from "@reduxjs/toolkit";

const deleteitemSlice = createSlice({
  name: "deleteitem",
  initialState: {
    d_item: null,
    d_itemLoading: false,
    d_itemerror: null,
  },
  reducers: {
    setDeleteItem: (state, action) => {
      state.d_item = action.payload;
    },
    setDeleteItemloading: (state, action) => {
      state.d_itemLoading = action.payload;
    },
    setDeleteItemerror: (state, action) => {
      state.d_itemerror = action.payload;
    },
  },
});

export const { setDeleteItem, setDeleteItemloading, setDeleteItemerror } = deleteitemSlice.actions;
export default deleteitemSlice.reducer;
