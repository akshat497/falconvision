
import { createSlice } from "@reduxjs/toolkit";

const addCategorySlice = createSlice({
  name: "addcategory",
  initialState: {
    category: null,
    categoryloading: false,
    categoryerror: null,
  },
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setCategoryloading: (state, action) => {
      state.categoryloading = action.payload;
    },
    setCategoryerror: (state, action) => {
      state.categoryerror = action.payload;
    },
  },
});

export const { setCategory, setCategoryloading, setCategoryerror } = addCategorySlice.actions;
export default addCategorySlice.reducer;
