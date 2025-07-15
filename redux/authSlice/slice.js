import { createSlice } from "@reduxjs/toolkit";
import { loginMember } from "./thunk";
import Cookies from "js-cookie";

const rememberedUser = JSON.parse(Cookies.get("rememberedUser") || "{}");
const authUser = JSON.parse(Cookies.get("authUser") || "{}");


const initialState = {
  rememberedUser: rememberedUser,
  authUser: authUser,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginMember.pending, (state, action) => { })
      .addCase(loginMember.fulfilled, (state, action) => {
        state.authUser = action?.payload?.member || {};

        const data = action?.payload || {};
        Cookies.set("authUser", JSON.stringify(data || "{}"));

        if (action.meta?.arg?.rememberMe) {
          state.rememberedUser = action.meta?.arg || {};
          Cookies.set("rememberedUser", JSON.stringify(action.meta?.arg), { expires: 7 });
        }

      })
      .addCase(loginMember.rejected, (state, action) => { });
  },
});

export default authSlice.reducer;
