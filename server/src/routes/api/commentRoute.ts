import express from "express";
const router = express.Router();
import {
  createComment,
  deletedComment,
} from "../../controllers/commentsController";
import { verifyJWT } from "../../middlewares/verifyJWT";

router.route("/").post(createComment).delete(deletedComment);

export default router;
