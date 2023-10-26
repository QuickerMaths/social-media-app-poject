import express from "express";
import commentController from "../controllers/comment/index.ts";
import expressCallback from "../helpers/expressCallback.ts";

const router = express.Router();

const {
  createCommentController,
  updateCommentController,
  deleteCommentController,
  likeCommentController
} = commentController;

router
  .post("/", expressCallback(createCommentController))
  .patch("/:commentId", expressCallback(updateCommentController))
  .delete("/:commentId", expressCallback(deleteCommentController))
  .post("/:commentId/like", expressCallback(likeCommentController));

export default router;
