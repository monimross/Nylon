// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** Axios Imports
import axiosService from "../../services/axios";

export const getBanners = createAsyncThunk(
  "banners/getBanners",
  async (data) => {
    const response = await axiosService.get(
      "/api/v1/rest/banners/paginate",
      data
    );
    return {
      data: response.data,
      totalPages: response.data.length,
    };
  }
);

export const bannerSlice = createSlice({
  name: "banners",
  initialState: {
    data: [],
    total: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBanners.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.total = action.payload.totalPages;
    });
  },
});

export default bannerSlice.reducer;
