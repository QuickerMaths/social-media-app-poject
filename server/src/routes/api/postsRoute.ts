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

router
  .route("/")
  .get(getPosts)
  .post(verifyJWT, createPost)
  .put(verifyJWT, updatePost)
  .delete(verifyJWT, deletePost);

router.route("/:id").get(getPostsByUser);

export default router;
