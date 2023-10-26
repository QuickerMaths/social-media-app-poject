import postDb from "../../data-access/post/index.ts";
import commentDb from "../../data-access/comment/index.ts";
import makeSelectAllPostsUseCase from "./select-all-posts.use-case.ts";
import makeSelectAllPostsByUserIdUseCase from "./select-all-posts-by-user-id.use-case.ts";
import makeSelectPostByIdUseCase from "./select-post-by-id.use-case.ts";
import makeCreatePostUseCase from "./create-post.use-case.ts";
import makeUpdatePostUseCase from "./update-post.use-case.ts";
import makeDeletePostUseCase from "./delete-post.use-case.ts";
import makeLikePostUseCase from "./like-post.use-case.ts";

const selectAllPostsUseCase = makeSelectAllPostsUseCase({
  postDataBase: postDb,
  commentDataBase: commentDb
});
const selectAllPostsByUserIdUseCase = makeSelectAllPostsByUserIdUseCase({
  postDataBase: postDb,
  commentDataBase: commentDb
});
const selectPostByIdUseCase = makeSelectPostByIdUseCase({
  postDataBase: postDb,
  commentDataBase: commentDb
});
const createPostUseCase = makeCreatePostUseCase({
  postDataBase: postDb
});
const updatePostUseCase = makeUpdatePostUseCase({
  postDataBase: postDb
});
const deletePostUseCase = makeDeletePostUseCase({
  postDataBase: postDb
});
const likePostUseCase = makeLikePostUseCase({
  postDataBase: postDb
});

const postUseCase = Object.freeze({
  selectAllPostsUseCase,
  selectAllPostsByUserIdUseCase,
  selectPostByIdUseCase,
  createPostUseCase,
  updatePostUseCase,
  deletePostUseCase,
  likePostUseCase
});

export default postUseCase;
