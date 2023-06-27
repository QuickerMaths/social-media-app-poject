import express from "express";
const router = express.Router();
import {
  getPosts,
  createPost,
  likePost,
  updatePost,
  deletePost,
  getPostsByUser,
  getPostById,
} from "../../controllers/postsController";
import { verifyJWT } from "../../middlewares/verifyJWT";

router
  .route("/")
  .get(getPosts)
  .post(verifyJWT, createPost)
  .put(likePost)
  .delete(deletePost);

router.route("/edit").put(updatePost);

router.route("/:id").get(getPostById);

router.route("/user/:id").get(getPostsByUser);

export default router;
