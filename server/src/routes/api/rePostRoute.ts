import express from "express";
const router = express.Router();
import { createRePost, deleteRePost } from "../../controllers/rePostController";
import { verifyJWT } from "../../middlewares/verifyJWT";

router.route("/").post(createRePost).delete(deleteRePost);

export default router;
