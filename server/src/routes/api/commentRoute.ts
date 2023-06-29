import express from "express";
const router = express.Router();
import {
  createComment,
  deletedComment,
  likeComment,
} from "../../controllers/commentsController";
import { verifyJWT } from "../../middlewares/verifyJWT";

router.route("/").post(createComment).delete(deletedComment).put(likeComment);

export default router;
