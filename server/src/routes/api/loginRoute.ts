import express from "express";
const router = express.Router();
import { handleLogin, handleUserAuth } from "../../controllers/loginController";

router
.get('/me', handleUserAuth)
.post("/", handleLogin);

export default router;
