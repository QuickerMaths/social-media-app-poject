import express from "express";
import expressCallback from "../helpers/expressCallback.ts";
import postController from "../controllers/post/index.ts";

const router = express.Router();

const { selectAllPosts, selectAllPostsByUserId } = postController;

router
  .get("/", expressCallback(selectAllPosts))
  .get("/:userId", expressCallback(selectAllPostsByUserId))
  .get("/:userId/:postId", expressCallback(selectAllPostsByUserId));

export default router;
