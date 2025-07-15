import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginMember = createAsyncThunk(
  "auth/loginMember",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`member/login`, data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

