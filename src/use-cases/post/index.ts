import postDb from "../../data-access/post/index.ts";
import commentDb from "../../data-access/comment/index.ts";
import makeSelectAllPostsUseCase from "./select-all-posts.use-case.ts";
import makeSelectAllPostsByUserIdUseCase from "./select-all-posts-by-user-id.use-case.ts";
import makeSelectPostByIdUseCase from "./select-post-by-id.use-case.ts";

const selectAllPostsUseCase = makeSelectAllPostsUseCase({
  post: postDb,
  comment: commentDb
});
const selectAllPostsByUserIdUseCase = makeSelectAllPostsByUserIdUseCase({
  post: postDb,
  comment: commentDb
});
const selectPostByIdUseCase = makeSelectPostByIdUseCase({
  post: postDb,
  comment: commentDb
});

const postUseCase = Object.freeze({
  selectAllPostsUseCase,
  selectAllPostsByUserIdUseCase,
  selectPostByIdUseCase
});

export default postUseCase;
