import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice/slice";

export const reducers = combineReducers({
  auth: authSlice,
});
