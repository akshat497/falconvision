
import { createSlice } from "@reduxjs/toolkit";

const updateCategorySlice = createSlice({
  name: "updatecategory",
  initialState: {
    u_category: null,
    u_categoryloading: false,
    u_categoryerror: null,
  },
  reducers: {
    setupdateCategory: (state, action) => {
      state.u_category = action.payload;
    },
    setupdateCategoryloading: (state, action) => {
      state.u_categoryloading = action.payload;
    },
    setupdateCategoryerror: (state, action) => {
      state.u_categoryerror = action.payload;
    },
  },
});

export const { setupdateCategory, setupdateCategoryloading, setupdateCategoryerror } = updateCategorySlice.actions;
export default updateCategorySlice.reducer;
