import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import rootReducer from "./rootReducer";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import {
  createStateSyncMiddleware,
  initMessageListener,
} from "redux-state-sync";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: [
    "cart",
    "savedProduct",
    "savedStore",
    "viewedProduct",
    "savedAddress",
    "user",
    "notification",
    "settings",
    "notificationList",
    "notificationStats",
  ],
  blacklist: ["stores", "category", "banners", "order", "chat"],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers(rootReducer)
);

const initStore = () => {
  const isClient = typeof window !== "undefined" && process.browser;
  const middleware = (getDefaultMiddleware) => {
    const middlewareArray = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
    if (isClient) {
      middlewareArray.push(
        createStateSyncMiddleware({
          blacklist: ["persist/PERSIST", "persist/REHYDRATE"],
        })
      );
    }
    return middlewareArray;
  };

  const store = configureStore({
    reducer: persistedReducer,
    middleware,
  });

  if (isClient) {
    initMessageListener(store);
  }

  return store;
};

export const store = initStore();
export const persistor = persistStore(store);
