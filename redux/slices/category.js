import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { parseCookies } from "nookies";
import axiosService from "../../services/axios";
export const getCategory = createAsyncThunk(
  "category/getCategory",
  async () => {
    const response = await axiosService.get(
      "/api/v1/rest/categories/paginate",
      { params: { perPage: 10000, lang: parseCookies().language_locale } }
    );
    return {
      data: response.data.data,
    };
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    categoryList: [],
    error: "",
    loading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getCategory.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getCategory.fulfilled, (state, action) => {
      const { payload } = action;
      state.loading = false;
      state.categoryList = payload.data;
    });

    builder.addCase(getCategory.rejected, (state, action) => {
      state.loading = false;
      state.categoryList = [];
      state.error = action.error.message;
    });
  },
});

export default categorySlice.reducer;
