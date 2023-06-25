import express from "express";
const router = express.Router();
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  getPostsByUser,
} from "../../controllers/postsController";
import { verifyJWT } from "../../middlewares/verifyJWT";

router.route("/").get(getPosts).post(verifyJWT, createPost).delete(deletePost);

router.route("/edit/:id").put(updatePost);

router.route("/:id").get(getPostsByUser);

export default router;
