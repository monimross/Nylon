import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosService from "../../services/axios";

const initialState = {
  loading: false,
  filters: [],
  error: "",
};

export const fetchFilter = createAsyncThunk(
  "filter/fetchFilter",
  (params = {}) => {
    return axiosService
      .get("/api/v1/rest/filter", { params })
      .then((res) => res.data);
  }
);

const filterSlice = createSlice({
  name: "filter",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchFilter.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchFilter.fulfilled, (state, action) => {
      const { payload } = action;
      state.loading = false;
      state.filters = payload;
      state.error = "";
    });
    builder.addCase(fetchFilter.rejected, (state, action) => {
      state.loading = false;
      state.brands = [];
      state.error = action.error.message;
    });
  },
});

export default filterSlice.reducer;
