import express from "express";
const router = express.Router();
import {
  createRePost,
  deleteRePost,
  likeRePost,
} from "../../controllers/rePostController";
import { verifyJWT } from "../../middlewares/verifyJWT";

router.route("/").post(createRePost).put(likeRePost).delete(deleteRePost);

export default router;
