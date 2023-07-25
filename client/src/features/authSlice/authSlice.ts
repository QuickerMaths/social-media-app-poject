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
        const { friendsRequests, userId, userImg, username } = payload;
        state.friendsRequests = friendsRequests;
        state.userId = userId;
        state.userImg = userImg;
        state.username = username;
      }
    );
  },
});

export const { getAuth, logOut, setProfileImage } = authSlice.actions;
export default authSlice.reducer;
