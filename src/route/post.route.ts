import express from "express";
import expressCallback from "../helpers/expressCallback.ts";
import postController from "../controllers/post/index.ts";

const router = express.Router();

const {
  selectAllPostsController,
  selectAllPostsByUserIdController,
  selectPostByIdController,
  createPostController,
  updatePostController,
  deletePostController,
  likePostController
} = postController;

router
  .get("/", expressCallback(selectAllPostsController))
  .get("/user/:userId", expressCallback(selectAllPostsByUserIdController))
  .get("/:postId/", expressCallback(selectPostByIdController))
  .post("/", expressCallback(createPostController))
  .patch("/:postId", expressCallback(updatePostController))
  .delete("/:postId", expressCallback(deletePostController))
  .post("/:postId/like", expressCallback(likePostController));

export default router;
