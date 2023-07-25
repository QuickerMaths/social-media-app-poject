import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApiSlice } from "../apiSlice/authApiSlice/authApiSlice";

import { IAuthSliceState } from "./types";

const initialState: IAuthSliceState = {
  username: null,
  userId: null,
  userImg: null,
  friendsRequests: [],
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
        friendsRequests: string[] | [];
      }>
    ) => {
      state.username = action.payload.username;
      state.userId = action.payload.userId;
      state.userImg = action.payload.userImg;
      state.friendsRequests = action.payload.friendsRequests;
    },
    setProfileImage: (state, action: PayloadAction<string | null>) => {
      state.userImg = action.payload;
    },
    logOut: (state) => {
      state.username = null;
      state.userId = null;
      state.userImg = null;
      state.friendsRequests = [];
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApiSlice.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => {
        (state.friendsRequests = payload.friendsRequests),
          (state.userId = payload.userId);
        state.userImg = payload.userImg;
        state.username = payload.username;
      }
    );
  },
});

export const { getAuth, logOut, setProfileImage } = authSlice.actions;
export default authSlice.reducer;
