import postDb from "../../data-access/post/index.ts";
import commentDb from "../../data-access/comment/index.ts";
import makeSelectAllPosts from "./select-all-posts.use-case.ts";

const selectAllPosts = makeSelectAllPosts({ post: postDb, comment: commentDb });

const postUseCases = Object.freeze({
  selectAllPosts
});

export default postUseCases;
