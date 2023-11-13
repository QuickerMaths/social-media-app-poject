import express from "express";
import commentController from "../controllers/comment/index.ts";
import expressCallback from "../helpers/expressCallback.ts";
import authMiddleware from "../middleware/authMiddleware.ts";

const router = express.Router();

const {
  createCommentController,
  updateCommentController,
  deleteCommentController,
  likeCommentController
} = commentController;

router
  .post("/", authMiddleware, expressCallback(createCommentController))
  .patch(
    "/:commentId",
    authMiddleware,
    expressCallback(updateCommentController)
  )
  .delete(
    "/:commentId",
    authMiddleware,
    expressCallback(deleteCommentController)
  )
  .post(
    "/:commentId/like",
    authMiddleware,
    expressCallback(likeCommentController)
  );

export default router;
