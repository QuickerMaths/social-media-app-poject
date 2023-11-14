import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postPage: 1,
  commentPage: 1,
  friendRequestPage: 1,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setPostPage: (state, action) => {
      state.postPage = action.payload;
    },
    setCommentPage: (state, action) => {
      state.commentPage = action.payload;
    },
    setFriendRequestPage: (state, action) => {
      state.friendRequestPage = action.payload;
    },
  },
});

export default paginationSlice.reducer;
