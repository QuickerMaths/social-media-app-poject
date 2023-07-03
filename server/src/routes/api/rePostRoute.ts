import express from "express";
const router = express.Router();
import { createRePost } from "../../controllers/rePostController";
import { verifyJWT } from "../../middlewares/verifyJWT";

router.route("/").post(createRePost);

export default router;
