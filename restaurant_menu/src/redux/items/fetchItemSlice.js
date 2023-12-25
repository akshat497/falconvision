
import { createSlice } from "@reduxjs/toolkit";

const fetchItemSlice = createSlice({
  name: "fetchitem",
  initialState: {
    Name:"",
    f_item: null,
    f_itemloading: false,
    f_itemerror: null,
  },
  reducers: {
    setName: (state, action) => {
      state.Name = action.payload;
    },
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

export const { setFetchedItem, setFetchedItemLoading, setFetchedItemError,setName } = fetchItemSlice.actions;
export default fetchItemSlice.reducer;
