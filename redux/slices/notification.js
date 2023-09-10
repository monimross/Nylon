import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { NotificationApi } from "../../api/main/notification";

const initialState = {
  loading: false,
  loadingStats: false,
  notification: [],
  notificationStats: {},
  meta: {},
  error: "",
};

export const fetchNotification = createAsyncThunk(
  "notification/fetchNotification",
  (params = {}) => {
    return NotificationApi.get(params).then((res) => ({
      data: res.data,
      meta: res.meta,
    }));
  }
);

export const fetchNotificationStats = createAsyncThunk(
  "notification/fetchNotificationStats",
  (params = {}) => {
    return NotificationApi.getStatistics(params).then((res) => res);
  }
);

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  extraReducers: (builder) => {
    //notification
    builder.addCase(fetchNotification.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchNotification.fulfilled, (state, action) => {
      const { payload } = action;
      state.loading = false;
      state.notification = payload.data;
      state.meta = payload.meta;
      state.error = "";
    });
    builder.addCase(fetchNotification.rejected, (state, action) => {
      state.loading = false;
      state.notification = [];
      state.meta = {};
      state.error = action.error.message;
    });
    //notification stats
    builder.addCase(fetchNotificationStats.pending, (state) => {
      state.loadingStats = true;
    });
    builder.addCase(fetchNotificationStats.fulfilled, (state, action) => {
      const { payload } = action;
      state.loadingStats = false;
      state.notificationStats = payload;
      state.error = "";
    });
    builder.addCase(fetchNotificationStats.rejected, (state, action) => {
      state.loadingStats = false;
      state.notificationStats = [];
      state.error = action.error.message;
    });
  },
  reducers: {
    clearNotification(state) {
      state.notification = [];
      state.notificationStats = {};
    },
  },
});
export const { clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
