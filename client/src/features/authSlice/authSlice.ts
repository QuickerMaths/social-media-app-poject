import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    auth: (state, action: PayloadAction) => {
      return;
    },
  },
});

export const { auth } = authSlice.actions;
export default authSlice.reducer;
