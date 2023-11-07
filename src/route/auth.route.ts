import express from "express";
import expressCallback from "../helpers/expressCallback.ts";
import userController from "../controllers/user/index.ts";
import authController from "../controllers/auth/index.ts";

const router = express.Router();

const { createUserController } = userController;
const { loginController, verifyController, logoutController } = authController;

router
  .get("/me", expressCallback(verifyController))
  .post("/register", expressCallback(createUserController))
  .post("/login", expressCallback(loginController))
  .post("/logout", expressCallback(logoutController));

export default router;
