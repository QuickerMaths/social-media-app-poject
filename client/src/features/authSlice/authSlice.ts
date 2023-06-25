import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IAuthSliceState } from "./types";

const initialState: IAuthSliceState = {
  username: null,
  userId: null,
  userImg: null,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    getAuth: (
      state,
      action: PayloadAction<{
        username: string;
        userId: string;
        userImg: string | null;
      }>
    ) => {
      state.username = action.payload.username;
      state.userId = action.payload.userId;
      state.userImg = action.payload.userImg;
    },
    setProfileImage: (state, action: PayloadAction<string | null>) => {
      state.userImg = action.payload;
    },
    logOut: (state) => {
      state.username = null;
      state.userId = null;
      state.userImg = null;
    },
  },
});

export const { getAuth, logOut, setProfileImage } = authSlice.actions;
export default authSlice.reducer;
