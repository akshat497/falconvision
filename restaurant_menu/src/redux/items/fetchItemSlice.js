
import { createSlice } from "@reduxjs/toolkit";

const fetchItemSlice = createSlice({
  name: "fetchitem",
  initialState: {
    f_item: null,
    f_itemloading: false,
    f_itemerror: null,
  },
  reducers: {
    setFetchedItem: (state, action) => {
      state.f_item = action.payload;
    },
    setFetchedItemLoading: (state, action) => {
      state.f_itemloading = action.payload;
    },
    setFetchedItemError: (state, action) => {
      state.f_itemerror = action.payload;
    },
  },
});

export const { setFetchedItem, setFetchedItemLoading, setFetchedItemError } = fetchItemSlice.actions;
export default fetchItemSlice.reducer;
