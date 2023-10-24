import postUseCase from "../../use-cases/post/index.ts";
import makeSelectAllPostsController from "./select-all-posts.controller.ts";
import makeSelectAllPostsByUserIdController from "./select-all-posts-by-user-id.controller.ts";
import makeSelectPostByIdController from "./select-post-by-id.controller.ts";

const selectAllPostsController = makeSelectAllPostsController({
  useCase: postUseCase.selectAllPostsUseCase
});
const selectAllPostsByUserIdController = makeSelectAllPostsByUserIdController({
  useCase: postUseCase.selectAllPostsByUserIdUseCase
});
const selectPostByIdController = makeSelectPostByIdController({
  useCase: postUseCase.selectPostByIdUseCase
});

const postController = Object.freeze({
  selectAllPostsController,
  selectAllPostsByUserIdController,
  selectPostByIdController
});

export default postController;
