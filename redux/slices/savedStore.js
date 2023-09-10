import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  savedStoreList: [],
  currentStore: {},
};

const savedStoreSlice = createSlice({
  name: "savedStore",
  initialState,
  reducers: {
    addToSaved(store, action) {
      store.savedStoreList.push({ ...action.payload });
    },
    addToCurrentStore(store, action) {
      store.currentStore = action.payload;
    },
    removeFromSaved(state, action) {
      state.savedStoreList.map((storeItem) => {
        if (storeItem.id === action.payload.id) {
          const nextStoreItems = state.savedStoreList.filter(
            (item) => item.id !== storeItem.id
          );
          state.savedStoreList = nextStoreItems;
        }
        return state;
      });
    },
    clearSavedStore(state) {
      state.savedStoreList = [];
    },

    updateSavedStore(state, action) {
      state.savedStoreList = action.payload;
    },
  },
});

export const {
  addToSaved,
  removeFromSaved,
  clearSavedStore,
  updateSavedStore,
  addToCurrentStore,
} = savedStoreSlice.actions;

export default savedStoreSlice.reducer;
