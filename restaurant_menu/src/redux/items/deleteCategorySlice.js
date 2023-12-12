
import { createSlice } from "@reduxjs/toolkit";

const deleteCategorySlice = createSlice({
  name: "deletecategory",
  initialState: {
    d_category: null,
    d_categoryLoading: false,
    d_categoryerror: null,
  },
  reducers: {
    setDeleteCategory: (state, action) => {
      state.d_category = action.payload;
    },
    setDeleteCategoryloading: (state, action) => {
      state.d_categoryLoading = action.payload;
    },
    setDeleteCategoryerror: (state, action) => {
      state.d_categoryerror = action.payload;
    },
  },
});

export const { setDeleteCategory, setDeleteCategoryloading, setDeleteCategoryerror } = deleteCategorySlice.actions;
export default deleteCategorySlice.reducer;
