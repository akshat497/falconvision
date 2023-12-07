
import { createSlice } from "@reduxjs/toolkit";

const fetchCategorySlice = createSlice({
  name: "fetchcategory",
  initialState: {
    fetchedcategory: null,
    fetchedcategoryloading: false,
    fetchedcategoryerror: null,
  },
  reducers: {
    setFetchedCategory: (state, action) => {
      state.fetchedcategory = action.payload;    
    },
    setFetchedCategoryloading: (state, action) => {
      state.fetchedcategoryloading = action.payload;
    },
    setFetchedCategoryerror: (state, action) => {
      state.fetchedcategoryerror = action.payload;
    },
  },
});

export const { setFetchedCategory, setFetchedCategoryloading, setFetchedCategoryerror } = fetchCategorySlice.actions;
export default fetchCategorySlice.reducer;
