import express from "express";
import expressCallback from "../helpers/expressCallback.ts";
import userController from "../controllers/user/index.ts";

const router = express.Router();

const { createUserController } = userController;

router
  // .get('/me', authUserController)
  .post("/register", expressCallback(createUserController));
// .post('/login', loginUserController)
// .post('/logout', logoutUserController)

export default router;
