import postUseCase from "../../use-cases/post/index.ts";
import makeSelectAllPostsController from "./select-all-posts.controller.ts";
import makeSelectAllPostsByUserId from "./select-all-posts-by-user-id.controller.ts";

const selectAllPosts = makeSelectAllPostsController({ useCase: postUseCase });
const selectAllPostsByUserId = makeSelectAllPostsByUserId({
  useCase: postUseCase
});

const postController = Object.freeze({
  selectAllPosts,
  selectAllPostsByUserId
});

export default postController;
