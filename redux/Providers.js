"use client";

import { useLayoutEffect } from "react";
import { Provider } from "react-redux";
import { AppProgressProvider } from "@bprogress/next";
import runAxiosSetup from "@/axios/axiosSetup";
import { store } from "./store";

export function Providers({ children }) {
  // client side global logic will go here

  useLayoutEffect(() => {
    runAxiosSetup({})
  }, [])

  return (
    <Provider store={store}>
      {/* This is used to show progress bar at the top when navigating using link component. It must be called in client component */}
      <AppProgressProvider
        height="4px"
        color="#04C3DD"
        options={{ showSpinner: false }}
        shallowRouting>
        {children}
      </AppProgressProvider>
    </Provider>
  );
}
