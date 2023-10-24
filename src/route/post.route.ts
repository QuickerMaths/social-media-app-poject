import express from "express";
import expressCallback from "../helpers/expressCallback.ts";
import postController from "../controllers/post/index.ts";

const router = express.Router();

const {
  selectAllPostsController,
  selectAllPostsByUserIdController,
  selectPostByIdController
} = postController;

router
  .get("/", expressCallback(selectAllPostsController))
  .get("/user/:userId", expressCallback(selectAllPostsByUserIdController))
  .get("/:postId/", expressCallback(selectPostByIdController));

export default router;
