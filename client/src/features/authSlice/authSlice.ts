import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IAuthSliceState } from "./types";

const initialState: IAuthSliceState = {
  //TODO: figure out how store image in redux
  username: null,
  userId: null,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    getAuth: (
      state,
      action: PayloadAction<{ username: string; userId: string }>
    ) => {
      state.username = action.payload.username;
      state.userId = action.payload.userId;
    },
    logOut: (state) => {
      state.username = null;
      state.userId = null;
    },
  },
});

export const { getAuth, logOut } = authSlice.actions;
export default authSlice.reducer;
