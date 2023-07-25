import express from "express";
const router = express.Router();
import { handleLogout } from "../../controllers/logoutController";

router.post("/", handleLogout);

export default router;
