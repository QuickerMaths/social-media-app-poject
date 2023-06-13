import { handleRegister } from "../../controllers/registerController";
import express from "express";
const router = express.Router();

router.post("/", handleRegister);

export default router;
