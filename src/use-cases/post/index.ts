import postDb from "../../data-access/post/index.ts";
import commentDb from "../../data-access/comment/index.ts";
import makeSelectAllPosts from "./select-all-posts.use-case.ts";
import makeSelectAllPostsByUserId from "./select-all-posts-by-user-id.use-case.ts";

const selectAllPosts = makeSelectAllPosts({ post: postDb, comment: commentDb });
const selectAllPostsByUserId = makeSelectAllPostsByUserId({
  post: postDb,
  comment: commentDb
});

const postUseCase = Object.freeze({
  selectAllPosts,
  selectAllPostsByUserId
});

export default postUseCase;
