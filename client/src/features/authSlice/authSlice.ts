// External dependencies

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Internal dependencies

import { IAuthSliceState } from "./types";
import { authApiSlice } from "../apiSlice/authApiSlice/authApiSlice";

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
    setProfileImage: (state, action: PayloadAction<string | null>) => {
      state.userImg = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApiSlice.endpoints.userAuthorization.matchFulfilled,
      (state, { payload }) => {
        const { friendsRequests, userId, userImg, username } = payload.data;
        state.friendsRequests = friendsRequests;
        state.userId = userId;
        state.userImg = userImg;
        state.username = username;
      }
    );
    builder.addMatcher(
      authApiSlice.endpoints.logoutUser.matchFulfilled,
      (state) => {
        state.username = null;
        state.userId = null;
        state.userImg = null;
        state.friendsRequests = [];
      }
    );
    builder.addMatcher(
      authApiSlice.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => {
        const { friendsRequests, userId, userImg, username } = payload.data;
        state.friendsRequests = friendsRequests;
        state.userId = userId;
        state.userImg = userImg;
        state.username = username;
      }
    );
  },
});

export const { setProfileImage } = authSlice.actions;
export default authSlice.reducer;
