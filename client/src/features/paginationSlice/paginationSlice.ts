import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IPaginationSliceState } from "./types";

const initialState: IPaginationSliceState = {
  postPage: 1,
  userPostPage: {},
  commentPage: {},
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
