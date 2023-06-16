import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IAuthSliceState } from "./types";

const initialState: IAuthSliceState = {
  //TODO: figure out how store image in redux
  username: null,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    getAuth: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    logOut: (state) => {
      state.username = null;
    },
  },
});

export const { getAuth, logOut } = authSlice.actions;
export default authSlice.reducer;
