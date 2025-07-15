"use client";

import { configureStore } from "@reduxjs/toolkit";
import { reducers } from "./reducer";

export const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
