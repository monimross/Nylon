import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosService from "../../services/axios";

const initialState = {
  loading: false,
  extras: [],
  error: "",
};

export const fetchExtras = createAsyncThunk(
  "brand/fetchExtras",
  (params = {}) => {
    return axiosService
      .get("/api/v1/rest/extra-group", { params })
      .then((res) => res.data);
  }
);

const extraSlice = createSlice({
  name: "extras",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchExtras.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchExtras.fulfilled, (state, action) => {
      const { payload } = action;
      state.loading = false;
      state.extras = payload;
      state.error = "";
    });
    builder.addCase(fetchExtras.rejected, (state, action) => {
      state.loading = false;
      state.extras = [];
      state.error = action.error.message;
    });
  },
});

export default extraSlice.reducer;
