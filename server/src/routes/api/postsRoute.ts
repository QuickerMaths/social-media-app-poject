import express from "express";
const router = express.Router();
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  getPostsByUser,
} from "../../controllers/postsController";

router
  .route("/")
  .get(getPosts)
  .post(createPost)
  .put(updatePost)
  .delete(deletePost);

router.route("/:id").get(getPostsByUser);

export default router;
