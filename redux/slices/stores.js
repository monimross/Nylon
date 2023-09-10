// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** Axios Imports
import axiosService from "../../services/axios";

export const getData = createAsyncThunk("stores/getData", async (data) => {
  const response = await axiosService.post("/m/shops/shops", data);
  return {
    data: response.data,
    totalPages: response.data.length,
  };
});

export const storesSlice = createSlice({
  name: "stores",
  initialState: {
    data: [],
    total: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getData.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.total = action.payload.totalPages;
    });
  },
});

export default storesSlice.reducer;
