import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IPaginationSliceState } from "./types";

const initialState: IPaginationSliceState = {
  postPage: 1,
  userPostPage: {},
  commentPage: 1,
  friendRequestPage: 1,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setPostPage: (state, action: PayloadAction<number>) => {
      state.postPage = action.payload;
    },
    setUserPostPage: (
      state,
      action: PayloadAction<{ userId: number; page: number }>
    ) => {
      const { userId, page } = action.payload;
      state.userPostPage[userId] = page;
    },
    setCommentPage: (state, action: PayloadAction<number>) => {
      state.commentPage = action.payload;
    },
    setFriendRequestPage: (state, action: PayloadAction<number>) => {
      state.friendRequestPage = action.payload;
    },
  },
});

export default paginationSlice.reducer;
export const {
  setPostPage,
  setUserPostPage,
  setCommentPage,
  setFriendRequestPage,
} = paginationSlice.actions;
