import express from "express";
import expressCallback from "../helpers/expressCallback.ts";
import postController from "../controllers/post/index.ts";

const router = express.Router();

router.get("/", expressCallback(postController.selectAllPosts));

export default router;
