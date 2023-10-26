import postUseCase from "../../use-cases/post/index.ts";
import makeSelectAllPostsController from "./select-all-posts.controller.ts";
import makeSelectAllPostsByUserIdController from "./select-all-posts-by-user-id.controller.ts";
import makeSelectPostByIdController from "./select-post-by-id.controller.ts";
import makeCreatePostController from "./create-post.controller.ts";
import makeUpdatePostController from "./update-post.controller.ts";
import makeDeletePostController from "./delete-post.controller.ts";
import makeLikePostController from "./like-post.controller.ts";

const selectAllPostsController = makeSelectAllPostsController({
  useCase: postUseCase.selectAllPostsUseCase
});
const selectAllPostsByUserIdController = makeSelectAllPostsByUserIdController({
  useCase: postUseCase.selectAllPostsByUserIdUseCase
});
const selectPostByIdController = makeSelectPostByIdController({
  useCase: postUseCase.selectPostByIdUseCase
});
const createPostController = makeCreatePostController({
  useCase: postUseCase.createPostUseCase
});
const updatePostController = makeUpdatePostController({
  useCase: postUseCase.updatePostUseCase
});
const deletePostController = makeDeletePostController({
  useCase: postUseCase.deletePostUseCase
});
const likePostController = makeLikePostController({
  useCase: postUseCase.likePostUseCase
});

const postController = Object.freeze({
  selectAllPostsController,
  selectAllPostsByUserIdController,
  selectPostByIdController,
  createPostController,
  updatePostController,
  deletePostController,
  likePostController
});

export default postController;
