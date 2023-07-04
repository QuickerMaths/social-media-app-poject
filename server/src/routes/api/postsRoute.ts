import express from "express";
const router = express.Router();
import {
  getPosts,
  createPost,
  likePost,
  updatePost,
  deletePost,
  getPostsByUser,
} from "../../controllers/postsController";
import { verifyJWT } from "../../middlewares/verifyJWT";

router
  .route("/")
  .get(getPosts)
  .post(verifyJWT, createPost)
  .put(likePost)
  .delete(deletePost);

router.route("/edit").put(updatePost);

router.route("/user/:id").get(getPostsByUser);

export default router;
