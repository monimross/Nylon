import React from "react";
import { AuthProvider } from "../../utils/contexts/AuthContext";
import { Provider } from "react-redux";
import { persistor, store } from "../../redux/store";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import MainContextProvider from "../../utils/contexts/MainContext";
import { Router } from "next/router";
import nProgress from "nprogress";

const Providers = ({ children }) => {
  Router.events.on("routeChangeStart", () => nProgress.start());
  Router.events.on("routeChangeComplete", () => nProgress.done());
  Router.events.on("routeChangeError", () => nProgress.done());
  return (
    <Provider store={store}>
      {typeof window !== "undefined" ? (
        <PersistGate loading={null} persistor={persistor}>
          <MainContextProvider>
            <AuthProvider>{children}</AuthProvider>
            <ToastContainer newestOnTop />
          </MainContextProvider>
        </PersistGate>
      ) : (
        <MainContextProvider>
          <AuthProvider>{children}</AuthProvider>
          <ToastContainer newestOnTop />
        </MainContextProvider>
      )}
    </Provider>
  );
};

export default Providers;
