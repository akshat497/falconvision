
import { createSlice } from "@reduxjs/toolkit";

const addItemSlice = createSlice({
  name: "additem",
  initialState: {
    item: null,
    itemloading: false,
    itemerror: null,
  },
  reducers: {
    setItem: (state, action) => {
      state.item = action.payload;
    },
    setItemLoading: (state, action) => {
      state.itemloading = action.payload;
    },
    setItemError: (state, action) => {
      state.itemerror = action.payload;
    },
  },
});

export const { setItem, setItemLoading, setItemError } = addItemSlice.actions;
export default addItemSlice.reducer;
