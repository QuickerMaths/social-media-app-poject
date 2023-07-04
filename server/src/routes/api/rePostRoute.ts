import express from "express";
const router = express.Router();
import {
  createRePost,
  deleteRePost,
  likeRePost,
  updateRePost,
} from "../../controllers/rePostController";
import { verifyJWT } from "../../middlewares/verifyJWT";

router.route("/").post(createRePost).put(likeRePost).delete(deleteRePost);

router.route("/edit").put(updateRePost);

export default router;
