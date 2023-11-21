import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IPaginationSliceState } from "./types";

const initialState: IPaginationSliceState = {
  userPostPage: {},
  commentPage: {},
  userFriendsPage: {},
  postPage: 1,
  userPage: 1,
  friendRequestPage: 1,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setUserPostPage: (
      state,
      action: PayloadAction<{ id: number; page: number }>
    ) => {
      const { id, page } = action.payload;
      state.userPostPage[id] = page;
    },
    setCommentPage: (
      state,
      action: PayloadAction<{ id: number; page: number }>
    ) => {
      const { id, page } = action.payload;
      state.commentPage[id] = page;
    },
    setUserFriendsPage: (
      state,
      action: PayloadAction<{ id: number; page: number }>
    ) => {
      const { id, page } = action.payload;
      state.userFriendsPage[id] = page;
    },
    setPostPage: (state, action: PayloadAction<number>) => {
      state.postPage = action.payload;
    },
    setUserPage: (state, action: PayloadAction<number>) => {
      state.userPage = action.payload;
    },
    setFriendRequestPage: (state, action: PayloadAction<number>) => {
      state.friendRequestPage = action.payload;
    },
  },
});

export default paginationSlice.reducer;
export const {
  setUserPostPage,
  setCommentPage,
  setUserFriendsPage,
  setPostPage,
  setUserPage,
  setFriendRequestPage,
} = paginationSlice.actions;
