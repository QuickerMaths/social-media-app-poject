import express from "express";
const router = express.Router();
import { createComment } from "../../controllers/commentsController";
import { verifyJWT } from "../../middlewares/verifyJWT";

router.route("/").post(createComment);

export default router;
