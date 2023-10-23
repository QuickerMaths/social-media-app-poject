import postUseCase from "../../use-cases/post/index.ts";
import makeSelectAllPostsController from "./post.controller.ts";

const selectAllPosts = makeSelectAllPostsController({ useCase: postUseCase });

const postController = Object.freeze({
  selectAllPosts
});

export default postController;
