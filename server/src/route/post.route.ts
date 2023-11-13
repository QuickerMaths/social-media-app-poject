import express from "express";
import expressCallback from "../helpers/expressCallback.ts";
import postController from "../controllers/post/index.ts";
import readCredentialsMiddleware from "../middleware/readCredentialsMiddleware.ts";
import authMiddleware from "../middleware/authMiddleware.ts";

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
  .get(
    "/",
    readCredentialsMiddleware,
    expressCallback(selectAllPostsController)
  )
  .get(
    "/user/:userId",
    readCredentialsMiddleware,
    expressCallback(selectAllPostsByUserIdController)
  )
  .get(
    "/:postId/",
    readCredentialsMiddleware,
    expressCallback(selectPostByIdController)
  )
  .post("/", readCredentialsMiddleware, expressCallback(createPostController))
  .patch("/:postId", authMiddleware, expressCallback(updatePostController))
  .delete("/:postId", authMiddleware, expressCallback(deletePostController))
  .post("/:postId/like", authMiddleware, expressCallback(likePostController));

export default router;
